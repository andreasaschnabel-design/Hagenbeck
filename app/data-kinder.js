/*
 * Kindermodus: einfache Texte in Du-Ansprache, kurze Sätze,
 * pro Tier eine Quizfrage. Wird über den Schalter "Kindermodus"
 * anstelle der ausführlichen Texte angezeigt und vorgelesen.
 *
 * Zielgruppe: etwa 5 bis 10 Jahre - vorlesbar und selbst lesbar.
 */

export const KINDER_TIERE = {
  eisbaer: {
    kurz: 'Der größte Bär der Welt. Er lebt da, wo alles voller Eis ist.',
    text: [
      'Der Eisbär ist ein richtig großer Bär. Wenn er sich aufstellt, ist er größer als zwei erwachsene Menschen übereinander.',
      'Sein Fell sieht weiß aus. In Wirklichkeit ist es durchsichtig wie kleine Glasröhrchen. Darunter ist seine Haut schwarz. Schwarz wird in der Sonne warm - so friert der Eisbär nicht.',
      'Eisbären schwimmen sehr gern. Sie paddeln nur mit den Vorderbeinen. Die Hinterbeine sind ihr Lenkrad.',
    ],
    wusstest: [
      'Seine Tatzen sind so groß wie ein Essteller. Damit sinkt er im Schnee nicht ein.',
      'Er riecht eine Robbe noch aus einem Kilometer Entfernung - das ist so weit wie zehn Fussballfelder.',
    ],
    quiz: {
      frage: 'Welche Farbe hat die Haut vom Eisbären unter dem Fell?',
      antworten: ['Schwarz', 'Weiß', 'Rosa'],
      richtig: 0,
      erklaerung: 'Sie ist schwarz. Schwarz nimmt die Wärme der Sonne besonders gut auf.',
    },
  },
  walross: {
    kurz: 'Eine riesige Robbe mit zwei langen Zähnen und einem Schnurrbart.',
    text: [
      'Das Walross ist so schwer wie ein kleines Auto. An Land robbt es langsam herum. Im Wasser ist es aber richtig schnell.',
      'Die zwei langen Zähne sind kein Spielzeug. Damit zieht sich das Walross aufs Eis, so wie du dich mit den Armen aus dem Schwimmbecken ziehst.',
      'Mit seinem Schnurrbart sucht es Muscheln am Meeresboden. Es kann sie fühlen, auch wenn es nichts sieht.',
    ],
    wusstest: [
      'Ein Walross hat ungefähr 400 Schnurrhaare.',
      'Wenn es sich aufregt, wird seine Haut rosa.',
    ],
    quiz: {
      frage: 'Wozu benutzt das Walross seine langen Zähne?',
      antworten: ['Zum Klettern aufs Eis', 'Zum Zähneputzen', 'Zum Musikmachen'],
      richtig: 0,
      erklaerung: 'Es hakt sich damit fest und zieht sich aufs Eis.',
    },
  },
  pinguin: {
    kurz: 'Ein Vogel, der nicht fliegen kann - unter Wasser aber wie eine Rakete ist.',
    text: [
      'Pinguine sind Vögel. Aber ihre Flügel sind keine Flügel zum Fliegen, sondern Flossen zum Schwimmen.',
      'Unter Wasser sind sie schneller als du auf dem Fahrrad. An Land watscheln sie lustig hin und her.',
      'Auf dem Bauch können sie über Schnee rutschen. Das ist ihre Rutschbahn.',
    ],
    wusstest: [
      'Kein einziger Pinguin lebt beim Nordpol. Alle leben unten auf der anderen Halbkugel.',
      'Papa und Mama erkennen ihr Küken an der Stimme - auch wenn tausend Pinguine rufen.',
    ],
    quiz: {
      frage: 'Wo leben Pinguine?',
      antworten: ['Nur auf der Südhalbkugel', 'Am Nordpol', 'Überall'],
      richtig: 0,
      erklaerung: 'Pinguine leben nur auf der Südhalbkugel. Am Nordpol wohnt der Eisbär.',
    },
  },
  seebaer: {
    kurz: 'Die flinke Robbe mit dem dicken Pelz. Bei der Fütterung zeigt sie ihre Tricks.',
    text: [
      'Seebären können an Land richtig laufen. Sie klappen ihre hinteren Flossen nach vorne und stapfen los.',
      'Ihren Namen haben sie von ihrem Fell: Es ist dick und braun wie bei einem Bären. Darunter bleibt es kuschelig warm, auch im kalten Wasser.',
      'Bei der Fütterung zeigen sie Kunststücke. Das ist wichtig: So lernen sie, dem Tierarzt freiwillig das Maul zu zeigen. Dann tut nichts weh.',
    ],
    wusstest: [
      'Ein Seebär erkennt seinen Pfleger an der Stimme.',
      'Unter Wasser schwimmt er wie ein riesiger Pinguin - mit den Vorderflossen.',
    ],
    quiz: {
      frage: 'Warum heißt der Seebär Seebär?',
      antworten: ['Wegen seinem dicken braunen Fell', 'Weil er brummt wie ein Bär', 'Weil er Honig frisst'],
      richtig: 0,
      erklaerung: 'Sein dichter brauner Pelz erinnerte Seefahrer an einen Bären.',
    },
  },
  elefant: {
    kurz: 'Das schwerste Tier im Park. Sein Rüssel kann alles - sogar duschen.',
    text: [
      'Ein Elefant wiegt so viel wie drei Autos. Trotzdem läuft er fast lautlos, weil seine Füße wie dicke Kissen sind.',
      'Der Rüssel ist Nase und Hand zusammen. Damit kann der Elefant einen schweren Ast heben - oder eine einzelne Erdnuss aufheben.',
      'Zum Trinken saugt er Wasser in den Rüssel und spritzt es sich dann ins Maul. Er trinkt also nicht durch den Rüssel wie durch einen Strohhalm.',
      'Elefanten können sich mit sehr tiefen Tönen unterhalten. Die sind so tief, dass wir Menschen sie nicht hören.',
    ],
    wusstest: [
      'Mit den großen Ohren fächelt sich der Elefant Luft zu, wenn ihm heiß ist.',
      'Elefanten hören mit den Füßen. Sie spüren, wenn der Boden ganz leicht wackelt.',
    ],
    quiz: {
      frage: 'Wie trinkt ein Elefant?',
      antworten: ['Er saugt Wasser an und spritzt es sich ins Maul', 'Er trinkt durch den Rüssel wie durch einen Strohhalm', 'Er leckt das Wasser wie eine Katze'],
      richtig: 0,
      erklaerung: 'Der Rüssel ist nur der Eimer. Getrunken wird mit dem Mund.',
    },
  },
  orangutan: {
    kurz: 'Sein Name heißt "Waldmensch". Er lebt fast immer in Bäumen.',
    text: [
      'Orang-Utans sind Menschenaffen. Sie sind uns sehr ähnlich - sie haben sogar Fingerabdrücke.',
      'Sie klettern langsam und überlegt von Ast zu Ast. Springen wäre zu gefährlich, denn sie sind schwer.',
      'Jeden Abend bauen sie sich ein neues Bett aus Zweigen und Blättern, ganz oben im Baum.',
      'Wenn es regnet, halten sie sich manchmal ein großes Blatt über den Kopf. Wie einen Regenschirm.',
    ],
    wusstest: [
      'Ein Orang-Utan-Kind bleibt sechs bis acht Jahre bei seiner Mama.',
      'Orang-Utans knacken Schlösser, wenn niemand hinschaut. Sie sind sehr schlau.',
    ],
    quiz: {
      frage: 'Was baut sich ein Orang-Utan jeden Abend?',
      antworten: ['Ein Nest zum Schlafen', 'Eine Brücke', 'Eine Rutsche'],
      richtig: 0,
      erklaerung: 'Ein neues Schlafnest aus Zweigen - jeden Abend ein frisches.',
    },
  },
  tiger: {
    kurz: 'Die größte Katze der Welt. Jeder Tiger hat sein eigenes Streifenmuster.',
    text: [
      'Ein Tiger ist eine Katze - nur eben sehr, sehr groß. Er schnurrt zwar nicht wie deine Hauskatze, aber er putzt sich genauso.',
      'Kein Tiger sieht aus wie ein anderer. Die Streifen sind wie ein Fingerabdruck.',
      'Anders als die meisten Katzen liebt der Tiger Wasser. An heißen Tagen liegt er stundenlang im Becken.',
      'Tiger schlafen am Tag sehr viel. Wenn du einen schlafenden Tiger siehst, ist das ganz normal.',
    ],
    wusstest: [
      'Auch die Haut vom Tiger ist gestreift, nicht nur das Fell.',
      'Ein Tiger kann aus dem Stand weiter springen, als ein Auto lang ist.',
    ],
    quiz: {
      frage: 'Warum sieht kein Tiger aus wie der andere?',
      antworten: ['Jeder hat ein eigenes Streifenmuster', 'Jeder hat eine andere Farbe', 'Jeder ist anders groß'],
      richtig: 0,
      erklaerung: 'Die Streifen sind bei jedem Tiger anders - wie dein Fingerabdruck.',
    },
  },
  trampeltier: {
    kurz: 'Das Kamel mit zwei Höckern. In den Höckern ist kein Wasser, sondern Fett.',
    text: [
      'Viele denken, im Höcker ist Wasser. Stimmt aber nicht: Da ist Fett drin. Das ist der Vorrat für Tage ohne Futter.',
      'Wenn der Höcker hängt, ist der Vorrat fast leer. Nach dem Fressen steht er wieder aufrecht.',
      'Trampeltiere können bei sehr großer Kälte und bei großer Hitze leben. Im Winter wächst ihnen ein dickes Wollkleid, im Frühling fällt es in Fetzen ab.',
    ],
    wusstest: [
      'Ein Kamel kann in wenigen Minuten eine ganze Badewanne voll Wasser trinken.',
      'Es hat doppelte Wimpern - wie eine Schutzbrille gegen Sand.',
    ],
    quiz: {
      frage: 'Was ist im Höcker von einem Kamel?',
      antworten: ['Fett', 'Wasser', 'Luft'],
      richtig: 0,
      erklaerung: 'Fett. Das ist der Notvorrat für schlechte Zeiten.',
    },
  },
  zebra: {
    kurz: 'Ein Wildpferd im Streifenpyjama. Kein Zebra sieht aus wie das andere.',
    text: [
      'Zebras sind mit Pferden verwandt. Reiten kann man sie trotzdem nicht - sie sind viel zu wild dafür.',
      'Warum die Streifen? Forscher glauben: Fliegen mögen keine Streifen. Sie landen dort viel seltener. Die Streifen sind also ein Insektenschutz.',
      'Ein Zebrafohlen erkennt seine Mama an den Streifen. In den ersten Tagen stellt sie sich deshalb zwischen ihr Kind und die Herde.',
    ],
    wusstest: [
      'Zebras schlafen im Stehen. Immer eines bleibt wach und passt auf.',
      'Ein Tritt vom Zebra ist so stark, dass sogar ein Löwe aufpassen muss.',
    ],
    quiz: {
      frage: 'Wofür sind die Streifen beim Zebra gut?',
      antworten: ['Gegen stechende Fliegen', 'Zum Schön aussehen', 'Damit sie schneller rennen'],
      richtig: 0,
      erklaerung: 'Fliegen landen auf gestreiften Tieren viel seltener.',
    },
  },
  strauss: {
    kurz: 'Der größte Vogel der Welt. Fliegen kann er nicht - rennen dafür wie ein Auto.',
    text: [
      'Ein Strauß ist größer als ein erwachsener Mensch. Fliegen kann er nicht, dafür rennt er 70 Kilometer pro Stunde.',
      'Dass ein Strauß den Kopf in den Sand steckt, ist erfunden. In Wirklichkeit legt er Hals und Kopf flach auf den Boden. Von weitem sieht er dann aus wie ein Busch.',
      'Ein Straußenei wiegt so viel wie 25 Hühnereier. Du könntest dich daraufstellen, ohne dass es kaputtgeht.',
    ],
    wusstest: [
      'Das Auge eines Strausses ist größer als sein Gehirn.',
      'Der schwarz-weiße ist der Papa, der graubraune die Mama.',
    ],
    quiz: {
      frage: 'Steckt ein Strauß bei Gefahr den Kopf in den Sand?',
      antworten: ['Nein, er legt sich flach auf den Boden', 'Ja, immer', 'Nur wenn es regnet'],
      richtig: 0,
      erklaerung: 'Das ist nur eine alte Geschichte. Er macht sich flach und tarnt sich als Busch.',
    },
  },
  loewe: {
    kurz: 'Der König, der am liebsten schläft - bis zu 20 Stunden am Tag.',
    text: [
      'Löwen sind die einzigen Katzen, die in einer großen Familie leben. Diese Familie heißt Rudel.',
      'Die Mamas gehen jagen, meistens gemeinsam. Der Papa passt auf das Gebiet auf.',
      'Löwen schlafen fast den ganzen Tag. Wenn du einen schlafenden Löwen siehst, ist er nicht traurig - er macht genau das, was Löwen machen.',
      'Sein Brüllen kann man acht Kilometer weit hören. Das ist so weit wie von hier bis in die Innenstadt.',
    ],
    wusstest: [
      'Nur der Papa hat eine Mähne. Je dunkler sie ist, desto älter ist er meistens.',
      'Kleine Löwenbabys haben Flecken im Fell. Die verschwinden, wenn sie größer werden.',
    ],
    quiz: {
      frage: 'Wie lange schläft ein Löwe ungefähr am Tag?',
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
      'Auf einem Bein zu stehen ist kein Kunststück. So bleibt das andere Bein warm, so wie du im Winter eine Hand in die Tasche steckst.',
    ],
    wusstest: [
      'Flamingo-Eltern füttern ihr Küken mit einer rosa Milch aus dem Hals.',
      'Ihr Nest ist ein Hügel aus Schlamm, den sie selbst bauen.',
    ],
    quiz: {
      frage: 'Warum ist ein Flamingo rosa?',
      antworten: ['Wegen seinem Futter', 'Weil er in der Sonne liegt', 'Er wird so geboren'],
      richtig: 0,
      erklaerung: 'Die kleinen Krebse, die er frisst, färben seine Federn rosa.',
    },
  },
  riesenotter: {
    kurz: 'Der größte Otter der Welt. Er wohnt mit seiner ganzen Familie zusammen.',
    text: [
      'Riesenotter sind so lang wie ein Erwachsener groß ist. Sie leben am Fluss - Mama, Papa und die Kinder alle zusammen.',
      'Sie reden fast die ganze Zeit miteinander: quieken, schnattern, pfeifen. Hör mal hin, wenn du an der Anlage stehst!',
      'Beim Fischen helfen alle zusammen. Sie treiben die Fische in eine Ecke - wie eine Fussballmannschaft beim Angriff.',
      'Jeder Riesenotter hat einen hellen Fleck am Hals. Daran erkennen sie sich gegenseitig - wie an einem Namensschild.',
    ],
    wusstest: [
      'Ein Riesenotter hält seinen Fisch mit den Pfoten fest wie du ein Brot.',
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
    kurz: 'Ein kleines Kamel ohne Höcker - mit besonders warmer Wolle.',
    text: [
      'Alpakas kommen aus den hohen Bergen von Südamerika. Dort ist es nachts sehr kalt. Deshalb haben sie so dicke Wolle.',
      'Ihre Wolle wärmt besser als Schafwolle. Aus einer Schur wird ungefähr ein ganzer Pullover und noch eine Mütze.',
      'Alpakas spucken. Aber fast nur untereinander, wenn sie sich um Futter streiten.',
      'Wenn ein Alpaka neugierig ist, summt es leise vor sich hin.',
    ],
    wusstest: [
      'Alpakas machen ihr Geschäft alle an derselben Stelle. So bleibt die Wiese sauber.',
      'Ohren nach vorn heißt: Ich finde dich interessant. Ohren flach nach hinten heißt: Lass mich in Ruhe.',
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
      'Streichle am Hals oder an der Schulter. An den Hörnern zieht man nicht - die sind kein Griff.',
      'Ziegen haben viereckige Pupillen. Damit sehen sie fast rundherum, ohne den Kopf zu drehen. Sie sehen dich also auch, wenn sie wegschauen.',
      'Ganz wichtig: nichts füttern, was du selbst mitgebracht hast. Brot macht Ziegen krank. Futter gibt es nur aus dem Automaten im Park.',
    ],
    wusstest: [
      'Ziegen merken sich Gesichter und mögen freundliche Gesichter lieber.',
      'Oben vorne haben Ziegen gar keine Zähne, nur eine harte Platte.',
    ],
    quiz: {
      frage: 'Darfst du der Ziege dein Brot geben?',
      antworten: ['Nein, davon wird sie krank', 'Ja, Ziegen fressen alles', 'Nur wenn es alt ist'],
      richtig: 0,
      erklaerung: 'Nein. Nur Futter aus dem Automaten im Park ist richtig für sie.',
    },
  },
  hai: {
    kurz: 'Es gibt Haie schon länger als Bäume - seit 400 Millionen Jahren.',
    text: [
      'Haie gab es schon, als die Dinosaurier noch gar nicht da waren. Sie sind älter als jeder Baum auf der Welt.',
      'Ein Hai hat keine Knochen. Sein Skelett ist aus Knorpel - so wie deine Nasenspitze und deine Ohren.',
      'Haie spüren Strom. Jedes Lebewesen macht ganz kleine elektrische Signale, wenn sich seine Muskeln bewegen. Der Hai findet damit sogar Fische, die sich im Sand verstecken.',
      'Fällt ein Zahn aus, rückt einfach der nächste nach. Dahinter warten schon mehrere Reihen.',
    ],
    wusstest: [
      'Haihaut fühlt sich an wie Schmirgelpapier.',
      'Haie sind viel weniger gefährlich, als viele denken. Menschen sind für Haie viel gefährlicher als umgekehrt.',
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
      'Krokodile gibt es seit ungefähr 200 Millionen Jahren. Sie sahen damals schon fast genauso aus wie heute.',
      'Sie sind näher mit Vögeln verwandt als mit Eidechsen. Komisch, aber wahr.',
      'Zubeissen kann ein Krokodil unglaublich fest. Das Maul aufmachen kann es aber nur schwach. Mit einem Gummiband könnte man es zuhalten.',
      'Krokodilmütter tragen ihre frisch geschlüpften Babys ganz vorsichtig im Maul zum Wasser.',
    ],
    wusstest: [
      'Ob aus dem Ei ein Junge oder ein Mädchen wird, entscheidet die Wärme im Nest.',
      'Ein Krokodil kann monatelang nichts fressen und wird trotzdem nicht schwach.',
    ],
    quiz: {
      frage: 'Womit sind Krokodile näher verwandt?',
      antworten: ['Mit Vögeln', 'Mit Fischen', 'Mit Hunden'],
      richtig: 0,
      erklaerung: 'Mit Vögeln. Beide stammen von denselben Urahnen ab.',
    },
  },
  rochen: {
    kurz: 'Wie ein flachgedrückter Hai, der durchs Wasser fliegt.',
    text: [
      'Rochen sind mit Haien verwandt. Man kann sich einen Rochen wie einen ganz flachen Hai vorstellen.',
      'Sie bewegen ihre großen Flossen wie Flügel. Es sieht aus, als würden sie unter Wasser fliegen.',
      'Ihr Mund ist unten am Bauch. Was oben aussieht wie zwei Augen mit Mund, sind in Wirklichkeit die Nasenlöcher - die Augen sitzen auf dem Rücken.',
    ],
    wusstest: [
      'Manche Rochen können kleine Stromschläge geben, um sich zu wehren.',
      'Der Stachel am Schwanz ist nur zur Verteidigung, nicht zum Jagen.',
    ],
    quiz: {
      frage: 'Wo ist der Mund von einem Rochen?',
      antworten: ['Unten am Bauch', 'Oben auf dem Rücken', 'Am Schwanz'],
      richtig: 0,
      erklaerung: 'Unten. Deshalb frisst er am Meeresboden.',
    },
  },
  clownfisch: {
    kurz: 'Der kleine orange Fisch, der in einer giftigen Blume wohnt.',
    text: [
      'Der Clownfisch lebt mitten in einer Seeanemone. Die hat Nesseln, die andere Fische verbrennen würden.',
      'Der Clownfisch hat einen Schleim auf der Haut. Der schützt ihn. So hat er ein Zuhause, in das sich kein Feind traut.',
      'Ein Riff sieht aus wie ein Steingarten, ist aber lebendig. Korallen sind winzige Tiere, die Häuschen aus Kalk bauen.',
    ],
    wusstest: [
      'Ein kleines Clownfisch-Paar verjagt sogar viel größere Fische aus seiner Anemone.',
      'In den Riffen der Welt leben ein Viertel aller Meerestiere - obwohl Riffe nur ganz wenig Platz einnehmen.',
    ],
    quiz: {
      frage: 'Warum tut die Anemone dem Clownfisch nicht weh?',
      antworten: ['Er hat eine Schleimschicht als Schutz', 'Er ist zu schnell', 'Die Anemone mag ihn nicht'],
      richtig: 0,
      erklaerung: 'Sein Schleim schützt ihn vor den Nesseln.',
    },
  },
  riesenschlange: {
    kurz: 'Sie hat kein Gift. Sie ist einfach unglaublich stark.',
    text: [
      'Riesenschlangen sind nicht giftig. Sie halten ihre Beute mit Muskelkraft fest.',
      'Ihr Unterkiefer hängt nur an einem dehnbaren Band. Deshalb kann sie ihr Maul viel weiter aufmachen als jedes andere Tier.',
      'Nach einer großen Mahlzeit ruht sie manchmal wochenlang. Sie muss dann lange nichts mehr fressen.',
      'Schlangen riechen mit der Zunge. Deshalb züngeln sie die ganze Zeit.',
    ],
    wusstest: [
      'Schlangen können die Augen nicht schließen - sie haben keine Lider, sondern eine durchsichtige Schuppe davor.',
      'Beim Häuten streift die Schlange ihre alte Haut ab wie eine Socke.',
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
      'Flughunde sind Säugetiere - genau wie Hunde, Katzen und du. Sie sind die einzigen Säugetiere, die richtig fliegen können.',
      'Ihre Flügel sind dünne Haut zwischen ganz langen Fingern. Stell dir vor, zwischen deinen Fingern wäre ein Segel gespannt.',
      'Sie fressen am liebsten Obst. Dabei helfen sie dem Wald: Sie verteilen die Samen und viele Bäume können nur so wachsen.',
      'Kopfüber zu hängen ist für sie nicht anstrengend. Ihre Krallen halten von ganz allein fest, sogar im Schlaf.',
    ],
    wusstest: [
      'Flughunde finden ihr Futter mit Augen und Nase, nicht mit Ultraschall.',
      'Sie sind so groß wie eine Katze - manche haben Flügel so breit wie ein Mensch groß ist.',
    ],
    quiz: {
      frage: 'Was ist ein Flughund?',
      antworten: ['Ein Säugetier', 'Ein Vogel', 'Ein Insekt'],
      richtig: 0,
      erklaerung: 'Ein Säugetier - das einzige, das richtig fliegen kann.',
    },
  },
  kamtschatkabaer: {
    kurz: 'Ein riesiger brauner Bär, der am liebsten Lachse fängt.',
    text: [
      'Der Kamtschatkabär kommt aus dem kalten Osten von Russland. Er ist einer der größten Braunbären der Welt.',
      'Im Sommer steht er am Fluss und fängt Lachse - manchmal mitten im Sprung.',
      'Im Herbst frisst er sich richtig dick und rund. Dann verschläft er fast den ganzen Winter in seiner Höhle.',
    ],
    wusstest: [
      'Ein Bär kann schneller rennen als das schnellste Rennrad fährt.',
      'Bären riechen besser als jeder Spürhund.',
    ],
    quiz: {
      frage: 'Was frisst der Kamtschatkabär im Sommer am liebsten?',
      antworten: ['Lachse aus dem Fluss', 'Honigbrote', 'Pilze'],
      richtig: 0,
      erklaerung: 'Er steht am Fluss und fängt die Lachse mit Maul und Pranken.',
    },
  },
  leopard: {
    kurz: 'Eine seltene Grosskatze mit Punktemuster - und ein Kletterkünstler.',
    text: [
      'Der Nordchinesische Leopard ist sehr, sehr selten. Nur wenige Zoos auf der ganzen Welt haben ihn - Hagenbeck ist einer davon.',
      'Sein Fell hat dunkle Ringe, die wie Blumen aussehen. Man nennt sie Rosetten.',
      'Leoparden sind die besten Kletterer von allen Grosskatzen. Sie schleppen sogar ihr Essen auf Bäume, damit es keiner klaut.',
    ],
    wusstest: [
      'Ein Leopard springt aus dem Stand höher als eine Tür.',
      'Kein Leopard hat das gleiche Punktemuster wie ein anderer.',
    ],
    quiz: {
      frage: 'Was macht der Leopard mit seiner Beute?',
      antworten: ['Er zieht sie auf einen Baum', 'Er vergräbt sie', 'Er teilt sie mit allen'],
      richtig: 0,
      erklaerung: 'Oben im Baum kann ihm niemand das Futter wegnehmen.',
    },
  },
  praeriebison: {
    kurz: 'Der zottelige Riese aus Amerika mit dem großen Buckel.',
    text: [
      'Bisons sind die schwersten Tiere Amerikas. Früher liefen Millionen von ihnen durch die Prairie.',
      'Dann haben Menschen fast alle gejagt. Nur wenige hundert blieben übrig. Zum Glück haben Schutzgebiete und Zoos die Bisons gerettet.',
      'Der große Buckel besteht aus Muskeln. Damit schiebt der Bison im Winter den Schnee weg und findet das Gras darunter.',
    ],
    wusstest: [
      'Sein Fell wärmt so gut, dass Schnee auf seinem Rücken liegen bleibt und nicht schmilzt.',
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
      'Die Farben zeigen, wer der Chef ist. Je bunter das Gesicht, desto wichtiger ist das Männchen in der Gruppe.',
      'In seinen Backentaschen kann der Mandrill Futter sammeln und mitnehmen - wie in einer eingebauten Brotdose.',
    ],
    wusstest: [
      'Wenn ein Mandrill gähnt, zeigt er seine langen Eckzähne - das heißt: Vorsicht!',
      'In Afrika ziehen manchmal hunderte Mandrille zusammen durch den Wald.',
    ],
    quiz: {
      frage: 'Was bedeutet ein besonders buntes Gesicht beim Mandrill?',
      antworten: ['Er ist der Chef', 'Er ist krank', 'Er hat sich angemalt'],
      richtig: 0,
      erklaerung: 'Je bunter, desto wichtiger ist das Männchen in seiner Gruppe.',
    },
  },
  riesenkaenguru: {
    kurz: 'Das größte Beuteltier der Welt - es springt weiter als ein Auto lang ist.',
    text: [
      'Das Rote Riesenkänguru kommt aus Australien. Mit einem einzigen Sprung schafft es neun Meter - so weit wie zwei Autos hintereinander.',
      'Sein dicker Schwanz ist wie ein drittes Bein. Beim Sitzen stützt er sich darauf.',
      'Das Baby ist bei der Geburt winzig - so klein wie ein Gummibärchen. Es krabbelt in Mamas Beutel und wächst dort weiter.',
      'Kängurus können nicht rückwärts gehen. Nur vorwärts, immer vorwärts.',
    ],
    wusstest: [
      'Beim Hüpfen federn seine Beine wie Sprungfedern - das spart Kraft.',
      'Wenn ihm heiß ist, leckt sich das Känguru die Arme ab - das kühlt.',
    ],
    quiz: {
      frage: 'Wie groß ist ein Känguru-Baby bei der Geburt?',
      antworten: ['So klein wie ein Gummibärchen', 'So groß wie eine Katze', 'So groß wie ein Fußball'],
      richtig: 0,
      erklaerung: 'Es ist winzig und wächst dann im Beutel der Mama weiter.',
    },
  },
  onager: {
    kurz: 'Ein wilder Esel aus Persien - schneller als fast jedes Pferd.',
    text: [
      'Der Onager sieht aus wie ein Esel, ist aber ein Wildtier. Zähmen lässt er sich nicht - das haben schon die Menschen vor tausenden Jahren versucht.',
      'Er ist ein Sprinter: 70 Kilometer pro Stunde schafft er - so schnell fährt ein Auto in der Stadt.',
      'Onager leben in der Halbwüste und brauchen tagelang kein Wasser.',
      'In der Wildnis gibt es nur noch ganz wenige. Zoos wie Hagenbeck helfen, dass sie nicht aussterben.',
    ],
    wusstest: [
      'Onager wälzen sich jeden Tag im Sand - das ist ihre Dusche.',
      'Auf seinem Rücken hat er einen dunklen Streifen, den Aalstrich.',
    ],
    quiz: {
      frage: 'Kann man einen Onager zähmen und auf ihm reiten?',
      antworten: ['Nein, er bleibt wild', 'Ja, wie ein Pony', 'Nur im Winter'],
      richtig: 0,
      erklaerung: 'Onager sind Wildtiere geblieben - anders als unsere Hausesel.',
    },
  },
  tapir: {
    kurz: 'Ein Tier mit Mini-Rüssel, das unter Wasser laufen kann.',
    text: [
      'Der Tapir hat eine kleine Rüsselnase, die er in alle Richtungen biegen kann. Damit pflückt er Blätter.',
      'Tapire lieben Wasser. Sie können sogar tauchen und dabei über den Boden vom Fluss laufen.',
      'Tapir-Babys haben helle Streifen und Punkte - wie ein Wildschwein-Frischling im Pyjama.',
    ],
    wusstest: [
      'Der Rüssel ist Nase und Greifhand zugleich.',
      'Tapire sind mit Pferden und Nashörnern verwandt.',
    ],
    quiz: {
      frage: 'Was kann ein Tapir unter Wasser?',
      antworten: ['Über den Boden laufen', 'Schlafen', 'Fliegen'],
      richtig: 0,
      erklaerung: 'Er taucht ab und spaziert einfach unten am Flussboden entlang.',
    },
  },
  wasserschwein: {
    kurz: 'Das größte Meerschweinchen der Welt - so schwer wie du und ein Freund zusammen.',
    text: [
      'Das Wasserschwein ist das größte Nagetier der Welt. Es ist ein Riesen-Verwandter vom Meerschweinchen.',
      'Augen, Ohren und Nase sitzen oben auf dem Kopf. So kann es fast ganz unter Wasser sein und trotzdem alles sehen und hören.',
      'Wasserschweine sind superfriedlich. In Südamerika setzen sich sogar Vögel auf ihren Rücken.',
    ],
    wusstest: [
      'Zwischen den Zehen haben sie Schwimmhäute wie eine Ente.',
      'Sie können beim Schwimmen ein Nickerchen machen.',
    ],
    quiz: {
      frage: 'Mit wem ist das Wasserschwein verwandt?',
      antworten: ['Mit dem Meerschweinchen', 'Mit dem Schwein', 'Mit dem Nilpferd'],
      richtig: 0,
      erklaerung: 'Es ist ein Riesen-Meerschweinchen - das größte Nagetier der Welt.',
    },
  },
  nasenbaer: {
    kurz: 'Der Schnüffler mit dem Ringelschwanz, der immer nach oben zeigt.',
    text: [
      'Der Nasenbär hat eine lange, bewegliche Nase. Damit schnüffelt er im Laub nach Käfern und Früchten.',
      'Beim Laufen hält er seinen geringelten Schwanz kerzengerade nach oben - wie eine kleine Fahne.',
      'So sehen sich die Nasenbären im hohen Gras gegenseitig und keiner geht verloren.',
    ],
    wusstest: [
      'Nasenbären können kopfvoran einen Baum hinunterklettern.',
      'Sie sind mit den Waschbären verwandt.',
    ],
    quiz: {
      frage: 'Warum hält der Nasenbär den Schwanz nach oben?',
      antworten: ['Damit ihn die anderen sehen', 'Damit er nicht schmutzig wird', 'Zum Fliegen'],
      richtig: 0,
      erklaerung: 'Der Schwanz ist wie eine Fahne - so verliert die Gruppe niemanden.',
    },
  },
  pavian: {
    kurz: 'Der Affe mit der Silbermähne, der auf Felsen schläft.',
    text: [
      'Mantelpaviane leben in großen Familien auf einem Felsen. Der Chef trägt einen silbernen Umhang aus Haaren.',
      'Sie krabbeln sich gegenseitig durchs Fell. Das ist wie Freunde umarmen - wer sich pflegt, mag sich.',
      'Nachts schlafen Paviane im Sitzen auf schmalen Felskanten. Ihr Po hat dafür extra dicke Sitzpolster.',
    ],
    wusstest: [
      'Im alten Ägypten waren Paviane heilige Tiere.',
      'Wenn ein Pavian gähnt und die Zähne zeigt, heißt das: Vorsicht, ich bin sauer!',
    ],
    quiz: {
      frage: 'Wo schlafen Paviane?',
      antworten: ['Im Sitzen auf dem Felsen', 'Im Nest im Baum', 'In einer Höhle unter der Erde'],
      richtig: 0,
      erklaerung: 'Sie sitzen nachts auf Felskanten - ihr Po hat eingebaute Sitzkissen.',
    },
  },
  pelikan: {
    kurz: 'Der Vogel mit dem eingebauten Kescher unterm Schnabel.',
    text: [
      'Unter dem Schnabel hat der Pelikan einen dehnbaren Hautbeutel. Da passt mehr Wasser hinein als in einen Putzeimer!',
      'Der Beutel ist sein Kescher: Wasser wird rausgedrückt, der Fisch bleibt drin und wird verschluckt.',
      'Pelikane fischen im Team. Sie schwimmen im Halbkreis und treiben die Fische zusammen - wie beim Fußball-Angriff.',
    ],
    wusstest: [
      'Ein Pelikan frisst jeden Tag ungefähr ein Kilo Fisch.',
      'Seine Flügel sind so breit wie ein Auto lang ist.',
    ],
    quiz: {
      frage: 'Wofür benutzt der Pelikan seinen Kehlsack?',
      antworten: ['Als Kescher zum Fischen', 'Als Schlafsack', 'Zum Wasser aufbewahren'],
      richtig: 0,
      erklaerung: 'Er fängt damit Fische - das Wasser läuft raus, der Fisch bleibt drin.',
    },
  },
  meerschweinchen: {
    kurz: 'Die kleinen Quieker aus Südamerika.',
    text: [
      'Meerschweinchen kommen aus den Bergen von Südamerika. Dort leben sie schon seit tausenden Jahren bei den Menschen.',
      'Sie reden den ganzen Tag miteinander: quieken, gurren, brummeln. Jeder Laut bedeutet etwas anderes.',
      'Wenn sich ein Meerschweinchen richtig freut, springt es in die Luft. Das nennt man Popcornen!',
    ],
    wusstest: [
      'Mit dem Meer haben sie nichts zu tun - sie kamen nur mit dem Schiff übers Meer zu uns.',
      'Lautes Pfeifen heißt meistens: Futter her!',
    ],
    quiz: {
      frage: 'Was macht ein Meerschweinchen, wenn es sich freut?',
      antworten: ['Es springt in die Luft', 'Es klatscht', 'Es schüttelt den Kopf'],
      richtig: 0,
      erklaerung: 'Es hüpft vor Freude - das heißt Popcornen, wie hupfendes Popcorn.',
    },
  },
  kaninchen: {
    kurz: 'Langohr mit Klimaanlage - die Ohren heißen Löffel.',
    text: [
      'Das Hasenkaninchen sieht aus wie ein Feldhase, ist aber ein Kaninchen.',
      'So merkst du dir den Unterschied: Hasen wohnen draußen im Feld, Kaninchen graben Höhlen unter der Erde.',
      'Die langen Ohren heißen Löffel. Damit hört das Kaninchen super - und kühlt sich ab, wenn ihm heiß ist.',
      'Wenn Gefahr droht, klopft es laut mit den Hinterbeinen auf den Boden. Das warnt alle anderen.',
    ],
    wusstest: [
      'Kaninchen können jedes Ohr einzeln drehen.',
      'Beim Wegrennen schlagen sie blitzschnelle Haken.',
    ],
    quiz: {
      frage: 'Wie warnt ein Kaninchen seine Freunde?',
      antworten: ['Es klopft mit den Hinterbeinen', 'Es schreit laut', 'Es winkt mit den Ohren'],
      richtig: 0,
      erklaerung: 'Es trommelt mit den Hinterbeinen auf den Boden - das hören alle.',
    },
  },
  ara: {
    kurz: 'Der Riesenpapagei, der Nüsse knackt wie ein Nussknacker.',
    text: [
      'Der Grünflügel-Ara ist einer der größten Papageien der Welt - rot, blau und grün wie ein fliegender Regenbogen.',
      'Sein Schnabel ist so stark, dass er die härtesten Nüsse der Welt knackt.',
      'Aras bleiben ihr Leben lang mit ihrem Partner zusammen und fliegen immer dicht nebeneinander.',
      'Ein Ara kann älter werden als ein Mensch in Rente geht - über 60 Jahre!',
    ],
    wusstest: [
      'Beim Klettern benutzt der Ara seinen Schnabel wie eine dritte Hand.',
      'Papageien greifen mit zwei Zehen nach vorne und zwei nach hinten.',
    ],
    quiz: {
      frage: 'Was kann der Ara mit seinem Schnabel?',
      antworten: ['Die härtesten Nüsse knacken', 'Pfeifen wie eine Flöte', 'Löcher bohren'],
      richtig: 0,
      erklaerung: 'Sein Schnabel ist ein super Nussknacker - stärker als deine Hände.',
    },
  },
  kranich: {
    kurz: 'Der Glücksvogel, der tanzen kann.',
    text: [
      'Der Mandschurenkranich ist in China und Japan ein Glücksbringer. Er steht für langes Leben.',
      'Kraniche tanzen! Sie springen hoch, breiten die Flügel aus und verbeugen sich voreinander.',
      'Kranich-Paare bleiben für immer zusammen und singen im Dütt - so genau, dass es wie ein einziger Vogel klingt.',
    ],
    wusstest: [
      'Der rote Fleck auf dem Kopf ist keine Feder, sondern Haut - bei Aufregung leuchtet er.',
      'Kranich-Küken können schon nach ein paar Stunden laufen.',
    ],
    quiz: {
      frage: 'Was machen Kraniche zusammen?',
      antworten: ['Sie tanzen', 'Sie bauen Türme', 'Sie schwimmen um die Wette'],
      richtig: 0,
      erklaerung: 'Sie springen, verbeugen sich und tanzen miteinander - das ganze Jahr.',
    },
  },
  muntjak: {
    kurz: 'Der Mini-Hirsch, der bellt wie ein Hund.',
    text: [
      'Der Muntjak ist ein winziger Hirsch - kaum größer als ein Dackel auf langen Beinen.',
      'Wenn er sich erschreckt, bellt er! Deshalb heißt er auch Bellhirsch.',
      'Sein Geweih ist winzig. Dafür hat er kleine Hauer im Maul, wie ein Vampir.',
    ],
    wusstest: [
      'Muntjaks gibt es schon seit Millionen von Jahren fast unverändert.',
      'Sie leben am liebsten ganz allein.',
    ],
    quiz: {
      frage: 'Welches Geräusch macht der Muntjak?',
      antworten: ['Er bellt wie ein Hund', 'Er miaut', 'Er kräht'],
      richtig: 0,
      erklaerung: 'Er bellt - deshalb nennt man ihn auch Bellhirsch.',
    },
  },
  pinselohrschwein: {
    kurz: 'Das bunteste Schwein der Welt - mit Quasten an den Ohren.',
    text: [
      'Das Pinselohrschwein hat rotes Fell und lange weiße Haarpinsel an den Ohrenspitzen - wie kleine Quasten.',
      'Es wohnt im afrikanischen Regenwald und wühlt dort mit der Schnauze nach Wurzeln.',
      'Die Babys haben Streifen wie unsere Wildschwein-Frischlinge.',
    ],
    wusstest: [
      'Pinselohrschweine können richtig gut schwimmen.',
      'Sie riechen Futter sogar tief unter der Erde.',
    ],
    quiz: {
      frage: 'Was hat das Pinselohrschwein an den Ohren?',
      antworten: ['Lange Haarpinsel', 'Goldene Ringe', 'Kleine Hörner'],
      richtig: 0,
      erklaerung: 'Weiße Haarquasten - deshalb heißt es Pinselohrschwein.',
    },
  },
  stachelschwein: {
    kurz: 'Ein Nagetier mit eingebauter Ritterrüstung.',
    text: [
      'Das Stachelschwein ist kein Schwein und kein Igel - es ist ein großes Nagetier mit langen Stacheln.',
      'Bei Gefahr stellt es alle Stacheln auf und rasselt mit dem Schwanz wie mit einer Rassel. Das heißt: Bleib weg!',
      'Wenn das nicht hilft, läuft es rückwärts auf den Angreifer zu. Die Stacheln piksen und bleiben stecken.',
      'Sogar Löwen lassen Stachelschweine lieber in Ruhe.',
    ],
    wusstest: [
      'Die Stacheln sind umgebaute Haare und werden so lang wie dein Unterarm.',
      'Stachelschwein-Paare bleiben für immer zusammen.',
    ],
    quiz: {
      frage: 'Was macht das Stachelschwein bei Gefahr?',
      antworten: ['Stacheln aufstellen und rasseln', 'Sich tot stellen', 'Schnell weglaufen'],
      richtig: 0,
      erklaerung: 'Es stellt die Stacheln auf und rasselt laut - die beste Warnung der Welt.',
    },
  },
  serval: {
    kurz: 'Die Katze mit den längsten Beinen und Riesenohren.',
    text: [
      'Der Serval ist eine wilde Katze aus Afrika mit superlangen Beinen und riesigen Ohren.',
      'Mit den Ohren hört er Mäuse sogar unter der Erde rascheln.',
      'Dann springt er hoch in die Luft und landet genau auf der Maus - bis zu drei Meter hoch!',
    ],
    wusstest: [
      'Der Serval kann Vögel im Flug aus der Luft fangen.',
      'Seine Ohren drehen sich wie kleine Satellitenschüsseln.',
    ],
    quiz: {
      frage: 'Womit findet der Serval seine Beute?',
      antworten: ['Mit seinen Riesenohren', 'Mit der Nase', 'Mit den Schnurrhaaren'],
      richtig: 0,
      erklaerung: 'Er hört die Mäuse rascheln - sogar unter der Erde.',
    },
  },
  kudu: {
    kurz: 'Die Antilope mit den Korkenzieher-Hörnern.',
    text: [
      'Der Große Kudu ist eine riesige Antilope. Die Männchen tragen Hörner, die wie Korkenzieher gedreht sind.',
      'Die weißen Streifen auf dem Fell sind Tarnung: Im Gebüsch sieht der Kudu aus wie Äste und Schatten.',
      'Kudus können aus dem Stand über eine Mauer springen, die höher ist als ein Erwachsener.',
    ],
    wusstest: [
      'Je älter der Kudu-Mann, desto mehr Drehungen haben seine Hörner.',
      'Auf der Anlage wohnen auch Impalas und andere Antilopen - wie in der echten Savanne.',
    ],
    quiz: {
      frage: 'Wie sehen die Hörner vom Kudu aus?',
      antworten: ['Gedreht wie ein Korkenzieher', 'Gerade wie ein Stock', 'Rund wie ein Ring'],
      richtig: 0,
      erklaerung: 'Sie drehen sich in großen Schrauben - bis zu drei Umdrehungen.',
    },
  },
  maehnenspringer: {
    kurz: 'Der Bergsteiger aus der Wüste mit dem Haar-Vorhang.',
    text: [
      'Der Mähnenspringer lebt in den Bergen der Wüste Sahara. An Hals und Brust hängt ein langer Haar-Vorhang.',
      'Er klettert steile Felswände hoch, als wäre es eine Treppe.',
      'Bei Gefahr bleibt er einfach stehen wie eine Statü - seine Fellfarbe sieht dann aus wie Fels.',
    ],
    wusstest: [
      'Mähnenspringer müssen fast nie trinken - das Wasser holen sie aus den Pflanzen.',
      'Sein Lieblingsplatz ist immer der höchste Punkt vom Felsen.',
    ],
    quiz: {
      frage: 'Was macht der Mähnenspringer bei Gefahr?',
      antworten: ['Er steht still wie eine Statü', 'Er rennt im Zickzack', 'Er versteckt sich im Wasser'],
      richtig: 0,
      erklaerung: 'Er bleibt reglos stehen - dann sieht er aus wie ein Stück Fels.',
    },
  },
  tahr: {
    kurz: 'Die Bergziege mit der Löwenmähne aus dem höchsten Gebirge der Welt.',
    text: [
      'Der Tahr kommt aus dem Himalaya - dem höchsten Gebirge der Erde.',
      'Die Männer tragen im Winter eine dicke helle Mähne um den Hals, fast wie ein Löwe.',
      'Seine Hufe haben Gummi-Sohlen. Damit klettert er auf Felsen, ohne auszurutschen - wie mit Kletterschuhen.',
    ],
    wusstest: [
      'Tahre halten Kälte von minus 20 Grad aus.',
      'Im Sommer wandern sie den Berg hoch, im Winter wieder runter.',
    ],
    quiz: {
      frage: 'Was haben Tahre unter den Hufen?',
      antworten: ['Weiche Gummi-Sohlen', 'Spitze Krallen', 'Saugnäpfe'],
      richtig: 0,
      erklaerung: 'Gummiartige Ballen - damit rutschen sie auf Felsen nicht aus.',
    },
  },
  tamarin: {
    kurz: 'Winzige Äffchen - der Papa trägt die Babys.',
    text: [
      'Tamarine sind so klein, dass sie auf deine Hand passen würden.',
      'Fast immer werden Zwillinge geboren. Und dann passiert etwas Besonderes: Der Papa trägt die Babys auf dem Rücken!',
      'Nur zum Milchtrinken gibt er sie kurz der Mama.',
      'Statt Fingernägeln haben Tamarine kleine Krallen zum Klettern.',
    ],
    wusstest: [
      'Ihre Rufe klingen wie Vogelpfeifen.',
      'Große Geschwister helfen beim Babysitten.',
    ],
    quiz: {
      frage: 'Wer trägt bei den Tamarinen die Babys?',
      antworten: ['Der Papa', 'Nur die Mama', 'Die Oma'],
      richtig: 0,
      erklaerung: 'Der Papa trägt die Zwillinge auf dem Rücken - fast den ganzen Tag.',
    },
  },
  praeriehund: {
    kurz: 'Die Erdmännchen Amerikas - sie bauen Städte unter der Erde.',
    text: [
      'Präriehunde sind keine Hunde - sie heißen nur so, weil sie bellen können.',
      'Unter der Erde bauen sie richtige Städte mit Schlafzimmern, Kinderzimmern und vielen Gängen.',
      'Einer steht immer Wache. Bellt er, flitzen alle blitzschnell in ihre Löcher.',
      'Zur Begrüssung geben sich Präriehunde ein Küsschen!',
    ],
    wusstest: [
      'Für jeden Feind haben sie einen eigenen Warnruf - einer für Adler, einer für Füchse.',
      'Nebenan wohnen die Baumstachler - Klettertiere mit Stachel-Fell.',
    ],
    quiz: {
      frage: 'Wie begrüssen sich Präriehunde?',
      antworten: ['Mit einem Küsschen', 'Mit Winken', 'Mit einem Purzelbaum'],
      richtig: 0,
      erklaerung: 'Sie berühren sich mit den Zähnen - das sieht aus wie ein Kuss.',
    },
  },
  wapiti: {
    kurz: 'Der Riesenhirsch aus Amerika mit dem lauten Ruf.',
    text: [
      'Der Wapiti ist einer der größten Hirsche der Welt - viel größer als unsere Rehe.',
      'Sein Geweih wächst jedes Jahr komplett neu und wird so lang wie du groß bist.',
      'Im Herbst ruft der Wapiti-Mann so laut, dass man ihn kilometerweit hört. Das klingt wie eine Mischung aus Pfeifen und Brüllen.',
    ],
    wusstest: [
      'Wapiti bedeutet in einer Indianersprache "weißer Po".',
      'Das alte Geweih fällt einfach ab - und ein neues wächst nach.',
    ],
    quiz: {
      frage: 'Was passiert jedes Jahr mit dem Geweih?',
      antworten: ['Es fällt ab und wächst neu', 'Es wird immer größer', 'Es wechselt die Farbe'],
      richtig: 0,
      erklaerung: 'Jedes Frühjahr fällt es ab, und ein ganz neues wächst nach.',
    },
  },
  schneeeule: {
    kurz: 'Die weiße Eule vom Nordpol - jagt auch am Tag.',
    text: [
      'Die Schnee-Eule wohnt in der Arktis, wo fast immer Schnee liegt. Ihr weißes Federkleid ist die perfekte Tarnung.',
      'Andere Eulen jagen nachts - die Schnee-Eule auch am Tag. Im Sommer wird es an ihrer Heimat nämlich gar nicht dunkel!',
      'Sogar ihre Füße sind mit Federn überzogen - wie warme Daunenstiefel.',
    ],
    wusstest: [
      'Die Männer sind fast ganz weiß, die Frauen haben dunkle Sprenkel.',
      'Sie kann ihren Kopf fast einmal ganz herumdrehen.',
    ],
    quiz: {
      frage: 'Was ist an den Füßen der Schnee-Eule besonders?',
      antworten: ['Sie sind mit Federn überzogen', 'Sie sind knallrot', 'Sie haben Schwimmhäute'],
      richtig: 0,
      erklaerung: 'Federstiefel! Damit friert sie nicht am eisigen Boden.',
    },
  },
  riesenschildkroete: {
    kurz: 'Die gepanzerte Uroma - älter als alle Menschen, die du kennst.',
    text: [
      'Riesenschildkröten können über 100 Jahre alt werden - manche sogar 150!',
      'Ihr Panzer ist mit dem Skelett verwachsen. Sie kann ihn niemals ausziehen - er wächst ihr Leben lang mit.',
      'Zähne hat sie keine. Sie schneidet Pflanzen mit scharfen Kanten am Maul ab, wie mit einer Schere.',
    ],
    wusstest: [
      'Eine Riesenschildkröte kann ein ganzes Jahr ohne Essen auskommen.',
      'Neben der Anlage stehen Saurier-Figuren - Schildkröten gab es schon zur Dino-Zeit!',
    ],
    quiz: {
      frage: 'Kann die Schildkröte ihren Panzer ausziehen?',
      antworten: ['Nein, er ist mit ihr verwachsen', 'Ja, zum Schlafen', 'Nur im Sommer'],
      richtig: 0,
      erklaerung: 'Der Panzer gehört zu ihrem Skelett - wie bei dir die Rippen.',
    },
  },
  zwergotter: {
    kurz: 'Der kleinste Otter der Welt - mit geschickten Fingerchen.',
    text: [
      'Zwergotter sind die kleinsten Otter der Welt und wohnen mit im Orang-Utan-Haus.',
      'Ihre Pfoten sind fast wie Hände: Damit tasten sie unter Steinen nach Krebsen.',
      'Sie leben in Grossfamilien und quatschen dauernd miteinander - piepsen, quieken, pfeifen.',
      'Manche Zwergotter jonglieren mit kleinen Steinen!',
    ],
    wusstest: [
      'Harte Muscheln legen sie in die Sonne, bis sie von selbst aufgehen.',
      'Große Geschwister passen auf die kleinen auf.',
    ],
    quiz: {
      frage: 'Womit jonglieren Zwergotter gern?',
      antworten: ['Mit kleinen Steinen', 'Mit Fischen', 'Mit Bällen'],
      richtig: 0,
      erklaerung: 'Mit Steinchen - so trainieren sie ihre flinken Finger.',
    },
  },
  mara: {
    kurz: 'Sieht aus wie ein Hase auf Reh-Beinen - und gehört zu den Meerschweinchen.',
    text: [
      'Der Mara sieht aus wie eine Mischung aus Hase und Reh. In Wirklichkeit ist er ein großes Nagetier aus Argentinien.',
      'Mara-Paare bleiben für immer zusammen. Wo einer ist, ist der andere nie weit weg.',
      'Alle Mara-Babys der Gruppe wohnen zusammen in einer großen Höhle - wie in einem Kindergarten.',
    ],
    wusstest: [
      'Maras können mit allen vier Beinen gleichzeitig abspringen.',
      'Sie sind mit den Meerschweinchen verwandt.',
    ],
    quiz: {
      frage: 'Wo wohnen die Mara-Babys?',
      antworten: ['Alle zusammen in einer Höhle', 'Jedes allein', 'Im Baum'],
      richtig: 0,
      erklaerung: 'In einer Gemeinschafts-Höhle - wie in einem Kindergarten unter der Erde.',
    },
  },
  warzenschwein: {
    kurz: 'Das Schwein, das beim Fressen kniet und den Schwanz wie eine Antenne trägt.',
    text: [
      'Das Warzenschwein hat dicke Beulen im Gesicht - die Warzen. Sie schützen es wie ein Helm beim Raufen.',
      'Zum Fressen kniet es sich hin! Auf den Knien rutscht es grasend übers Feld.',
      'Wenn Warzenschweine rennen, stehen alle Schwänze senkrecht nach oben - wie kleine Antennen. So verliert keiner die Familie.',
    ],
    wusstest: [
      'Warzenschweine schlafen rückwärts in Erdhöhlen - mit den Hauern zum Eingang.',
      'Aus dem Film König der Löwen kennst du eines: Pumbaa ist ein Warzenschwein!',
    ],
    quiz: {
      frage: 'Wie frisst das Warzenschwein?',
      antworten: ['Auf den Knien', 'Im Liegen', 'Im Stehen auf zwei Beinen'],
      richtig: 0,
      erklaerung: 'Es kniet sich hin und rutscht auf den Knien von Grasbüschel zu Grasbüschel.',
    },
  },
};

/* Kurze, kindgerechte Beschreibung der Stationen. Fällt eine Station hier
 * aus, wird der normale Text gekürzt angezeigt. */
export const KINDER_STATIONEN = {
  haupteingang: 'Hier geht es los! Schau dir das große Tor mit den Steintieren an.',
  flamingoteich: 'Hier stehen die rosa Vögel im Wasser. Zähl mal, wie viele auf einem Bein stehen.',
  elefanten: 'Die größten Tiere im Park. Achte darauf, was der Rüssel alles kann.',
  orangutans: 'Hier wohnen die Menschenaffen. Sei ganz leise - dann schauen sie zurück.',
  tiger: 'Die größte Katze der Welt. Such sie an den hohen Plätzen, da liegt sie gern.',
  loewen: 'Hier gibt es kein Gitter, sondern einen tiefen Graben. Findest du ihn?',
  afrikapanorama: 'Zebras, Strauße und Antilopen - alle sehen aus, als wären sie auf einer großen Wiese.',
  strausse: 'Hier wohnen Strauße, Zebras und Warzenschweine zusammen auf einer großen Steppe.',
  eismeer: 'Eisbären, Walrosse und Pinguine. Am besten sind die Fenster unter Wasser.',
  seeloewen: 'Hier wohnen die Seebären. Bei der Fütterung zeigen sie ihre Tricks - komm früh, dann siehst du am meisten.',
  kamele: 'Kamele mit zwei Höckern. Im Höcker ist Fett, kein Wasser.',
  alpakas: 'Hier wohnen die Riesenotter. Sei leise und hör mal, wie viel sie miteinander reden.',
  streichelgehege: 'Hier darfst du rein und die Ziegen streicheln. Nur am Hals, nicht an den Hörnern.',
  spielplatz: 'Klettern, rutschen, planschen. Zeit zum Toben!',
  japangarten: 'Ein ruhiger Garten mit Teich und dicken Fischen. Gut für eine Pause.',
  tropenaquarium: 'Ein ganzes Haus voller Haie, Krokodile und bunter Fische.',
  alpakawiese: 'Kleine Kamele mit dicker Wolle - und daneben laufen die großen Nandu-Vögel herum.',
};
