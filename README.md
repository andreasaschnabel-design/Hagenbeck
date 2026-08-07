# Tierpark-Begleiter

Eine App fuer den Besuch im Tierpark Hagenbeck (Hamburg-Stellingen): gefuehrte
Rundwege mit Schwerpunkten, eine schematische Parkkarte mit Routenverlauf,
ein Tierlexikon mit Vorlesefunktion - und ein umschaltbarer Kindermodus mit
drei Altersstufen.

## Funktionen

- **8 Touren mit Schwerpunkten** - Klassiker, Familie, Eismeer, Afrika,
  Raubtiere, Regentag, Blitzbesuch (1 Std.), barrierearme Runde. Jede Tour
  fuehrt Station fuer Station durch den Park, mit Fortschrittsanzeige und
  "Gesehen"-Haken.
- **Karte mit Routenplan** - detaillierte, an der realen Anordnung des
  Parks orientierte Karte mit Wegen, Teichen, Gehegen und Gebaeuden,
  nummerierten Stationen und eingezeichnetem Routenverlauf; per
  Zwei-Finger-Geste zoombar und verschiebbar. Umschaltbare **3D-Ansicht**
  (isometrische Perspektive mit Gebaeuden und Baeumen). "Wo bin ich?"
  zeigt per GPS die naechstgelegene Station; vor Ort lassen sich die
  Stationspositionen kalibrieren, damit die Ortung genauer wird.
  Die Kartengeometrie (Parkgrenze, Wege, Teiche, Gehege, Gebaeude,
  Baeume) stammt aus OpenStreetMap und entspricht der realen Lage im
  Park: Kartendaten (c) OpenStreetMap-Mitwirkende, Lizenz ODbL 1.0
  (openstreetmap.org/copyright). Quelldaten liegen in `osm/map.osm`;
  `python3 scripts/osm2geo.py` erzeugt daraus `app/mapgeo.js` neu.
- **Tierlexikon** - 51 Tierartikel mit Steckbrief, Beobachtungstipps und
  "Wusstest du schon"-Fakten, durchsuchbar und nach Parkbereich filterbar.
- **Vorlesen** - alle Texte lassen sich ueber die Sprachausgabe des Geraets
  vorlesen (Web Speech API): Play/Pause, Tempo, Stimmenwahl. Keine Cloud,
  keine Kosten.
- **Altersstufen** - umschaltbar zwischen *Klein (3-6)*, *Kinder (7-11)*
  und *Ab 12 / Erwachsene*. Kinder bekommen eigene, einfach erzaehlte
  Texte in Du-Ansprache, groessere Schrift und ein Mini-Quiz zu jedem Tier;
  die Kleinsten extra kurze Texte zum Vorlesen.
- **Pfeil-Navigation** - "Bring mich hin" auf jeder Station: Die App
  sucht den kuerzesten Weg ueber das echte Wegenetz des Parks (Dijkstra
  ueber die OSM-Wege) und zeigt ihn mit animierten Pfeilen, Ziel-Emoji
  und Restdistanz an; mit GPS wandert der Startpunkt live mit.
- **Meine Tour** - Wunschtiere auswaehlen, die App berechnet die
  kuerzeste Route ueber das echte Wegenetz (Naechster-Nachbar-Heuristik
  mit 2-Opt-Verbesserung) und erzeugt daraus eine vollwertige Tour mit
  Stationen, Fortschritt und Routenlinie auf der Karte.
- **Tierpass** - Stempel fuer jede besuchte Station (automatisch beim
  "Gesehen"-Haken oder bei Ankunft mit der Navigation), Park-Quests wie
  "Polarforscher" und ein Tagesrueckblick mit Dauer und Tierarten.
- **Fuetterungszeiten als Tagesplan** - die tagesaktuellen Zeiten vom
  Aushang einmal eintippen, die App sortiert den Tag danach.
- **Offline nutzbar** - als PWA installierbar ("Zum Startbildschirm
  hinzufuegen"); nach dem ersten Laden funktioniert alles ohne Netz.
  Alle Daten bleiben auf dem Geraet, kein Server, kein Tracking.

## Nutzung

Es gibt keinen Build-Schritt. Einfach statisch ausliefern:

```bash
python3 -m http.server 8080
# dann http://localhost:8080 oeffnen
```

Fuer die Installation als App (PWA) und fuer die GPS-Ortung braucht es
HTTPS (oder localhost) - z. B. via GitHub Pages, Netlify o. ae.

## Technik

- Reines HTML/CSS/JavaScript (ES-Module), kein Framework, keine
  Abhaengigkeiten.
- `app/data.js` - Stationen, Touren, Tiertexte (Erwachsene), Wissen.
- `app/data-kinder.js` - kindgerechte Texte und Quizfragen.
- `app/app.js` - Router, Touren-Fuehrung, SVG-Karte, Vorleser (Web Speech),
  Ortung, Speicherung (localStorage).
- `sw.js` - Service Worker fuer den Offline-Betrieb. Bei Inhaltsaenderungen
  die `VERSION` hochzaehlen.

## Datenpflege / Hinweis

Tierbestand, Fuetterungszeiten und Oeffnungszeiten aendern sich; die Inhalte
hier sind ein gepflegter Startbestand (Stand siehe `META.stand` in
`app/data.js`) und keine offizielle Auskunft des Tierparks. Vor dem Besuch
bitte auf hagenbeck.de pruefen. Dieses Projekt ist ein privater Begleiter
und kein Angebot der Tierpark Hagenbeck gGmbH.
