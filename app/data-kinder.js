/*
 * Kindermodus: einfache Texte in Du-Ansprache, kurze Saetze,
 * pro Tier eine Quizfrage. Wird ueber den Schalter "Kindermodus"
 * anstelle der ausfuehrlichen Texte angezeigt und vorgelesen.
 *
 * Zielgruppe: etwa 5 bis 10 Jahre - vorlesbar und selbst lesbar.
 */

export const KINDER_TIERE = {
  eisbaer: {
    kurz: 'Der groesste Baer der Welt. Er lebt da, wo alles voller Eis ist.',
    text: [
      'Der Eisbaer ist ein richtig grosser Baer. Wenn er sich aufstellt, ist er groesser als zwei erwachsene Menschen uebereinander.',
      'Sein Fell sieht weiss aus. In Wirklichkeit ist es durchsichtig wie kleine Glasroehrchen. Darunter ist seine Haut schwarz. Schwarz wird in der Sonne warm - so friert der Eisbaer nicht.',
      'Eisbaeren schwimmen sehr gern. Sie paddeln nur mit den Vorderbeinen. Die Hinterbeine sind ihr Lenkrad.',
    ],
    wusstest: [
      'Seine Tatzen sind so gross wie ein Essteller. Damit sinkt er im Schnee nicht ein.',
      'Er riecht eine Robbe noch aus einem Kilometer Entfernung - das ist so weit wie zehn Fussballfelder.',
    ],
    quiz: {
      frage: 'Welche Farbe hat die Haut vom Eisbaeren unter dem Fell?',
      antworten: ['Schwarz', 'Weiss', 'Rosa'],
      richtig: 0,
      erklaerung: 'Sie ist schwarz. Schwarz nimmt die Waerme der Sonne besonders gut auf.',
    },
  },
  walross: {
    kurz: 'Eine riesige Robbe mit zwei langen Zaehnen und einem Schnurrbart.',
    text: [
      'Das Walross ist so schwer wie ein kleines Auto. An Land robbt es langsam herum. Im Wasser ist es aber richtig schnell.',
      'Die zwei langen Zaehne sind kein Spielzeug. Damit zieht sich das Walross aufs Eis, so wie du dich mit den Armen aus dem Schwimmbecken ziehst.',
      'Mit seinem Schnurrbart sucht es Muscheln am Meeresboden. Es kann sie fuehlen, auch wenn es nichts sieht.',
    ],
    wusstest: [
      'Ein Walross hat ungefaehr 400 Schnurrhaare.',
      'Wenn es sich aufregt, wird seine Haut rosa.',
    ],
    quiz: {
      frage: 'Wozu benutzt das Walross seine langen Zaehne?',
      antworten: ['Zum Klettern aufs Eis', 'Zum Zaehneputzen', 'Zum Musikmachen'],
      richtig: 0,
      erklaerung: 'Es hakt sich damit fest und zieht sich aufs Eis.',
    },
  },
  pinguin: {
    kurz: 'Ein Vogel, der nicht fliegen kann - unter Wasser aber wie eine Rakete ist.',
    text: [
      'Pinguine sind Voegel. Aber ihre Fluegel sind keine Fluegel zum Fliegen, sondern Flossen zum Schwimmen.',
      'Unter Wasser sind sie schneller als du auf dem Fahrrad. An Land watscheln sie lustig hin und her.',
      'Auf dem Bauch koennen sie ueber Schnee rutschen. Das ist ihre Rutschbahn.',
    ],
    wusstest: [
      'Kein einziger Pinguin lebt beim Nordpol. Alle leben unten auf der anderen Halbkugel.',
      'Papa und Mama erkennen ihr Kueken an der Stimme - auch wenn tausend Pinguine rufen.',
    ],
    quiz: {
      frage: 'Wo leben Pinguine?',
      antworten: ['Nur auf der Suedhalbkugel', 'Am Nordpol', 'Ueberall'],
      richtig: 0,
      erklaerung: 'Pinguine leben nur auf der Suedhalbkugel. Am Nordpol wohnt der Eisbaer.',
    },
  },
  kegelrobbe: {
    kurz: 'Das groesste wilde Raubtier in Deutschland - und es lebt in der Nordsee.',
    text: [
      'Kegelrobben leben an der Nordsee, gar nicht weit von Hamburg. Sie liegen dort auf Sandbaenken in der Sonne.',
      'Ihre Babys haben ein weisses Fell. Das ist noch nicht wasserdicht. Deshalb muessen sie am Anfang an Land bleiben.',
      'Mit ihren Schnurrhaaren spueren sie, wo ein Fisch geschwommen ist. Wie eine Spur in der Luft, nur im Wasser.',
    ],
    wusstest: [
      'Eine Kegelrobbe kann 20 Minuten tauchen, ohne Luft zu holen.',
      'Ihren Namen hat sie von ihrem Kopf - er ist spitz wie ein Kegel.',
    ],
    quiz: {
      frage: 'Warum koennen kleine Kegelrobben am Anfang nicht schwimmen?',
      antworten: ['Ihr weisses Fell ist nicht wasserdicht', 'Sie haben Angst', 'Sie sind zu dick'],
      richtig: 0,
      erklaerung: 'Erst wenn sie das weisse Babyfell verlieren, duerfen sie ins Wasser.',
    },
  },
  seebaer: {
    kurz: 'Die flinke Robbe mit dem dicken Pelz. Bei der Fuetterung zeigt sie ihre Tricks.',
    text: [
      'Seebaeren koennen an Land richtig laufen. Sie klappen ihre hinteren Flossen nach vorne und stapfen los.',
      'Ihren Namen haben sie von ihrem Fell: Es ist dick und braun wie bei einem Baeren. Darunter bleibt es kuschelig warm, auch im kalten Wasser.',
      'Bei der Fuetterung zeigen sie Kunststuecke. Das ist wichtig: So lernen sie, dem Tierarzt freiwillig das Maul zu zeigen. Dann tut nichts weh.',
    ],
    wusstest: [
      'Ein Seebaer erkennt seinen Pfleger an der Stimme.',
      'Unter Wasser schwimmt er wie ein riesiger Pinguin - mit den Vorderflossen.',
    ],
    quiz: {
      frage: 'Warum heisst der Seebaer Seebaer?',
      antworten: ['Wegen seinem dicken braunen Fell', 'Weil er brummt wie ein Baer', 'Weil er Honig frisst'],
      richtig: 0,
      erklaerung: 'Sein dichter brauner Pelz erinnerte Seefahrer an einen Baeren.',
    },
  },
  elefant: {
    kurz: 'Das schwerste Tier im Park. Sein Ruessel kann alles - sogar duschen.',
    text: [
      'Ein Elefant wiegt so viel wie drei Autos. Trotzdem laeuft er fast lautlos, weil seine Fuesse wie dicke Kissen sind.',
      'Der Ruessel ist Nase und Hand zusammen. Damit kann der Elefant einen schweren Ast heben - oder eine einzelne Erdnuss aufheben.',
      'Zum Trinken saugt er Wasser in den Ruessel und spritzt es sich dann ins Maul. Er trinkt also nicht durch den Ruessel wie durch einen Strohhalm.',
      'Elefanten koennen sich mit sehr tiefen Toenen unterhalten. Die sind so tief, dass wir Menschen sie nicht hoeren.',
    ],
    wusstest: [
      'Mit den grossen Ohren faechelt sich der Elefant Luft zu, wenn ihm heiss ist.',
      'Elefanten hoeren mit den Fuessen. Sie spueren, wenn der Boden ganz leicht wackelt.',
    ],
    quiz: {
      frage: 'Wie trinkt ein Elefant?',
      antworten: ['Er saugt Wasser an und spritzt es sich ins Maul', 'Er trinkt durch den Ruessel wie durch einen Strohhalm', 'Er leckt das Wasser wie eine Katze'],
      richtig: 0,
      erklaerung: 'Der Ruessel ist nur der Eimer. Getrunken wird mit dem Mund.',
    },
  },
  orangutan: {
    kurz: 'Sein Name heisst "Waldmensch". Er lebt fast immer in Baeumen.',
    text: [
      'Orang-Utans sind Menschenaffen. Sie sind uns sehr aehnlich - sie haben sogar Fingerabdruecke.',
      'Sie klettern langsam und ueberlegt von Ast zu Ast. Springen waere zu gefaehrlich, denn sie sind schwer.',
      'Jeden Abend bauen sie sich ein neues Bett aus Zweigen und Blaettern, ganz oben im Baum.',
      'Wenn es regnet, halten sie sich manchmal ein grosses Blatt ueber den Kopf. Wie einen Regenschirm.',
    ],
    wusstest: [
      'Ein Orang-Utan-Kind bleibt sechs bis acht Jahre bei seiner Mama.',
      'Orang-Utans knacken Schloesser, wenn niemand hinschaut. Sie sind sehr schlau.',
    ],
    quiz: {
      frage: 'Was baut sich ein Orang-Utan jeden Abend?',
      antworten: ['Ein Nest zum Schlafen', 'Eine Bruecke', 'Eine Rutsche'],
      richtig: 0,
      erklaerung: 'Ein neues Schlafnest aus Zweigen - jeden Abend ein frisches.',
    },
  },
  tiger: {
    kurz: 'Die groesste Katze der Welt. Jeder Tiger hat sein eigenes Streifenmuster.',
    text: [
      'Ein Tiger ist eine Katze - nur eben sehr, sehr gross. Er schnurrt zwar nicht wie deine Hauskatze, aber er putzt sich genauso.',
      'Kein Tiger sieht aus wie ein anderer. Die Streifen sind wie ein Fingerabdruck.',
      'Anders als die meisten Katzen liebt der Tiger Wasser. An heissen Tagen liegt er stundenlang im Becken.',
      'Tiger schlafen am Tag sehr viel. Wenn du einen schlafenden Tiger siehst, ist das ganz normal.',
    ],
    wusstest: [
      'Auch die Haut vom Tiger ist gestreift, nicht nur das Fell.',
      'Ein Tiger kann aus dem Stand weiter springen, als ein Auto lang ist.',
    ],
    quiz: {
      frage: 'Warum sieht kein Tiger aus wie der andere?',
      antworten: ['Jeder hat ein eigenes Streifenmuster', 'Jeder hat eine andere Farbe', 'Jeder ist anders gross'],
      richtig: 0,
      erklaerung: 'Die Streifen sind bei jedem Tiger anders - wie dein Fingerabdruck.',
    },
  },
  trampeltier: {
    kurz: 'Das Kamel mit zwei Hoeckern. In den Hoeckern ist kein Wasser, sondern Fett.',
    text: [
      'Viele denken, im Hoecker ist Wasser. Stimmt aber nicht: Da ist Fett drin. Das ist der Vorrat fuer Tage ohne Futter.',
      'Wenn der Hoecker haengt, ist der Vorrat fast leer. Nach dem Fressen steht er wieder aufrecht.',
      'Trampeltiere koennen bei sehr grosser Kaelte und bei grosser Hitze leben. Im Winter waechst ihnen ein dickes Wollkleid, im Fruehling faellt es in Fetzen ab.',
    ],
    wusstest: [
      'Ein Kamel kann in wenigen Minuten eine ganze Badewanne voll Wasser trinken.',
      'Es hat doppelte Wimpern - wie eine Schutzbrille gegen Sand.',
    ],
    quiz: {
      frage: 'Was ist im Hoecker von einem Kamel?',
      antworten: ['Fett', 'Wasser', 'Luft'],
      richtig: 0,
      erklaerung: 'Fett. Das ist der Notvorrat fuer schlechte Zeiten.',
    },
  },
  giraffe: {
    kurz: 'Das hoechste Tier der Welt. Ihr Hals hat genauso viele Knochen wie deiner.',
    text: [
      'Eine Giraffe ist so hoch wie ein Haus mit zwei Stockwerken.',
      'Ihr langer Hals hat nur sieben Halsknochen - genau so viele wie du. Die sind aber jeder so lang wie dein Unterarm.',
      'Ihre Zunge ist einen halben Meter lang und blau-schwarz. Damit holt sie Blaetter zwischen den Dornen heraus.',
      'Zum Trinken muss die Giraffe die Vorderbeine weit auseinanderstellen. Sonst kommt sie nicht runter ans Wasser.',
    ],
    wusstest: [
      'Ein Giraffenbaby faellt bei der Geburt fast zwei Meter tief - und steht trotzdem nach einer Stunde.',
      'Giraffen koennen sich mit der Zunge die Ohren putzen.',
    ],
    quiz: {
      frage: 'Wie viele Halsknochen hat eine Giraffe?',
      antworten: ['Sieben - genauso viele wie du', 'Hundert', 'Nur einen langen'],
      richtig: 0,
      erklaerung: 'Sieben. Sie sind nur viel, viel laenger als deine.',
    },
  },
  zebra: {
    kurz: 'Ein Wildpferd im Streifenpyjama. Kein Zebra sieht aus wie das andere.',
    text: [
      'Zebras sind mit Pferden verwandt. Reiten kann man sie trotzdem nicht - sie sind viel zu wild dafuer.',
      'Warum die Streifen? Forscher glauben: Fliegen moegen keine Streifen. Sie landen dort viel seltener. Die Streifen sind also ein Insektenschutz.',
      'Ein Zebrafohlen erkennt seine Mama an den Streifen. In den ersten Tagen stellt sie sich deshalb zwischen ihr Kind und die Herde.',
    ],
    wusstest: [
      'Zebras schlafen im Stehen. Immer eines bleibt wach und passt auf.',
      'Ein Tritt vom Zebra ist so stark, dass sogar ein Loewe aufpassen muss.',
    ],
    quiz: {
      frage: 'Wofuer sind die Streifen beim Zebra gut?',
      antworten: ['Gegen stechende Fliegen', 'Zum Schoen aussehen', 'Damit sie schneller rennen'],
      richtig: 0,
      erklaerung: 'Fliegen landen auf gestreiften Tieren viel seltener.',
    },
  },
  strauss: {
    kurz: 'Der groesste Vogel der Welt. Fliegen kann er nicht - rennen dafuer wie ein Auto.',
    text: [
      'Ein Strauss ist groesser als ein erwachsener Mensch. Fliegen kann er nicht, dafuer rennt er 70 Kilometer pro Stunde.',
      'Dass ein Strauss den Kopf in den Sand steckt, ist erfunden. In Wirklichkeit legt er Hals und Kopf flach auf den Boden. Von weitem sieht er dann aus wie ein Busch.',
      'Ein Straussenei wiegt so viel wie 25 Huehnereier. Du koenntest dich daraufstellen, ohne dass es kaputtgeht.',
    ],
    wusstest: [
      'Das Auge eines Strausses ist groesser als sein Gehirn.',
      'Der schwarz-weisse ist der Papa, der graubraune die Mama.',
    ],
    quiz: {
      frage: 'Steckt ein Strauss bei Gefahr den Kopf in den Sand?',
      antworten: ['Nein, er legt sich flach auf den Boden', 'Ja, immer', 'Nur wenn es regnet'],
      richtig: 0,
      erklaerung: 'Das ist nur eine alte Geschichte. Er macht sich flach und tarnt sich als Busch.',
    },
  },
  loewe: {
    kurz: 'Der Koenig, der am liebsten schlaeft - bis zu 20 Stunden am Tag.',
    text: [
      'Loewen sind die einzigen Katzen, die in einer grossen Familie leben. Diese Familie heisst Rudel.',
      'Die Mamas gehen jagen, meistens gemeinsam. Der Papa passt auf das Gebiet auf.',
      'Loewen schlafen fast den ganzen Tag. Wenn du einen schlafenden Loewen siehst, ist er nicht traurig - er macht genau das, was Loewen machen.',
      'Sein Bruellen kann man acht Kilometer weit hoeren. Das ist so weit wie von hier bis in die Innenstadt.',
    ],
    wusstest: [
      'Nur der Papa hat eine Maehne. Je dunkler sie ist, desto aelter ist er meistens.',
      'Kleine Loewenbabys haben Flecken im Fell. Die verschwinden, wenn sie groesser werden.',
    ],
    quiz: {
      frage: 'Wie lange schlaeft ein Loewe ungefaehr am Tag?',
      antworten: ['Bis zu 20 Stunden', '2 Stunden', 'Gar nicht'],
      richtig: 0,
      erklaerung: 'Bis zu 20 Stunden. Jagen ist anstrengend - danach braucht er viel Ruhe.',
    },
  },
  erdmaennchen: {
    kurz: 'Kleine Wachposten. Immer steht eines aufrecht und passt auf.',
    text: [
      'Erdmaennchen leben in grossen Familien unter der Erde. Ihr Bau hat viele Gaenge, wie ein U-Bahn-Netz.',
      'Waehrend die anderen fressen, steht immer eines Wache. Sieht es einen Adler, ruft es anders als bei einer Schlange. Alle wissen sofort, wo die Gefahr ist.',
      'Morgens stellen sie sich mit dem Bauch in die Sonne. Am Bauch haben sie fast keine Haare - so waermen sie sich schnell auf.',
      'Sie fressen sogar Skorpione. Vorher beissen sie den Stachel ab.',
    ],
    wusstest: [
      'Die dunklen Ringe um die Augen sind wie eine Sonnenbrille.',
      'Auch Erdmaennchen, die keine eigenen Kinder haben, passen auf den Nachwuchs auf.',
    ],
    quiz: {
      frage: 'Was macht das Erdmaennchen, das aufrecht steht?',
      antworten: ['Es haelt Wache', 'Es tanzt', 'Es ruht sich aus'],
      richtig: 0,
      erklaerung: 'Es ist der Wachposten und warnt die anderen.',
    },
  },
  flamingo: {
    kurz: 'Rosa wird er erst durch sein Futter. Als Baby ist er grau.',
    text: [
      'Flamingos werden nicht rosa geboren. Ihre Federn sind erst grau. Rosa werden sie durch das, was sie fressen: kleine Krebse.',
      'Sie fressen mit dem Kopf verkehrt herum im Wasser. Ihr Schnabel ist ein Sieb - Wasser raus, Futter bleibt drin.',
      'Auf einem Bein zu stehen ist kein Kunststueck. So bleibt das andere Bein warm, so wie du im Winter eine Hand in die Tasche steckst.',
    ],
    wusstest: [
      'Flamingo-Eltern fuettern ihr Kueken mit einer rosa Milch aus dem Hals.',
      'Ihr Nest ist ein Huegel aus Schlamm, den sie selbst bauen.',
    ],
    quiz: {
      frage: 'Warum ist ein Flamingo rosa?',
      antworten: ['Wegen seinem Futter', 'Weil er in der Sonne liegt', 'Er wird so geboren'],
      richtig: 0,
      erklaerung: 'Die kleinen Krebse, die er frisst, faerben seine Federn rosa.',
    },
  },
  riesenotter: {
    kurz: 'Der groesste Otter der Welt. Er wohnt mit seiner ganzen Familie zusammen.',
    text: [
      'Riesenotter sind so lang wie ein Erwachsener gross ist. Sie leben am Fluss - Mama, Papa und die Kinder alle zusammen.',
      'Sie reden fast die ganze Zeit miteinander: quieken, schnattern, pfeifen. Hoer mal hin, wenn du an der Anlage stehst!',
      'Beim Fischen helfen alle zusammen. Sie treiben die Fische in eine Ecke - wie eine Fussballmannschaft beim Angriff.',
      'Jeder Riesenotter hat einen hellen Fleck am Hals. Daran erkennen sie sich gegenseitig - wie an einem Namensschild.',
    ],
    wusstest: [
      'Ein Riesenotter haelt seinen Fisch mit den Pfoten fest wie du ein Brot.',
      'Sein platter Schwanz ist sein Motor - damit schwimmt er superschnell.',
    ],
    quiz: {
      frage: 'Woran erkennen sich Riesenotter gegenseitig?',
      antworten: ['Am hellen Fleck am Hals', 'An der Schwanzspitze', 'Am Schnurrbart'],
      richtig: 0,
      erklaerung: 'Jeder hat einen anderen Kehlfleck - wie ein Namensschild.',
    },
  },
  zwergziege: {
    kurz: 'Klein, frech und neugierig. Hier darfst du streicheln.',
    text: [
      'Zwergziegen sind neugierig. Sie kommen von selbst zu dir, wenn du ruhig stehen bleibst.',
      'Streichle am Hals oder an der Schulter. An den Hoernern zieht man nicht - die sind kein Griff.',
      'Ziegen haben viereckige Pupillen. Damit sehen sie fast rundherum, ohne den Kopf zu drehen. Sie sehen dich also auch, wenn sie wegschauen.',
      'Ganz wichtig: nichts fuettern, was du selbst mitgebracht hast. Brot macht Ziegen krank. Futter gibt es nur aus dem Automaten im Park.',
    ],
    wusstest: [
      'Ziegen merken sich Gesichter und moegen freundliche Gesichter lieber.',
      'Oben vorne haben Ziegen gar keine Zaehne, nur eine harte Platte.',
    ],
    quiz: {
      frage: 'Darfst du der Ziege dein Brot geben?',
      antworten: ['Nein, davon wird sie krank', 'Ja, Ziegen fressen alles', 'Nur wenn es alt ist'],
      richtig: 0,
      erklaerung: 'Nein. Nur Futter aus dem Automaten im Park ist richtig fuer sie.',
    },
  },
  hai: {
    kurz: 'Es gibt Haie schon laenger als Baeume - seit 400 Millionen Jahren.',
    text: [
      'Haie gab es schon, als die Dinosaurier noch gar nicht da waren. Sie sind aelter als jeder Baum auf der Welt.',
      'Ein Hai hat keine Knochen. Sein Skelett ist aus Knorpel - so wie deine Nasenspitze und deine Ohren.',
      'Haie spueren Strom. Jedes Lebewesen macht ganz kleine elektrische Signale, wenn sich seine Muskeln bewegen. Der Hai findet damit sogar Fische, die sich im Sand verstecken.',
      'Faellt ein Zahn aus, rueckt einfach der naechste nach. Dahinter warten schon mehrere Reihen.',
    ],
    wusstest: [
      'Haihaut fuehlt sich an wie Schmirgelpapier.',
      'Haie sind viel weniger gefaehrlich, als viele denken. Menschen sind fuer Haie viel gefaehrlicher als umgekehrt.',
    ],
    quiz: {
      frage: 'Woraus ist das Skelett von einem Hai?',
      antworten: ['Aus Knorpel', 'Aus Knochen', 'Aus Holz'],
      richtig: 0,
      erklaerung: 'Aus Knorpel - so wie deine Ohren und deine Nasenspitze.',
    },
  },
  krokodil: {
    kurz: 'Es liegt stundenlang still. Aber es beobachtet dich die ganze Zeit.',
    text: [
      'Krokodile gibt es seit ungefaehr 200 Millionen Jahren. Sie sahen damals schon fast genauso aus wie heute.',
      'Sie sind naeher mit Voegeln verwandt als mit Eidechsen. Komisch, aber wahr.',
      'Zubeissen kann ein Krokodil unglaublich fest. Das Maul aufmachen kann es aber nur schwach. Mit einem Gummiband koennte man es zuhalten.',
      'Krokodilmuetter tragen ihre frisch geschluepften Babys ganz vorsichtig im Maul zum Wasser.',
    ],
    wusstest: [
      'Ob aus dem Ei ein Junge oder ein Maedchen wird, entscheidet die Waerme im Nest.',
      'Ein Krokodil kann monatelang nichts fressen und wird trotzdem nicht schwach.',
    ],
    quiz: {
      frage: 'Womit sind Krokodile naeher verwandt?',
      antworten: ['Mit Voegeln', 'Mit Fischen', 'Mit Hunden'],
      richtig: 0,
      erklaerung: 'Mit Voegeln. Beide stammen von denselben Urahnen ab.',
    },
  },
  rochen: {
    kurz: 'Wie ein flachgedrueckter Hai, der durchs Wasser fliegt.',
    text: [
      'Rochen sind mit Haien verwandt. Man kann sich einen Rochen wie einen ganz flachen Hai vorstellen.',
      'Sie bewegen ihre grossen Flossen wie Fluegel. Es sieht aus, als wuerden sie unter Wasser fliegen.',
      'Ihr Mund ist unten am Bauch. Was oben aussieht wie zwei Augen mit Mund, sind in Wirklichkeit die Nasenloecher - die Augen sitzen auf dem Ruecken.',
    ],
    wusstest: [
      'Manche Rochen koennen kleine Stromschlaege geben, um sich zu wehren.',
      'Der Stachel am Schwanz ist nur zur Verteidigung, nicht zum Jagen.',
    ],
    quiz: {
      frage: 'Wo ist der Mund von einem Rochen?',
      antworten: ['Unten am Bauch', 'Oben auf dem Ruecken', 'Am Schwanz'],
      richtig: 0,
      erklaerung: 'Unten. Deshalb frisst er am Meeresboden.',
    },
  },
  clownfisch: {
    kurz: 'Der kleine orange Fisch, der in einer giftigen Blume wohnt.',
    text: [
      'Der Clownfisch lebt mitten in einer Seeanemone. Die hat Nesseln, die andere Fische verbrennen wuerden.',
      'Der Clownfisch hat einen Schleim auf der Haut. Der schuetzt ihn. So hat er ein Zuhause, in das sich kein Feind traut.',
      'Ein Riff sieht aus wie ein Steingarten, ist aber lebendig. Korallen sind winzige Tiere, die Haeuschen aus Kalk bauen.',
    ],
    wusstest: [
      'Ein kleines Clownfisch-Paar verjagt sogar viel groessere Fische aus seiner Anemone.',
      'In den Riffen der Welt leben ein Viertel aller Meerestiere - obwohl Riffe nur ganz wenig Platz einnehmen.',
    ],
    quiz: {
      frage: 'Warum tut die Anemone dem Clownfisch nicht weh?',
      antworten: ['Er hat eine Schleimschicht als Schutz', 'Er ist zu schnell', 'Die Anemone mag ihn nicht'],
      richtig: 0,
      erklaerung: 'Sein Schleim schuetzt ihn vor den Nesseln.',
    },
  },
  riesenschlange: {
    kurz: 'Sie hat kein Gift. Sie ist einfach unglaublich stark.',
    text: [
      'Riesenschlangen sind nicht giftig. Sie halten ihre Beute mit Muskelkraft fest.',
      'Ihr Unterkiefer haengt nur an einem dehnbaren Band. Deshalb kann sie ihr Maul viel weiter aufmachen als jedes andere Tier.',
      'Nach einer grossen Mahlzeit ruht sie manchmal wochenlang. Sie muss dann lange nichts mehr fressen.',
      'Schlangen riechen mit der Zunge. Deshalb zuengeln sie die ganze Zeit.',
    ],
    wusstest: [
      'Schlangen koennen die Augen nicht schliessen - sie haben keine Lider, sondern eine durchsichtige Schuppe davor.',
      'Beim Haeuten streift die Schlange ihre alte Haut ab wie eine Socke.',
    ],
    quiz: {
      frage: 'Womit riecht eine Schlange?',
      antworten: ['Mit der Zunge', 'Mit den Ohren', 'Mit dem Schwanz'],
      richtig: 0,
      erklaerung: 'Mit der Zunge. Sie holt damit Duftteilchen aus der Luft.',
    },
  },
  flughund: {
    kurz: 'Ein Tier, das fliegen kann und trotzdem kein Vogel ist.',
    text: [
      'Flughunde sind Saeugetiere - genau wie Hunde, Katzen und du. Sie sind die einzigen Saeugetiere, die richtig fliegen koennen.',
      'Ihre Fluegel sind duenne Haut zwischen ganz langen Fingern. Stell dir vor, zwischen deinen Fingern waere ein Segel gespannt.',
      'Sie fressen am liebsten Obst. Dabei helfen sie dem Wald: Sie verteilen die Samen und viele Baeume koennen nur so wachsen.',
      'Kopfueber zu haengen ist fuer sie nicht anstrengend. Ihre Krallen halten von ganz allein fest, sogar im Schlaf.',
    ],
    wusstest: [
      'Flughunde finden ihr Futter mit Augen und Nase, nicht mit Ultraschall.',
      'Sie sind so gross wie eine Katze - manche haben Fluegel so breit wie ein Mensch gross ist.',
    ],
    quiz: {
      frage: 'Was ist ein Flughund?',
      antworten: ['Ein Saeugetier', 'Ein Vogel', 'Ein Insekt'],
      richtig: 0,
      erklaerung: 'Ein Saeugetier - das einzige, das richtig fliegen kann.',
    },
  },
  kamtschatkabaer: {
    kurz: 'Ein riesiger brauner Baer, der am liebsten Lachse fängt.',
    text: [
      'Der Kamtschatkabaer kommt aus dem kalten Osten von Russland. Er ist einer der groessten Braunbaeren der Welt.',
      'Im Sommer steht er am Fluss und fängt Lachse - manchmal mitten im Sprung.',
      'Im Herbst frisst er sich richtig dick und rund. Dann verschlaeft er fast den ganzen Winter in seiner Hoehle.',
    ],
    wusstest: [
      'Ein Baer kann schneller rennen als das schnellste Rennrad faehrt.',
      'Baeren riechen besser als jeder Spuerhund.',
    ],
    quiz: {
      frage: 'Was frisst der Kamtschatkabaer im Sommer am liebsten?',
      antworten: ['Lachse aus dem Fluss', 'Honigbrote', 'Pilze'],
      richtig: 0,
      erklaerung: 'Er steht am Fluss und faengt die Lachse mit Maul und Pranken.',
    },
  },
  leopard: {
    kurz: 'Eine seltene Grosskatze mit Punktemuster - und ein Kletterkuenstler.',
    text: [
      'Der Nordchinesische Leopard ist sehr, sehr selten. Nur wenige Zoos auf der ganzen Welt haben ihn - Hagenbeck ist einer davon.',
      'Sein Fell hat dunkle Ringe, die wie Blumen aussehen. Man nennt sie Rosetten.',
      'Leoparden sind die besten Kletterer von allen Grosskatzen. Sie schleppen sogar ihr Essen auf Baeume, damit es keiner klaut.',
    ],
    wusstest: [
      'Ein Leopard springt aus dem Stand hoeher als eine Tuer.',
      'Kein Leopard hat das gleiche Punktemuster wie ein anderer.',
    ],
    quiz: {
      frage: 'Was macht der Leopard mit seiner Beute?',
      antworten: ['Er zieht sie auf einen Baum', 'Er vergraebt sie', 'Er teilt sie mit allen'],
      richtig: 0,
      erklaerung: 'Oben im Baum kann ihm niemand das Futter wegnehmen.',
    },
  },
  praeriebison: {
    kurz: 'Der zottelige Riese aus Amerika mit dem grossen Buckel.',
    text: [
      'Bisons sind die schwersten Tiere Amerikas. Frueher liefen Millionen von ihnen durch die Prairie.',
      'Dann haben Menschen fast alle gejagt. Nur wenige hundert blieben uebrig. Zum Glueck haben Schutzgebiete und Zoos die Bisons gerettet.',
      'Der grosse Buckel besteht aus Muskeln. Damit schiebt der Bison im Winter den Schnee weg und findet das Gras darunter.',
    ],
    wusstest: [
      'Sein Fell waermt so gut, dass Schnee auf seinem Ruecken liegen bleibt und nicht schmilzt.',
      'Bison-Babys haben rotbraunes Fell wie ein Fuchs.',
    ],
    quiz: {
      frage: 'Was ist im Buckel vom Bison?',
      antworten: ['Starke Muskeln', 'Fett', 'Wasser'],
      richtig: 0,
      erklaerung: 'Die Muskeln tragen seinen riesigen Kopf - und schieben im Winter den Schnee weg.',
    },
  },
  mandrill: {
    kurz: 'Der bunteste Affe der Welt - mit blauer und roter Nase.',
    text: [
      'Der Mandrill sieht aus wie angemalt: blaue Backen, rote Nase, gelber Bart. Kein anderes Tier mit Fell ist so bunt.',
      'Die Farben zeigen, wer der Chef ist. Je bunter das Gesicht, desto wichtiger ist das Maennchen in der Gruppe.',
      'In seinen Backentaschen kann der Mandrill Futter sammeln und mitnehmen - wie in einer eingebauten Brotdose.',
    ],
    wusstest: [
      'Wenn ein Mandrill gaehnt, zeigt er seine langen Eckzaehne - das heisst: Vorsicht!',
      'In Afrika ziehen manchmal hunderte Mandrille zusammen durch den Wald.',
    ],
    quiz: {
      frage: 'Was bedeutet ein besonders buntes Gesicht beim Mandrill?',
      antworten: ['Er ist der Chef', 'Er ist krank', 'Er hat sich angemalt'],
      richtig: 0,
      erklaerung: 'Je bunter, desto wichtiger ist das Maennchen in seiner Gruppe.',
    },
  },
  riesenkaenguru: {
    kurz: 'Das groesste Beuteltier der Welt - es springt weiter als ein Auto lang ist.',
    text: [
      'Das Rote Riesenkaenguru kommt aus Australien. Mit einem einzigen Sprung schafft es neun Meter - so weit wie zwei Autos hintereinander.',
      'Sein dicker Schwanz ist wie ein drittes Bein. Beim Sitzen stuetzt er sich darauf.',
      'Das Baby ist bei der Geburt winzig - so klein wie ein Gummibaerchen. Es krabbelt in Mamas Beutel und waechst dort weiter.',
      'Kaengurus koennen nicht rueckwaerts gehen. Nur vorwaerts, immer vorwaerts.',
    ],
    wusstest: [
      'Beim Huepfen federn seine Beine wie Sprungfedern - das spart Kraft.',
      'Wenn ihm heiss ist, leckt sich das Kaenguru die Arme ab - das kuehlt.',
    ],
    quiz: {
      frage: 'Wie gross ist ein Kaenguru-Baby bei der Geburt?',
      antworten: ['So klein wie ein Gummibaerchen', 'So gross wie eine Katze', 'So gross wie ein Fussball'],
      richtig: 0,
      erklaerung: 'Es ist winzig und waechst dann im Beutel der Mama weiter.',
    },
  },
  onager: {
    kurz: 'Ein wilder Esel aus Persien - schneller als fast jedes Pferd.',
    text: [
      'Der Onager sieht aus wie ein Esel, ist aber ein Wildtier. Zaehmen laesst er sich nicht - das haben schon die Menschen vor tausenden Jahren versucht.',
      'Er ist ein Sprinter: 70 Kilometer pro Stunde schafft er - so schnell faehrt ein Auto in der Stadt.',
      'Onager leben in der Halbwueste und brauchen tagelang kein Wasser.',
      'In der Wildnis gibt es nur noch ganz wenige. Zoos wie Hagenbeck helfen, dass sie nicht aussterben.',
    ],
    wusstest: [
      'Onager waelzen sich jeden Tag im Sand - das ist ihre Dusche.',
      'Auf seinem Ruecken hat er einen dunklen Streifen, den Aalstrich.',
    ],
    quiz: {
      frage: 'Kann man einen Onager zaehmen und auf ihm reiten?',
      antworten: ['Nein, er bleibt wild', 'Ja, wie ein Pony', 'Nur im Winter'],
      richtig: 0,
      erklaerung: 'Onager sind Wildtiere geblieben - anders als unsere Hausesel.',
    },
  },
};

/* Kurze, kindgerechte Beschreibung der Stationen. Faellt eine Station hier
 * aus, wird der normale Text gekuerzt angezeigt. */
export const KINDER_STATIONEN = {
  haupteingang: 'Hier geht es los! Schau dir das grosse Tor mit den Steintieren an.',
  flamingoteich: 'Hier stehen die rosa Voegel im Wasser. Zaehl mal, wie viele auf einem Bein stehen.',
  elefanten: 'Die groessten Tiere im Park. Achte darauf, was der Ruessel alles kann.',
  orangutans: 'Hier wohnen die Menschenaffen. Sei ganz leise - dann schauen sie zurueck.',
  tiger: 'Die groesste Katze der Welt. Such sie an den hohen Plaetzen, da liegt sie gern.',
  loewen: 'Hier gibt es kein Gitter, sondern einen tiefen Graben. Findest du ihn?',
  afrikapanorama: 'Giraffen, Zebras und Strausse - alle sehen aus, als waeren sie auf einer Wiese.',
  strausse: 'Schau nach unten: Die Erdmaennchen stehen wie kleine Wachposten da.',
  eismeer: 'Eisbaeren, Walrosse und Pinguine. Am besten sind die Fenster unter Wasser.',
  seeloewen: 'Hier wohnen die Seebaeren. Bei der Fuetterung zeigen sie ihre Tricks - komm frueh, dann siehst du am meisten.',
  kamele: 'Kamele mit zwei Hoeckern. Im Hoecker ist Fett, kein Wasser.',
  alpakas: 'Hier wohnen die Riesenotter. Sei leise und hoer mal, wie viel sie miteinander reden.',
  streichelgehege: 'Hier darfst du rein und die Ziegen streicheln. Nur am Hals, nicht an den Hoernern.',
  spielplatz: 'Klettern, rutschen, planschen. Zeit zum Toben!',
  japangarten: 'Ein ruhiger Garten mit Teich und dicken Fischen. Gut fuer eine Pause.',
  tropenaquarium: 'Ein ganzes Haus voller Haie, Krokodile und bunter Fische.',
};
