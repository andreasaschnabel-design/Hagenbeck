/*
 * Inhaltsdaten fuer den Tierpark-Begleiter.
 *
 * WICHTIG / Datenpflege:
 * Tierbestand, Fuetterungszeiten und Oeffnungszeiten aendern sich. Die Angaben
 * hier sind ein gepflegter Startbestand fuer die App, keine offizielle Auskunft
 * des Tierparks. Vor dem Besuch bitte auf hagenbeck.de pruefen.
 * Die Stations-Koordinaten sind aus der schematischen Karte abgeleitet und
 * damit nur ungefaehr. In den Einstellungen laesst sich jede Station vor Ort
 * per "Hier bin ich" auf die echte GPS-Position setzen.
 */

export const META = {
  stand: '05.08.2026',
  quelleHinweis:
    'Tierbestand und Zeiten koennen sich kurzfristig aendern. Aktuelles immer auf hagenbeck.de oder am Aushang am Eingang pruefen.',
};

/* Umgrenzendes Rechteck der Parkgrenze aus OpenStreetMap. Zusammen mit
 * MASS aus mapgeo.js rechnet es Kartenpositionen in GPS-Koordinaten um
 * (x: 0..100 West->Ost, y: 0..MASS.h Nord->Sued). */
export const PARK_BOUNDS = { nord: 53.5990236, sued: 53.5946671, west: 9.9338863, ost: 9.9422995 };

export const BEREICHE = {
  eingang: { name: 'Eingang & Wege', farbe: '#8d7b5f' },
  eismeer: { name: 'Eismeer', farbe: '#2f6f9f' },
  asien: { name: 'Asien', farbe: '#a4623a' },
  afrika: { name: 'Afrika', farbe: '#c08a2e' },
  suedamerika: { name: 'Suedamerika', farbe: '#6a8f3c' },
  kinder: { name: 'Fuer Kinder', farbe: '#b8503f' },
  tropen: { name: 'Tropen-Aquarium', farbe: '#3f8f7a' },
  amerika: { name: 'Amerika', farbe: '#7a6ea0' },
  australien: { name: 'Australien', farbe: '#b8506e' },
  garten: { name: 'Garten & Ruhe', farbe: '#5f7f5f' },
};

/*
 * Stationen = Orte im Park. mapX/mapY sind Positionen auf der schematischen
 * Karte (0..100, links oben = 0/0). Die Karte ist eine Orientierungshilfe,
 * kein massstabsgetreuer Lageplan.
 */
export const STATIONEN = [
  {
    id: 'haupteingang',
    name: 'Haupteingang',
    bereich: 'eingang',
    mapX: 90.3, mapY: 81.6,
    dauer: 5,
    planNr: '1',
    tiere: [],
    beschreibung:
      'Das grosse Eingangsportal mit den steinernen Tieren ist seit 1907 das Gesicht des Tierparks. Hier bekommst du den aktuellen Parkplan und die Tafel mit den Fuetterungszeiten des Tages - ein Foto davon lohnt sich, denn Zeiten koennen tagesaktuell abweichen.',
    tipp: 'Direkt hinter dem Eingang teilt sich der Weg. Fast alle Rundwege funktionieren in beide Richtungen - gegen den Uhrzeigersinn ist es morgens meist ruhiger.',
  },
  {
    id: 'flamingoteich',
    name: 'Flamingoteich',
    bereich: 'afrika',
    mapX: 45.1, mapY: 27.2,
    dauer: 10,
    planNr: '55',
    tiere: ['flamingo'],
    beschreibung:
      'Gleich hinter dem Eingang liegt einer der grossen Teiche. Wasservoegel und Flamingos stehen hier oft dicht am Weg - ein guter erster Halt, um anzukommen.',
    tipp: 'Fuer Fotos: morgens steht die Sonne guenstig im Ruecken des Betrachters.',
  },
  {
    id: 'elefanten',
    name: 'Elefanten-Freianlage',
    bereich: 'asien',
    mapX: 82.8, mapY: 62.2,
    dauer: 25,
    planNr: '7',
    tiere: ['elefant'],
    beschreibung:
      'Die Elefantenanlage gehoert zu den bekanntesten Ecken des Parks. Hagenbeck haelt Asiatische Elefanten und hat eine lange Zuchtgeschichte mit dieser Art. Von der Besucherseite blickt man ueber einen Graben in die Anlage - genau das Prinzip, fuer das der Park beruehmt ist.',
    tipp: 'Wenn Nachwuchs da ist, sind die Jungtiere meist vormittags am aktivsten. Am Elefantenhaus haengen die Zeiten fuer die Vorfuehrungen aus.',
  },
  {
    id: 'orangutans',
    name: 'Menschenaffen-Haus',
    bereich: 'asien',
    mapX: 92.2, mapY: 41.3,
    dauer: 20,
    planNr: '70',
    tiere: ['orangutan'],
    innen: true,
    beschreibung:
      'Ein Haus mit Innen- und Aussenbereich fuer die Menschenaffen. Drinnen bist du sehr nah dran - und trocken, wenn es regnet.',
    tipp: 'Ruhig bleiben und ein paar Minuten stehen: Orang-Utans reagieren auf Beobachter und werden neugierig, wenn es leise ist.',
  },
  {
    id: 'tiger',
    name: 'Tigeranlage',
    bereich: 'asien',
    mapX: 87.7, mapY: 8.1,
    dauer: 15,
    planNr: '66',
    tiere: ['tiger', 'leopard'],
    beschreibung:
      'Eine weitlaeufige Anlage mit Wasserbecken und erhoehten Liegeplaetzen. Tiger sind Einzelgaenger und schlafen tagsueber viel - Geduld wird hier oft belohnt.',
    tipp: 'Am spaeten Nachmittag, kurz vor der Fuetterung, sind Grosskatzen deutlich aktiver als mittags.',
  },
  {
    id: 'loewen',
    name: 'Loewen-Freianlage',
    bereich: 'afrika',
    mapX: 33.9, mapY: 59.4,
    dauer: 15,
    tiere: ['loewe', 'mandrill', 'riesenkaenguru'],
    beschreibung:
      'Eine gitterlose Freianlage nach Hagenbeck-Prinzip: Ein breiter Graben trennt Besucher und Tiere, sodass der Blick frei ueber die Anlage geht.',
    tipp: 'Loewen ruhen bis zu 20 Stunden am Tag. Wer Bewegung sehen will, kommt frueh am Morgen oder zur Fuetterungszeit.',
  },
  {
    id: 'afrikapanorama',
    name: 'Afrika-Panorama',
    bereich: 'afrika',
    mapX: 26.9, mapY: 53.5,
    dauer: 25,
    planNr: '44',
    tiere: ['zebra', 'strauss'],
    beschreibung:
      'Das grosse Panorama ist das Herzstueck der Hagenbeck-Idee: Mehrere Tierarten stehen scheinbar in einer einzigen Landschaft hintereinander, getrennt nur durch Graeben, die man von vorn nicht sieht. Genau diese Bauweise hat Carl Hagenbeck 1896 patentieren lassen.',
    tipp: 'Stell dich mittig vor die Anlage und geh ein paar Schritte zur Seite - dann siehst du, wie die Tiefenwirkung entsteht.',
  },
  {
    id: 'strausse',
    name: 'Afrikanische Steppe',
    bereich: 'afrika',
    mapX: 28.1, mapY: 65.1,
    dauer: 10,
    tiere: ['strauss', 'zebra'],
    planNr: '47',
    beschreibung:
      'Die grosse Steppenanlage teilen sich Strausse, Zebras und Warzenschweine - mehrere Arten in einer Landschaft, wie es das Hagenbeck-Prinzip vorsieht.',
    tipp: 'Ein paar Minuten bleiben: Zwischen Zebras und Straussen gibt es fast immer kleine Rangeleien um die besten Futterstellen zu sehen.',
  },
  {
    id: 'eismeer',
    name: 'Eismeer',
    bereich: 'eismeer',
    mapX: 7.3, mapY: 58.0,
    dauer: 40,
    planNr: '36-42',
    tiere: ['eisbaer', 'walross', 'pinguin', 'seebaer'],
    innen: true,
    beschreibung:
      'Das Eismeer ist die grosse Polaranlage des Parks und wurde 2012 eroeffnet. Ueber Wege und Unterwasserfenster geht es an Eisbaeren, Walrossen, Pinguinen und Robben vorbei - teils oberhalb, teils unter der Wasserlinie.',
    tipp: 'Plane hier mehr Zeit ein als du denkst. Der Weg durch die Anlage ist laenger als er von aussen aussieht, und die Unterwasserfenster sind der beste Teil.',
  },
  {
    id: 'seeloewen',
    name: 'Seebaeren-Becken',
    bereich: 'eismeer',
    mapX: 15.6, mapY: 55.8,
    dauer: 20,
    planNr: '37/38',
    tiere: ['seebaer'],
    beschreibung:
      'Am Becken der Suedamerikanischen Seebaeren gibt es taeglich eine Schaufuetterung mit Erklaerungen der Tierpfleger. Das ist einer der wenigen festen Programmpunkte im Park - und einer der beliebtesten.',
    tipp: 'Etwa 10 Minuten vorher da sein, sonst stehst du in der dritten Reihe. Die Zeiten stehen am Eingang und in dieser App unter "Zeiten".',
    fuetterung: true,
  },
  {
    id: 'kamele',
    name: 'Kamele & Trampeltiere',
    bereich: 'asien',
    mapX: 72.1, mapY: 53.0,
    dauer: 15,
    planNr: '9',
    tiere: ['trampeltier', 'onager', 'kamtschatkabaer'],
    beschreibung:
      'Weitlaeufige Anlage fuer die zweihoeckrigen Trampeltiere. In der Saison werden hier traditionell Reitrunden fuer Kinder angeboten - ob und wann, haengt vom Wetter und vom Tagesbetrieb ab.',
    tipp: 'Gleich nebenan wohnen die Onager und die Kamtschatkabaeren - beides seltene Arten, die kaum ein anderer Zoo zeigt.',
  },
  {
    id: 'alpakas',
    name: 'Riesenotter-Anlage',
    bereich: 'suedamerika',
    mapX: 58.6, mapY: 30.5,
    dauer: 15,
    planNr: '13',
    tiere: ['riesenotter'],
    beschreibung:
      'Wasseranlage der Suedamerikanischen Riesenotter - der groessten Otter der Welt. Die Familiengruppe ist fast immer in Bewegung und gut zu hoeren: Riesenotter gehoeren zu den gespraechigsten Raubtieren ueberhaupt.',
    tipp: 'Ein paar Minuten am Unterwasserfenster warten - unter Wasser zeigen die Otter, warum man sie Flusswoelfe nennt.',
  },
  {
    id: 'streichelgehege',
    name: 'Streichelgehege',
    bereich: 'kinder',
    mapX: 33.0, mapY: 42.0,
    dauer: 25,
    planNr: '28',
    tiere: ['zwergziege'],
    beschreibung:
      'Hier duerfen Kinder rein und die Zwergziegen anfassen. Erfahrungsgemaess der Ort, an dem eine geplante Viertelstunde zu einer Dreiviertelstunde wird.',
    tipp: 'Am Ausgang gibt es Waschgelegenheiten - Haendewaschen nicht vergessen. Futter nur aus dem Automaten des Parks verwenden.',
    kinder: true,
  },
  {
    id: 'spielplatz',
    name: 'Spielplatz & Wasserspiel',
    bereich: 'kinder',
    mapX: 50.5, mapY: 16.7,
    dauer: 30,
    planNr: '56',
    tiere: ['praeriebison'],
    beschreibung:
      'Grosser Spielbereich mit Klettergeraeten und Wasserspielstellen. Rundherum gibt es Baenke und Gastronomie - der uebliche Wendepunkt eines Familienbesuchs.',
    tipp: 'Bei warmem Wetter Wechselsachen einpacken. Kinder gehen am Wasserspiel zuverlaessig nass nach Hause.',
    kinder: true,
  },
  {
    id: 'japangarten',
    name: 'Japanischer Inselgarten',
    bereich: 'garten',
    mapX: 46.4, mapY: 40.2,
    dauer: 15,
    planNr: '27',
    tiere: [],
    beschreibung:
      'Ein angelegter Garten mit Teich, Bruecken und Koi-Karpfen. Keine Tierschau, sondern die ruhigste Ecke des Parks - ideal, wenn die Fuesse schwer werden.',
    tipp: 'Guter Ort fuer eine Pause zwischen zwei Parkhaelften. Von hier sind Elefanten und Afrika-Panorama beide schnell erreichbar.',
    barrierearm: true,
  },
  {
    id: 'alpakawiese',
    name: 'Alpakas & Nandus',
    bereich: 'suedamerika',
    mapX: 66, mapY: 16,
    dauer: 10,
    tiere: ['alpaka'],
    planNr: '60',
    beschreibung:
      'Wiesenanlage im Norden des Parks: Alpakas teilen sich das Gelaende mit Nandus, den grossen Laufvoegeln Suedamerikas.',
    tipp: 'Alpakas summen leise, wenn sie neugierig sind - einfach mal still hinhoeren.',
  },
  {
    id: 'tropenaquarium',
    name: 'Tropen-Aquarium',
    bereich: 'tropen',
    mapX: 91.5, mapY: 73.2,
    dauer: 75,
    tiere: ['hai', 'krokodil', 'rochen', 'clownfisch', 'riesenschlange', 'flughund'],
    innen: true,
    extraTicket: true,
    beschreibung:
      'Das Tropen-Aquarium ist ein eigenes Gebaeude am Rand des Parks und wurde 2007 eroeffnet. Auf mehreren Ebenen geht es durch Korallenriff, Regenwald, Hoehle und Wueste. Achtung: Dafuer wird ein eigenes Ticket beziehungsweise ein Kombiticket benoetigt.',
    tipp: 'Der beste Regenschutz im ganzen Park - und deshalb bei schlechtem Wetter voll. Wer kann, geht frueh oder in der letzten Stunde vor Schluss.',
  },
];

/*
 * Tiere. Die biologischen Angaben gelten fuer die Art allgemein.
 */
export const TIERE = [
  {
    id: 'eisbaer',
    name: 'Eisbaer',
    lateinisch: 'Ursus maritimus',
    bereich: 'eismeer',
    station: 'eismeer',
    kurz: 'Groesstes an Land lebendes Raubtier - und ein erstaunlich guter Schwimmer.',
    steckbrief: {
      Groesse: 'bis 2,5 m Koerperlaenge, aufgerichtet ueber 3 m',
      Gewicht: 'Maennchen 400-600 kg, Weibchen etwa halb so schwer',
      Alter: 'in Menschenobhut ueber 30 Jahre',
      Nahrung: 'vor allem Robben, dazu Fisch und Aas',
      Heimat: 'Arktis - Packeis rund um den Nordpol',
      Status: 'gefaehrdet (IUCN: vulnerable)',
    },
    text: [
      'Der Eisbaer ist an Kaelte so gut angepasst, dass Waerme sein eigentliches Problem ist. Unter dem Fell liegt eine bis zu elf Zentimeter dicke Fettschicht, die wie eine Thermoskanne wirkt.',
      'Sein Fell ist nicht weiss, sondern durchscheinend. Jedes Haar ist hohl und leitet Licht bis auf die Haut - und die ist schwarz, damit sie Waerme aufnimmt. Was wir als Weiss sehen, ist Lichtstreuung, aehnlich wie bei Schnee.',
      'Beim Schwimmen paddelt der Eisbaer nur mit den Vorderbeinen, die Hinterbeine dienen als Steuer. So kann er stundenlang zwischen Eisschollen unterwegs sein.',
    ],
    wusstest: [
      'Eisbaeren riechen eine Robbe unter einer Schneedecke noch aus etwa einem Kilometer Entfernung.',
      'Ihre Tatzen sind so breit wie ein Essteller - das verteilt das Gewicht auf duennem Eis.',
      'Sie halten keinen echten Winterschlaf. Nur traechtige Weibchen ziehen sich in eine Schneehoehle zurueck.',
    ],
    beobachten:
      'Am Unterwasserfenster warten. Wenn ein Eisbaer ins Wasser geht, sieht man von unten, wie leicht sich das schwere Tier bewegt.',
  },
  {
    id: 'walross',
    name: 'Walross',
    lateinisch: 'Odobenus rosmarus',
    bereich: 'eismeer',
    station: 'eismeer',
    kurz: 'Eine Tonne Robbe mit Stosszaehnen, Schnurrhaaren und viel Meinung.',
    steckbrief: {
      Groesse: 'bis 3,5 m',
      Gewicht: 'Bullen bis ueber 1.200 kg',
      Alter: '30 bis 40 Jahre',
      Nahrung: 'Muscheln und andere Bodentiere',
      Heimat: 'arktische Kuestengewaesser',
      Status: 'Vorwarnliste (IUCN: near threatened)',
    },
    text: [
      'Walrosse suchen ihr Futter am Meeresboden, und zwar im Dunkeln und im truebem Wasser. Dabei helfen ihnen die rund 400 Schnurrhaare, mit denen sie Muscheln ertasten wie mit Fingerspitzen.',
      'Die Stosszaehne sind verlaengerte Eckzaehne und werden bis zu einem Meter lang. Sie dienen als Kletterhilfe beim Aufsteigen aufs Eis, als Waffe und als Rangabzeichen: Wer die laengeren Zaehne hat, hat in der Gruppe das Sagen.',
      'An Land wirken Walrosse unbeholfen, im Wasser sind sie wendig und koennen bis zu 30 Minuten tauchen.',
    ],
    wusstest: [
      'Ein Walross kann pro Mahlzeit mehrere tausend Muscheln aufnehmen - es saugt den Weichkoerper heraus und laesst die Schale liegen.',
      'Die Haut der Bullen ist am Hals bis zu sechs Zentimeter dick, fast wie eine Ruestung.',
      'Bei Aufregung faerbt sich die Haut rosa, weil die Blutgefaesse sich weiten.',
    ],
    beobachten:
      'Wenn ein Walross direkt vor der Scheibe auftaucht, faellt die Groesse erst richtig auf. Es lohnt sich, unten am Fenster zu warten statt oben am Beckenrand.',
  },
  {
    id: 'pinguin',
    name: 'Pinguine',
    lateinisch: 'Spheniscidae',
    bereich: 'eismeer',
    station: 'eismeer',
    kurz: 'Voegel, die das Fliegen aufgegeben haben - unter Wasser dafuer aber perfekt sind.',
    steckbrief: {
      Groesse: 'je nach Art 45 cm bis 1,2 m',
      Gewicht: '5 bis 40 kg',
      Alter: '15 bis 25 Jahre',
      Nahrung: 'Fisch, Tintenfisch, Krill',
      Heimat: 'Suedhalbkugel - Antarktis, Suedamerika, Afrika',
      Status: 'je nach Art unterschiedlich',
    },
    text: [
      'Pinguine sind Voegel, aber ihre Fluegel sind zu starren Flossen umgebaut. Damit "fliegen" sie unter Wasser - mit bis zu 30 Stundenkilometern.',
      'Ihr Gefieder ist die dichteste Federdecke im Tierreich: bis zu 100 Federn pro Quadratzentimeter, wasserdicht eingefettet. Deshalb sieht man Pinguine so oft mit dem Schnabel im Gefieder - sie verteilen das Fett aus einer Druese am Buerzel.',
      'Kein Pinguin lebt am Nordpol. Alle Arten leben suedlich des Aequators, und ein Teil davon in durchaus warmen Regionen.',
    ],
    wusstest: [
      'Die schwarz-weisse Faerbung ist Tarnung: von oben verschwindet der dunkle Ruecken im Meeresgrund, von unten der helle Bauch im Gegenlicht.',
      'Pinguine erkennen ihren Partner und ihr Kueken am Ruf, selbst in einer Kolonie mit tausenden Tieren.',
      'An Land wirken sie langsam, aber auf dem Bauch rutschend erreichen sie ueber 20 km/h.',
    ],
    beobachten:
      'Nicht nur an Land schauen. Wer sich ans Unterwasserfenster stellt, sieht den Unterschied zwischen watschelndem Vogel und Raketenschwimmer sofort.',
  },
  {
    id: 'seebaer',
    name: 'Suedamerikanischer Seebaer',
    lateinisch: 'Arctocephalus australis',
    bereich: 'eismeer',
    station: 'seeloewen',
    kurz: 'Die flinke Ohrenrobbe mit dem dichten Pelz - Star der Schaufuetterung.',
    steckbrief: {
      Groesse: 'Bullen bis 1,9 m, Weibchen deutlich kleiner',
      Gewicht: 'Bullen bis 200 kg, Weibchen um 50 kg',
      Alter: '20 bis 30 Jahre',
      Nahrung: 'Fisch, Tintenfisch, Krebstiere',
      Heimat: 'Kuesten Suedamerikas - Pazifik und Atlantik',
      Status: 'nicht gefaehrdet (IUCN: least concern)',
    },
    text: [
      'Seebaeren gehoeren wie die Seeloewen zu den Ohrenrobben: Sie haben kleine sichtbare Ohrmuscheln und koennen ihre Hinterflossen nach vorn klappen. Deshalb laufen sie an Land erstaunlich flink auf allen vieren.',
      'Ihren Namen verdanken sie dem Fell. Anders als Seeloewen tragen Seebaeren einen dichten, zweischichtigen Pelz mit waermender Unterwolle - die aufgestellte, braeunliche Maehne der Bullen erinnerte Seefahrer an einen Baeren.',
      'Bei der Schaufuetterung geht es nicht um Kunststuecke um ihrer selbst willen. Die Uebungen sind medizinisches Training: Die Tiere lernen freiwillig, das Maul zu oeffnen, eine Flosse zu zeigen oder auf die Waage zu gehen, damit Untersuchungen ohne Narkose moeglich sind.',
      'Vor der Kueste jagen Seebaeren vor allem nachts und tauchen dabei meist in den oberen Wasserschichten - Tauchgaenge von zwei bis drei Minuten sind ihr Standard.',
    ],
    wusstest: [
      'Der dichte Pelz war fast ihr Verhaengnis: Wegen des Fells wurden Seebaeren jahrhundertelang stark bejagt.',
      'Ein Seebaer erkennt seinen Pfleger auf Entfernung an der Stimme.',
      'Unter Wasser steuern sie mit den Hinterflossen und rudern mit den Vorderflossen - wie Pinguine im Grossformat.',
    ],
    beobachten:
      'Zehn Minuten vor der Fuetterung dasein und einen Platz seitlich zur Sonne suchen, sonst blendet das Wasser auf allen Fotos.',
  },
  {
    id: 'elefant',
    name: 'Asiatischer Elefant',
    lateinisch: 'Elephas maximus',
    bereich: 'asien',
    station: 'elefanten',
    kurz: 'Kleinere Ohren, runder Ruecken - und ein Ruessel mit 40.000 Muskeln.',
    steckbrief: {
      Groesse: 'Schulterhoehe bis 3 m',
      Gewicht: '3 bis 5 t',
      Alter: '60 bis 70 Jahre',
      Nahrung: 'Graeser, Blaetter, Rinde, Fruechte - bis 150 kg am Tag',
      Heimat: 'Sued- und Suedostasien',
      Status: 'stark gefaehrdet (IUCN: endangered)',
    },
    text: [
      'Asiatische Elefanten unterscheiden sich vom afrikanischen Verwandten durch deutlich kleinere Ohren, einen gewoelbten Ruecken und einen Ruessel mit nur einem "Finger" an der Spitze statt zweien.',
      'Der Ruessel ist Nase, Hand, Trinkhalm und Werkzeug in einem. Er hat keinen einzigen Knochen, dafuer zehntausende Muskelbuendel - fein genug, um eine einzelne Erdnuss aufzuheben, stark genug fuer einen Baumstamm.',
      'Elefanten leben in Familienverbaenden aus Kuehen und Jungtieren, gefuehrt von der aeltesten Kuh. Bullen ziehen als Halbwuechsige weg und leben allein oder in losen Gruppen.',
      'Sie verstaendigen sich zu einem grossen Teil in Infraschall - Toenen so tief, dass Menschen sie nicht hoeren, die aber ueber Kilometer reichen.',
    ],
    wusstest: [
      'Elefanten trinken nicht durch den Ruessel. Sie saugen Wasser an und spritzen es sich ins Maul.',
      'Die grossen Ohren dienen der Kuehlung: Durch die duenne Haut fliesst viel Blut, das dabei Waerme abgibt.',
      'Ein Elefant erkennt sich im Spiegel selbst - das koennen ausser ihm nur wenige Tierarten.',
      'Sie "hoeren" mit den Fuessen: Erschuetterungen im Boden nehmen sie ueber die Sohlen wahr.',
    ],
    beobachten:
      'Schau auf die Rueckenlinie und die Ohren - danach erkennst du sofort, ob ein Elefant aus Asien oder Afrika stammt.',
  },
  {
    id: 'orangutan',
    name: 'Orang-Utan',
    lateinisch: 'Pongo',
    bereich: 'asien',
    station: 'orangutans',
    kurz: 'Der "Waldmensch" - ein Menschenaffe, der fast sein ganzes Leben in Baeumen verbringt.',
    steckbrief: {
      Groesse: 'bis 1,4 m, Armspannweite bis 2,3 m',
      Gewicht: 'Maennchen bis 90 kg, Weibchen etwa halb so schwer',
      Alter: 'in Menschenobhut ueber 50 Jahre',
      Nahrung: 'ueberwiegend Fruechte, dazu Blaetter, Rinde, Insekten',
      Heimat: 'Regenwaelder auf Borneo und Sumatra',
      Status: 'vom Aussterben bedroht (IUCN: critically endangered)',
    },
    text: [
      'Der Name kommt aus dem Malaiischen: orang hutan heisst "Waldmensch". Orang-Utans sind die groessten Baumbewohner der Welt und bewegen sich bedaechtig von Ast zu Ast, statt zu springen.',
      'Sie gelten als besonders erfinderisch. In freier Wildbahn nutzen sie Blaetter als Regenschirm und Stoecke als Werkzeug, in Zoos oeffnen sie regelmaessig Verschluesse, die eigentlich sicher sein sollten.',
      'Ausgewachsene Maennchen bilden breite Wangenwuelste aus. Diese Entwicklung setzt erst ein, wenn ein Maennchen in seiner Gruppe die dominante Rolle einnimmt.',
      'Die groesste Bedrohung ist der Verlust des Regenwaldes, vor allem durch Palmoelplantagen. Bewusster Einkauf zu Hause hat hier direkte Wirkung.',
    ],
    wusstest: [
      'Orang-Utans bauen sich jeden Abend ein neues Schlafnest aus Zweigen - rund 30.000 Nester im Leben.',
      'Jungtiere bleiben sechs bis acht Jahre bei der Mutter, laenger als bei fast jedem anderen Tier ausser dem Menschen.',
      'Ihr Erbgut stimmt zu etwa 97 Prozent mit unserem ueberein.',
    ],
    beobachten:
      'Stell dich an die Scheibe und warte still. Orang-Utans beobachten Besucher oft genauso aufmerksam wie umgekehrt.',
  },
  {
    id: 'tiger',
    name: 'Tiger',
    lateinisch: 'Panthera tigris',
    bereich: 'asien',
    station: 'tiger',
    kurz: 'Die groesste Katze der Welt - und jede hat ein einmaliges Streifenmuster.',
    steckbrief: {
      Groesse: 'Koerperlaenge bis 2,8 m mit Schwanz',
      Gewicht: 'je nach Unterart 100 bis 300 kg',
      Alter: '15 bis 20 Jahre',
      Nahrung: 'Huftiere wie Hirsche und Wildschweine',
      Heimat: 'Asien - von Sibirien bis Sumatra',
      Status: 'stark gefaehrdet (IUCN: endangered)',
    },
    text: [
      'Tiger sind Einzelgaenger mit grossen Revieren, die sie ueber Duftmarken und Kratzspuren markieren. Begegnungen zwischen erwachsenen Tieren sind selten und meist kurz.',
      'Das Streifenmuster ist so individuell wie ein Fingerabdruck. Forscher identifizieren einzelne Tiere in freier Wildbahn allein anhand von Fotofallenbildern.',
      'Anders als die meisten Katzen gehen Tiger gern ins Wasser. An heissen Tagen liegen sie stundenlang in Becken und Baechen.',
      'Sie jagen aus dem Anschleichen. Der eigentliche Angriff geht ueber wenige Meter - dafuer aber mit einer Wucht, die ein Beutetier von den Beinen holt.',
    ],
    wusstest: [
      'Auch die Haut eines Tigers ist gestreift, nicht nur das Fell.',
      'Tiger koennen aus dem Stand mehrere Meter weit springen.',
      'Ihr Bruellen enthaelt Infraschallanteile, die man eher spuert als hoert.',
    ],
    beobachten:
      'Such die erhoehten Plaetze der Anlage ab. Tiger liegen gern oben mit Uebersicht - dort sind sie am ehesten zu finden.',
  },
  {
    id: 'trampeltier',
    name: 'Trampeltier',
    lateinisch: 'Camelus ferus f. bactrianus',
    bereich: 'asien',
    station: 'kamele',
    kurz: 'Das Kamel mit zwei Hoeckern - gebaut fuer minus 30 bis plus 40 Grad.',
    steckbrief: {
      Groesse: 'Schulterhoehe bis 2,3 m',
      Gewicht: '450 bis 700 kg',
      Alter: '30 bis 40 Jahre',
      Nahrung: 'harte Graeser, Straeucher, auch salzige Pflanzen',
      Heimat: 'Steppen und Wuesten Zentralasiens',
      Status: 'Wildform vom Aussterben bedroht',
    },
    text: [
      'In den Hoeckern steckt kein Wasser, sondern Fett. Es dient als Energiespeicher - und weil das Fett gebuendelt oben sitzt statt ueber den ganzen Koerper verteilt, kann der Rest des Koerpers besser Waerme abgeben.',
      'Trampeltiere ueberstehen extreme Temperaturschwankungen. Im Winter waechst ein dichtes Wollkleid, das im Fruehjahr in groben Fetzen abfaellt - das sieht ungepflegt aus, ist aber normal.',
      'Sie koennen in wenigen Minuten mehr als 100 Liter Wasser trinken, ohne Schaden zu nehmen.',
    ],
    wusstest: [
      'Doppelte Wimpernreihen und verschliessbare Nasenloecher halten Sandstuerme ab.',
      'Kamele sind Passgaenger: Sie setzen beide Beine einer Koerperseite gleichzeitig - daher der schaukelnde Gang.',
      'Ihre Fusssohlen sind breite Schwielen, die auf Sand nicht einsinken.',
    ],
    beobachten:
      'Haengende Hoecker sind kein schlechtes Zeichen fuer die Haltung, sondern zeigen nur, wie voll der Fettspeicher gerade ist.',
  },
  {
    id: 'zebra',
    name: 'Zebra',
    lateinisch: 'Equus quagga',
    bereich: 'afrika',
    station: 'strausse',
    kurz: 'Gestreifte Wildpferde - und niemand hat zwei gleiche Muster.',
    steckbrief: {
      Groesse: 'Schulterhoehe bis 1,4 m',
      Gewicht: '250 bis 400 kg',
      Alter: '20 bis 30 Jahre',
      Nahrung: 'Graeser',
      Heimat: 'Savannen Ost- und Suedafrikas',
      Status: 'nicht gefaehrdet (IUCN: near threatened bei einigen Unterarten)',
    },
    text: [
      'Warum Zebras gestreift sind, war lange umstritten. Die derzeit beste Erklaerung: Die Streifen stoeren stechende Fliegen, die Traeger gefaehrlicher Krankheiten sind - sie landen auf gestreiften Flaechen deutlich seltener.',
      'Zebras leben in Familiengruppen aus einem Hengst, mehreren Stuten und Fohlen. Bei Wanderungen schliessen sich viele Gruppen zu grossen Herden zusammen.',
      'Sie sind wehrhafter als Hauspferde. Ein Zebratritt kann einen Loewen ernsthaft verletzen, und deshalb greifen Raubtiere bevorzugt Jungtiere an.',
    ],
    wusstest: [
      'Ein Zebrafohlen erkennt seine Mutter am Streifenmuster - deshalb stellt sie sich in den ersten Tagen zwischen Fohlen und Herde.',
      'Zebras schlafen im Stehen und immer im Wechsel: Mindestens ein Tier der Gruppe haelt Wache.',
      'Trotz Aehnlichkeit lassen sich Zebras nicht wie Pferde als Reittiere halten - sie sind zu schreckhaft und eigensinnig.',
    ],
    beobachten: 'Vergleiche zwei Tiere nebeneinander: Am Hals und an den Flanken sieht man die Musterunterschiede sofort.',
  },
  {
    id: 'strauss',
    name: 'Strauss',
    lateinisch: 'Struthio camelus',
    bereich: 'afrika',
    station: 'strausse',
    kurz: 'Groesster Vogel der Welt - kann nicht fliegen, aber schneller rennen als ein Rennrad faehrt.',
    steckbrief: {
      Groesse: 'bis 2,8 m',
      Gewicht: 'bis 150 kg',
      Alter: '40 bis 50 Jahre',
      Nahrung: 'Pflanzen, Samen, Insekten',
      Heimat: 'Afrikanische Savannen und Halbwuesten',
      Status: 'nicht gefaehrdet (IUCN: least concern)',
    },
    text: [
      'Strausse erreichen im Sprint bis zu 70 Stundenkilometer und halten 50 km/h ueber laengere Strecken. Moeglich macht das ein Fuss mit nur zwei Zehen - eine Bauweise wie ein Laufschuh.',
      'Dass Strausse bei Gefahr den Kopf in den Sand stecken, ist ein Maerchen. Sie legen bei Bedrohung Hals und Kopf flach auf den Boden, um von weitem wie ein Busch auszusehen.',
      'Ein Straussenei wiegt etwa 1,5 Kilogramm und entspricht rund 25 Huehnereiern. Die Schale ist so stabil, dass ein erwachsener Mensch darauf stehen kann.',
    ],
    wusstest: [
      'Das Auge eines Strausses ist etwa fuenf Zentimeter gross - groesser als sein Gehirn.',
      'Ein Tritt kann toedlich sein; die Zehe traegt eine kraeftige Kralle.',
      'Maennchen sind schwarz-weiss, Weibchen graubraun - so ist das Weibchen am Nest getarnt.',
    ],
    beobachten: 'Achte auf die Farbe: schwarz-weiss ist der Hahn, graubraun die Henne.',
  },
  {
    id: 'loewe',
    name: 'Loewe',
    lateinisch: 'Panthera leo',
    bereich: 'afrika',
    station: 'loewen',
    kurz: 'Die einzige Katze, die in festen Gruppen lebt - und die faulste dazu.',
    steckbrief: {
      Groesse: 'Koerperlaenge bis 2,5 m mit Schwanz',
      Gewicht: 'Maennchen bis 250 kg',
      Alter: '15 bis 20 Jahre',
      Nahrung: 'Huftiere wie Gnus, Zebras, Antilopen',
      Heimat: 'Afrika suedlich der Sahara, kleiner Restbestand in Indien',
      Status: 'gefaehrdet (IUCN: vulnerable)',
    },
    text: [
      'Loewen leben im Rudel: mehrere verwandte Weibchen mit Jungtieren und ein bis drei Maennchen. Die Weibchen jagen gemeinsam und meist in der Daemmerung.',
      'Bis zu 20 Stunden am Tag verbringen Loewen mit Ruhen. Das ist kein Zeichen von Langeweile, sondern Energiehaushalt: Jagen ist teuer, Verdauen dauert.',
      'Die Maehne des Maennchens zeigt Kondition an. Dunkler und voller bedeutet meist aelter und staerker - Rivalen und Weibchen lesen das auf Entfernung ab.',
      'Ein Bruellen ist bis zu acht Kilometer weit zu hoeren und dient der Reviermarkierung.',
    ],
    wusstest: [
      'Loewen sind die einzigen Grosskatzen mit deutlich unterschiedlichem Aussehen von Maennchen und Weibchen.',
      'Sie koennen kurzzeitig 60 km/h laufen, halten das aber nur ueber wenige hundert Meter durch.',
      'Junge Loewen haben Flecken im Fell, die sich erst mit der Zeit verlieren.',
    ],
    beobachten:
      'Sieh dir den Graben vor der Anlage an - er ist das eigentliche "Gitter". Genau diese Bauweise hat Hagenbeck beruehmt gemacht.',
  },
  {
    id: 'flamingo',
    name: 'Flamingo',
    lateinisch: 'Phoenicopterus',
    bereich: 'afrika',
    station: 'flamingoteich',
    kurz: 'Rosa wird man hier nicht geboren - man frisst sich rosa.',
    steckbrief: {
      Groesse: '1,2 bis 1,5 m',
      Gewicht: '2 bis 4 kg',
      Alter: 'oft ueber 30 Jahre',
      Nahrung: 'Kleinkrebse, Algen, Insektenlarven',
      Heimat: 'Salzseen und Lagunen in Afrika, Asien, Amerika, Suedeuropa',
      Status: 'nicht gefaehrdet (IUCN: least concern)',
    },
    text: [
      'Die rosa Farbe stammt aus der Nahrung. Kleinkrebse und Algen enthalten Carotinoide, die sich im Gefieder einlagern. Ohne diese Stoffe wuerden Flamingos weiss bleiben.',
      'Flamingos fressen mit dem Kopf verkehrt herum im Wasser. Der Schnabel arbeitet wie ein Sieb: Wasser wird angesaugt und durch feine Lamellen wieder herausgedrueckt, die Nahrung bleibt haengen.',
      'Das Stehen auf einem Bein spart Waerme. Im kuehlen Wasser verliert ein eingezogenes Bein keine Koerperwaerme - und die Haltung kostet die Voegel praktisch keine Kraft.',
    ],
    wusstest: [
      'Flamingos bruueten auf kegelfoermigen Schlammhuegeln, die sie selbst aufbauen.',
      'Beide Eltern fuettern das Kueken mit einer roetlichen "Kropfmilch".',
      'In Kolonien fuehren sie gemeinsame Balzparaden auf - hunderte Voegel drehen gleichzeitig die Koepfe.',
    ],
    beobachten: 'Sieh dir das Gefieder verschiedener Tiere an - je kraeftiger das Rosa, desto besser die Naehrstoffversorgung.',
  },
  {
    id: 'riesenotter',
    name: 'Riesenotter',
    lateinisch: 'Pteronura brasiliensis',
    bereich: 'suedamerika',
    station: 'alpakas',
    kurz: 'Der groesste Otter der Welt - lebt in Familie und redet fast ohne Pause.',
    steckbrief: {
      Groesse: 'bis 1,8 m mit Schwanz',
      Gewicht: '22 bis 32 kg',
      Alter: '10 bis 15 Jahre, in Menschenobhut laenger',
      Nahrung: 'vor allem Fisch, dazu Krebse',
      Heimat: 'Fluesse des Amazonas- und Orinoco-Gebiets',
      Status: 'stark gefaehrdet (IUCN: endangered)',
    },
    text: [
      'Riesenotter leben in Familiengruppen aus einem Elternpaar und dem Nachwuchs mehrerer Jahre. Gejagt wird gemeinsam - eine Gruppe treibt Fischschwaerme zusammen wie ein Rudel Woelfe, daher der suedamerikanische Name "Flusswolf".',
      'Sie sind ausgesprochen gespraechig: Forscher unterscheiden mehr als 20 verschiedene Rufe, vom Bettel-Quieken der Jungen bis zum Alarmschnauben. Auch an der Anlage ist fast immer etwas zu hoeren.',
      'Jeder Riesenotter traegt an der Kehle eine helle, unregelmaessige Zeichnung - so individuell wie ein Fingerabdruck. Beim Aufrichten im Wasser zeigen sich die Tiere gegenseitig ihre Kehlflecken.',
      'In Suedamerika sind Riesenotter durch Jagd, Goldwaesche und Lebensraumverlust selten geworden; Zoos koordinieren die Zucht in einem europaeischen Erhaltungsprogramm.',
    ],
    wusstest: [
      'Der abgeflachte Schwanz wirkt wie ein Paddel - im Sprint schwimmt ein Riesenotter schneller, als ein Mensch laufen kann.',
      'Riesenotter fressen taeglich etwa drei bis vier Kilogramm Fisch - gehalten wird die Beute mit den Vorderpfoten wie mit Haenden.',
      'Zum Schlafen und fuer die Jungen graebt die Familie Hoehlen in die Uferboeschung.',
    ],
    beobachten:
      'Auf die Kehlflecken achten: Damit lassen sich die einzelnen Familienmitglieder auseinanderhalten.',
  },
  {
    id: 'alpaka',
    name: 'Alpaka',
    lateinisch: 'Vicugna pacos',
    bereich: 'suedamerika',
    station: 'alpakawiese',
    kurz: 'Kleinkamel aus den Anden - seit ueber 5.000 Jahren wegen der Wolle gehalten.',
    steckbrief: {
      Groesse: 'Schulterhoehe etwa 1 m',
      Gewicht: '55 bis 75 kg',
      Alter: '15 bis 20 Jahre',
      Nahrung: 'Graeser und Kraeuter',
      Heimat: 'Hochanden in Peru, Bolivien, Chile',
      Status: 'Haustierform, nicht gefaehrdet',
    },
    text: [
      'Alpakas sind Kamele ohne Hoecker. Sie stammen vom wilden Vikunja ab und wurden von den Andenvoelkern ueber Jahrtausende auf Wollqualitaet gezuechtet.',
      'Ihre Wolle ist waermer als Schafwolle und enthaelt kein Wollfett, deshalb reagieren viele Menschen mit Wollallergie darauf nicht.',
      'In der Gruppe klaeren sie Rangfragen mit Halsringen, Spucken und Drohblicken - fuer Menschen ist das Spucken selten ein Thema.',
      'Alpakas nutzen gemeinsame Kotplaetze. Das haelt die Weide sauber und begrenzt Parasiten.',
    ],
    wusstest: [
      'Alpakas summen leise, wenn sie unsicher oder neugierig sind.',
      'Ein Tier liefert pro Schur etwa drei Kilogramm Wolle.',
      'Sie haben gespaltene Sohlen mit Schwielen statt Hufen und schaedigen die Grasnarbe kaum.',
    ],
    beobachten: 'Ohrenstellung beachten: nach vorn heisst interessiert, flach angelegt heisst genervt.',
  },
  {
    id: 'zwergziege',
    name: 'Zwergziege',
    lateinisch: 'Capra hircus',
    bereich: 'kinder',
    station: 'streichelgehege',
    kurz: 'Klein, frech, kletterfreudig - das Tier zum Anfassen.',
    steckbrief: {
      Groesse: 'Schulterhoehe 40 bis 60 cm',
      Gewicht: '20 bis 35 kg',
      Alter: '12 bis 15 Jahre',
      Nahrung: 'Heu, Laub, Kraeuter',
      Heimat: 'Haustierform, urspruenglich Westafrika',
      Status: 'Haustierrasse',
    },
    text: [
      'Zwergziegen sind neugierig und kontaktfreudig - genau deshalb stehen sie im Streichelgehege. Sie klettern gern auf alles, was hoeher ist als sie selbst.',
      'Ihre waagerechten, rechteckigen Pupillen geben ein sehr breites Blickfeld von fast 320 Grad. Eine Ziege sieht dich also auch dann, wenn sie scheinbar wegschaut.',
      'Ziegen sind keine Allesfresser. Papier, Plastik und mitgebrachtes Brot machen sie krank - Futter nur aus den Automaten des Parks.',
    ],
    wusstest: [
      'Ziegen erkennen die Gesichter vertrauter Menschen und bevorzugen freundliche Mienen.',
      'Sie haben keine oberen Schneidezaehne, sondern eine harte Kauplatte.',
      'Die Ziege war eines der ersten Nutztiere des Menschen - domestiziert vor rund 10.000 Jahren.',
    ],
    beobachten: 'Streicheln am Hals und an der Schulter, nicht am Kopf - Hoerner sind kein Griff.',
    kinder: true,
  },
  {
    id: 'hai',
    name: 'Riffhaie',
    lateinisch: 'Carcharhinidae',
    bereich: 'tropen',
    station: 'tropenaquarium',
    kurz: 'Perfekt gebaute Jaeger - und deutlich harmloser als ihr Ruf.',
    steckbrief: {
      Groesse: 'je nach Art 1,5 bis 2 m',
      Gewicht: '20 bis 50 kg',
      Alter: '20 bis 25 Jahre',
      Nahrung: 'Fisch, Tintenfisch, Krebse',
      Heimat: 'tropische Korallenriffe',
      Status: 'mehrere Arten gefaehrdet',
    },
    text: [
      'Haie sind aelter als Baeume: Ihre Bauform existiert seit ueber 400 Millionen Jahren. Ihr Skelett besteht nicht aus Knochen, sondern aus Knorpel - leichter und biegsamer.',
      'Sie besitzen ein zusaetzliches Sinnesorgan, die Lorenzinischen Ampullen. Damit nehmen sie schwaechste elektrische Felder wahr, wie sie jeder Muskel erzeugt. Ein Hai findet Beute damit selbst im Sand.',
      'Haizaehne stehen in mehreren Reihen. Faellt einer aus, rueckt der naechste nach - im Lauf eines Lebens sind das tausende.',
      'Weltweit gibt es pro Jahr eine sehr geringe zweistellige Zahl an Haiunfaellen - waehrend der Mensch jaehrlich zig Millionen Haie toetet.',
    ],
    wusstest: [
      'Haihaut fuehlt sich wie Schmirgelpapier an: Sie besteht aus winzigen Zaehnchen, die den Wasserwiderstand senken.',
      'Viele Haie muessen schwimmen, um Wasser ueber die Kiemen zu bekommen.',
      'Ihr Geruchssinn erkennt Blut in extremer Verduennung - allerdings nicht "kilometerweit", wie oft behauptet.',
    ],
    beobachten:
      'Im grossen Becken lohnt sich, einen Hai zwei, drei Runden zu verfolgen. Der Weg wiederholt sich - Haie schwimmen bevorzugte Bahnen.',
  },
  {
    id: 'krokodil',
    name: 'Krokodile',
    lateinisch: 'Crocodylia',
    bereich: 'tropen',
    station: 'tropenaquarium',
    kurz: 'Lebende Fossilien mit dem staerksten Biss der Tierwelt.',
    steckbrief: {
      Groesse: 'je nach Art 2 bis 6 m',
      Gewicht: 'bis ueber 1.000 kg',
      Alter: '50 bis 80 Jahre',
      Nahrung: 'Fisch, Voegel, Saeugetiere',
      Heimat: 'Tropen und Subtropen weltweit',
      Status: 'je nach Art unterschiedlich',
    },
    text: [
      'Krokodile gibt es seit rund 200 Millionen Jahren in nahezu unveraenderter Bauform. Sie sind naeher mit Voegeln verwandt als mit Echsen.',
      'Der Biss eines grossen Krokodils ist der staerkste gemessene im Tierreich. Die Muskeln zum Oeffnen des Mauls sind dagegen schwach - ein Grund, warum ein umwickeltes Maul sicher zu ist.',
      'Sie sind wechselwarm und regeln ihre Temperatur durch Ortswechsel: Sonne zum Aufwaermen, Wasser oder Schatten zum Abkuehlen. Deshalb liegen sie stundenlang bewegungslos.',
      'Krokodilmuetter bewachen ihr Gelege und tragen die frisch geschluepften Jungen im Maul zum Wasser - ausgesprochene Brutpflege fuer ein Reptil.',
    ],
    wusstest: [
      'Ob aus einem Ei ein Maennchen oder Weibchen wird, entscheidet die Bruttemperatur.',
      'Ein Krokodil kann seinen Stoffwechsel so weit herunterfahren, dass es monatelang ohne Nahrung auskommt.',
      'Die Schuppen tragen Drucksensoren, mit denen kleinste Wellenbewegungen wahrgenommen werden.',
    ],
    beobachten: 'Achte auf die Augen: Auch scheinbar schlafende Krokodile verfolgen Bewegungen vor der Scheibe.',
  },
  {
    id: 'rochen',
    name: 'Rochen',
    lateinisch: 'Batoidea',
    bereich: 'tropen',
    station: 'tropenaquarium',
    kurz: 'Flach gebaute Verwandte der Haie, die ueber den Boden "fliegen".',
    steckbrief: {
      Groesse: 'je nach Art 40 cm bis mehrere Meter Spannweite',
      Gewicht: 'stark artabhaengig',
      Alter: '15 bis 25 Jahre',
      Nahrung: 'Muscheln, Krebse, kleine Fische',
      Heimat: 'Meere weltweit, einige Arten in Fluessen',
      Status: 'viele Arten gefaehrdet',
    },
    text: [
      'Rochen sind Knorpelfische und damit enge Verwandte der Haie - im Grunde flachgedrueckte Haie mit stark vergroesserten Brustflossen.',
      'Maul und Kiemen liegen auf der Unterseite. Damit beim Liegen im Sand kein Sand eingesogen wird, atmen Rochen ueber zwei Oeffnungen oben am Kopf, die Spritzloecher.',
      'Was auf der Unterseite wie ein laechelndes Gesicht aussieht, ist das Maul mit den Nasengruben - Augen sitzen oben.',
    ],
    wusstest: [
      'Manche Rochenarten erzeugen Stromstoesse zur Verteidigung.',
      'Ihr Stachel ist eine Verteidigungswaffe, kein Jagdwerkzeug.',
      'Rochen koennen mehrere Jahrzehnte alt werden und vermehren sich sehr langsam - deshalb sind sie durch Fischerei stark gefaehrdet.',
    ],
    beobachten: 'Vom Beckenrand aus von oben schauen: Der Wellenschlag der Flossenraender ist von dort am besten zu sehen.',
  },
  {
    id: 'clownfisch',
    name: 'Clownfisch & Korallenriff',
    lateinisch: 'Amphiprion',
    bereich: 'tropen',
    station: 'tropenaquarium',
    kurz: 'Der Fisch, der in einer giftigen Anemone wohnt - und dabei alle Weibchen stellt.',
    steckbrief: {
      Groesse: '7 bis 12 cm',
      Gewicht: 'wenige Gramm',
      Alter: '6 bis 10 Jahre',
      Nahrung: 'Plankton, Algen, Futterreste der Anemone',
      Heimat: 'Korallenriffe im Indopazifik',
      Status: 'nicht gefaehrdet',
    },
    text: [
      'Clownfische leben in Seeanemonen, deren Nesselzellen fuer andere Fische gefaehrlich sind. Eine Schleimschicht schuetzt sie - und sie gewoehnen die Anemone langsam an sich, indem sie sie anfangs nur kurz beruehren.',
      'Alle Clownfische werden als Maennchen geboren. Stirbt das dominante Weibchen einer Gruppe, wandelt sich das ranghoechste Maennchen in ein Weibchen um.',
      'Das Korallenriff selbst ist ein Tier-Bauwerk: Winzige Polypen bauen ueber Jahrtausende Kalkskelette. Ihre Farbe stammt von Algen, die in ihnen leben - stossen sie diese bei zu warmem Wasser ab, bleicht das Riff aus.',
    ],
    wusstest: [
      'Ein Clownfischpaar verteidigt seine Anemone gegen deutlich groessere Fische.',
      'Riffe bedecken weniger als ein Prozent des Meeresbodens, beherbergen aber rund ein Viertel aller Meeresarten.',
      'Korallen fressen nachts - dann strecken sie ihre Tentakel aus.',
    ],
    beobachten:
      'Vor dem Riffbecken einfach mal zwei Minuten stehenbleiben und nur eine Anemone beobachten. Es passiert mehr, als man auf den ersten Blick sieht.',
  },
  {
    id: 'riesenschlange',
    name: 'Riesenschlangen',
    lateinisch: 'Boidae & Pythonidae',
    bereich: 'tropen',
    station: 'tropenaquarium',
    kurz: 'Kein Gift, dafuer Muskeln - und ein Kiefer, der sich aushaengen laesst.',
    steckbrief: {
      Groesse: 'je nach Art 3 bis 8 m',
      Gewicht: 'bis ueber 100 kg',
      Alter: '20 bis 30 Jahre',
      Nahrung: 'Saeugetiere und Voegel',
      Heimat: 'Tropen Afrikas, Asiens und Suedamerikas',
      Status: 'je nach Art unterschiedlich',
    },
    text: [
      'Riesenschlangen sind Wuerger. Sie halten die Beute mit den Zaehnen fest und legen Koerperschlingen darum. Mit jedem Ausatmen des Beutetiers ziehen sie enger - der Kreislauf bricht schneller zusammen, als frueher angenommen wurde.',
      'Ihr Unterkiefer ist nicht starr mit dem Schaedel verbunden und in der Mitte nur durch ein dehnbares Band verbunden. Deshalb koennen sie Beute verschlingen, die dicker ist als sie selbst.',
      'Nach einer grossen Mahlzeit verdauen sie wochenlang und bewegen sich kaum. Manche Arten fressen nur wenige Male im Jahr.',
      'Viele Arten besitzen Grubenorgane an den Lippen, mit denen sie Waermebilder ihrer Umgebung wahrnehmen - sie "sehen" warme Beute im Dunkeln.',
    ],
    wusstest: [
      'Schlangen haben keine Augenlider. Ueber dem Auge liegt eine durchsichtige Schuppe, die bei der Haeutung mit abgeht.',
      'Sie riechen mit der Zunge: Die gespaltene Spitze bringt Duftteilchen an ein Sinnesorgan im Gaumen.',
      'Anakondas sind die schwersten, Netzpythons die laengsten Schlangen der Welt.',
    ],
    beobachten: 'Such nach der abgestreiften Haut im Terrarium - daran laesst sich die Groesse gut abschaetzen.',
  },
  {
    id: 'flughund',
    name: 'Flughunde',
    lateinisch: 'Pteropodidae',
    bereich: 'tropen',
    station: 'tropenaquarium',
    kurz: 'Fliegende Saeugetiere, die kopfueber schlafen und Fruechte lieben.',
    steckbrief: {
      Groesse: 'Spannweite bis 1,5 m bei grossen Arten',
      Gewicht: '100 g bis 1,5 kg',
      Alter: '15 bis 30 Jahre',
      Nahrung: 'Fruechte und Nektar',
      Heimat: 'Tropen Afrikas, Asiens und Australiens',
      Status: 'einige Arten gefaehrdet',
    },
    text: [
      'Flughunde sind die einzigen Saeugetiere, die aktiv fliegen koennen - ihre Fluegel sind Hautspannen zwischen stark verlaengerten Fingern.',
      'Anders als die meisten Fledermaeuse orientieren sich Flughunde ueberwiegend mit Augen und Nase statt per Echoortung. Ihre Sicht ist bei Daemmerung ausgezeichnet.',
      'Sie sind wichtige Bestaeuber und Samenverbreiter. Viele tropische Baeume - darunter Durian und wilde Bananen - haengen von ihnen ab.',
      'Kopfueber zu haengen kostet sie keine Kraft: Die Krallen halten durch das eigene Koerpergewicht, ein Sperrmechanismus in den Sehnen macht es moeglich.',
    ],
    wusstest: [
      'Beim Hangeln benutzen sie die Daumenkrallen wie Haken.',
      'Ein Flughund kann in einer Nacht mehr als sein eigenes Koerpergewicht an Fruechten verwerten.',
      'Ihr Flugbild ist deutlich ruhiger und gleitender als das kleiner Fledermaeuse.',
    ],
    beobachten:
      'In der Daemmerungsabteilung erst ein bis zwei Minuten stehenbleiben, bis sich die Augen anpassen - dann sieht man deutlich mehr.',
  },
  {
    id: 'kamtschatkabaer',
    name: 'Kamtschatkabaer',
    lateinisch: 'Ursus arctos beringianus',
    bereich: 'asien',
    station: 'kamele',
    kurz: 'Einer der groessten Braunbaeren der Welt - Lachsfaenger aus dem fernen Osten Russlands.',
    steckbrief: {
      Groesse: 'aufgerichtet bis 3 m',
      Gewicht: 'Maennchen bis 650 kg',
      Alter: '25 bis 35 Jahre',
      Nahrung: 'Allesfresser - Fisch, Beeren, Kraeuter, Aas',
      Heimat: 'Halbinsel Kamtschatka, Russland',
      Status: 'Unterart nicht bedroht, streng geschuetzt',
    },
    text: [
      'Der Kamtschatkabaer ist eine der groessten Unterarten des Braunbaeren - nur der Kodiakbaer wird noch schwerer. Auf der Halbinsel Kamtschatka lebt die dichteste Braunbaeren-Population der Erde.',
      'Sein Speiseplan haengt an der Jahreszeit: Im Sommer stehen die Baeren an den Fluessen und fangen wandernde Lachse, im Herbst fressen sie sich an Beeren einen Winterspeck von weit ueber 100 Kilogramm an.',
      'Den Winter verbringen Braunbaeren in einer Winterruhe - kein echter Winterschlaf, denn die Koerpertemperatur sinkt nur wenig und die Tiere sind leicht zu wecken.',
    ],
    wusstest: [
      'Trotz seiner Masse sprintet ein Braunbaer kurzzeitig ueber 50 km/h.',
      'Baeren sehen maessig, riechen aber besser als jeder Spuerhund.',
      'Hagenbeck zeigt Kamtschatkabaeren als einer von sehr wenigen Zoos in Europa.',
    ],
    beobachten:
      'Fuetterungszeiten beachten - beim Fressen zeigen die Baeren, wie geschickt ihre grossen Pranken sind.',
  },
  {
    id: 'leopard',
    name: 'Nordchinesischer Leopard',
    lateinisch: 'Panthera pardus japonensis',
    bereich: 'asien',
    station: 'tiger',
    kurz: 'Eine der seltensten Grosskatzen der Welt - und ein Meister im Klettern.',
    steckbrief: {
      Groesse: 'Koerperlaenge bis 1,9 m mit Schwanz',
      Gewicht: '35 bis 75 kg',
      Alter: '15 bis 20 Jahre',
      Nahrung: 'Hirsche, Wildschweine, kleinere Saeugetiere',
      Heimat: 'Bergwaelder Nordchinas',
      Status: 'Unterart stark bedroht, in Zoos sehr selten',
    },
    text: [
      'Der Nordchinesische Leopard traegt ein besonders kraeftig gefaerbtes Fell mit grossen, dunkel geraenderten Rosetten. In freier Wildbahn gibt es nur noch wenige hundert Tiere, und auch in Zoos ist die Unterart eine Raritaet.',
      'Leoparden sind die besten Kletterer unter den Grosskatzen. Ihre Beute ziehen sie in freier Wildbahn auf Baeume, um sie vor Konkurrenten in Sicherheit zu bringen - ein erwachsener Leopard stemmt dabei mehr als sein eigenes Koerpergewicht senkrecht nach oben.',
      'Wie alle Leoparden sind sie Einzelgaenger und vor allem in der Daemmerung aktiv. Tagsueber ruhen sie gern erhoeht mit Ueberblick.',
    ],
    wusstest: [
      'Jede Rosette im Fell ist einmalig - wie beim Tiger die Streifen.',
      'Leoparden springen aus dem Stand ueber drei Meter hoch.',
      'Das europaeische Zuchtprogramm fuer diese Unterart umfasst nur eine Handvoll Zoos - Hagenbeck gehoert dazu.',
    ],
    beobachten:
      'Zuerst die erhoehten Plattformen und Baeume absuchen - Leoparden liegen fast immer oben.',
  },
  {
    id: 'praeriebison',
    name: 'Praeriebison',
    lateinisch: 'Bison bison bison',
    bereich: 'amerika',
    station: 'spielplatz',
    kurz: 'Das schwerste Landtier Nordamerikas - und eine Rettungsgeschichte.',
    steckbrief: {
      Groesse: 'Schulterhoehe bis 1,9 m',
      Gewicht: 'Bullen bis 900 kg',
      Alter: '15 bis 25 Jahre',
      Nahrung: 'Graeser',
      Heimat: 'Prairien Nordamerikas',
      Status: 'Bestand stabil, aber auf Schutzgebiete beschraenkt',
    },
    text: [
      'Einst zogen zig Millionen Bisons durch die nordamerikanischen Prairien. Ende des 19. Jahrhunderts waren nach der Bejagung weniger als tausend Tiere uebrig - erst Schutzprogramme, auch mit Zoo-Tieren, retteten die Art.',
      'Der maechtige Buckel besteht aus Muskeln, die den riesigen Kopf tragen. Im Winter schiebt ein Bison damit den Schnee beiseite, um an das Gras darunter zu kommen.',
      'Trotz ihrer Masse sind Bisons erstaunlich beweglich: Sie erreichen im Galopp ueber 50 km/h und springen aus dem Stand hoeher, als ein Weidezaun misst.',
    ],
    wusstest: [
      'Das dichte Winterfell isoliert so gut, dass Schnee auf dem Ruecken liegen bleibt, ohne zu schmelzen.',
      'Bisons waelzen sich in Staubmulden - das pflegt das Fell und vertreibt Insekten.',
      'Kaelber kommen rotbraun zur Welt und faerben sich erst nach Monaten dunkel.',
    ],
    beobachten:
      'Im Fruehsommer verlieren Bisons ihr Winterfell in grossen Fetzen - das sieht wild aus, ist aber voellig normal.',
  },
  {
    id: 'mandrill',
    name: 'Mandrill',
    lateinisch: 'Mandrillus sphinx',
    bereich: 'afrika',
    station: 'loewen',
    kurz: 'Der bunteste Affe der Welt - je kraeftiger die Farben, desto hoeher der Rang.',
    steckbrief: {
      Groesse: 'Maennchen bis 80 cm Koerperlaenge',
      Gewicht: 'Maennchen bis 35 kg, Weibchen etwa halb so schwer',
      Alter: '20 bis 30 Jahre',
      Nahrung: 'Fruechte, Samen, Insekten, kleine Wirbeltiere',
      Heimat: 'Regenwaelder Zentralafrikas',
      Status: 'gefaehrdet (IUCN: vulnerable)',
    },
    text: [
      'Mandrille sind die groessten Affen ausserhalb der Menschenaffen - und die farbenpraechtigsten Saeugetiere ueberhaupt: Die Maennchen tragen leuchtend blaue Wuelste und eine rote Nase, dazu ein gelbes Backenbart-Feld.',
      'Die Farben sind ein Rangabzeichen. Je kraeftiger Blau und Rot leuchten, desto hoeher steht das Maennchen in der Gruppe - verliert es Kaempfe, verblassen die Farben messbar.',
      'In den Waeldern Zentralafrikas ziehen Mandrille in Horden umher, die zeitweise mehrere hundert Tiere umfassen - die groessten bekannten Affenverbaende der Welt.',
    ],
    wusstest: [
      'In den dehnbaren Backentaschen traegt ein Mandrill einen Vorrat davon, was er unterwegs findet.',
      'Das Gaehnen mit weit geoeffnetem Maul ist eine Drohung - dabei zeigen die Maennchen ihre bis zu 6 cm langen Eckzaehne.',
      'Mandrille verstaendigen sich auch ueber Mimik und leise Grunzlaute - dauerhaft laut sind sie nur bei Streit.',
    ],
    beobachten:
      'Auf die Gesichter achten: Ranghohe Maennchen erkennst du sofort an den leuchtenden Farben.',
  },
  {
    id: 'riesenkaenguru',
    name: 'Rotes Riesenkaenguru',
    lateinisch: 'Osphranter rufus',
    bereich: 'australien',
    station: 'loewen',
    kurz: 'Das groesste Beuteltier der Welt - springt weiter als ein Auto lang ist.',
    steckbrief: {
      Groesse: 'aufgerichtet bis 1,8 m',
      Gewicht: 'Maennchen bis 90 kg',
      Alter: '15 bis 20 Jahre',
      Nahrung: 'Graeser und Kraeuter',
      Heimat: 'Trockengebiete Australiens',
      Status: 'nicht gefaehrdet (IUCN: least concern)',
    },
    text: [
      'Rote Riesenkaengurus sind die groessten Beuteltiere der Erde. Ein fluechtendes Tier schafft Spruenge von ueber neun Metern Weite und haelt dabei 50 km/h - der dicke Schwanz dient als Gegengewicht und Stuetze.',
      'Das Junge kommt nach nur einem Monat Tragzeit winzig zur Welt - nackt, blind und kaum so gross wie ein Gummibaerchen. Es klettert selbststaendig in den Beutel und waechst dort viele Monate weiter.',
      'Kaengurus koennen ein befruchtetes Ei in Wartestellung halten: Erst wenn der Beutel frei wird, entwickelt es sich weiter. So passt sich der Nachwuchs an Duerrezeiten an.',
      'Maennchen klaeren Rangfragen im "Boxkampf": Sie stuetzen sich auf den Schwanz und treten mit beiden Hinterbeinen gleichzeitig zu.',
    ],
    wusstest: [
      'Rueckwaerts gehen koennen Kaengurus nicht - ihr Koerperbau laesst es nicht zu.',
      'Beim Huepfen sparen Kaengurus Energie: Die Sehnen der Hinterbeine federn wie Sprungfedern.',
      'Zum Abkuehlen lecken sie sich die Unterarme - die verdunstende Feuchtigkeit kuehlt das Blut.',
    ],
    beobachten:
      'In der Mittagshitze doesen Kaengurus im Schatten - morgens und am spaeten Nachmittag sind sie in Bewegung.',
  },
  {
    id: 'onager',
    name: 'Onager',
    lateinisch: 'Equus hemionus onager',
    bereich: 'asien',
    station: 'kamele',
    kurz: 'Der Halbesel aus Persien - eines der schnellsten und seltensten Wildpferde.',
    steckbrief: {
      Groesse: 'Schulterhoehe bis 1,4 m',
      Gewicht: '200 bis 260 kg',
      Alter: '25 bis 30 Jahre',
      Nahrung: 'harte Graeser und Straeucher',
      Heimat: 'Halbwuesten des Iran',
      Status: 'Wildbestand stark bedroht',
    },
    text: [
      'Der Onager ist ein Halbesel: kein Esel und kein Pferd, sondern eine eigene Wildform dazwischen. In seiner iranischen Heimat leben nur noch wenige hundert Tiere in zwei Schutzgebieten.',
      'Halbesel sind die Sprinter unter den Pferdeartigen - kurzzeitig erreichen sie 70 km/h und halten hohes Tempo laenger durch als die meisten Verfolger.',
      'An das Leben in der Halbwueste sind Onager bestens angepasst: Sie kommen tagelang mit wenig Wasser aus und fressen Pflanzen, die andere Pflanzenfresser stehen lassen.',
      'Zoos betreiben fuer den Onager ein europaeisches Erhaltungszuchtprogramm - Nachzuchten wurden bereits im Iran und in Saudi-Arabien ausgewildert.',
    ],
    wusstest: [
      'Schon in der Antike galten Onager als unzaehmbar - anders als Esel liessen sie sich nie als Lasttiere halten.',
      'Der dunkle Aalstrich auf dem Ruecken ist bei jedem Tier unterschiedlich breit.',
      'Onager waelzen sich taeglich im Sand - das pflegt Haut und Fell.',
    ],
    beobachten:
      'Onager wirken unscheinbar - aber du siehst hier eines der seltensten Huftiere, die ein Zoo zeigen kann.',
  },
];

/*
 * Touren. minuten = grobe Gehzeit inkl. Aufenthalt.
 * stationen: Reihenfolge der Stationen mit optionalem Fokus-Text.
 */
export const TOUREN = [
  {
    id: 'klassiker',
    titel: 'Die grossen Klassiker',
    schwerpunkt: 'Hoehepunkte',
    emoji: '⭐',
    minuten: 180,
    laenge: 'ca. 3 km',
    fuer: 'Erster Besuch, Gaeste, "einmal alles Wichtige"',
    beschreibung:
      'Die Runde fuer den ersten Besuch: Eismeer, Elefanten, Afrika-Panorama und die Seebaeren-Fuetterung. Wenig Umwege, alle bekannten Anlagen einmal mitgenommen.',
    stationen: [
      { id: 'haupteingang', fokus: 'Fuetterungszeiten am Aushang fotografieren' },
      { id: 'elefanten', fokus: 'Zeit lassen - hier bleiben die meisten am laengsten' },
      { id: 'orangutans' },
      { id: 'tiger' },
      { id: 'flamingoteich' },
      { id: 'japangarten', fokus: 'Ruhige Pause auf halber Strecke' },
      { id: 'loewen' },
      { id: 'afrikapanorama', fokus: 'Die beruehmte Panorama-Perspektive' },
      { id: 'seeloewen', fokus: 'Zeitlich an der Schaufuetterung ausrichten' },
      { id: 'eismeer', fokus: 'Unterwasserfenster nicht auslassen' },
    ],
  },
  {
    id: 'familie',
    titel: 'Mit Kindern durch den Park',
    schwerpunkt: 'Familie',
    emoji: '👨‍👩‍👧',
    minuten: 210,
    laenge: 'ca. 2,5 km',
    fuer: 'Kinder von etwa 3 bis 10 Jahren',
    beschreibung:
      'Kurze Wege, viel Anfassen und Spielen, planbare Pausen. Die Route wechselt bewusst zwischen Tieren schauen und Toben - so haelt die Laune laenger.',
    stationen: [
      { id: 'haupteingang' },
      { id: 'elefanten' },
      { id: 'kamele' },
      { id: 'alpakas' },
      { id: 'spielplatz', fokus: 'Lange Pause einplanen, Verpflegung in der Naehe' },
      { id: 'flamingoteich', fokus: 'Kurzer Halt am Wasser' },
      { id: 'streichelgehege', fokus: 'Zum Anfassen - Haende waschen nicht vergessen' },
      { id: 'seeloewen', fokus: 'Schaufuetterung - fuer Kinder das Highlight' },
      { id: 'eismeer', fokus: 'Pinguine und Unterwasserfenster' },
    ],
  },
  {
    id: 'eismeer',
    titel: 'Kalte Welten',
    schwerpunkt: 'Polar & Meer',
    emoji: '🧊',
    minuten: 105,
    laenge: 'ca. 1,5 km',
    fuer: 'Halber Tag, heisses Wetter, Eisbaeren-Fans',
    beschreibung:
      'Konzentriert auf Eismeer und Seebaeren: Eisbaeren, Walrosse, Pinguine, Robben. Viel Wasser, viel Schatten, mehrere Unterwasserfenster.',
    stationen: [
      { id: 'haupteingang' },
      { id: 'kamele', fokus: 'Kontrastprogramm: Wueste statt Eis' },
      { id: 'japangarten' },
      { id: 'seeloewen', fokus: 'Schaufuetterung mit Erklaerungen' },
      { id: 'eismeer', fokus: 'Kernstueck - mindestens 40 Minuten' },
    ],
  },
  {
    id: 'afrika',
    titel: 'Savanne & Weite',
    schwerpunkt: 'Afrika',
    emoji: '🦒',
    minuten: 105,
    laenge: 'ca. 1,8 km',
    fuer: 'Panorama-Fans, Fotografen',
    beschreibung:
      'Die Route entlang der Freianlagen, fuer die Hagenbeck beruehmt ist: Zebras, Strausse, Antilopen und die grosse Panorama-Perspektive - ohne Gitter, nur durch Graeben getrennt.',
    stationen: [
      { id: 'haupteingang' },
      { id: 'loewen' },
      { id: 'afrikapanorama', fokus: 'Der beste Blick des Parks' },
      { id: 'strausse', fokus: 'Zebras und Strausse in einer Anlage' },
      { id: 'flamingoteich' },
      { id: 'elefanten' },
    ],
  },
  {
    id: 'raubtiere',
    titel: 'Jaeger & Raeuber',
    schwerpunkt: 'Raubtiere',
    emoji: '🐅',
    minuten: 120,
    laenge: 'ca. 2 km',
    fuer: 'Aeltere Kinder, Jugendliche',
    beschreibung:
      'Von der Grosskatze bis zum Riffhai: eine Route entlang der Jaeger. Am besten am spaeten Nachmittag - dann sind die meisten Raubtiere wach.',
    stationen: [
      { id: 'haupteingang' },
      { id: 'tiger', fokus: 'Erhoehte Liegeplaetze absuchen' },
      { id: 'loewen' },
      { id: 'eismeer', fokus: 'Eisbaer - das groesste Landraubtier der Welt' },
      { id: 'strausse', fokus: 'Kurzer Schwenk durch die Steppe' },
      { id: 'tropenaquarium', fokus: 'Haie und Krokodile - eigenes Ticket noetig' },
    ],
  },
  {
    id: 'regentag',
    titel: 'Regentag im Trockenen',
    schwerpunkt: 'Schlechtwetter',
    emoji: '🌧️',
    minuten: 150,
    laenge: 'ca. 1,5 km',
    fuer: 'Regen, Kaelte, Hitze',
    beschreibung:
      'Maximal viel Zeit unter Dach: Tropen-Aquarium, Menschenaffen-Haus und die Innenbereiche des Eismeers. Kurze Wege zwischen den Gebaeuden.',
    stationen: [
      { id: 'haupteingang' },
      { id: 'tropenaquarium', fokus: 'Hauptprogramm - eigenes Ticket noetig' },
      { id: 'elefanten', fokus: 'Elefantenhaus bietet Schutz' },
      { id: 'orangutans', fokus: 'Innenanlage mit grossen Scheiben' },
      { id: 'eismeer', fokus: 'Ueberdachte Abschnitte und Unterwasserwege' },
    ],
  },
  {
    id: 'kurz',
    titel: 'Blitzbesuch in einer Stunde',
    schwerpunkt: 'Wenig Zeit',
    emoji: '⏱️',
    minuten: 60,
    laenge: 'ca. 1,2 km',
    fuer: 'Zwischenstopp, kurzer Besuch',
    beschreibung:
      'Wenn nur eine Stunde bleibt: die drei Anlagen, die man gesehen haben sollte, auf dem kuerzesten Weg.',
    stationen: [
      { id: 'haupteingang' },
      { id: 'elefanten', fokus: '15 Minuten reichen fuer einen guten Eindruck' },
      { id: 'afrikapanorama', fokus: 'Kurz stehenbleiben, Panorama ansehen' },
      { id: 'eismeer', fokus: 'Direkt zu den Unterwasserfenstern durchgehen' },
    ],
  },
  {
    id: 'entspannt',
    titel: 'Entspannt & barrierearm',
    schwerpunkt: 'Ruhige Runde',
    emoji: '♿',
    minuten: 150,
    laenge: 'ca. 1,5 km',
    fuer: 'Kinderwagen, Rollator, Rollstuhl, langsames Tempo',
    beschreibung:
      'Eine kurze Runde mit vielen Sitzgelegenheiten und ohne unnoetige Steigungen. Weniger Stationen, dafuer mehr Zeit pro Anlage.',
    hinweis:
      'Die Wege im Park sind ueberwiegend befestigt, es gibt aber Steigungen. Aktuelle Angaben zur Barrierefreiheit stehen auf hagenbeck.de.',
    stationen: [
      { id: 'haupteingang' },
      { id: 'elefanten' },
      { id: 'japangarten', fokus: 'Ruhigster Ort im Park' },
      { id: 'flamingoteich', fokus: 'Baenke direkt am Weg' },
      { id: 'afrikapanorama' },
      { id: 'seeloewen', fokus: 'Sitzplaetze an der Tribuene' },
    ],
  },
];

/*
 * Fuetterungen und Vorfuehrungen.
 * ACHTUNG: Diese Zeiten sind Platzhalter fuer die Planung und NICHT amtlich.
 * In den Einstellungen lassen sie sich auf die tatsaechlichen Zeiten des
 * Besuchstags anpassen; die Anpassung bleibt auf dem Geraet gespeichert.
 */
export const FUETTERUNGEN = [
  { id: 'seeloewen', titel: 'Schaufuetterung Seebaeren', station: 'seeloewen', zeit: '', hinweis: 'Findet in der Regel taeglich statt.' },
  { id: 'eisbaeren', titel: 'Fuetterung Eisbaeren', station: 'eismeer', zeit: '', hinweis: 'Zeiten variieren je nach Tagesablauf.' },
  { id: 'walrosse', titel: 'Fuetterung Walrosse', station: 'eismeer', zeit: '', hinweis: 'Oft mit Erklaerungen der Pfleger.' },
  { id: 'pinguine', titel: 'Fuetterung Pinguine', station: 'eismeer', zeit: '', hinweis: '' },
  { id: 'elefanten', titel: 'Elefanten-Vorfuehrung', station: 'elefanten', zeit: '', hinweis: 'Nur an bestimmten Tagen.' },
  { id: 'haie', titel: 'Fuetterung Haie', station: 'tropenaquarium', zeit: '', hinweis: 'Nur an bestimmten Wochentagen.' },
];

/* Oeffnungszeiten laut OpenStreetMap (Stand des Karten-Exports, ohne
 * Gewaehr - Aushang am Eingang und hagenbeck.de gehen vor). */
export const OEFFNUNG = {
  quelle: 'laut OpenStreetMap, ohne Gewaehr',
  regeln: [
    { monate: [1, 2], zeit: '9:00 bis 16:30 Uhr' },
    { monate: [3, 4, 5, 6], zeit: '9:00 bis 18:00 Uhr' },
    { monate: [7, 8], zeit: '9:00 bis 19:00 Uhr' },
    { vonTag: [9, 1], bisTag: [10, 25], zeit: '9:00 bis 18:00 Uhr' },
    { vonTag: [10, 26], bisTag: [12, 31], zeit: '9:00 bis 16:30 Uhr' },
  ],
  sondertage: { '24.12.': '9:00 bis 13:00 Uhr', '31.12.': '9:00 bis 13:00 Uhr' },
};

export const WISSEN = [
  {
    titel: 'Warum es hier kaum Gitter gibt',
    text:
      'Carl Hagenbeck liess sich 1896 ein Prinzip patentieren, das Tiergaerten weltweit veraendert hat: Statt Gittern trennen breite, von vorn unsichtbare Graeben die Tiere von den Besuchern und voneinander. Dadurch entsteht der Eindruck einer einzigen Landschaft, in der mehrere Arten hintereinander stehen. Der Tierpark in Stellingen wurde 1907 nach diesem Prinzip eroeffnet und war der erste seiner Art.',
  },
  {
    titel: 'Ein Park in Familienhand',
    text:
      'Der Tierpark wird bis heute von der Familie Hagenbeck gefuehrt und ist damit einer der wenigen grossen Zoos Europas in privater Hand. Nach der Zerstoerung im Zweiten Weltkrieg wurde der Park wieder aufgebaut; das Tropen-Aquarium kam 2007 dazu, das Eismeer 2012.',
  },
  {
    titel: 'Wie man einen Zoobesuch plant',
    text:
      'Drei Dinge machen den groessten Unterschied: frueh kommen, die Fuetterungszeiten als Fixpunkte in den Tag legen und einen Rundweg festlegen statt kreuz und quer zu laufen. Wer mit Kindern unterwegs ist, plant Pausen fest ein - die Wege summieren sich schnell auf mehrere Kilometer.',
  },
  {
    titel: 'Warum Tiere schlafen, wenn du da bist',
    text:
      'Viele Besucher kommen mittags - genau dann, wenn die meisten Tiere ruhen. Grosskatzen schlafen bis zu 20 Stunden am Tag, Ruhephasen sind bei ihnen normal und kein Zeichen von Langeweile. Wer Aktivitaet sehen will, kommt zur Oeffnungszeit oder in der letzten Stunde vor Schluss.',
  },
  {
    titel: 'Bitte nicht fuettern',
    text:
      'Mitgebrachtes Futter kann Tiere ernsthaft krank machen - auch scheinbar Harmloses wie Brot. Wo Fuettern erlaubt ist, gibt es Futterautomaten des Parks mit passendem Futter. Ebenso wichtig: nicht an Scheiben klopfen und nichts in Anlagen werfen.',
  },
];
