#!/usr/bin/env python3
"""Erzeugt app/mapgeo.js aus einem OSM-Export des Tierparks.

Projektion: aequirektangulaer um die Parkmitte, normiert auf Breite 100.
y waechst nach Sueden; die Hoehe H ergibt sich aus dem Seitenverhaeltnis.
"""
import xml.etree.ElementTree as ET
import math, json, sys

OSM = "osm/map.osm"
OUT = "app/mapgeo.js"

t = ET.parse(OSM)
root = t.getroot()

nodes = {}   # id -> (lat, lon)
node_tags = {}
for n in root.iter('node'):
    nid = n.get('id')
    nodes[nid] = (float(n.get('lat')), float(n.get('lon')))
    tags = {tg.get('k'): tg.get('v') for tg in n.findall('tag')}
    if tags:
        node_tags[nid] = tags

ways = []
zoo_way = None
for w in root.iter('way'):
    tags = {tg.get('k'): tg.get('v') for tg in w.findall('tag')}
    refs = [nd.get('ref') for nd in w.findall('nd')]
    pts = [nodes[r] for r in refs if r in nodes]
    if len(pts) < 2:
        continue
    ways.append((tags, pts))
    if tags.get('tourism') == 'zoo':
        zoo_way = pts

assert zoo_way, "Zoo-Grenze nicht gefunden"

# ---- Projektion ----
lats = [p[0] for p in zoo_way]; lons = [p[1] for p in zoo_way]
minlat, maxlat = min(lats), max(lats)
minlon, maxlon = min(lons), max(lons)
lat0 = (minlat + maxlat) / 2
kx = math.cos(math.radians(lat0))
breite_m = (maxlon - minlon) * 111320 * kx
hoehe_m = (maxlat - minlat) * 111320
H = 100 * hoehe_m / breite_m

def proj(lat, lon):
    x = (lon - minlon) / (maxlon - minlon) * 100
    y = (maxlat - lat) / (maxlat - minlat) * H
    return (round(x, 1), round(y, 1))

# ---- Punkt-in-Polygon (Parkgrenze) ----
grenze = [proj(*p) for p in zoo_way]
def innerhalb(pt, poly=grenze, rand=1.5):
    x, y = pt
    n = len(poly); ok = False
    j = n - 1
    for i in range(n):
        xi, yi = poly[i]; xj, yj = poly[j]
        if (yi > y) != (yj > y) and x < (xj - xi) * (y - yi) / (yj - yi + 1e-12) + xi:
            ok = not ok
        j = i
    if ok:
        return True
    # knapper Rand: Naehe zur Grenze zulassen
    return min(abs(x - px) + abs(y - py) for px, py in poly) < rand

def centroid(pts):
    return (sum(p[0] for p in pts) / len(pts), sum(p[1] for p in pts) / len(pts))

# ---- Douglas-Peucker ----
def rdp(pts, eps):
    if len(pts) < 3:
        return pts
    def d(p, a, b):
        if a == b:
            return math.hypot(p[0]-a[0], p[1]-a[1])
        t = max(0, min(1, ((p[0]-a[0])*(b[0]-a[0])+(p[1]-a[1])*(b[1]-a[1])) / ((b[0]-a[0])**2+(b[1]-a[1])**2)))
        return math.hypot(p[0]-a[0]-t*(b[0]-a[0]), p[1]-a[1]-t*(b[1]-a[1]))
    dmax, idx = 0, 0
    for i in range(1, len(pts)-1):
        dd = d(pts[i], pts[0], pts[-1])
        if dd > dmax:
            dmax, idx = dd, i
    if dmax > eps:
        l = rdp(pts[:idx+1], eps); r = rdp(pts[idx:], eps)
        return l[:-1] + r
    return [pts[0], pts[-1]]

def form(pts, eps=0.35):
    p = [proj(*q) for q in pts]
    geschlossen = p[0] == p[-1]
    if geschlossen:
        p = p[:-1]
    p = rdp(p + ([p[0]] if geschlossen else []), eps)
    if geschlossen and len(p) > 1 and p[0] == p[-1]:
        p = p[:-1]
    return p

# ---- Sammeln ----
BEREICH_MAP = [
    (('eisbär', 'walross', 'pinguin', 'seebär', 'eismeer'), 'eismeer'),
    (('tiger', 'leopard', 'elefant', 'kamel', 'onager', 'kamtschatka', 'orang'), 'asien'),
    (('löwe', 'steppe', 'savanne', 'flamingo', 'pelikan', 'mandrill', 'pavian', 'mähnenspringer', 'pinselohr'), 'afrika'),
    (('riesenotter', 'wasserschwein', 'känguru', 'nasenbär', 'stachelschwein', 'bison', 'wapiti'), 'suedamerika'),
    (('streichel', 'haustier', 'kaninchen', 'meerschwein', 'ziege'), 'kinder'),
]
def bereich_fuer(name):
    nl = name.lower()
    for schluessel, b in BEREICH_MAP:
        if any(s in nl for s in schluessel):
            return b
    return 'garten'

gehege, wasser, wege, gebaeude = [], [], [], []
spielplaetze = []
japan = None
for tags, pts in ways:
    if tags.get('tourism') == 'zoo':
        continue
    c = centroid([proj(*p) for p in pts])
    innen = innerhalb(c)
    name = tags.get('name', '')
    if tags.get('attraction') in ('animal', 'petting_zoo') and innen:
        gehege.append({'name': name, 'bereich': bereich_fuer(name), 'punkte': form(pts, 0.4),
                       'flaeche': 0})
    elif (tags.get('natural') == 'water' or tags.get('water')) and innen:
        wasser.append({'name': name, 'punkte': form(pts, 0.3)})
        if 'japan' in name.lower():
            japan = c
    elif tags.get('highway') in ('footway', 'path', 'pedestrian', 'track', 'steps') and innen:
        wege.append(form(pts, 0.25))
    elif tags.get('building') and innen and tags.get('building') not in ('residential', 'apartments'):
        gebaeude.append({'name': name, 'punkte': form(pts, 0.3), 'c': c})
    elif tags.get('leisure') == 'playground' and innen:
        spielplaetze.append((len(pts), c))
    if not japan and 'japan' in name.lower() and innen:
        japan = c

# Flaechen fuer Label-Auswahl
def flaeche(p):
    s = 0
    for i in range(len(p)):
        x1, y1 = p[i]; x2, y2 = p[(i+1) % len(p)]
        s += x1*y2 - x2*y1
    return abs(s) / 2
for g in gehege:
    g['flaeche'] = round(flaeche(g['punkte']), 1)

# Baeume: nur im Park, ausduennen auf Raster
baeume, raster = [], set()
for nid, (lat, lon) in nodes.items():
    if node_tags.get(nid, {}).get('natural') != 'tree':
        continue
    p = proj(lat, lon)
    if not innerhalb(p, rand=0):
        continue
    z = (int(p[0] // 4), int(p[1] // 4))
    if z in raster:
        continue
    raster.add(z)
    baeume.append([p[0], p[1], 1.6])
print('Baeume im Park (ausgeduennt):', len(baeume))

# Haupteingang
eingang = None
for nid, tags in node_tags.items():
    if tags.get('name') == 'Haupteingang' or (tags.get('entrance') == 'main' and innerhalb(proj(*nodes[nid]))):
        eingang = proj(*nodes[nid])
        break

# ---- Stationen zuordnen ----
def finde_gehege(teil):
    for g in gehege:
        if teil.lower() in g['name'].lower():
            return centroid(g['punkte'])
    return None
def finde_gebaeude(teil):
    for g in gebaeude:
        if teil.lower() in g['name'].lower():
            return g['c']
    return None

stationen = {
    'haupteingang': eingang,
    'flamingoteich': finde_gehege('Rosa Flamingos'),
    'elefanten': finde_gehege('Asiatische Elefanten') or finde_gebaeude('Elefanten-Freilaufhalle'),
    'orangutans': finde_gebaeude('Orang-Utan'),
    'tiger': finde_gehege('Sibirische Tiger'),
    'loewen': finde_gehege('Löwen'),
    'afrikapanorama': finde_gehege('Savanne'),
    'strausse': finde_gehege('Afrikanische Steppe'),
    'eismeer': finde_gebaeude('Eismeer'),
    'seeloewen': finde_gehege('Seebären'),
    'kamele': finde_gehege('Asiatische Kamele'),
    'alpakas': finde_gehege('Riesenotter'),
    'streichelgehege': finde_gehege('Streichelgehege'),
    'spielplatz': max(spielplaetze)[1] if spielplaetze else None,
    'japangarten': japan,
    'tropenaquarium': finde_gebaeude('Tropenaquarium'),
}
fehlend = [k for k, v in stationen.items() if not v]
print('Ohne Zuordnung:', fehlend)

# ---- Gebaeude-Auswahl fuer Karte (nur parkrelevante, mit Hoehe/Farbe) ----
G_STIL = {
    'Eismeer': (9, '#9fb4c4', '#e8eef4'),
    'Tropenaquarium': (6, '#3f8f7a', '#2e6b5b'),
    'Elefanten-Freilaufhalle': (6, '#a4623a', '#7d4a2c'),
    'Orang-Utan-Haus': (7, '#c08a2e', '#96691f'),
    'Alte Hagenbeck’sche Dressurhalle': (5, '#8d7b5f', '#6f6049'),
    'Historisches Jugendstil-Tor': (6, '#b0654a', '#8a4a34'),
    'Flamingo Lodge': (4, '#c77f5a', '#9d5f40'),
    'Vogelhaus': (4, '#8d7b5f', '#6f6049'),
    'Zooschule': (3.5, '#8d7b5f', '#6f6049'),
    'Schildkrötenhaus': (3.5, '#8d7b5f', '#6f6049'),
    'Thailändische Sala': (4.5, '#b0654a', '#8a4a34'),
}
karten_gebaeude = []
for g in gebaeude:
    stil = G_STIL.get(g['name'])
    if stil is None and flaeche(g['punkte']) < 1.2:
        continue  # kleine namenlose Huetten weglassen
    h, farbe, dach = stil if stil else (3, '#a89880', '#8a7c66')
    karten_gebaeude.append({'name': g['name'], 'punkte': g['punkte'], 'hoehe': h, 'farbe': farbe, 'dach': dach})

labels = sorted(gehege, key=lambda g: -g['flaeche'])[:12]

# ---- Schreiben ----
def js_pts(p):
    return '[' + ', '.join(f'[{a}, {b}]' for a, b in p) + ']'

out = []
out.append("""/*
 * Kartengeometrie - erzeugt aus OpenStreetMap-Daten des Tierparks.
 * Kartendaten (c) OpenStreetMap-Mitwirkende, Lizenz ODbL 1.0
 * (openstreetmap.org/copyright). Vereinfachte Geometrie, Stand des Exports.
 *
 * Koordinaten: x 0..100 (West->Ost), y 0..H (Nord->Sued), 1 Einheit ~ %.1f m.
 * Nicht von Hand pflegen - bei neuen OSM-Daten Generator erneut laufen lassen.
 */
""" % (breite_m / 100))
out.append(f"export const MASS = {{ w: 100, h: {round(H,1)}, meterProEinheit: {round(breite_m/100, 2)} }};")
out.append(f"export const OSM_BOUNDS = {{ nord: {maxlat}, sued: {minlat}, west: {minlon}, ost: {maxlon} }};")
out.append("export const ATTRIBUTION = 'Kartendaten © OpenStreetMap-Mitwirkende (ODbL)';")
out.append(f"\nexport const GRENZE = {js_pts(rdp(grenze + [grenze[0]], 0.25)[:-1])};")
out.append("\nexport const GEHEGE = [")
for g in sorted(gehege, key=lambda g: -g['flaeche']):
    out.append(f"  {{ name: {json.dumps(g['name'], ensure_ascii=False)}, bereich: '{g['bereich']}', punkte: {js_pts(g['punkte'])} }},")
out.append('];')
out.append("\nexport const WASSER = [")
for w in wasser:
    out.append(f"  {{ name: {json.dumps(w['name'], ensure_ascii=False)}, punkte: {js_pts(w['punkte'])} }},")
out.append('];')
out.append("\nexport const WEGE = [")
for w in wege:
    out.append(f"  {js_pts(w)},")
out.append('];')
out.append("\nexport const GEBAEUDE = [")
for g in karten_gebaeude:
    out.append(f"  {{ name: {json.dumps(g['name'], ensure_ascii=False)}, punkte: {js_pts(g['punkte'])}, hoehe: {g['hoehe']}, farbe: '{g['farbe']}', dach: '{g['dach']}' }},")
out.append('];')
out.append("\nexport const BAEUME = [")
out.append('  ' + ', '.join(f'[{b[0]}, {b[1]}, {b[2]}]' for b in baeume))
out.append('];')
out.append("\nexport const FLAECHEN_LABELS = [")
for g in labels:
    c = centroid(g['punkte'])
    out.append(f"  {{ text: {json.dumps(g['name'], ensure_ascii=False)}, x: {round(c[0],1)}, y: {round(c[1],1)} }},")
out.append('];')

open(OUT, 'w').write('\n'.join(out) + '\n')
print('geschrieben:', OUT)
print('H =', round(H, 1), '| Park:', round(breite_m), 'x', round(hoehe_m), 'm')
print('Gehege:', len(gehege), '| Wasser:', len(wasser), '| Wegstuecke:', len(wege),
      '| Gebaeude:', len(karten_gebaeude), '| Labels:', len(labels))
print('STATIONEN =', json.dumps({k: [round(v[0],1), round(v[1],1)] for k, v in stationen.items() if v}))
import os
print('Dateigroesse:', round(os.path.getsize(OUT)/1024), 'KB')
