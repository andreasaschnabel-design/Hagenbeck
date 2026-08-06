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
  alpaka: {
    kurz: 'Ein kleines Kamel ohne Hoecker - mit besonders warmer Wolle.',
    text: [
      'Alpakas kommen aus den hohen Bergen von Suedamerika. Dort ist es nachts sehr kalt. Deshalb haben sie so dicke Wolle.',
      'Ihre Wolle waermt besser als Schafwolle. Aus einer Schur wird ungefaehr ein ganzer Pullover und noch eine Muetze.',
      'Alpakas spucken. Aber fast nur untereinander, wenn sie sich um Futter streiten.',
      'Wenn ein Alpaka neugierig ist, summt es leise vor sich hin.',
    ],
    wusstest: [
      'Alpakas machen ihr Geschaeft alle an derselben Stelle. So bleibt die Wiese sauber.',
      'Ohren nach vorn heisst: Ich finde dich interessant. Ohren flach nach hinten heisst: Lass mich in Ruhe.',
    ],
    quiz: {
      frage: 'Was macht ein Alpaka, wenn es neugierig ist?',
      antworten: ['Es summt leise', 'Es bellt', 'Es klatscht'],
      richtig: 0,
      erklaerung: 'Alpakas summen - ganz leise vor sich hin.',
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
  tapir: {
    kurz: 'Ein Tier mit Mini-Ruessel, das unter Wasser laufen kann.',
    text: [
      'Der Tapir hat eine kleine Ruesselnase, die er in alle Richtungen biegen kann. Damit pflueckt er Blaetter.',
      'Tapire lieben Wasser. Sie koennen sogar tauchen und dabei ueber den Boden vom Fluss laufen.',
      'Tapir-Babys haben helle Streifen und Punkte - wie ein Wildschwein-Frischling im Pyjama.',
    ],
    wusstest: [
      'Der Ruessel ist Nase und Greifhand zugleich.',
      'Tapire sind mit Pferden und Nashoernern verwandt.',
    ],
    quiz: {
      frage: 'Was kann ein Tapir unter Wasser?',
      antworten: ['Ueber den Boden laufen', 'Schlafen', 'Fliegen'],
      richtig: 0,
      erklaerung: 'Er taucht ab und spaziert einfach unten am Flussboden entlang.',
    },
  },
  wasserschwein: {
    kurz: 'Das groesste Meerschweinchen der Welt - so schwer wie du und ein Freund zusammen.',
    text: [
      'Das Wasserschwein ist das groesste Nagetier der Welt. Es ist ein Riesen-Verwandter vom Meerschweinchen.',
      'Augen, Ohren und Nase sitzen oben auf dem Kopf. So kann es fast ganz unter Wasser sein und trotzdem alles sehen und hoeren.',
      'Wasserschweine sind superfriedlich. In Suedamerika setzen sich sogar Voegel auf ihren Ruecken.',
    ],
    wusstest: [
      'Zwischen den Zehen haben sie Schwimmhaeute wie eine Ente.',
      'Sie koennen beim Schwimmen ein Nickerchen machen.',
    ],
    quiz: {
      frage: 'Mit wem ist das Wasserschwein verwandt?',
      antworten: ['Mit dem Meerschweinchen', 'Mit dem Schwein', 'Mit dem Nilpferd'],
      richtig: 0,
      erklaerung: 'Es ist ein Riesen-Meerschweinchen - das groesste Nagetier der Welt.',
    },
  },
  nasenbaer: {
    kurz: 'Der Schnueffler mit dem Ringelschwanz, der immer nach oben zeigt.',
    text: [
      'Der Nasenbaer hat eine lange, bewegliche Nase. Damit schnueffelt er im Laub nach Kaefern und Fruechten.',
      'Beim Laufen haelt er seinen geringelten Schwanz kerzengerade nach oben - wie eine kleine Fahne.',
      'So sehen sich die Nasenbaeren im hohen Gras gegenseitig und keiner geht verloren.',
    ],
    wusstest: [
      'Nasenbaeren koennen kopfvoran einen Baum hinunterklettern.',
      'Sie sind mit den Waschbaeren verwandt.',
    ],
    quiz: {
      frage: 'Warum haelt der Nasenbaer den Schwanz nach oben?',
      antworten: ['Damit ihn die anderen sehen', 'Damit er nicht schmutzig wird', 'Zum Fliegen'],
      richtig: 0,
      erklaerung: 'Der Schwanz ist wie eine Fahne - so verliert die Gruppe niemanden.',
    },
  },
  pavian: {
    kurz: 'Der Affe mit der Silbermaehne, der auf Felsen schlaeft.',
    text: [
      'Mantelpaviane leben in grossen Familien auf einem Felsen. Der Chef traegt einen silbernen Umhang aus Haaren.',
      'Sie krabbeln sich gegenseitig durchs Fell. Das ist wie Freunde umarmen - wer sich pflegt, mag sich.',
      'Nachts schlafen Paviane im Sitzen auf schmalen Felskanten. Ihr Po hat dafuer extra dicke Sitzpolster.',
    ],
    wusstest: [
      'Im alten Aegypten waren Paviane heilige Tiere.',
      'Wenn ein Pavian gaehnt und die Zaehne zeigt, heisst das: Vorsicht, ich bin sauer!',
    ],
    quiz: {
      frage: 'Wo schlafen Paviane?',
      antworten: ['Im Sitzen auf dem Felsen', 'Im Nest im Baum', 'In einer Hoehle unter der Erde'],
      richtig: 0,
      erklaerung: 'Sie sitzen nachts auf Felskanten - ihr Po hat eingebaute Sitzkissen.',
    },
  },
  pelikan: {
    kurz: 'Der Vogel mit dem eingebauten Kescher unterm Schnabel.',
    text: [
      'Unter dem Schnabel hat der Pelikan einen dehnbaren Hautbeutel. Da passt mehr Wasser hinein als in einen Putzeimer!',
      'Der Beutel ist sein Kescher: Wasser wird rausgedrueckt, der Fisch bleibt drin und wird verschluckt.',
      'Pelikane fischen im Team. Sie schwimmen im Halbkreis und treiben die Fische zusammen - wie beim Fussball-Angriff.',
    ],
    wusstest: [
      'Ein Pelikan frisst jeden Tag ungefaehr ein Kilo Fisch.',
      'Seine Fluegel sind so breit wie ein Auto lang ist.',
    ],
    quiz: {
      frage: 'Wofuer benutzt der Pelikan seinen Kehlsack?',
      antworten: ['Als Kescher zum Fischen', 'Als Schlafsack', 'Zum Wasser aufbewahren'],
      richtig: 0,
      erklaerung: 'Er faengt damit Fische - das Wasser laeuft raus, der Fisch bleibt drin.',
    },
  },
  meerschweinchen: {
    kurz: 'Die kleinen Quieker aus Suedamerika.',
    text: [
      'Meerschweinchen kommen aus den Bergen von Suedamerika. Dort leben sie schon seit tausenden Jahren bei den Menschen.',
      'Sie reden den ganzen Tag miteinander: quieken, gurren, brummeln. Jeder Laut bedeutet etwas anderes.',
      'Wenn sich ein Meerschweinchen richtig freut, springt es in die Luft. Das nennt man Popcornen!',
    ],
    wusstest: [
      'Mit dem Meer haben sie nichts zu tun - sie kamen nur mit dem Schiff uebers Meer zu uns.',
      'Lautes Pfeifen heisst meistens: Futter her!',
    ],
    quiz: {
      frage: 'Was macht ein Meerschweinchen, wenn es sich freut?',
      antworten: ['Es springt in die Luft', 'Es klatscht', 'Es schuettelt den Kopf'],
      richtig: 0,
      erklaerung: 'Es huepft vor Freude - das heisst Popcornen, wie hupfendes Popcorn.',
    },
  },
  kaninchen: {
    kurz: 'Langohr mit Klimaanlage - die Ohren heissen Loeffel.',
    text: [
      'Das Hasenkaninchen sieht aus wie ein Feldhase, ist aber ein Kaninchen.',
      'So merkst du dir den Unterschied: Hasen wohnen draussen im Feld, Kaninchen graben Hoehlen unter der Erde.',
      'Die langen Ohren heissen Loeffel. Damit hoert das Kaninchen super - und kuehlt sich ab, wenn ihm heiss ist.',
      'Wenn Gefahr droht, klopft es laut mit den Hinterbeinen auf den Boden. Das warnt alle anderen.',
    ],
    wusstest: [
      'Kaninchen koennen jedes Ohr einzeln drehen.',
      'Beim Wegrennen schlagen sie blitzschnelle Haken.',
    ],
    quiz: {
      frage: 'Wie warnt ein Kaninchen seine Freunde?',
      antworten: ['Es klopft mit den Hinterbeinen', 'Es schreit laut', 'Es winkt mit den Ohren'],
      richtig: 0,
      erklaerung: 'Es trommelt mit den Hinterbeinen auf den Boden - das hoeren alle.',
    },
  },
  ara: {
    kurz: 'Der Riesenpapagei, der Nuesse knackt wie ein Nussknacker.',
    text: [
      'Der Gruenfluegel-Ara ist einer der groessten Papageien der Welt - rot, blau und gruen wie ein fliegender Regenbogen.',
      'Sein Schnabel ist so stark, dass er die haertesten Nuesse der Welt knackt.',
      'Aras bleiben ihr Leben lang mit ihrem Partner zusammen und fliegen immer dicht nebeneinander.',
      'Ein Ara kann aelter werden als ein Mensch in Rente geht - ueber 60 Jahre!',
    ],
    wusstest: [
      'Beim Klettern benutzt der Ara seinen Schnabel wie eine dritte Hand.',
      'Papageien greifen mit zwei Zehen nach vorne und zwei nach hinten.',
    ],
    quiz: {
      frage: 'Was kann der Ara mit seinem Schnabel?',
      antworten: ['Die haertesten Nuesse knacken', 'Pfeifen wie eine Floete', 'Loecher bohren'],
      richtig: 0,
      erklaerung: 'Sein Schnabel ist ein super Nussknacker - staerker als deine Haende.',
    },
  },
  kranich: {
    kurz: 'Der Gluecksvogel, der tanzen kann.',
    text: [
      'Der Mandschurenkranich ist in China und Japan ein Gluecksbringer. Er steht fuer langes Leben.',
      'Kraniche tanzen! Sie springen hoch, breiten die Fluegel aus und verbeugen sich voreinander.',
      'Kranich-Paare bleiben fuer immer zusammen und singen im Duett - so genau, dass es wie ein einziger Vogel klingt.',
    ],
    wusstest: [
      'Der rote Fleck auf dem Kopf ist keine Feder, sondern Haut - bei Aufregung leuchtet er.',
      'Kranich-Kueken koennen schon nach ein paar Stunden laufen.',
    ],
    quiz: {
      frage: 'Was machen Kraniche zusammen?',
      antworten: ['Sie tanzen', 'Sie bauen Tuerme', 'Sie schwimmen um die Wette'],
      richtig: 0,
      erklaerung: 'Sie springen, verbeugen sich und tanzen miteinander - das ganze Jahr.',
    },
  },
  muntjak: {
    kurz: 'Der Mini-Hirsch, der bellt wie ein Hund.',
    text: [
      'Der Muntjak ist ein winziger Hirsch - kaum groesser als ein Dackel auf langen Beinen.',
      'Wenn er sich erschreckt, bellt er! Deshalb heisst er auch Bellhirsch.',
      'Sein Geweih ist winzig. Dafuer hat er kleine Hauer im Maul, wie ein Vampir.',
    ],
    wusstest: [
      'Muntjaks gibt es schon seit Millionen von Jahren fast unveraendert.',
      'Sie leben am liebsten ganz allein.',
    ],
    quiz: {
      frage: 'Welches Geraeusch macht der Muntjak?',
      antworten: ['Er bellt wie ein Hund', 'Er miaut', 'Er kraeht'],
      richtig: 0,
      erklaerung: 'Er bellt - deshalb nennt man ihn auch Bellhirsch.',
    },
  },
  pinselohrschwein: {
    kurz: 'Das bunteste Schwein der Welt - mit Quasten an den Ohren.',
    text: [
      'Das Pinselohrschwein hat rotes Fell und lange weisse Haarpinsel an den Ohrenspitzen - wie kleine Quasten.',
      'Es wohnt im afrikanischen Regenwald und wuehlt dort mit der Schnauze nach Wurzeln.',
      'Die Babys haben Streifen wie unsere Wildschwein-Frischlinge.',
    ],
    wusstest: [
      'Pinselohrschweine koennen richtig gut schwimmen.',
      'Sie riechen Futter sogar tief unter der Erde.',
    ],
    quiz: {
      frage: 'Was hat das Pinselohrschwein an den Ohren?',
      antworten: ['Lange Haarpinsel', 'Goldene Ringe', 'Kleine Hoerner'],
      richtig: 0,
      erklaerung: 'Weisse Haarquasten - deshalb heisst es Pinselohrschwein.',
    },
  },
  stachelschwein: {
    kurz: 'Ein Nagetier mit eingebauter Ritterruestung.',
    text: [
      'Das Stachelschwein ist kein Schwein und kein Igel - es ist ein grosses Nagetier mit langen Stacheln.',
      'Bei Gefahr stellt es alle Stacheln auf und rasselt mit dem Schwanz wie mit einer Rassel. Das heisst: Bleib weg!',
      'Wenn das nicht hilft, laeuft es rueckwaerts auf den Angreifer zu. Die Stacheln piksen und bleiben stecken.',
      'Sogar Loewen lassen Stachelschweine lieber in Ruhe.',
    ],
    wusstest: [
      'Die Stacheln sind umgebaute Haare und werden so lang wie dein Unterarm.',
      'Stachelschwein-Paare bleiben fuer immer zusammen.',
    ],
    quiz: {
      frage: 'Was macht das Stachelschwein bei Gefahr?',
      antworten: ['Stacheln aufstellen und rasseln', 'Sich tot stellen', 'Schnell weglaufen'],
      richtig: 0,
      erklaerung: 'Es stellt die Stacheln auf und rasselt laut - die beste Warnung der Welt.',
    },
  },
  serval: {
    kurz: 'Die Katze mit den laengsten Beinen und Riesenohren.',
    text: [
      'Der Serval ist eine wilde Katze aus Afrika mit superlangen Beinen und riesigen Ohren.',
      'Mit den Ohren hoert er Maeuse sogar unter der Erde rascheln.',
      'Dann springt er hoch in die Luft und landet genau auf der Maus - bis zu drei Meter hoch!',
    ],
    wusstest: [
      'Der Serval kann Voegel im Flug aus der Luft fangen.',
      'Seine Ohren drehen sich wie kleine Satellitenschuesseln.',
    ],
    quiz: {
      frage: 'Womit findet der Serval seine Beute?',
      antworten: ['Mit seinen Riesenohren', 'Mit der Nase', 'Mit den Schnurrhaaren'],
      richtig: 0,
      erklaerung: 'Er hoert die Maeuse rascheln - sogar unter der Erde.',
    },
  },
  kudu: {
    kurz: 'Die Antilope mit den Korkenzieher-Hoernern.',
    text: [
      'Der Grosse Kudu ist eine riesige Antilope. Die Maennchen tragen Hoerner, die wie Korkenzieher gedreht sind.',
      'Die weissen Streifen auf dem Fell sind Tarnung: Im Gebuesch sieht der Kudu aus wie Aeste und Schatten.',
      'Kudus koennen aus dem Stand ueber eine Mauer springen, die hoeher ist als ein Erwachsener.',
    ],
    wusstest: [
      'Je aelter der Kudu-Mann, desto mehr Drehungen haben seine Hoerner.',
      'Auf der Anlage wohnen auch Impalas und andere Antilopen - wie in der echten Savanne.',
    ],
    quiz: {
      frage: 'Wie sehen die Hoerner vom Kudu aus?',
      antworten: ['Gedreht wie ein Korkenzieher', 'Gerade wie ein Stock', 'Rund wie ein Ring'],
      richtig: 0,
      erklaerung: 'Sie drehen sich in grossen Schrauben - bis zu drei Umdrehungen.',
    },
  },
  maehnenspringer: {
    kurz: 'Der Bergsteiger aus der Wueste mit dem Haar-Vorhang.',
    text: [
      'Der Maehnenspringer lebt in den Bergen der Wueste Sahara. An Hals und Brust haengt ein langer Haar-Vorhang.',
      'Er klettert steile Felswaende hoch, als waere es eine Treppe.',
      'Bei Gefahr bleibt er einfach stehen wie eine Statue - seine Fellfarbe sieht dann aus wie Fels.',
    ],
    wusstest: [
      'Maehnenspringer muessen fast nie trinken - das Wasser holen sie aus den Pflanzen.',
      'Sein Lieblingsplatz ist immer der hoechste Punkt vom Felsen.',
    ],
    quiz: {
      frage: 'Was macht der Maehnenspringer bei Gefahr?',
      antworten: ['Er steht still wie eine Statue', 'Er rennt im Zickzack', 'Er versteckt sich im Wasser'],
      richtig: 0,
      erklaerung: 'Er bleibt reglos stehen - dann sieht er aus wie ein Stueck Fels.',
    },
  },
  tahr: {
    kurz: 'Die Bergziege mit der Loewenmaehne aus dem hoechsten Gebirge der Welt.',
    text: [
      'Der Tahr kommt aus dem Himalaya - dem hoechsten Gebirge der Erde.',
      'Die Maenner tragen im Winter eine dicke helle Maehne um den Hals, fast wie ein Loewe.',
      'Seine Hufe haben Gummi-Sohlen. Damit klettert er auf Felsen, ohne auszurutschen - wie mit Kletterschuhen.',
    ],
    wusstest: [
      'Tahre halten Kaelte von minus 20 Grad aus.',
      'Im Sommer wandern sie den Berg hoch, im Winter wieder runter.',
    ],
    quiz: {
      frage: 'Was haben Tahre unter den Hufen?',
      antworten: ['Weiche Gummi-Sohlen', 'Spitze Krallen', 'Saugnaepfe'],
      richtig: 0,
      erklaerung: 'Gummiartige Ballen - damit rutschen sie auf Felsen nicht aus.',
    },
  },
  tamarin: {
    kurz: 'Winzige Aeffchen - der Papa traegt die Babys.',
    text: [
      'Tamarine sind so klein, dass sie auf deine Hand passen wuerden.',
      'Fast immer werden Zwillinge geboren. Und dann passiert etwas Besonderes: Der Papa traegt die Babys auf dem Ruecken!',
      'Nur zum Milchtrinken gibt er sie kurz der Mama.',
      'Statt Fingernaegeln haben Tamarine kleine Krallen zum Klettern.',
    ],
    wusstest: [
      'Ihre Rufe klingen wie Vogelpfeifen.',
      'Grosse Geschwister helfen beim Babysitten.',
    ],
    quiz: {
      frage: 'Wer traegt bei den Tamarinen die Babys?',
      antworten: ['Der Papa', 'Nur die Mama', 'Die Oma'],
      richtig: 0,
      erklaerung: 'Der Papa traegt die Zwillinge auf dem Ruecken - fast den ganzen Tag.',
    },
  },
  praeriehund: {
    kurz: 'Die Erdmaennchen Amerikas - sie bauen Staedte unter der Erde.',
    text: [
      'Praeriehunde sind keine Hunde - sie heissen nur so, weil sie bellen koennen.',
      'Unter der Erde bauen sie richtige Staedte mit Schlafzimmern, Kinderzimmern und vielen Gaengen.',
      'Einer steht immer Wache. Bellt er, flitzen alle blitzschnell in ihre Loecher.',
      'Zur Begruessung geben sich Praeriehunde ein Kuesschen!',
    ],
    wusstest: [
      'Fuer jeden Feind haben sie einen eigenen Warnruf - einer fuer Adler, einer fuer Fuechse.',
      'Nebenan wohnen die Baumstachler - Klettertiere mit Stachel-Fell.',
    ],
    quiz: {
      frage: 'Wie begruessen sich Praeriehunde?',
      antworten: ['Mit einem Kuesschen', 'Mit Winken', 'Mit einem Purzelbaum'],
      richtig: 0,
      erklaerung: 'Sie beruehren sich mit den Zaehnen - das sieht aus wie ein Kuss.',
    },
  },
  wapiti: {
    kurz: 'Der Riesenhirsch aus Amerika mit dem lauten Ruf.',
    text: [
      'Der Wapiti ist einer der groessten Hirsche der Welt - viel groesser als unsere Rehe.',
      'Sein Geweih waechst jedes Jahr komplett neu und wird so lang wie du gross bist.',
      'Im Herbst ruft der Wapiti-Mann so laut, dass man ihn kilometerweit hoert. Das klingt wie eine Mischung aus Pfeifen und Bruellen.',
    ],
    wusstest: [
      'Wapiti bedeutet in einer Indianersprache "weisser Po".',
      'Das alte Geweih faellt einfach ab - und ein neues waechst nach.',
    ],
    quiz: {
      frage: 'Was passiert jedes Jahr mit dem Geweih?',
      antworten: ['Es faellt ab und waechst neu', 'Es wird immer groesser', 'Es wechselt die Farbe'],
      richtig: 0,
      erklaerung: 'Jedes Fruehjahr faellt es ab, und ein ganz neues waechst nach.',
    },
  },
  schneeeule: {
    kurz: 'Die weisse Eule vom Nordpol - jagt auch am Tag.',
    text: [
      'Die Schnee-Eule wohnt in der Arktis, wo fast immer Schnee liegt. Ihr weisses Federkleid ist die perfekte Tarnung.',
      'Andere Eulen jagen nachts - die Schnee-Eule auch am Tag. Im Sommer wird es an ihrer Heimat naemlich gar nicht dunkel!',
      'Sogar ihre Fuesse sind mit Federn ueberzogen - wie warme Daunenstiefel.',
    ],
    wusstest: [
      'Die Maenner sind fast ganz weiss, die Frauen haben dunkle Sprenkel.',
      'Sie kann ihren Kopf fast einmal ganz herumdrehen.',
    ],
    quiz: {
      frage: 'Was ist an den Fuessen der Schnee-Eule besonders?',
      antworten: ['Sie sind mit Federn ueberzogen', 'Sie sind knallrot', 'Sie haben Schwimmhaeute'],
      richtig: 0,
      erklaerung: 'Federstiefel! Damit friert sie nicht am eisigen Boden.',
    },
  },
  riesenschildkroete: {
    kurz: 'Die gepanzerte Uroma - aelter als alle Menschen, die du kennst.',
    text: [
      'Riesenschildkroeten koennen ueber 100 Jahre alt werden - manche sogar 150!',
      'Ihr Panzer ist mit dem Skelett verwachsen. Sie kann ihn niemals ausziehen - er waechst ihr Leben lang mit.',
      'Zaehne hat sie keine. Sie schneidet Pflanzen mit scharfen Kanten am Maul ab, wie mit einer Schere.',
    ],
    wusstest: [
      'Eine Riesenschildkroete kann ein ganzes Jahr ohne Essen auskommen.',
      'Neben der Anlage stehen Saurier-Figuren - Schildkroeten gab es schon zur Dino-Zeit!',
    ],
    quiz: {
      frage: 'Kann die Schildkroete ihren Panzer ausziehen?',
      antworten: ['Nein, er ist mit ihr verwachsen', 'Ja, zum Schlafen', 'Nur im Sommer'],
      richtig: 0,
      erklaerung: 'Der Panzer gehoert zu ihrem Skelett - wie bei dir die Rippen.',
    },
  },
  zwergotter: {
    kurz: 'Der kleinste Otter der Welt - mit geschickten Fingerchen.',
    text: [
      'Zwergotter sind die kleinsten Otter der Welt und wohnen mit im Orang-Utan-Haus.',
      'Ihre Pfoten sind fast wie Haende: Damit tasten sie unter Steinen nach Krebsen.',
      'Sie leben in Grossfamilien und quatschen dauernd miteinander - piepsen, quieken, pfeifen.',
      'Manche Zwergotter jonglieren mit kleinen Steinen!',
    ],
    wusstest: [
      'Harte Muscheln legen sie in die Sonne, bis sie von selbst aufgehen.',
      'Grosse Geschwister passen auf die kleinen auf.',
    ],
    quiz: {
      frage: 'Womit jonglieren Zwergotter gern?',
      antworten: ['Mit kleinen Steinen', 'Mit Fischen', 'Mit Baellen'],
      richtig: 0,
      erklaerung: 'Mit Steinchen - so trainieren sie ihre flinken Finger.',
    },
  },
  mara: {
    kurz: 'Sieht aus wie ein Hase auf Reh-Beinen - und gehoert zu den Meerschweinchen.',
    text: [
      'Der Mara sieht aus wie eine Mischung aus Hase und Reh. In Wirklichkeit ist er ein grosses Nagetier aus Argentinien.',
      'Mara-Paare bleiben fuer immer zusammen. Wo einer ist, ist der andere nie weit weg.',
      'Alle Mara-Babys der Gruppe wohnen zusammen in einer grossen Hoehle - wie in einem Kindergarten.',
    ],
    wusstest: [
      'Maras koennen mit allen vier Beinen gleichzeitig abspringen.',
      'Sie sind mit den Meerschweinchen verwandt.',
    ],
    quiz: {
      frage: 'Wo wohnen die Mara-Babys?',
      antworten: ['Alle zusammen in einer Hoehle', 'Jedes allein', 'Im Baum'],
      richtig: 0,
      erklaerung: 'In einer Gemeinschafts-Hoehle - wie in einem Kindergarten unter der Erde.',
    },
  },
  warzenschwein: {
    kurz: 'Das Schwein, das beim Fressen kniet und den Schwanz wie eine Antenne traegt.',
    text: [
      'Das Warzenschwein hat dicke Beulen im Gesicht - die Warzen. Sie schuetzen es wie ein Helm beim Raufen.',
      'Zum Fressen kniet es sich hin! Auf den Knien rutscht es grasend uebers Feld.',
      'Wenn Warzenschweine rennen, stehen alle Schwaenze senkrecht nach oben - wie kleine Antennen. So verliert keiner die Familie.',
    ],
    wusstest: [
      'Warzenschweine schlafen rueckwaerts in Erdhoehlen - mit den Hauern zum Eingang.',
      'Aus dem Film Koenig der Loewen kennst du eines: Pumbaa ist ein Warzenschwein!',
    ],
    quiz: {
      frage: 'Wie frisst das Warzenschwein?',
      antworten: ['Auf den Knien', 'Im Liegen', 'Im Stehen auf zwei Beinen'],
      richtig: 0,
      erklaerung: 'Es kniet sich hin und rutscht auf den Knien von Grasbueschel zu Grasbueschel.',
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
  afrikapanorama: 'Zebras, Strausse und Antilopen - alle sehen aus, als waeren sie auf einer grossen Wiese.',
  strausse: 'Hier wohnen Strausse, Zebras und Warzenschweine zusammen auf einer grossen Steppe.',
  eismeer: 'Eisbaeren, Walrosse und Pinguine. Am besten sind die Fenster unter Wasser.',
  seeloewen: 'Hier wohnen die Seebaeren. Bei der Fuetterung zeigen sie ihre Tricks - komm frueh, dann siehst du am meisten.',
  kamele: 'Kamele mit zwei Hoeckern. Im Hoecker ist Fett, kein Wasser.',
  alpakas: 'Hier wohnen die Riesenotter. Sei leise und hoer mal, wie viel sie miteinander reden.',
  streichelgehege: 'Hier darfst du rein und die Ziegen streicheln. Nur am Hals, nicht an den Hoernern.',
  spielplatz: 'Klettern, rutschen, planschen. Zeit zum Toben!',
  japangarten: 'Ein ruhiger Garten mit Teich und dicken Fischen. Gut fuer eine Pause.',
  tropenaquarium: 'Ein ganzes Haus voller Haie, Krokodile und bunter Fische.',
  alpakawiese: 'Kleine Kamele mit dicker Wolle - und daneben laufen die grossen Nandu-Voegel herum.',
};
