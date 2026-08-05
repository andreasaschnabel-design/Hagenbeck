/*
 * Tierpark-Begleiter - Anwendungslogik
 *
 * Reines JavaScript ohne Framework, damit die App offline und ohne
 * Build-Schritt laeuft. Zustand liegt im localStorage des Geraets;
 * es werden keine Daten an einen Server gesendet.
 */

import { META, PARK_BOUNDS, BEREICHE, STATIONEN, TIERE, TOUREN, FUETTERUNGEN, WISSEN, OEFFNUNG } from './data.js';
import { KINDER_TIERE, KINDER_STATIONEN } from './data-kinder.js';
import * as GEO from './mapgeo.js';

/* =========================================================
 * Zustand
 * ======================================================= */

const STANDARD = {
  alter: 'erwachsen', // 'mini' (3-6) | 'kind' (7-11) | 'erwachsen' (ab 12)
  tempo: 1,
  stimme: '',
  autoWeiter: false,
  aktiveTour: null,
  besucht: {}, // { [tourId]: [stationId, ...] }
  koordinaten: {}, // { [stationId]: {lat, lon} } - vor Ort kalibriert
  zeiten: {}, // { [fuetterungId]: 'HH:MM' }
  quizGeloest: {}, // { [tierId]: true }
  karte3d: false,
  karteDrehung: 45,
  navZiel: null, // Stations-ID, zu der die Pfeil-Navigation fuehrt
  erstbesuch: true,
};

const SPEICHER = 'hagenbeck-begleiter-v1';

let S = laden();

function laden() {
  try {
    const roh = localStorage.getItem(SPEICHER);
    return roh ? { ...STANDARD, ...JSON.parse(roh) } : { ...STANDARD };
  } catch {
    return { ...STANDARD };
  }
}

function sichern() {
  try {
    localStorage.setItem(SPEICHER, JSON.stringify(S));
  } catch {
    /* privater Modus o. ae. - App funktioniert trotzdem, nur ohne Merken */
  }
}

function setze(teil) {
  S = { ...S, ...teil };
  sichern();
}

/* =========================================================
 * Hilfsfunktionen
 * ======================================================= */

const $ = (sel, wurzel = document) => wurzel.querySelector(sel);
const stationVon = (id) => STATIONEN.find((s) => s.id === id);
const tierVon = (id) => TIERE.find((t) => t.id === id);
const tourVon = (id) => TOUREN.find((t) => t.id === id);

function esc(text = '') {
  return String(text).replace(/[&<>"']/g, (z) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[z]));
}

function minutenText(m) {
  const h = Math.floor(m / 60);
  const r = m % 60;
  if (h && r) return `${h} Std. ${r} Min.`;
  if (h) return `${h} Std.`;
  return `${r} Min.`;
}

const istKind = () => S.alter === 'mini' || S.alter === 'kind';

/* Heutige Oeffnungszeit aus den OSM-Regeln (Sondertage vor Monatsregeln). */
function oeffnungHeute(datum = new Date()) {
  const monat = datum.getMonth() + 1;
  const tag = datum.getDate();
  const sonder = OEFFNUNG.sondertage[`${String(tag).padStart(2, '0')}.${String(monat).padStart(2, '0')}.`];
  if (sonder) return sonder;
  const md = monat * 100 + tag;
  for (const r of OEFFNUNG.regeln) {
    if (r.monate && r.monate.includes(monat)) return r.zeit;
    if (r.vonTag && md >= r.vonTag[0] * 100 + r.vonTag[1] && md <= r.bisTag[0] * 100 + r.bisTag[1]) return r.zeit;
  }
  return '';
}

/* Inhalte je nach Altersstufe zusammenstellen.
 * mini: nur das Wichtigste, sehr kurz. kind: die einfachen Texte komplett.
 * erwachsen: die ausfuehrlichen Texte. */
function tierInhalt(tier) {
  const k = KINDER_TIERE[tier.id];
  if (!istKind() || !k) {
    return { kurz: tier.kurz, text: tier.text, wusstest: tier.wusstest, quiz: null, steckbrief: tier.steckbrief };
  }
  if (S.alter === 'mini') {
    return {
      kurz: k.kurz,
      text: k.text.slice(0, 2),
      wusstest: k.wusstest.slice(0, 1),
      quiz: k.quiz,
      steckbrief: null,
    };
  }
  return {
    kurz: k.kurz,
    text: k.text,
    wusstest: k.wusstest,
    quiz: k.quiz,
    steckbrief: {
      Groesse: tier.steckbrief.Groesse,
      Gewicht: tier.steckbrief.Gewicht,
      Nahrung: tier.steckbrief.Nahrung,
      Heimat: tier.steckbrief.Heimat,
    },
  };
}

function stationInhalt(station) {
  if (istKind() && KINDER_STATIONEN[station.id]) {
    return { beschreibung: KINDER_STATIONEN[station.id], tipp: S.alter === 'mini' ? '' : station.tipp };
  }
  return { beschreibung: station.beschreibung, tipp: station.tipp };
}

/* Ungefaehre Koordinaten einer Station: entweder vor Ort kalibriert oder
 * aus der Kartenposition abgeleitet. */
function koordinaten(station) {
  const eigen = S.koordinaten[station.id];
  if (eigen) return eigen;
  const lat = PARK_BOUNDS.nord - (station.mapY / GEO.MASS.h) * (PARK_BOUNDS.nord - PARK_BOUNDS.sued);
  const lon = PARK_BOUNDS.west + (station.mapX / GEO.MASS.w) * (PARK_BOUNDS.ost - PARK_BOUNDS.west);
  return { lat, lon, geschaetzt: true };
}

function entfernungMeter(a, b) {
  const R = 6371000;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lon - a.lon) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) * Math.cos((b.lat * Math.PI) / 180) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(s)));
}

/* =========================================================
 * Sprachausgabe
 * ======================================================= */

const Vorleser = {
  laeuft: false,
  pausiert: false,
  stuecke: [],
  index: 0,
  beiEnde: null,

  stimmen() {
    const alle = window.speechSynthesis ? window.speechSynthesis.getVoices() : [];
    return alle.filter((v) => v.lang && v.lang.toLowerCase().startsWith('de'));
  },

  verfuegbar() {
    return 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  },

  /* Lange Texte in Abschnitte zerlegen: manche Browser brechen sonst
   * nach etwa 200 Zeichen ab. */
  zerlegen(text) {
    const saetze = text.replace(/\s+/g, ' ').match(/[^.!?]+[.!?]*/g) || [text];
    const teile = [];
    let puffer = '';
    for (const satz of saetze) {
      if ((puffer + satz).length > 180) {
        if (puffer) teile.push(puffer.trim());
        puffer = satz;
      } else {
        puffer += satz;
      }
    }
    if (puffer.trim()) teile.push(puffer.trim());
    return teile;
  },

  starten(text, beiEnde) {
    if (!this.verfuegbar()) return;
    this.stoppen();
    this.stuecke = this.zerlegen(text);
    this.index = 0;
    this.beiEnde = beiEnde || null;
    this.laeuft = true;
    this.pausiert = false;
    this.naechstes();
    aktualisiereVorleser();
  },

  naechstes() {
    if (this.index >= this.stuecke.length) {
      this.laeuft = false;
      aktualisiereVorleser();
      if (this.beiEnde) this.beiEnde();
      return;
    }
    const u = new SpeechSynthesisUtterance(this.stuecke[this.index]);
    u.lang = 'de-DE';
    u.rate = S.tempo;
    const stimme = this.stimmen().find((v) => v.name === S.stimme);
    if (stimme) u.voice = stimme;
    u.onend = () => {
      if (!this.laeuft) return;
      this.index += 1;
      this.naechstes();
    };
    u.onerror = () => {
      this.laeuft = false;
      aktualisiereVorleser();
    };
    window.speechSynthesis.speak(u);
  },

  pause() {
    if (!this.laeuft) return;
    if (this.pausiert) {
      window.speechSynthesis.resume();
      this.pausiert = false;
    } else {
      window.speechSynthesis.pause();
      this.pausiert = true;
    }
    aktualisiereVorleser();
  },

  stoppen() {
    this.laeuft = false;
    this.pausiert = false;
    this.stuecke = [];
    this.index = 0;
    if (this.verfuegbar()) window.speechSynthesis.cancel();
    aktualisiereVorleser();
  },
};

if (Vorleser.verfuegbar() && window.speechSynthesis.onvoiceschanged !== undefined) {
  window.speechSynthesis.onvoiceschanged = () => {
    const feld = $('#stimmenwahl');
    if (feld) fuelleStimmen(feld);
  };
}

function aktualisiereVorleser() {
  const leiste = $('.vorleser');
  if (!leiste) return;
  const knopf = $('.vorleser__start', leiste);
  const pause = $('.vorleser__pause', leiste);
  const status = $('.vorleser__status', leiste);
  if (Vorleser.laeuft) {
    knopf.textContent = '■';
    knopf.setAttribute('aria-label', 'Vorlesen beenden');
    pause.hidden = false;
    pause.textContent = Vorleser.pausiert ? '▶' : '❚❚';
    const gesamt = Vorleser.stuecke.length || 1;
    status.textContent = Vorleser.pausiert
      ? 'Pause'
      : `Liest vor … (${Math.min(Vorleser.index + 1, gesamt)}/${gesamt})`;
  } else {
    knopf.textContent = '▶';
    knopf.setAttribute('aria-label', 'Vorlesen starten');
    pause.hidden = true;
    status.textContent = istKind() ? 'Vorlesen lassen' : 'Text vorlesen lassen';
  }
}

function vorleserLeiste(textFn) {
  if (!Vorleser.verfuegbar()) {
    return `<div class="hinweis">Dieses Geraet bietet keine Sprachausgabe an. Die Texte lassen sich aber ganz normal lesen.</div>`;
  }
  window.__vorlesetext = textFn;
  return `
    <div class="vorleser">
      <button class="vorleser__rund vorleser__start" data-vorlesen aria-label="Vorlesen starten">▶</button>
      <button class="vorleser__rund vorleser__rund--zweit vorleser__pause" data-pause hidden aria-label="Pause">❚❚</button>
      <div class="vorleser__status">Text vorlesen lassen</div>
      <button class="btn btn--zweit btn--klein" data-tempo>${S.tempo.toFixed(1)}×</button>
    </div>`;
}

/* =========================================================
 * Karte
 * ======================================================= */

/* Anfangsausschnitt je Ansicht. In 3D ist der projizierte Inhalt breiter
 * (X etwa -81..76) und flacher (Y etwa 1..76). */
const blickStart = () => {
  const { w, h } = GEO.MASS;
  if (!S.karte3d) return { x: -3, y: -3, w: w + 6, h: h + 6 };
  /* Projizierte Parkgrenze einrahmen - haengt vom Drehwinkel ab. */
  let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
  for (const [gx, gy] of GEO.GRENZE) {
    const p = proj(gx, gy);
    if (p.X < minX) minX = p.X;
    if (p.X > maxX) maxX = p.X;
    if (p.Y < minY) minY = p.Y;
    if (p.Y > maxY) maxY = p.Y;
  }
  minY -= 10; /* Platz fuer Gebaeudehoehen und Marker-Nadeln */
  return { x: minX - 4, y: minY - 4, w: maxX - minX + 8, h: maxY - minY + 8 };
};

let kartenBlick = blickStart();

/* Projektion Kartenkoordinate -> Zeichenflaeche.
 * 2D: unveraendert. 3D: um 45 Grad gedrehte, abgeflachte Isometrie;
 * h hebt Punkte (Gebaeudehoehen) an. */
function proj(x, y, h = 0) {
  if (!S.karte3d) return { X: x, Y: y };
  /* Drehung um die Parkmitte, dann isometrisch abflachen. Bei 45 Grad
   * entspricht das der klassischen Ansicht X=(x-y), Y=(x+y)/2. */
  const w = (S.karteDrehung * Math.PI) / 180;
  const dx = x - GEO.MASS.w / 2;
  const dy = y - GEO.MASS.h / 2;
  const rx = dx * Math.cos(w) - dy * Math.sin(w);
  const ry = dx * Math.sin(w) + dy * Math.cos(w);
  return { X: rx * 1.414, Y: ry * 0.707 - h };
}

const rund = (n) => Math.round(n * 100) / 100;

/* Stationsnamen erst zeigen, wenn nah genug herangezoomt ist -
 * in der Uebersicht ueberlappen sie sich sonst. */
const labelsSichtbar = () => kartenBlick.w < (S.karte3d ? 150 : 80);

function labelsAktualisieren(svg) {
  if (svg) svg.classList.toggle('zeige-labels', labelsSichtbar());
}

/* =========================================================
 * Navigation: kuerzester Weg ueber das OSM-Wegenetz
 * ======================================================= */

const NAV_EMOJI = {
  haupteingang: '🚪', flamingoteich: '🦩', elefanten: '🐘', orangutans: '🦧',
  tiger: '🐅', loewen: '🦁', afrikapanorama: '🦒', strausse: '🪶',
  eismeer: '🐻‍❄️', seeloewen: '🦭', kamele: '🐫', alpakas: '🦦',
  streichelgehege: '🐐', spielplatz: '🛝', japangarten: '🎏', tropenaquarium: '🦈',
};

let navGraph = null;
let navPosition = null; // letzte bekannte eigene Position in Kartenkoordinaten
let navWatchId = null;

function bauNavGraph() {
  if (navGraph) return navGraph;
  /* Punkte mit gleichen Koordinaten verschmelzen: Kreuzungen liegen dank
   * kreuzungstreuer Vereinfachung exakt uebereinander in mehreren Wegen. */
  const knoten = [];
  const index = new Map(); // "x,y" -> Knotenindex
  const kanten = new Map();
  const knotenFuer = (x, y) => {
    const k = `${x},${y}`;
    if (index.has(k)) return index.get(k);
    knoten.push([x, y]);
    index.set(k, knoten.length - 1);
    return knoten.length - 1;
  };
  const kante = (a, b) => {
    if (a === b) return;
    const w = Math.hypot(knoten[a][0] - knoten[b][0], knoten[a][1] - knoten[b][1]);
    if (!kanten.has(a)) kanten.set(a, []);
    if (!kanten.has(b)) kanten.set(b, []);
    kanten.get(a).push({ j: b, w });
    kanten.get(b).push({ j: a, w });
  };
  const enden = [];
  for (const weg of GEO.WEGE) {
    let vorher = -1;
    weg.forEach(([x, y], i) => {
      const idx = knotenFuer(x, y);
      if (vorher >= 0) kante(vorher, idx);
      if (i === 0 || i === weg.length - 1) enden.push(idx);
      vorher = idx;
    });
  }
  /* Restluecken (z. B. an der Parkgrenze gekappte Wege) ueberbruecken. */
  for (let a = 0; a < enden.length; a++) {
    for (let b = a + 1; b < enden.length; b++) {
      const i = enden[a]; const j = enden[b];
      const d = Math.hypot(knoten[i][0] - knoten[j][0], knoten[i][1] - knoten[j][1]);
      if (d > 0 && d < 3) kante(i, j);
    }
  }
  navGraph = { knoten, kanten };
  return navGraph;
}

function naechsterKnoten(p) {
  const { knoten } = bauNavGraph();
  let best = 0; let bestD = Infinity;
  for (let i = 0; i < knoten.length; i++) {
    const d = Math.hypot(knoten[i][0] - p[0], knoten[i][1] - p[1]);
    if (d < bestD) { bestD = d; best = i; }
  }
  return best;
}

/* Dijkstra vom Start- zum Zielpunkt; Rueckgabe: Punktliste + Laenge in m. */
function navRoute(von, nach) {
  const { knoten, kanten } = bauNavGraph();
  const start = naechsterKnoten(von);
  const ziel = naechsterKnoten(nach);
  const dist = new Map([[start, 0]]);
  const vorgaenger = new Map();
  const offen = new Set([start]);
  while (offen.size) {
    let u = null; let uD = Infinity;
    for (const k of offen) { const d = dist.get(k); if (d < uD) { uD = d; u = k; } }
    offen.delete(u);
    if (u === ziel) break;
    for (const { j, w } of kanten.get(u) || []) {
      const d = uD + w;
      if (d < (dist.get(j) ?? Infinity)) {
        dist.set(j, d);
        vorgaenger.set(j, u);
        offen.add(j);
      }
    }
  }
  if (!dist.has(ziel)) {
    const meter = Math.hypot(von[0] - nach[0], von[1] - nach[1]) * GEO.MASS.meterProEinheit;
    return { punkte: [von, nach], meter: Math.round(meter), luftlinie: true };
  }
  const folge = [ziel];
  while (vorgaenger.has(folge[0])) folge.unshift(vorgaenger.get(folge[0]));
  const punkte = [von, ...folge.map((i) => knoten[i]), nach];
  let laenge = 0;
  for (let i = 1; i < punkte.length; i++) {
    laenge += Math.hypot(punkte[i][0] - punkte[i - 1][0], punkte[i][1] - punkte[i - 1][1]);
  }
  return { punkte, meter: Math.round(laenge * GEO.MASS.meterProEinheit), luftlinie: false };
}

function navStartpunkt() {
  if (navPosition) return navPosition;
  const eingang = stationVon('haupteingang');
  return [eingang.mapX, eingang.mapY];
}

/* GPS-Position laufend verfolgen, solange navigiert wird. */
function navVerfolgung(anAus) {
  if (!anAus) {
    if (navWatchId !== null && navigator.geolocation) navigator.geolocation.clearWatch(navWatchId);
    navWatchId = null;
    return;
  }
  if (navWatchId !== null || !navigator.geolocation) return;
  navWatchId = navigator.geolocation.watchPosition(
    (pos) => {
      const x = ((pos.coords.longitude - PARK_BOUNDS.west) / (PARK_BOUNDS.ost - PARK_BOUNDS.west)) * GEO.MASS.w;
      const y = ((PARK_BOUNDS.nord - pos.coords.latitude) / (PARK_BOUNDS.nord - PARK_BOUNDS.sued)) * GEO.MASS.h;
      if (x < -5 || x > GEO.MASS.w + 5 || y < -5 || y > GEO.MASS.h + 5) return; // ausserhalb des Parks
      navPosition = [x, y];
      const box = $('.kartenbox');
      if (box && S.navZiel) {
        karteNeuZeichnen(box);
        const banner = $('#nav-meter');
        if (banner) {
          const ziel = stationVon(S.navZiel);
          banner.textContent = `noch ca. ${navRoute(navPosition, [ziel.mapX, ziel.mapY]).meter} m`;
        }
      }
    },
    () => { /* kein GPS - Navigation zeigt den Weg ab Haupteingang */ },
    { enableHighAccuracy: true, maximumAge: 4000, timeout: 15000 }
  );
}

function pfadAus(punkte, h = 0, schliessen = true) {
  const d = punkte
    .map(([x, y], i) => {
      const p = proj(x, y, h);
      return `${i ? 'L' : 'M'}${rund(p.X)} ${rund(p.Y)}`;
    })
    .join(' ');
  return schliessen ? d + ' Z' : d;
}

function tiefe(punkte) {
  let s = 0;
  for (const [x, y] of punkte) s += proj(x, y).Y;
  return s / punkte.length;
}

function gebaeudeSvg(g) {
  if (!S.karte3d) {
    return `<path d="${pfadAus(g.punkte)}" fill="${g.farbe}" opacity="0.9" stroke="${g.dach}" stroke-width="0.4"/>`;
  }
  /* Erst alle Seitenwaende, dann die Dachflaeche - einfache Maler-Reihenfolge. */
  const waende = g.punkte
    .map((a, i) => {
      const b = g.punkte[(i + 1) % g.punkte.length];
      const p1 = proj(a[0], a[1]);
      const p2 = proj(b[0], b[1]);
      const p3 = proj(b[0], b[1], g.hoehe);
      const p4 = proj(a[0], a[1], g.hoehe);
      return `<path d="M${rund(p1.X)} ${rund(p1.Y)} L${rund(p2.X)} ${rund(p2.Y)} L${rund(p3.X)} ${rund(p3.Y)} L${rund(p4.X)} ${rund(p4.Y)} Z" fill="${g.farbe}" stroke="${g.dach}" stroke-width="0.15"/>`;
    })
    .join('');
  return `<g>${waende}<path d="${pfadAus(g.punkte, g.hoehe)}" fill="${g.dach}"/></g>`;
}

function baumSvg([x, y, s]) {
  const fuss = proj(x, y);
  if (!S.karte3d) {
    return `<circle cx="${rund(fuss.X)}" cy="${rund(fuss.Y)}" r="${s * 0.8}" fill="#7fa06a" opacity="0.55"/>`;
  }
  const krone = proj(x, y, 2.2 + s);
  return `<g>
    <line x1="${rund(fuss.X)}" y1="${rund(fuss.Y)}" x2="${rund(krone.X)}" y2="${rund(krone.Y)}" stroke="#7a5a3a" stroke-width="0.5"/>
    <circle cx="${rund(krone.X)}" cy="${rund(krone.Y)}" r="${s * 1.15}" fill="#6b955a"/>
    <circle cx="${rund(krone.X - s * 0.35)}" cy="${rund(krone.Y - s * 0.35)}" r="${s * 0.55}" fill="#7fa96c"/>
  </g>`;
}

let kartenKontext = {};

/* Karte innerhalb der Box neu zeichnen (gleicher Kontext, gleicher Ausschnitt).
 * Wird von der Drehgeste pro Animation-Frame aufgerufen. */
function karteNeuZeichnen(box) {
  const kompass = box.querySelector('.kompass');
  if (kompass) kompass.remove();
  const svg = box.querySelector('svg');
  if (!svg) return;
  svg.insertAdjacentHTML('beforebegin', kartenSvg(kartenKontext));
  svg.remove();
}

function kartenSvg({ tour = null, aktiveStation = null, position = null } = {}) {
  kartenKontext = { tour, aktiveStation, position };
  const stationen = tour ? tour.stationen.map((s) => stationVon(s.id)) : STATIONEN;
  const d3 = S.karte3d;

  const gehege = GEO.GEHEGE
    .map((g) => `<path d="${pfadAus(g.punkte)}" fill="${BEREICHE[g.bereich].farbe}" opacity="0.14" stroke="${BEREICHE[g.bereich].farbe}" stroke-width="0.3" stroke-opacity="0.35"/>`)
    .join('');

  const wasser = GEO.WASSER
    .map((w) => `<path d="${pfadAus(w.punkte)}" fill="#a9cbe3" stroke="#8db6d4" stroke-width="0.3"/>`)
    .join('');

  const wege = GEO.WEGE
    .map((w) => `<path d="${pfadAus(w, 0, false)}" fill="none" stroke="#d8cfb9" stroke-width="${d3 ? 1.6 : 1.8}" stroke-linecap="round" stroke-linejoin="round"/>`)
    .join('');

  const routePfad = tour
    ? pfadAus(tour.stationen.map((s) => {
        const st = stationVon(s.id);
        return [st.mapX, st.mapY];
      }), 0, false)
    : '';

  /* Gebaeude und Baeume von hinten nach vorn zeichnen (Tiefe = x+y). */
  const objekte = [
    ...GEO.GEBAEUDE.map((g) => ({ t: tiefe(g.punkte), html: gebaeudeSvg(g) })),
    ...GEO.BAEUME.map((b) => ({ t: proj(b[0], b[1]).Y, html: baumSvg(b) })),
  ]
    .sort((a, b) => a.t - b.t)
    .map((o) => o.html)
    .join('');

  const labels = !d3
    ? GEO.FLAECHEN_LABELS
        .map((l) => `<text class="flaechen-label" x="${l.x}" y="${l.y}">${esc(l.text)}</text>`)
        .join('')
    : '';

  const marker = stationen
    .map((st, i) => {
      const farbe = BEREICHE[st.bereich]?.farbe || '#666';
      const aktiv = aktiveStation === st.id;
      const r = aktiv ? (d3 ? 3.8 : 3.4) : (d3 ? 2.7 : 2.4);
      const beschriftung = tour ? String(i + 1) : '';
      const fuss = proj(st.mapX, st.mapY);
      const kopf = d3 ? { X: fuss.X, Y: fuss.Y - 5.5 } : fuss;
      const nadel = d3
        ? `<line x1="${rund(fuss.X)}" y1="${rund(fuss.Y)}" x2="${rund(kopf.X)}" y2="${rund(kopf.Y)}" stroke="${farbe}" stroke-width="0.8"/>
           <ellipse cx="${rund(fuss.X)}" cy="${rund(fuss.Y)}" rx="1.6" ry="0.8" fill="rgba(0,0,0,0.25)"/>`
        : '';
      return `
        <g class="marker ${aktiv ? 'marker--aktiv' : ''}" data-station="${st.id}" data-t="${rund(st.mapX + st.mapY)}">
          ${nadel}
          ${aktiv ? `<circle cx="${rund(kopf.X)}" cy="${rund(kopf.Y)}" r="${r + 2}" fill="${farbe}" opacity="0.25"/>` : ''}
          <!-- unsichtbare, grosszuegige Tippflaeche fuer Finger -->
          <circle cx="${rund(kopf.X)}" cy="${rund(kopf.Y)}" r="6" fill="transparent"/>
          <circle class="marker-kreis" cx="${rund(kopf.X)}" cy="${rund(kopf.Y)}" r="${r}" fill="${farbe}" stroke="#fff" stroke-width="0.7"/>
          ${beschriftung ? `<text class="marker-text" x="${rund(kopf.X)}" y="${rund(kopf.Y + 1)}">${beschriftung}</text>` : ''}
          <text class="marker-label" x="${rund(kopf.X)}" y="${rund(kopf.Y + r + 3)}">${esc(st.name)}</text>
        </g>`;
    })
    .join('');

  /* Aktive Pfeil-Navigation einzeichnen */
  let nav = '';
  if (S.navZiel) {
    const zielSt = stationVon(S.navZiel);
    if (zielSt) {
      const route = navRoute(navStartpunkt(), [zielSt.mapX, zielSt.mapY]);
      const pfad = pfadAus(route.punkte, 0, false);
      /* Pfeile alle ~7 Einheiten entlang der Route, in Laufrichtung gedreht */
      const pfeile = [];
      let rest = 5;
      for (let i = 1; i < route.punkte.length; i++) {
        const [ax, ay] = route.punkte[i - 1];
        const [bx, by] = route.punkte[i];
        const l = Math.hypot(bx - ax, by - ay);
        let t = rest;
        while (t < l) {
          const px = ax + ((bx - ax) * t) / l;
          const py = ay + ((by - ay) * t) / l;
          const p1 = proj(ax, ay);
          const p2 = proj(bx, by);
          const winkel = (Math.atan2(p2.Y - p1.Y, p2.X - p1.X) * 180) / Math.PI;
          const pp = proj(px, py);
          pfeile.push(`<path class="nav-pfeil" d="M-1.4 -1.1 L1.4 0 L-1.4 1.1 Z" transform="translate(${rund(pp.X)} ${rund(pp.Y)}) rotate(${rund(winkel)})"/>`);
          t += 7;
        }
        rest = t - l;
      }
      const zielP = proj(zielSt.mapX, zielSt.mapY);
      const startP = proj(...route.punkte[0]);
      nav = `
        <path class="nav-linie" d="${pfad}"/>
        ${pfeile.join('')}
        <circle cx="${rund(startP.X)}" cy="${rund(startP.Y)}" r="2" fill="#2f6f9f" stroke="#fff" stroke-width="0.6"/>
        <text class="nav-ziel" x="${rund(zielP.X)}" y="${rund(zielP.Y - (d3 ? 9 : 4))}">${NAV_EMOJI[S.navZiel] || '📍'}</text>`;
    }
  }

  const ichP = position ? proj(position.x, position.y) : null;
  const ich = ichP
    ? `<g><circle class="ich-punkt" cx="${rund(ichP.X)}" cy="${rund(ichP.Y)}" r="2.4"/><circle cx="${rund(ichP.X)}" cy="${rund(ichP.Y)}" r="5" fill="#2f6f9f" opacity="0.2"/></g>`
    : '';

  /* Nordpfeil: Bildschirmrichtung des Vektors (0,-1) in Kartenkoordinaten */
  const nord = d3
    ? (() => {
        const wRad = (S.karteDrehung * Math.PI) / 180;
        const winkel = (Math.atan2(-Math.cos(wRad) * 0.707, Math.sin(wRad) * 1.414) * 180) / Math.PI + 90;
        return `<div class="kompass" style="transform:rotate(${Math.round(winkel)}deg)" aria-label="Norden">⬆<span>N</span></div>`;
      })()
    : '';

  return `${nord}
  <svg viewBox="${kartenBlick.x} ${kartenBlick.y} ${kartenBlick.w} ${kartenBlick.h}" role="img"
       class="${d3 ? 'svg3d' : ''} ${labelsSichtbar() ? 'zeige-labels' : ''}"
       aria-label="Schematische ${d3 ? '3D-' : ''}Uebersichtskarte des Tierparks">
    <rect x="-160" y="-60" width="420" height="280" fill="${d3 ? '#dde7db' : '#e9efe4'}"/>
    <path d="${pfadAus(GEO.GRENZE)}" fill="#d3e0c8" stroke="#b9c9ab" stroke-width="0.6"/>
    ${gehege}
    ${wasser}
    ${wege}
    ${routePfad ? `<path class="route-linie" d="${routePfad}"/>` : ''}
    ${labels}
    ${objekte}
    ${marker}
    ${nav}
    ${ich}
  </svg>`;
}

function kartenWerkzeug(mitZoom = true) {
  return `
  <div class="karten-werkzeug">
    ${mitZoom ? `
      <button class="btn btn--zweit btn--klein" data-zoom="rein" aria-label="Karte vergroessern">+</button>
      <button class="btn btn--zweit btn--klein" data-zoom="raus" aria-label="Karte verkleinern">−</button>
      <button class="btn btn--zweit btn--klein" data-zoom="reset">Ansicht zuruecksetzen</button>` : ''}
    <button class="btn btn--zweit btn--klein" data-dim>${S.karte3d ? '🗺 2D-Ansicht' : '⛰ 3D-Ansicht'}</button>
    ${S.karte3d ? `
      <button class="btn btn--zweit btn--klein" data-drehen="-45" aria-label="Karte nach links drehen">⟲</button>
      <button class="btn btn--zweit btn--klein" data-drehen="45" aria-label="Karte nach rechts drehen">⟳</button>` : ''}
    <button class="btn btn--zweit btn--klein" data-ortung>📍 Wo bin ich?</button>
    <span class="osm-hinweis">${GEO.ATTRIBUTION}</span>
  </div>`;
}

/* Karteninteraktion: Ziehen und Zoomen ueber das viewBox-Fenster. */
function kartenInteraktion(box) {
  if (!$('svg', box)) return;
  const svgEl = () => $('svg', box);

  const ZOOM_MIN = 15; // kleinste viewBox-Breite = maximale Vergroesserung
  const ZOOM_MAX = 240;

  /* Aktive Finger/Zeiger. Ein Finger = verschieben (Maus) bzw. Seite
   * scrollen (Touch), zwei Finger = Pinch-Zoom und in 3D auch Drehen.
   * Alle Listener haengen an der Box, nicht am SVG - das SVG wird
   * waehrend der Drehgeste pro Frame ersetzt. */
  const zeiger = new Map();
  let geste = null;
  let bewegt = false;
  let zeichnenGeplant = false;

  const anwenden = () => {
    const svg = svgEl();
    if (!svg) return;
    svg.setAttribute('viewBox', `${kartenBlick.x} ${kartenBlick.y} ${kartenBlick.w} ${kartenBlick.h}`);
    labelsAktualisieren(svg);
  };

  const punkte = () => [...zeiger.values()];
  const mitte = (p) => ({ x: (p[0].x + (p[1] || p[0]).x) / 2, y: (p[0].y + (p[1] || p[0]).y) / 2 });
  const spann = (p) => (p.length > 1 ? Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y) : 0);
  const winkel = (p) => (p.length > 1 ? (Math.atan2(p[1].y - p[0].y, p[1].x - p[0].x) * 180) / Math.PI : 0);

  /* Bildschirmpunkt -> Kartenkoordinate bei gegebener Ausgangslage */
  const kartenPunkt = (px, py, blick, rect) => ({
    x: blick.x + ((px - rect.left) / rect.width) * blick.w,
    y: blick.y + ((py - rect.top) / rect.height) * blick.h,
  });

  const gesteNeu = () => {
    const p = punkte();
    geste = p.length
      ? {
          blick: { ...kartenBlick },
          mitte: mitte(p),
          spann: spann(p),
          winkel: winkel(p),
          drehStart: S.karteDrehung,
          dreht: false,
          rect: svgEl().getBoundingClientRect(),
        }
      : null;
  };

  /* Hinweis "mit zwei Fingern", wenn jemand mit einem Finger schieben will. */
  const tipp = document.createElement('div');
  tipp.className = 'karten-tipp';
  tipp.textContent = S.karte3d ? 'Zwei Finger: bewegen, zoomen und drehen' : 'Karte mit zwei Fingern bewegen und zoomen';
  box.appendChild(tipp);
  let tippTimer = null;
  const zeigeTipp = () => {
    tipp.classList.add('sichtbar');
    clearTimeout(tippTimer);
    tippTimer = setTimeout(() => tipp.classList.remove('sichtbar'), 1400);
  };

  /* iOS Safari zoomt sonst die ganze Seite mit, waehrend die Karte zoomt -
   * das wirkt hakelig und "doppelt". Zwei-Finger-Gesten auf der Karte
   * gehoeren allein der Karte. */
  box.addEventListener('touchmove', (e) => {
    if (e.touches.length > 1 && e.target.closest('svg')) e.preventDefault();
  }, { passive: false });
  for (const typ of ['gesturestart', 'gesturechange']) {
    box.addEventListener(typ, (e) => {
      if (e.target.closest && e.target.closest('svg')) e.preventDefault();
    });
  }

  box.addEventListener('pointerdown', (e) => {
    if (!e.target.closest('svg')) return; // Werkzeugknoepfe sind keine Kartengeste
    zeiger.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (zeiger.size === 1) bewegt = false;
    gesteNeu();
  });

  box.addEventListener('pointermove', (e) => {
    if (!zeiger.has(e.pointerId) || !geste) return;
    zeiger.set(e.pointerId, { x: e.clientX, y: e.clientY });
    const p = punkte();
    const m = mitte(p);

    /* Ein Finger auf dem Touchscreen scrollt die Seite, nicht die Karte -
     * sonst kommt man an der Karte beim Scrollen nicht vorbei. */
    if (e.pointerType === 'touch' && zeiger.size === 1) {
      if (Math.hypot(m.x - geste.mitte.x, m.y - geste.mitte.y) > 25) zeigeTipp();
      return;
    }
    if (zeiger.size > 1) tipp.classList.remove('sichtbar');

    if (!bewegt && (zeiger.size > 1 || Math.hypot(m.x - geste.mitte.x, m.y - geste.mitte.y) > 6)) {
      bewegt = true;
      /* Capture erst ab hier - beim pointerdown wuerde sie das Klick-Ziel
       * umleiten und Marker-Tipps schlucken. */
      try { p.length && zeiger.forEach((_, id) => box.setPointerCapture(id)); } catch { /* synthetische Events */ }
    }
    if (!bewegt) return;

    if (p.length >= 2 && geste.spann > 0) {
      /* Pinch: Faktor aus dem Fingerabstand, gedaempft (Exponent < 1),
       * damit der Zoom ruhig folgt statt zu springen. Fixpunkt ist die
       * Mitte der Finger. */
      const faktor = Math.pow(geste.spann / (spann(p) || geste.spann), 0.75);
      const w = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, geste.blick.w * faktor));
      const fix = kartenPunkt(geste.mitte.x, geste.mitte.y, geste.blick, geste.rect);
      kartenBlick.w = w;
      kartenBlick.h = w * (geste.blick.h / geste.blick.w);
      kartenBlick.x = fix.x - ((m.x - geste.rect.left) / geste.rect.width) * w;
      kartenBlick.y = fix.y - ((m.y - geste.rect.top) / geste.rect.height) * kartenBlick.h;

      /* Twist: In 3D dreht der Winkel zwischen den Fingern die Karte.
       * Erst ab ~10 Grad, damit reines Zoomen nicht wackelt. */
      if (S.karte3d) {
        let delta = winkel(p) - geste.winkel;
        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;
        if (!geste.dreht && Math.abs(delta) > 10) geste.dreht = true;
        if (geste.dreht) {
          S.karteDrehung = (((geste.drehStart + delta) % 360) + 360) % 360;
          if (!zeichnenGeplant) {
            zeichnenGeplant = true;
            requestAnimationFrame(() => {
              zeichnenGeplant = false;
              karteNeuZeichnen(box);
            });
          }
          return; // viewBox setzt das Neuzeichnen selbst
        }
      }
    } else {
      const einheit = geste.blick.w / (geste.rect.width || 1);
      kartenBlick.x = geste.blick.x - (m.x - geste.mitte.x) * einheit;
      kartenBlick.y = geste.blick.y - (m.y - geste.mitte.y) * einheit;
    }
    anwenden();
  });

  const ende = (e) => {
    if (zeiger.has(e.pointerId) && geste && geste.dreht) {
      /* Drehwinkel dauerhaft speichern (S wurde waehrend der Geste nur
       * im Speicher veraendert). */
      setze({ karteDrehung: Math.round(S.karteDrehung) });
    }
    zeiger.delete(e.pointerId);
    /* Beim Uebergang zwei Finger -> ein Finger neu verankern, sonst springt die Karte. */
    gesteNeu();
  };
  box.addEventListener('pointerup', ende);
  box.addEventListener('pointercancel', ende);

  /* Mausrad am Desktop: zoomt auf die Position des Zeigers. */
  box.addEventListener('wheel', (e) => {
    if (!e.target.closest('svg')) return;
    e.preventDefault();
    const rect = svgEl().getBoundingClientRect();
    const faktor = e.deltaY > 0 ? 1.15 : 1 / 1.15;
    const w = Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, kartenBlick.w * faktor));
    const h = w * (kartenBlick.h / kartenBlick.w);
    const fix = kartenPunkt(e.clientX, e.clientY, kartenBlick, rect);
    kartenBlick.x = fix.x - ((e.clientX - rect.left) / rect.width) * w;
    kartenBlick.y = fix.y - ((e.clientY - rect.top) / rect.height) * h;
    kartenBlick.w = w;
    kartenBlick.h = h;
    anwenden();
  }, { passive: false });

  box.addEventListener('click', (e) => {
    if (bewegt) return; // war Ziehen, Pinchen oder Drehen, kein Antippen
    const gruppe = e.target.closest('[data-station]');
    if (gruppe) zeigeStationsBlatt(gruppe.dataset.station);
  });
}

function zoomen(richtung) {
  const mitte = { x: kartenBlick.x + kartenBlick.w / 2, y: kartenBlick.y + kartenBlick.h / 2 };
  if (richtung === 'reset') {
    kartenBlick = blickStart();
  } else {
    const f = richtung === 'rein' ? 0.7 : 1 / 0.7;
    const neu = Math.min(240, Math.max(15, kartenBlick.w * f));
    const h = neu * (kartenBlick.h / kartenBlick.w);
    kartenBlick = { w: neu, h, x: mitte.x - neu / 2, y: mitte.y - h / 2 };
  }
  const svg = $('.kartenbox svg');
  if (svg) {
    svg.setAttribute('viewBox', `${kartenBlick.x} ${kartenBlick.y} ${kartenBlick.w} ${kartenBlick.h}`);
    labelsAktualisieren(svg);
  }
}

function orten(beiErfolg) {
  if (!navigator.geolocation) {
    alert('Dieses Geraet gibt den Standort nicht frei.');
    return;
  }
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const mir = { lat: pos.coords.latitude, lon: pos.coords.longitude };
      const sortiert = STATIONEN
        .map((st) => ({ st, m: entfernungMeter(mir, koordinaten(st)) }))
        .sort((a, b) => a.m - b.m);
      beiErfolg(mir, sortiert[0]);
    },
    () => alert('Standort konnte nicht ermittelt werden. Im Freien und mit erlaubter Ortung klappt es meist besser.'),
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
  );
}

/* =========================================================
 * Ansichten
 * ======================================================= */

function seiteTouren() {
  const laufend = S.aktiveTour ? tourVon(S.aktiveTour) : null;
  const besucht = laufend ? (S.besucht[laufend.id] || []).length : 0;

  const empfehlung = S.alter === 'mini'
    ? ['familie', 'kurz', 'eismeer']
    : S.alter === 'kind'
      ? ['familie', 'raubtiere', 'eismeer']
      : [];

  const sortiert = empfehlung.length
    ? [...TOUREN].sort((a, b) => {
        const ia = empfehlung.indexOf(a.id); const ib = empfehlung.indexOf(b.id);
        return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
      })
    : TOUREN;

  return `
    <h1>Welche Runde soll es sein?</h1>
    ${oeffnungHeute() ? `<p class="schwach">🕘 Heute geoeffnet: <strong>${oeffnungHeute()}</strong> <span style="opacity:.7">(${esc(OEFFNUNG.quelle)})</span></p>` : ''}
    <p class="schwach">${istKind()
      ? 'Such dir eine Tour aus. Die App sagt dir, wo es langgeht.'
      : 'Jede Tour ist ein fertiger Rundweg mit eigenem Schwerpunkt. Du kannst jederzeit wechseln.'}</p>

    ${laufend ? `
      <div class="karte" style="border-left:4px solid var(--akzent)">
        <div class="zeile-zwischen">
          <div>
            <div class="schwach">Angefangene Tour</div>
            <strong>${esc(laufend.titel)}</strong>
            <div class="schwach">${besucht} von ${laufend.stationen.length} Stationen</div>
          </div>
          <a class="btn btn--klein" href="#/tour/${laufend.id}">Weiter</a>
        </div>
      </div>` : ''}

    ${empfehlung.length ? `<div class="hinweis">Passend zur eingestellten Altersstufe stehen kindgerechte Touren oben.</div>` : ''}

    ${sortiert.map((t) => {
      const extra = t.stationen.some((s) => stationVon(s.id)?.extraTicket);
      return `
      <button class="tour-karte" data-route="#/tour/${t.id}">
        <div class="tour-karte__kopf">
          <span class="tour-karte__emoji" aria-hidden="true">${t.emoji}</span>
          <span class="tour-karte__titel">${esc(t.titel)}</span>
        </div>
        <div class="schwach">${esc(t.beschreibung)}</div>
        <div class="tour-karte__meta">
          <span class="chip">⏱ ${minutenText(t.minuten)}</span>
          <span class="chip">📍 ${t.stationen.length} Stationen</span>
          <span class="chip">🚶 ${esc(t.laenge)}</span>
          ${extra ? '<span class="chip chip--warn">Extra-Ticket</span>' : ''}
        </div>
      </button>`;
    }).join('')}

    <div class="hinweis"><strong>Stand ${META.stand}.</strong> ${esc(META.quelleHinweis)}</div>
  `;
}

function seiteTour(id) {
  const tour = tourVon(id);
  if (!tour) return `<div class="leer">Diese Tour gibt es nicht mehr.</div>`;
  const besucht = S.besucht[tour.id] || [];
  const aktiv = S.aktiveTour === tour.id;
  const extra = tour.stationen.some((s) => stationVon(s.id)?.extraTicket);

  return `
    <h1>${tour.emoji} ${esc(tour.titel)}</h1>
    <div class="tour-karte__meta" style="margin-bottom:12px">
      <span class="chip">⏱ ${minutenText(tour.minuten)}</span>
      <span class="chip">📍 ${tour.stationen.length} Stationen</span>
      <span class="chip">🚶 ${esc(tour.laenge)}</span>
      ${extra ? '<span class="chip chip--warn">Extra-Ticket noetig</span>' : ''}
    </div>
    <p>${esc(tour.beschreibung)}</p>
    ${tour.hinweis ? `<div class="hinweis">${esc(tour.hinweis)}</div>` : ''}
    ${!istKind() ? `<p class="schwach"><strong>Gut geeignet fuer:</strong> ${esc(tour.fuer)}</p>` : ''}

    <div class="kartenbox">
      ${kartenSvg({ tour })}
      ${kartenWerkzeug()}
    </div>
    <p class="schwach">Die Karte ist eine schematische Uebersicht zur Orientierung, kein massstabsgetreuer Lageplan.</p>

    <div class="knopfreihe" style="margin:14px 0">
      <a class="btn" href="#/tour/${tour.id}/station/0">${aktiv && besucht.length ? 'Tour fortsetzen' : 'Tour starten'}</a>
      ${besucht.length ? `<button class="btn btn--zweit" data-tour-reset="${tour.id}">Zuruecksetzen</button>` : ''}
    </div>

    <h2>Stationen</h2>
    <div class="tier-liste">
      ${tour.stationen.map((eintrag, i) => {
        const st = stationVon(eintrag.id);
        const fertig = besucht.includes(st.id);
        return `
          <button class="tier-zeile ${fertig ? 'erledigt' : ''}" data-route="#/tour/${tour.id}/station/${i}">
            <span class="station-nr" style="width:30px;height:30px;font-size:0.9rem">${fertig ? '✓' : i + 1}</span>
            <span>
              <span class="tier-zeile__name">${esc(st.name)}</span>
              <span class="schwach" style="display:block">${esc(eintrag.fokus || BEREICHE[st.bereich].name)} · ca. ${st.dauer} Min.</span>
            </span>
            <span class="tier-zeile__pfeil">›</span>
          </button>`;
      }).join('')}
    </div>
  `;
}

function seiteStation(tourId, index) {
  const tour = tourVon(tourId);
  if (!tour) return `<div class="leer">Tour nicht gefunden.</div>`;
  const i = Math.max(0, Math.min(tour.stationen.length - 1, Number(index) || 0));
  const eintrag = tour.stationen[i];
  const st = stationVon(eintrag.id);
  const inhalt = stationInhalt(st);
  const besucht = S.besucht[tour.id] || [];
  const fertig = besucht.includes(st.id);
  const anteil = Math.round(((i + 1) / tour.stationen.length) * 100);

  const tiere = (st.tiere || []).map(tierVon).filter(Boolean);

  const vorleseText = [
    `Station ${i + 1} von ${tour.stationen.length}: ${st.name}.`,
    inhalt.beschreibung,
    eintrag.fokus ? `Achte besonders auf: ${eintrag.fokus}.` : '',
    inhalt.tipp ? `Tipp: ${inhalt.tipp}` : '',
    tiere.length ? `Hier siehst du: ${tiere.map((t) => t.name).join(', ')}.` : '',
  ].filter(Boolean).join(' ');

  return `
    <div class="schwach">Station ${i + 1} von ${tour.stationen.length} · ${esc(tour.titel)}</div>
    <div class="fortschritt"><div class="fortschritt__balken" style="width:${anteil}%"></div></div>

    <div class="station-kopf">
      <span class="station-nr">${i + 1}</span>
      <div>
        <h1 style="margin-bottom:2px">${esc(st.name)}</h1>
        <span class="chip" style="background:${BEREICHE[st.bereich].farbe}22;color:${BEREICHE[st.bereich].farbe}">${esc(BEREICHE[st.bereich].name)}</span>
        ${st.extraTicket ? '<span class="chip chip--warn">Extra-Ticket</span>' : ''}
        ${st.innen ? '<span class="chip">🏠 ueberdacht</span>' : ''}
      </div>
    </div>

    <div class="karte">
      <p>${esc(inhalt.beschreibung)}</p>
      ${eintrag.fokus ? `<p><strong>Darauf achten:</strong> ${esc(eintrag.fokus)}</p>` : ''}
      ${inhalt.tipp ? `<div class="hinweis"><strong>Tipp:</strong> ${esc(inhalt.tipp)}</div>` : ''}
    </div>

    ${vorleserLeiste(() => vorleseText)}

    ${tiere.length ? `
      <h2 style="margin-top:18px">${istKind() ? 'Diese Tiere siehst du hier' : 'Tiere an dieser Station'}</h2>
      <div class="tier-liste">
        ${tiere.map((t) => `
          <button class="tier-zeile" data-route="#/tier/${t.id}">
            <span class="tier-zeile__punkt" style="background:${BEREICHE[t.bereich].farbe}"></span>
            <span>
              <span class="tier-zeile__name">${esc(t.name)}</span>
              <span class="schwach" style="display:block">${esc(tierInhalt(t).kurz)}</span>
            </span>
            <span class="tier-zeile__pfeil">›</span>
          </button>`).join('')}
      </div>` : ''}

    <div class="kartenbox" style="margin-top:16px">
      ${kartenSvg({ tour, aktiveStation: st.id })}
      ${kartenWerkzeug()}
    </div>

    <div class="knopfreihe" style="margin-top:16px">
      ${i > 0 ? `<a class="btn btn--zweit" href="#/tour/${tour.id}/station/${i - 1}">‹ Zurueck</a>` : '<span></span>'}
      <button class="btn ${fertig ? 'btn--zweit' : ''}" data-besucht="${tour.id}|${st.id}">${fertig ? '✓ Gesehen' : 'Gesehen'}</button>
    </div>
    <div style="margin-top:10px">
      ${i < tour.stationen.length - 1
        ? `<a class="btn btn--breit" href="#/tour/${tour.id}/station/${i + 1}">Weiter zu ${esc(stationVon(tour.stationen[i + 1].id).name)} ›</a>`
        : `<a class="btn btn--breit" href="#/tour/${tour.id}/ende">Tour abschliessen 🎉</a>`}
    </div>
  `;
}

function seiteTourEnde(tourId) {
  const tour = tourVon(tourId);
  if (!tour) return `<div class="leer">Tour nicht gefunden.</div>`;
  const besucht = S.besucht[tour.id] || [];
  const gesamtTiere = new Set();
  tour.stationen.forEach((e) => (stationVon(e.id).tiere || []).forEach((t) => gesamtTiere.add(t)));

  return `
    <div style="text-align:center;padding:20px 0">
      <div style="font-size:3rem">🎉</div>
      <h1>Geschafft!</h1>
      <p>${istKind()
        ? `Du hast die Runde "${esc(tour.titel)}" gemeistert.`
        : `Du hast die Tour "${esc(tour.titel)}" abgeschlossen.`}</p>
    </div>
    <div class="karte">
      <div class="steckbrief">
        <div><span>Stationen abgehakt</span><span>${besucht.length} von ${tour.stationen.length}</span></div>
        <div><span>Tierarten unterwegs</span><span>${gesamtTiere.size}</span></div>
        <div><span>Geplante Dauer</span><span>${minutenText(tour.minuten)}</span></div>
      </div>
    </div>
    <div class="knopfreihe">
      <a class="btn btn--zweit" href="#/touren">Andere Tour</a>
      <button class="btn" data-tour-reset="${tour.id}">Nochmal laufen</button>
    </div>
  `;
}

function seiteTiere(suchtext = '', filter = 'alle') {
  const treffer = TIERE.filter((t) => {
    const passtFilter = filter === 'alle' || t.bereich === filter;
    const s = suchtext.trim().toLowerCase();
    const passtSuche = !s || t.name.toLowerCase().includes(s) || t.lateinisch.toLowerCase().includes(s);
    return passtFilter && passtSuche;
  }).sort((a, b) => a.name.localeCompare(b.name, 'de'));

  const bereiche = [...new Set(TIERE.map((t) => t.bereich))];

  return `
    <h1>${istKind() ? 'Alle Tiere' : 'Tierlexikon'}</h1>
    <input class="suche" type="text" id="tiersuche" placeholder="Tier suchen …" value="${esc(suchtext)}" autocomplete="off">
    <div class="filterzeile">
      <button class="filter-chip" data-filter="alle" aria-pressed="${filter === 'alle'}">Alle</button>
      ${bereiche.map((b) => `<button class="filter-chip" data-filter="${b}" aria-pressed="${filter === b}">${esc(BEREICHE[b].name)}</button>`).join('')}
    </div>
    ${treffer.length ? `
      <div class="tier-liste">
        ${treffer.map((t) => `
          <button class="tier-zeile" data-route="#/tier/${t.id}">
            <span class="tier-zeile__punkt" style="background:${BEREICHE[t.bereich].farbe}"></span>
            <span>
              <span class="tier-zeile__name">${esc(t.name)}${S.quizGeloest[t.id] ? ' ⭐' : ''}</span>
              <span class="schwach" style="display:block">${esc(tierInhalt(t).kurz)}</span>
            </span>
            <span class="tier-zeile__pfeil">›</span>
          </button>`).join('')}
      </div>` : '<div class="leer">Kein Tier gefunden.</div>'}
  `;
}

function seiteTier(id) {
  const tier = tierVon(id);
  if (!tier) return `<div class="leer">Dieses Tier ist nicht im Lexikon.</div>`;
  const inhalt = tierInhalt(tier);
  const station = stationVon(tier.station);

  const vorleseText = [
    tier.name + '.',
    inhalt.kurz,
    ...inhalt.text,
    inhalt.wusstest.length ? (istKind() ? 'Wusstest du schon?' : 'Zum Weitererzaehlen:') : '',
    ...inhalt.wusstest,
  ].filter(Boolean).join(' ');

  return `
    <h1>${esc(tier.name)}</h1>
    ${!istKind() ? `<p class="schwach"><em>${esc(tier.lateinisch)}</em></p>` : ''}
    <p><strong>${esc(inhalt.kurz)}</strong></p>

    ${vorleserLeiste(() => vorleseText)}

    <div class="karte" style="margin-top:14px">
      ${inhalt.text.map((p) => `<p>${esc(p)}</p>`).join('')}
    </div>

    ${inhalt.steckbrief ? `
      <h2>Steckbrief</h2>
      <div class="karte">
        <div class="steckbrief">
          ${Object.entries(inhalt.steckbrief).map(([k, v]) => `<div><span>${esc(k)}</span><span>${esc(v)}</span></div>`).join('')}
        </div>
      </div>` : ''}

    ${inhalt.wusstest.length ? `
      <h2>${istKind() ? 'Wusstest du schon?' : 'Zum Weitererzaehlen'}</h2>
      <div class="karte"><ul class="wusstest">${inhalt.wusstest.map((w) => `<li>${esc(w)}</li>`).join('')}</ul></div>` : ''}

    ${inhalt.quiz ? quizBlock(tier.id, inhalt.quiz) : ''}

    ${!istKind() && tier.beobachten ? `<div class="hinweis"><strong>Vor Ort:</strong> ${esc(tier.beobachten)}</div>` : ''}

    ${station ? `
      <div class="karte">
        <div class="zeile-zwischen">
          <div><div class="schwach">Zu finden bei</div><strong>${esc(station.name)}</strong></div>
          <button class="btn btn--klein btn--zweit" data-route="#/karte?station=${station.id}">Auf der Karte</button>
        </div>
      </div>` : ''}
  `;
}

function quizBlock(tierId, quiz) {
  const geloest = S.quizGeloest[tierId];
  return `
    <h2>Quizfrage</h2>
    <div class="karte" data-quiz="${tierId}">
      <p><strong>${esc(quiz.frage)}</strong></p>
      <div class="tier-liste">
        ${quiz.antworten.map((a, i) => `
          <button class="tier-zeile" data-antwort="${i}" data-richtig="${quiz.richtig}">
            <span class="tier-zeile__name">${esc(a)}</span>
          </button>`).join('')}
      </div>
      <div class="quiz-ergebnis" hidden></div>
      <p class="schwach quiz-erklaerung" hidden>${esc(quiz.erklaerung)}</p>
      ${geloest ? '<p class="schwach">⭐ Diese Frage hast du schon richtig beantwortet.</p>' : ''}
    </div>`;
}

function seiteKarte(parameter = '') {
  const gewaehlt = new URLSearchParams(parameter).get('station');
  const tour = S.aktiveTour ? tourVon(S.aktiveTour) : null;

  return `
    <h1>Parkkarte</h1>
    ${S.navZiel && stationVon(S.navZiel) ? `
      <div class="karte nav-banner">
        <div class="zeile-zwischen">
          <div>
            <div class="schwach">Folge den orangen Pfeilen</div>
            <strong>${NAV_EMOJI[S.navZiel] || '📍'} ${esc(stationVon(S.navZiel).name)}</strong>
            <span class="chip" id="nav-meter">noch ca. ${navRoute(navStartpunkt(), [stationVon(S.navZiel).mapX, stationVon(S.navZiel).mapY]).meter} m</span>
          </div>
          <button class="btn btn--klein btn--zweit" data-nav-stop>Beenden</button>
        </div>
        ${navPosition ? '' : '<p class="schwach" style="margin:8px 0 0">Ohne GPS-Freigabe startet der Weg am Haupteingang. Tippe "Wo bin ich?", um deine Position zu nutzen.</p>'}
      </div>` : ''}
    <div class="kartenbox">
      ${kartenSvg({ tour, aktiveStation: gewaehlt })}
      ${kartenWerkzeug()}
    </div>
    <p class="schwach">Wege, Gehege und Gebaeude stammen aus OpenStreetMap und entsprechen der realen Lage im Park. Fuer den offiziellen Lageplan bitte den Parkplan am Eingang nutzen.</p>
    ${tour ? `<div class="hinweis">Eingezeichnet ist die Route <strong>${esc(tour.titel)}</strong>. Die gestrichelte Linie zeigt die Reihenfolge der Stationen.</div>` : ''}
    <div id="ortungsergebnis"></div>

    <h2>Alle Stationen</h2>
    <div class="tier-liste">
      ${STATIONEN.map((st) => `
        <button class="tier-zeile" data-stationsblatt="${st.id}">
          <span class="tier-zeile__punkt" style="background:${BEREICHE[st.bereich].farbe}"></span>
          <span>
            <span class="tier-zeile__name">${esc(st.name)}</span>
            <span class="schwach" style="display:block">${esc(BEREICHE[st.bereich].name)} · ca. ${st.dauer} Min.</span>
          </span>
          <span class="tier-zeile__pfeil">›</span>
        </button>`).join('')}
    </div>
  `;
}

function zeigeStationsBlatt(id) {
  const st = stationVon(id);
  if (!st) return;
  const inhalt = stationInhalt(st);
  const tiere = (st.tiere || []).map(tierVon).filter(Boolean);
  const box = document.createElement('div');
  box.className = 'karte';
  box.style.cssText = 'position:fixed;left:12px;right:12px;bottom:calc(var(--nav-hoehe) + 16px);z-index:50;max-width:736px;margin:0 auto;';
  box.innerHTML = `
    <div class="zeile-zwischen">
      <strong>${esc(st.name)}</strong>
      <button class="btn btn--klein btn--zweit" data-blatt-zu>Schliessen</button>
    </div>
    <div class="knopfreihe" style="margin-top:10px">
      <button class="btn btn--klein" data-nav-start="${st.id}">🧭 Bring mich hin</button>
    </div>
    <p class="schwach" style="margin-top:8px">${esc(inhalt.beschreibung)}</p>
    ${tiere.length ? `<div class="tour-karte__meta">${tiere.map((t) => `<span class="chip">${esc(t.name)}</span>`).join('')}</div>` : ''}
  `;
  document.querySelectorAll('[data-blatt]').forEach((e) => e.remove());
  box.setAttribute('data-blatt', '');
  document.body.appendChild(box);
}

function seiteFuetterungen() {
  const eintraege = FUETTERUNGEN.map((f) => ({ ...f, zeit: S.zeiten[f.id] || f.zeit }));
  const mitZeit = eintraege.filter((f) => f.zeit).sort((a, b) => a.zeit.localeCompare(b.zeit));
  const ohneZeit = eintraege.filter((f) => !f.zeit);

  return `
    <h1>Fuetterungen & Vorfuehrungen</h1>
    ${oeffnungHeute() ? `<div class="karte"><div class="zeile-zwischen"><span>🕘 Heute geoeffnet</span><strong>${oeffnungHeute()}</strong></div><p class="schwach" style="margin:6px 0 0">${esc(OEFFNUNG.quelle)} - Aushang am Eingang geht vor.</p></div>` : ''}
    <div class="hinweis">
      <strong>Zeiten bitte selbst eintragen.</strong> Die tatsaechlichen Zeiten haengen vom Tag ab und haengen am Eingang aus.
      Trag sie hier einmal ein - die App merkt sie sich auf diesem Geraet und sortiert deinen Tag danach.
    </div>

    ${mitZeit.length ? `
      <h2>Dein Tagesplan</h2>
      <div class="karte">
        <div class="steckbrief">
          ${mitZeit.map((f) => `<div><span>${esc(f.zeit)}</span><span>${esc(f.titel)}<br><span class="schwach">${esc(stationVon(f.station)?.name || '')}</span></span></div>`).join('')}
        </div>
      </div>` : ''}

    <h2>Zeiten eintragen</h2>
    <div class="karte">
      ${eintraege.map((f) => `
        <div class="schalter">
          <div>
            <strong>${esc(f.titel)}</strong>
            <div class="schwach">${esc(stationVon(f.station)?.name || '')}${f.hinweis ? ' · ' + esc(f.hinweis) : ''}</div>
          </div>
          <input type="time" data-zeit="${f.id}" value="${esc(f.zeit)}">
        </div>`).join('')}
    </div>
    ${ohneZeit.length ? `<p class="schwach">Noch ohne Zeit: ${ohneZeit.map((f) => esc(f.titel)).join(', ')}.</p>` : ''}
  `;
}

function seiteWissen() {
  const text = WISSEN.map((w) => `${w.titel}. ${w.text}`).join(' ');
  return `
    <h1>Gut zu wissen</h1>
    ${vorleserLeiste(() => text)}
    ${WISSEN.map((w) => `
      <div class="karte" style="margin-top:12px">
        <h2>${esc(w.titel)}</h2>
        <p>${esc(w.text)}</p>
      </div>`).join('')}
  `;
}

function seiteEinstellungen() {
  const stimmen = Vorleser.stimmen();
  return `
    <h1>Einstellungen</h1>

    <h2>Wer liest mit?</h2>
    <div class="karte">
      <p class="schwach">Die Altersstufe aendert Textlaenge, Wortwahl und Schriftgroesse - und blendet fuer Kinder ein Quiz ein.</p>
      <div class="filterzeile" style="margin-top:8px">
        <button class="filter-chip" data-alter="mini" aria-pressed="${S.alter === 'mini'}">Klein (3-6)</button>
        <button class="filter-chip" data-alter="kind" aria-pressed="${S.alter === 'kind'}">Kinder (7-11)</button>
        <button class="filter-chip" data-alter="erwachsen" aria-pressed="${S.alter === 'erwachsen'}">Ab 12 / Erwachsene</button>
      </div>
    </div>

    <h2>Vorlesen</h2>
    <div class="karte">
      ${Vorleser.verfuegbar() ? `
        <div class="schalter">
          <span>Tempo</span>
          <span><input type="range" min="0.6" max="1.4" step="0.1" value="${S.tempo}" data-tempo-regler> <span id="tempowert">${S.tempo.toFixed(1)}×</span></span>
        </div>
        <div class="schalter">
          <span>Stimme</span>
          <select id="stimmenwahl"></select>
        </div>
        <div class="schalter">
          <span>Beim Tier automatisch weiterlesen</span>
          <input type="checkbox" data-auto ${S.autoWeiter ? 'checked' : ''}>
        </div>
        <button class="btn btn--zweit btn--klein" data-probe>Probe hoeren</button>
        ${stimmen.length === 0 ? '<p class="schwach">Es wurde noch keine deutsche Stimme gefunden. Auf manchen Geraeten laedt die Liste erst nach dem ersten Vorlesen.</p>' : ''}
      ` : '<p class="schwach">Dieses Geraet bietet keine Sprachausgabe an.</p>'}
    </div>

    <h2>Standort</h2>
    <div class="karte">
      <p class="schwach">Die Stationskoordinaten sind aus der schematischen Karte abgeleitet und deshalb ungenau. Wenn du vor Ort an einer Station stehst, kannst du die echte Position speichern - danach stimmt "Wo bin ich?" fuer diese Station genau.</p>
      <select id="kalibrierstation">
        ${STATIONEN.map((st) => `<option value="${st.id}">${esc(st.name)}</option>`).join('')}
      </select>
      <div class="abstand"></div>
      <button class="btn btn--zweit btn--klein" data-kalibrieren>📍 Ich stehe hier</button>
      <p class="schwach" id="kalibrierstatus">${Object.keys(S.koordinaten).length} von ${STATIONEN.length} Stationen kalibriert.</p>
    </div>

    <h2>Daten</h2>
    <div class="karte">
      <p class="schwach">Alles bleibt auf diesem Geraet. Es werden keine Daten an einen Server gesendet, es gibt keine Konten und kein Tracking.</p>
      <button class="btn btn--zweit btn--klein" data-alles-loeschen>Fortschritt und Einstellungen loeschen</button>
    </div>

    <div class="hinweis"><strong>Inhaltsstand ${META.stand}.</strong> ${esc(META.quelleHinweis)}
    Diese App ist ein privates Begleitprojekt und kein Angebot des Tierparks.</div>
  `;
}

function fuelleStimmen(feld) {
  const stimmen = Vorleser.stimmen();
  feld.innerHTML = `<option value="">Standardstimme</option>` +
    stimmen.map((v) => `<option value="${esc(v.name)}" ${S.stimme === v.name ? 'selected' : ''}>${esc(v.name)}</option>`).join('');
}

function seiteStart() {
  return `
    <div style="text-align:center;padding:24px 8px">
      <div style="font-size:3rem">🐘</div>
      <h1>Willkommen im Tierpark</h1>
      <p class="schwach">Dieser Begleiter fuehrt dich auf festen Routen durch den Park, erzaehlt dir etwas zu den Tieren und liest auf Wunsch alles vor.</p>
    </div>
    <h2>Fuer wen ist die App gerade eingestellt?</h2>
    <div class="tier-liste">
      <button class="tier-zeile" data-start-alter="mini"><span><span class="tier-zeile__name">Kleine Kinder (3-6)</span><span class="schwach" style="display:block">Ganz kurze Texte zum Vorlesen, grosse Schrift</span></span><span class="tier-zeile__pfeil">›</span></button>
      <button class="tier-zeile" data-start-alter="kind"><span><span class="tier-zeile__name">Kinder (7-11)</span><span class="schwach" style="display:block">Einfache Texte und ein Quiz zu jedem Tier</span></span><span class="tier-zeile__pfeil">›</span></button>
      <button class="tier-zeile" data-start-alter="erwachsen"><span><span class="tier-zeile__name">Ab 12 und Erwachsene</span><span class="schwach" style="display:block">Ausfuehrliche Texte mit Steckbrief</span></span><span class="tier-zeile__pfeil">›</span></button>
    </div>
    <p class="schwach" style="margin-top:14px">Laesst sich jederzeit in den Einstellungen umschalten.</p>
  `;
}

/* =========================================================
 * Router
 * ======================================================= */

const NAV = [
  { pfad: '#/touren', name: 'Touren', symbol: 'M4 6h16M4 12h16M4 18h10' },
  { pfad: '#/karte', name: 'Karte', symbol: 'M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Zm0 0v14m6-12v14' },
  { pfad: '#/tiere', name: 'Tiere', symbol: 'M12 3a4 4 0 0 1 4 4c0 3-4 5-4 10 0-5-4-7-4-10a4 4 0 0 1 4-4Z' },
  { pfad: '#/fuetterungen', name: 'Zeiten', symbol: 'M12 8v4l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' },
  { pfad: '#/mehr', name: 'Mehr', symbol: 'M5 12h.01M12 12h.01M19 12h.01' },
];

let tiereSuche = '';
let tiereFilter = 'alle';

function zeichne() {
  const hash = location.hash || '#/touren';
  const [pfad, parameter = ''] = hash.slice(2).split('?');
  const teile = pfad.split('/').filter(Boolean);
  const inhalt = $('#inhalt');
  const titel = $('.kopf__titel');
  const zurueck = $('#zurueck');

  Vorleser.stoppen();
  document.querySelectorAll('[data-blatt]').forEach((e) => e.remove());

  let html = '';
  let seitenTitel = 'Tierpark-Begleiter';
  let tiefe = teile.length > 1;

  switch (teile[0]) {
    case 'start':
      html = seiteStart(); seitenTitel = 'Willkommen'; tiefe = false; break;
    case 'tour':
      if (teile[2] === 'station') {
        html = seiteStation(teile[1], teile[3]);
        seitenTitel = tourVon(teile[1])?.titel || 'Station';
      } else if (teile[2] === 'ende') {
        html = seiteTourEnde(teile[1]); seitenTitel = 'Geschafft';
      } else {
        html = seiteTour(teile[1]); seitenTitel = tourVon(teile[1])?.titel || 'Tour';
        setze({ aktiveTour: teile[1] });
      }
      break;
    case 'tier':
      html = seiteTier(teile[1]); seitenTitel = tierVon(teile[1])?.name || 'Tier'; break;
    case 'tiere':
      html = seiteTiere(tiereSuche, tiereFilter); seitenTitel = istKind() ? 'Tiere' : 'Tierlexikon'; break;
    case 'karte':
      html = seiteKarte(parameter); seitenTitel = 'Karte'; break;
    case 'fuetterungen':
      html = seiteFuetterungen(); seitenTitel = 'Zeiten'; break;
    case 'wissen':
      html = seiteWissen(); seitenTitel = 'Gut zu wissen'; break;
    case 'einstellungen':
      html = seiteEinstellungen(); seitenTitel = 'Einstellungen'; break;
    case 'mehr':
      html = seiteMehr(); seitenTitel = 'Mehr'; tiefe = false; break;
    default:
      html = seiteTouren(); seitenTitel = 'Touren'; tiefe = false;
  }

  navVerfolgung(Boolean(S.navZiel) && teile[0] === 'karte');

  inhalt.innerHTML = html;
  titel.textContent = seitenTitel;
  zurueck.hidden = !tiefe;
  document.body.dataset.alterstufe = S.alter;
  window.scrollTo(0, 0);

  aktualisiereNav(pfad);
  nachbereiten(teile);
}

function seiteMehr() {
  return `
    <h1>Mehr</h1>
    <div class="tier-liste">
      <button class="tier-zeile" data-route="#/wissen"><span><span class="tier-zeile__name">Gut zu wissen</span><span class="schwach" style="display:block">Geschichte des Parks, Tipps fuer den Besuch</span></span><span class="tier-zeile__pfeil">›</span></button>
      <button class="tier-zeile" data-route="#/einstellungen"><span><span class="tier-zeile__name">Einstellungen</span><span class="schwach" style="display:block">Altersstufe, Vorlesen, Standort</span></span><span class="tier-zeile__pfeil">›</span></button>
      <button class="tier-zeile" data-route="#/start"><span><span class="tier-zeile__name">Startbildschirm</span><span class="schwach" style="display:block">Altersstufe neu waehlen</span></span><span class="tier-zeile__pfeil">›</span></button>
    </div>
    <div class="hinweis" style="margin-top:14px">
      <strong>Hinweis:</strong> Ein privat entwickelter Begleiter fuer den Besuch, unabhaengig vom Tierpark.
      Inhaltsstand ${META.stand}. ${esc(META.quelleHinweis)}
    </div>
  `;
}

function aktualisiereNav(pfad) {
  document.querySelectorAll('.nav a').forEach((a) => {
    const ziel = a.getAttribute('href').slice(2);
    const aktiv = pfad === ziel
      || (ziel === 'touren' && pfad.startsWith('tour'))
      || (ziel === 'tiere' && pfad.startsWith('tier'))
      || (ziel === 'mehr' && ['wissen', 'einstellungen', 'start'].includes(pfad));
    if (aktiv) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

/* Nach dem Zeichnen: Ereignisse verbinden, die nicht per Delegation gehen. */
function nachbereiten(teile) {
  const box = $('.kartenbox');
  if (box) kartenInteraktion(box);

  const suche = $('#tiersuche');
  if (suche) {
    suche.addEventListener('input', () => {
      tiereSuche = suche.value;
      const pos = suche.selectionStart;
      $('#inhalt').innerHTML = seiteTiere(tiereSuche, tiereFilter);
      const neu = $('#tiersuche');
      neu.focus();
      neu.setSelectionRange(pos, pos);
      nachbereiten(teile);
    });
  }

  const stimmenfeld = $('#stimmenwahl');
  if (stimmenfeld) {
    fuelleStimmen(stimmenfeld);
    stimmenfeld.addEventListener('change', () => setze({ stimme: stimmenfeld.value }));
  }

  const regler = $('[data-tempo-regler]');
  if (regler) {
    regler.addEventListener('input', () => {
      setze({ tempo: Number(regler.value) });
      $('#tempowert').textContent = S.tempo.toFixed(1) + '×';
    });
  }

  if (Vorleser.verfuegbar() && S.autoWeiter && teile[0] === 'tier' && window.__vorlesetext) {
    /* Bewusst nicht automatisch starten: Browser blockieren Tonausgabe
     * ohne Nutzeraktion. Der Schalter wirkt erst nach dem ersten Antippen. */
  }
}

/* =========================================================
 * Globale Ereignisse
 * ======================================================= */

document.addEventListener('click', (e) => {
  const ziel = (sel) => e.target.closest(sel);

  const route = ziel('[data-route]');
  if (route) { location.hash = route.dataset.route; return; }

  const startAlter = ziel('[data-start-alter]');
  if (startAlter) {
    setze({ alter: startAlter.dataset.startAlter, erstbesuch: false });
    location.hash = '#/touren';
    return;
  }

  const alter = ziel('[data-alter]');
  if (alter) { setze({ alter: alter.dataset.alter }); zeichne(); return; }

  if (ziel('[data-vorlesen]')) {
    if (Vorleser.laeuft) Vorleser.stoppen();
    else if (window.__vorlesetext) Vorleser.starten(window.__vorlesetext());
    return;
  }
  if (ziel('[data-pause]')) { Vorleser.pause(); return; }

  if (ziel('[data-tempo]')) {
    const stufen = [0.8, 0.9, 1, 1.1, 1.25];
    const i = stufen.findIndex((v) => Math.abs(v - S.tempo) < 0.01);
    setze({ tempo: stufen[(i + 1) % stufen.length] });
    e.target.closest('[data-tempo]').textContent = S.tempo.toFixed(1) + '×';
    if (Vorleser.laeuft && window.__vorlesetext) Vorleser.starten(window.__vorlesetext());
    return;
  }

  if (ziel('[data-probe]')) {
    Vorleser.starten('So klingt die Sprachausgabe. Der Eisbaer ist das groesste an Land lebende Raubtier der Welt.');
    return;
  }

  const besucht = ziel('[data-besucht]');
  if (besucht) {
    const [tourId, stationId] = besucht.dataset.besucht.split('|');
    const liste = new Set(S.besucht[tourId] || []);
    if (liste.has(stationId)) liste.delete(stationId); else liste.add(stationId);
    setze({ besucht: { ...S.besucht, [tourId]: [...liste] } });
    zeichne();
    return;
  }

  const reset = ziel('[data-tour-reset]');
  if (reset) {
    const id = reset.dataset.tourReset;
    setze({ besucht: { ...S.besucht, [id]: [] } });
    location.hash = `#/tour/${id}`;
    zeichne();
    return;
  }

  const drehen = ziel('[data-drehen]');
  if (drehen) {
    const zoomfaktor = kartenBlick.w / blickStart().w;
    setze({ karteDrehung: (((S.karteDrehung + Number(drehen.dataset.drehen)) % 360) + 360) % 360 });
    const start = blickStart();
    /* Zoomstufe beibehalten, Ausschnitt auf die gedrehte Mitte setzen */
    const w = start.w * zoomfaktor;
    const h = start.h * zoomfaktor;
    kartenBlick = { x: start.x + (start.w - w) / 2, y: start.y + (start.h - h) / 2, w, h };
    zeichne();
    return;
  }

  if (ziel('[data-dim]')) {
    setze({ karte3d: !S.karte3d });
    kartenBlick = blickStart();
    zeichne();
    return;
  }

  const zoom = ziel('[data-zoom]');
  if (zoom) { zoomen(zoom.dataset.zoom); return; }

  if (ziel('[data-ortung]')) {
    const knopf = ziel('[data-ortung]');
    knopf.textContent = 'Suche …';
    orten((mir, naechste) => {
      knopf.textContent = '📍 Wo bin ich?';
      const ungenau = koordinaten(naechste.st).geschaetzt;
      const feld = $('#ortungsergebnis');
      const text = `Am naechsten liegt <strong>${esc(naechste.st.name)}</strong>, etwa ${naechste.m} m entfernt.` +
        (ungenau ? ' Achtung: Diese Station ist noch nicht vor Ort kalibriert, die Entfernung ist grob geschaetzt.' : '');
      if (feld) feld.innerHTML = `<div class="hinweis">${text}</div>`;
      else alert(text.replace(/<[^>]+>/g, ''));

      const svg = $('.kartenbox svg');
      if (svg) {
        const x = ((mir.lon - PARK_BOUNDS.west) / (PARK_BOUNDS.ost - PARK_BOUNDS.west)) * GEO.MASS.w;
        const y = ((PARK_BOUNDS.nord - mir.lat) / (PARK_BOUNDS.nord - PARK_BOUNDS.sued)) * GEO.MASS.h;
        if (x > -10 && x < GEO.MASS.w + 10 && y > -10 && y < GEO.MASS.h + 10) {
          navPosition = [x, y];
          if (S.navZiel) { zeichne(); return; }
          const p = proj(x, y);
          svg.insertAdjacentHTML('beforeend',
            `<circle class="ich-punkt" cx="${p.X}" cy="${p.Y}" r="2.4"/>`);
        }
      }
    });
    return;
  }

  if (ziel('[data-kalibrieren]')) {
    const wahl = $('#kalibrierstation').value;
    orten((mir) => {
      setze({ koordinaten: { ...S.koordinaten, [wahl]: { lat: mir.lat, lon: mir.lon } } });
      $('#kalibrierstatus').textContent =
        `${Object.keys(S.koordinaten).length} von ${STATIONEN.length} Stationen kalibriert. Zuletzt: ${stationVon(wahl).name}.`;
    });
    return;
  }

  const antwort = ziel('[data-antwort]');
  if (antwort) {
    const block = antwort.closest('[data-quiz]');
    const richtig = Number(antwort.dataset.richtig);
    const gewaehlt = Number(antwort.dataset.antwort);
    const treffer = richtig === gewaehlt;
    block.querySelectorAll('[data-antwort]').forEach((b) => {
      const i = Number(b.dataset.antwort);
      if (i === richtig) b.style.borderColor = 'var(--gruen)';
      if (i === gewaehlt && !treffer) b.style.borderColor = 'var(--akzent)';
    });
    const ergebnis = $('.quiz-ergebnis', block);
    ergebnis.hidden = false;
    ergebnis.innerHTML = treffer
      ? '<p style="color:var(--gruen);font-weight:650">✓ Richtig!</p>'
      : '<p style="color:var(--akzent);font-weight:650">Fast! Die gruene Antwort stimmt.</p>';
    $('.quiz-erklaerung', block).hidden = false;
    if (treffer) setze({ quizGeloest: { ...S.quizGeloest, [block.dataset.quiz]: true } });
    return;
  }

  const navStart = ziel('[data-nav-start]');
  if (navStart) {
    const id = navStart.dataset.navStart;
    setze({ navZiel: id });
    document.querySelectorAll('[data-blatt]').forEach((x) => x.remove());
    navVerfolgung(true);
    const st = stationVon(id);
    if (Vorleser.verfuegbar() && st) {
      Vorleser.starten(`Los geht's! Folge den orangen Pfeilen zur Station ${st.name}.`);
    }
    if (location.hash.startsWith('#/karte')) zeichne();
    else location.hash = '#/karte';
    return;
  }

  if (ziel('[data-nav-stop]')) {
    setze({ navZiel: null });
    navVerfolgung(false);
    zeichne();
    return;
  }

  const blatt = ziel('[data-stationsblatt]');
  if (blatt) { zeigeStationsBlatt(blatt.dataset.stationsblatt); return; }
  if (ziel('[data-blatt-zu]')) { document.querySelectorAll('[data-blatt]').forEach((x) => x.remove()); return; }

  const filter = ziel('[data-filter]');
  if (filter) {
    tiereFilter = filter.dataset.filter;
    $('#inhalt').innerHTML = seiteTiere(tiereSuche, tiereFilter);
    nachbereiten(['tiere']);
    return;
  }

  if (ziel('[data-alles-loeschen]')) {
    if (confirm('Fortschritt, Zeiten und Einstellungen auf diesem Geraet loeschen?')) {
      localStorage.removeItem(SPEICHER);
      S = { ...STANDARD };
      location.hash = '#/start';
      zeichne();
    }
    return;
  }

  if (ziel('#zurueck')) { history.back(); }
});

document.addEventListener('change', (e) => {
  if (e.target.matches('[data-zeit]')) {
    setze({ zeiten: { ...S.zeiten, [e.target.dataset.zeit]: e.target.value } });
    if (location.hash.startsWith('#/fuetterungen')) zeichne();
  }
  if (e.target.matches('[data-auto]')) setze({ autoWeiter: e.target.checked });
});

window.addEventListener('hashchange', zeichne);
window.addEventListener('beforeunload', () => Vorleser.stoppen());

/* Navigation aufbauen */
$('.nav').innerHTML = NAV.map((n) => `
  <a href="${n.pfad}">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${n.symbol}"/></svg>
    <span>${n.name}</span>
  </a>`).join('');

/* Erststart: Altersstufe abfragen */
if (S.erstbesuch && !location.hash) location.hash = '#/start';
zeichne();
try { sessionStorage.removeItem('reparaturversuch'); } catch { /* egal */ }

/* Service Worker fuer Offline-Betrieb */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(() => {
      /* Ohne Service Worker laeuft die App weiter, nur nicht offline. */
    });
  });
}
