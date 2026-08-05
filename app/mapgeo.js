/*
 * Kartengeometrie: Wege, Wasser, Gebaeude, Gehege und Baumgruppen.
 *
 * Koordinatensystem wie bei den Stationen: 0..100, links oben = Nordwesten.
 * Die Formen sind von Hand gezeichnet und an der realen Anordnung des Parks
 * orientiert (Eingang Sueden, Tropen-Aquarium am Eingang, Eismeer Westen,
 * Panorama Mitte/Nord) - sie sind eine Orientierungshilfe, kein vermessener
 * Plan. Der offizielle Wegeplan des Tierparks ist urheberrechtlich
 * geschuetzt und wird deshalb nicht uebernommen.
 *
 * hoehe: nur fuer die 3D-Ansicht (Extrusion in Karteneinheiten).
 */

/* Aussengrenze des Parks */
export const GRENZE = [
  [10, 14], [46, 8], [84, 12], [92, 30], [90, 58], [84, 84],
  [72, 95], [40, 96], [18, 88], [8, 62], [6, 34],
];

/* Gehege-Flaechen (Bereichsfarbe kommt aus BEREICHE) */
export const GEHEGE = [
  { name: 'Eismeer', bereich: 'eismeer', punkte: [[14, 28], [34, 24], [40, 36], [36, 48], [20, 50], [12, 40]] },
  { name: 'Afrika-Panorama', bereich: 'afrika', punkte: [[42, 18], [62, 16], [66, 28], [60, 36], [44, 36], [40, 26]] },
  { name: 'Steppe', bereich: 'afrika', punkte: [[30, 14], [42, 18], [40, 26], [30, 26]] },
  { name: 'Loewen', bereich: 'afrika', punkte: [[64, 28], [76, 30], [76, 40], [66, 40], [62, 36]] },
  { name: 'Tiger', bereich: 'asien', punkte: [[74, 42], [86, 44], [86, 54], [76, 54]] },
  { name: 'Elefanten', bereich: 'asien', punkte: [[62, 62], [80, 60], [82, 72], [76, 78], [64, 76]] },
  { name: 'Kamele', bereich: 'asien', punkte: [[12, 54], [26, 54], [28, 64], [22, 70], [12, 66]] },
  { name: 'Suedamerika', bereich: 'suedamerika', punkte: [[24, 68], [36, 66], [38, 74], [28, 78]] },
  { name: 'Streichelgehege', bereich: 'kinder', punkte: [[34, 58], [44, 56], [46, 64], [36, 66]] },
  { name: 'Spielplatz', bereich: 'kinder', punkte: [[46, 58], [56, 56], [58, 66], [48, 68]] },
];

/* Wasserflaechen */
export const WASSER = [
  { name: 'Flamingolagune', punkte: [[38, 72], [50, 70], [54, 76], [50, 82], [40, 82], [36, 77]] },
  { name: 'Japanteich', punkte: [[54, 46], [64, 44], [68, 50], [64, 55], [55, 54], [52, 50]] },
  { name: 'Eismeer-Becken', punkte: [[18, 32], [30, 30], [34, 38], [28, 44], [18, 42]] },
  { name: 'Seeloewenbecken', punkte: [[22, 50], [32, 49], [33, 56], [24, 57]] },
  { name: 'Panorama-Graben', punkte: [[44, 33], [60, 31], [61, 35], [45, 37]] },
];

/* Wegenetz: Hauptrundweg und Stichwege */
export const WEGE = [
  /* Zentrale Runde vom Eingang gegen den Uhrzeigersinn */
  [[54, 92], [52, 86], [50, 80], [46, 74], [42, 70], [38, 67], [33, 63], [28, 58], [26, 52], [24, 46], [24, 40], [26, 33], [30, 27], [34, 22], [42, 19], [50, 17], [58, 17], [64, 20], [68, 26], [70, 32], [72, 38], [76, 44], [78, 50], [76, 56], [72, 60], [68, 64], [66, 70], [64, 76], [62, 82], [58, 88], [54, 92]],
  /* Querweg durch die Mitte: Japangarten - Orang-Utan-Haus */
  [[50, 80], [54, 72], [56, 64], [58, 56], [60, 50], [62, 46], [64, 42], [68, 38]],
  /* Stich zum Eismeer-Inneren */
  [[26, 44], [30, 40], [33, 36]],
  /* Stich zum Panorama */
  [[52, 40], [53, 34], [53, 28]],
  /* Eingang -> Tropen-Aquarium */
  [[54, 92], [60, 90], [66, 88]],
  /* Spielplatz-Schleife */
  [[56, 64], [52, 62], [50, 65]],
];

/* Gebaeude fuer die 3D-Ansicht (und als Umrisse in 2D) */
export const GEBAEUDE = [
  { name: 'Eingang', punkte: [[50, 90], [58, 90], [58, 94], [50, 94]], hoehe: 7, farbe: '#b0654a', dach: '#8a4a34' },
  { name: 'Tropen-Aquarium', punkte: [[64, 84], [78, 82], [80, 90], [66, 92]], hoehe: 5, farbe: '#3f8f7a', dach: '#2e6b5b' },
  { name: 'Elefantenhalle', punkte: [[66, 64], [76, 63], [77, 70], [67, 71]], hoehe: 5, farbe: '#a4623a', dach: '#7d4a2c' },
  { name: 'Orang-Utan-Haus', punkte: [[61, 43], [67, 42], [69, 46], [66, 50], [60, 49], [59, 45]], hoehe: 7, farbe: '#c08a2e', dach: '#96691f' },
  { name: 'Eismeer-Felsen', punkte: [[15, 29], [26, 26], [32, 30], [28, 36], [17, 36]], hoehe: 9, farbe: '#9fb4c4', dach: '#e8eef4' },
  { name: 'Seeloewen-Tribuene', punkte: [[20, 56], [26, 58], [24, 61], [19, 59]], hoehe: 2.5, farbe: '#8d7b5f', dach: '#6f6049' },
];

/* Baumgruppen: [x, y, groesse] */
export const BAEUME = [
  [14, 20, 2.2], [20, 16, 1.8], [38, 12, 2.4], [52, 12, 2], [66, 14, 2.2],
  [78, 18, 2.6], [84, 26, 2], [86, 36, 2.2], [88, 50, 1.8], [84, 62, 2.4],
  [80, 76, 2], [72, 88, 1.8], [46, 90, 2.2], [34, 88, 2.4], [24, 82, 2],
  [14, 74, 2.4], [10, 52, 2], [10, 30, 1.8], [46, 48, 1.6], [42, 42, 1.8],
  [70, 54, 1.8], [60, 70, 1.6], [36, 52, 1.4], [58, 24, 1.6], [30, 60, 1.3],
];

/* Beschriftete Freiflaechen (nur 2D, dezent) */
export const FLAECHEN_LABELS = [
  { text: 'Japanischer Garten', x: 60, y: 51 },
  { text: 'Afrika-Panorama', x: 53, y: 25 },
  { text: 'Eismeer', x: 25, y: 38 },
];
