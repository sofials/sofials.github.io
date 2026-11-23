/*
  PROGETTI — modifica solo questo file per aggiungere/togliere/riordinare.
  - L'ordine dell'array è l'ordine nella griglia.
  - "featured": true => card grande in cima.
  - "lab": true => finisce nella sezione Lab invece che nella griglia.
  - Immagini: metti i file in assets/projects/<id>/ e scrivi il percorso in cover / gallery.
    Se la cover manca, la card usa un gradiente generato dal colore "accent".
  - Video: "video" accetta un link YouTube/Vimeo (embed) o un .mp4 in assets/.
  - Testi: ogni progetto ha un blocco "it" e uno "en".
*/
window.TAGS = {
  vr: { it: "VR", en: "VR" },
  ar: { it: "AR", en: "AR" },
  cv: { it: "Computer Vision", en: "Computer Vision" },
  audio: { it: "Audio-reattivo", en: "Audio-reactive" },
  gesture: { it: "Gesture", en: "Gesture" },
  installation: { it: "Installazione", en: "Installation" },
  game: { it: "Game", en: "Game" },
  art3d: { it: "3D / VFX", en: "3D / VFX" },
  animation: { it: "Animazione", en: "Animation" }
};

window.PROJECTS = [
  {
    id: "harmony-vr",
    title: "Harmony VR — Singing the Light",
    file: "harmony_vr.exp",
    year: "2026",
    tags: ["vr", "audio", "art3d"],
    featured: true,
    accent: "#b79cff",
    cover: "assets/projects/harmony-vr/cover.webp",
    gallery: [],
    video: "",
    stack: ["Unity (URP)", "C#", "VFX Graph", "Shader Graph", "FFT + autocorrelation", "LASP", "XR Interaction Toolkit", "Meta Quest"],
    links: [
      { label: { it: "Documentazione", en: "Documentation" }, url: "https://hackmd.io/@2VYVNy6iQMG3ICw28DBBqQ/S1r6zxSabg" },
      { label: { it: "Progetto AVENUE CoVE", en: "AVENUE CoVE project" }, url: "https://www.polito.it/ateneo/comunicazione-e-ufficio-stampa/poliflash/al-via-il-progetto-avenue-cove-l-europa-ripensa-la" }
    ],
    it: {
      tagline: "Canti, e ogni nota dipinge nell'aria forme di luce.",
      context: "Residenza internazionale AVENUE CoVE (Erasmus+) · The Animation Workshop, Viborg (DK) · aprile 2026",
      role: "VR Development · VFX Development & Behaviour — lavoro di team",
      concept: [
        "Un'esperienza VR in cui la voce è l'unica interfaccia. In uno spazio intimo e silenzioso l'utente canta: la frequenza diventa geometria cimatica, l'intensità diventa turbolenza, il timbro diventa colore.",
        "Nessun controller, nessun bottone. Solo voce, mani e ascolto. Le forme create si possono toccare, spingere, disperdere, e alla fine tornano attorno all'utente come una galleria personale di ciò che ha cantato."
      ],
      did: [
        "Interazione mani–particelle in VR: collider sulle mani VR e integrazione con i particle system (XR Interaction Toolkit)",
        "Supporto all'analisi audio"
      ],
      hood: {
        intro: "Il sistema ascolta la voce, la scompone in tre segnali e li distribuisce a tutti i sistemi visivi.",
        steps: [
          { t: "Ascolto", d: "Pitch detection via FFT + autocorrelazione, mappata su nota e ottava. Intensità normalizzata con LASP e auto-gain." },
          { t: "Hub", d: "Un prefab AudioEngine (singleton) espone i parametri: ogni sistema VFX si abbona e reagisce in tempo reale." },
          { t: "Forme", d: "VFX Graph con SDF baked mesh da pattern cimatici: note gravi = forme dense e lente, acuti = strutture rarefatte e luminose." },
          { t: "Mani", d: "Collider sulle mani VR che interagiscono con le particelle: la voce diventa un oggetto manipolabile." },
          { t: "Ambiente", d: "Skybox in Shader Graph (noise procedurale + maschera montagne) con parametro _StarVoiceControl rimappato da C#." }
        ],
        bullets: [
          "Pavimento: griglia di particelle con falloff radiale e moto ondulatorio",
          "Achievement system: le coppie forma/colore generate vengono salvate e riproposte in cerchio a fine sessione"
        ]
      }
    },
    en: {
      tagline: "You sing, and every note paints shapes of light in the air.",
      context: "AVENUE CoVE international residency (Erasmus+) · The Animation Workshop, Viborg (DK) · April 2026",
      role: "VR Development · VFX Development & Behaviour — team project",
      concept: [
        "A VR experience where the voice is the only interface. In a quiet, intimate space the user sings: frequency becomes cymatic geometry, intensity becomes turbulence, timbre becomes colour.",
        "No controllers, no buttons. Just voice, hands and listening. The shapes can be touched, pushed and scattered, and at the end they return around the user as a personal gallery of what they sang."
      ],
      did: [
        "Hand–particle interaction in VR: colliders on the VR hands and integration with the particle systems (XR Interaction Toolkit)",
        "Support on audio analysis"
      ],
      hood: {
        intro: "The system listens to the voice, splits it into three signals and feeds them to every visual system.",
        steps: [
          { t: "Listen", d: "Pitch detection via FFT + autocorrelation, mapped to note and octave. Intensity normalised with LASP and auto-gain." },
          { t: "Hub", d: "An AudioEngine prefab (singleton) exposes the parameters: every VFX system subscribes and reacts in real time." },
          { t: "Shapes", d: "VFX Graph with SDF baked meshes from cymatic patterns: low notes = dense, slow forms; high notes = sparse, bright structures." },
          { t: "Hands", d: "Colliders on the VR hands interact with the particles: the voice becomes something you can manipulate." },
          { t: "World", d: "Shader Graph skybox (procedural noise + mountain mask) with a _StarVoiceControl parameter remapped from C#." }
        ],
        bullets: [
          "Floor: particle grid with radial falloff and wave motion",
          "Achievement system: generated shape/colour pairs are stored and shown again in a circle at the end"
        ]
      }
    }
  },

  {
    id: "gestural-canvas",
    title: "Gestural Canvas",
    file: "gestural_canvas.cv",
    year: "2026",
    tags: ["cv", "gesture", "art3d"],
    featured: true,
    accent: "#7fd6c2",
    cover: "assets/projects/gestural-canvas/cover.webp",
    gallery: [],
    video: "",
    stack: ["MediaPipe Hands", "scikit-learn (Random Forest)", "m2cgen", "JavaScript + MediaPipe Tasks Vision", "Unity 6 (URP, C#)", "OSC/UDP", "GitHub Pages"],
    links: [
      { label: { it: "Prova la demo online", en: "Try the live demo" }, url: "https://sofials.github.io/gestural-canvas/" }
    ],
    it: {
      tagline: "La mano diventa pennello, campo di forze e direzione artistica.",
      context: "Progetto personale · gira interamente nel browser",
      role: "Progetto in autonomia — percezione, ML, motore generativo, deploy",
      concept: [
        "Un ambiente generativo controllato solo a gesti, con composizioni ispirate a Kandinsky. Disegni nell'aria e il tratto viene riconosciuto e trasformato in geometria. Un pinch attira le particelle, un pugno le fa esplodere.",
        "L'obiettivo non era solo riconoscere cinque gesti, ma costruire un sistema di percezione in tempo reale robusto sia in locale sia online, senza che nessun frame video lasci il dispositivo."
      ],
      did: [
        "Pipeline di percezione: 21 landmark MediaPipe, normalizzati rispetto a polso e scala",
        "Classificatore Random Forest (200 alberi, mirror augmentation): 99% di accuracy sul test set",
        "Stabilizzazione temporale (EMA, voto di maggioranza, isteresi) e riconoscimento della forma disegnata",
        "Export del modello in JavaScript puro (m2cgen) e build Unity WebGL pilotata dal browser"
      ],
      hood: {
        intro: "Quattro strati: percezione → classificazione → stabilizzazione → espressione.",
        steps: [
          { t: "Percezione", d: "MediaPipe Hands riduce ogni frame a 21 landmark 3D. Polso come origine, scala sulla distanza polso–medio: invariante alla distanza dalla camera." },
          { t: "Classificazione", d: "Random Forest su landmark normalizzati, con soglia di confidenza a 0.7. Cinque gesti scelti per la massima separabilità geometrica." },
          { t: "Stabilità", d: "EMA su tutti i 21 punti, voto 6/8 frame, isteresi asimmetrica: un frame sbagliato non spezza più il tratto." },
          { t: "Forma", d: "Ramer-Douglas-Peucker sul tratto, conteggio degli angoli, circolarità isoperimetrica → triangolo, rettangolo o cerchio." },
          { t: "Deploy", d: "Modello esportato in JS (~0,5 MB gzip) e Unity WebGL via SendMessage: stessa logica in locale (OSC) e online." }
        ],
        table: {
          caption: "La saga del dito puntato: quando le regole perdono contro i dati",
          head: ["Tentativo", "Risultato"],
          rows: [
            ["Regola su distanza dal polso", "Instabile, troppo sensibile al rumore"],
            ["Angolo articolazione in 3D", "Ancora instabile: la z stimata da webcam è rumorosa"],
            ["Solo x,y (z esclusa)", "Migliora, ma non basta"],
            ["Isteresi + EMA sulle soglie", "Regge, ma compaiono falsi 'mano aperta'"],
            ["Nuovo vocabolario + ML puro", "99% accuracy, stabile in uso reale"]
          ]
        },
        lesson: "Le regole geometriche sono ottime per gesti netti. Per quelli ambigui vince un classificatore addestrato sui dati reali. La decisione più importante del progetto è stata capire quando smettere di scrivere euristiche."
      }
    },
    en: {
      tagline: "Your hand becomes brush, force field and art director.",
      context: "Personal project · runs entirely in the browser",
      role: "Solo project — perception, ML, generative engine, deployment",
      concept: [
        "A generative environment controlled only by gestures, with Kandinsky-inspired compositions. You draw in the air and the stroke is recognised and turned into geometry. A pinch attracts particles, a fist makes them explode.",
        "The goal wasn't just recognising five gestures, but building a real-time perception system robust both locally and online, without any video frame leaving the device."
      ],
      did: [
        "Perception pipeline: 21 MediaPipe landmarks, normalised to wrist and scale",
        "Random Forest classifier (200 trees, mirror augmentation): 99% accuracy on the test set",
        "Temporal stabilisation (EMA, majority vote, hysteresis) and shape recognition of the drawn stroke",
        "Model exported to plain JavaScript (m2cgen) and a Unity WebGL build driven by the browser"
      ],
      hood: {
        intro: "Four layers: perception → classification → stabilisation → expression.",
        steps: [
          { t: "Perception", d: "MediaPipe Hands turns each frame into 21 3D landmarks. Wrist as origin, scale by wrist–middle distance: invariant to camera distance." },
          { t: "Classification", d: "Random Forest on normalised landmarks with a 0.7 confidence threshold. Five gestures chosen for maximum geometric separability." },
          { t: "Stability", d: "EMA on all 21 points, 6/8-frame vote, asymmetric hysteresis: a single bad frame no longer breaks the stroke." },
          { t: "Shape", d: "Ramer-Douglas-Peucker on the stroke, corner count, isoperimetric circularity → triangle, rectangle or circle." },
          { t: "Deploy", d: "Model exported to JS (~0.5 MB gzipped) and Unity WebGL via SendMessage: same logic locally (OSC) and online." }
        ],
        table: {
          caption: "The pointing-finger saga: when rules lose to data",
          head: ["Attempt", "Result"],
          rows: [
            ["Wrist-distance rule", "Unstable, too noise-sensitive"],
            ["3D joint angle", "Still unstable: webcam-estimated z is noisy"],
            ["x,y only (z dropped)", "Better, not enough"],
            ["Hysteresis + EMA on thresholds", "Holds, but false 'open palm' appears"],
            ["New vocabulary + pure ML", "99% accuracy, stable in real use"]
          ]
        },
        lesson: "Geometric rules are great for clear-cut gestures. For ambiguous ones a classifier trained on real data wins. The key decision was knowing when to stop hand-writing heuristics."
      }
    }
  },

  {
    id: "resonance",
    title: "Resonance",
    file: "resonance.void",
    year: "2026",
    tags: ["vr", "audio"],
    featured: false,
    accent: "#ff9fb8",
    cover: "assets/projects/resonance/cover.webp",
    gallery: [],
    video: "",
    stack: ["Unity (URP)", "C#", "Shader Graph", "RMS / zero-crossing / onset detection", "Perlin noise", "OpenXR", "Meta Quest 3S"],
    links: [],
    it: {
      tagline: "Un cosmo generativo che si naviga con la voce.",
      context: "Progetto personale · prototipo desktop completo, porting su Quest 3S in corso",
      role: "Progetto in autonomia",
      concept: [
        "Più forte canti, più veloce voli. La direzione è quella in cui guardi. Attorno a te le nebulose respirano col volume, gli attacchi vocali fanno nascere strutture organiche, e la luce passa dal viola del silenzio all'arancione della voce piena."
      ],
      did: [
        "Analizzatore audio custom: volume, frequenza dominante, onset",
        "Volo guidato dalla voce con curva di risposta non lineare e smoothing anti motion-sickness",
        "Generazione procedurale di nebulose, strutture e starfield, e post-processing reattivo"
      ],
      hood: {
        intro: "Tre segnali estratti dal microfono guidano movimento, mondo e atmosfera.",
        steps: [
          { t: "Volume", d: "RMS su buffer da 256 campioni letto da AudioClip.GetData(), con smoothing asimmetrico: veloce in salita, lento in discesa." },
          { t: "Frequenza", d: "Zero-crossing e bande bass / mid / high." },
          { t: "Onset", d: "Delta di volume oltre una soglia, con cooldown: fa da trigger per lo spawn delle strutture." },
          { t: "Volo", d: "InverseLerp → Pow(x, 0.7) → velocità, con direzione dalla camera e Lerp per la morbidezza." },
          { t: "Mondo", d: "Icosfere deformate da Perlin noise modulato dagli alti, colore emissivo dalla frequenza, URP Volume override." }
        ]
      }
    },
    en: {
      tagline: "A generative cosmos you navigate with your voice.",
      context: "Personal project · desktop prototype complete, Quest 3S port in progress",
      role: "Solo project",
      concept: [
        "The louder you sing, the faster you fly. You move where you look. Around you nebulae breathe with your volume, vocal attacks grow organic structures, and the light shifts from the violet of silence to the orange of a full voice."
      ],
      did: [
        "Custom audio analyser: volume, dominant frequency, onset",
        "Voice-driven flight with a non-linear response curve and anti motion-sickness smoothing",
        "Procedural nebulae, structures and starfield, plus reactive post-processing"
      ],
      hood: {
        intro: "Three signals extracted from the microphone drive movement, world and atmosphere.",
        steps: [
          { t: "Volume", d: "RMS on a 256-sample buffer read from AudioClip.GetData(), with asymmetric smoothing: fast attack, slow decay." },
          { t: "Frequency", d: "Zero-crossing and bass / mid / high bands." },
          { t: "Onset", d: "Volume delta over a threshold, with cooldown: triggers structure spawning." },
          { t: "Flight", d: "InverseLerp → Pow(x, 0.7) → speed, direction from the camera, Lerp for smoothness." },
          { t: "World", d: "Icospheres deformed by Perlin noise modulated by highs, emissive colour from frequency, URP Volume overrides." }
        ]
      }
    }
  },

  {
    id: "three-timelines",
    title: "Three Timelines — WebAR",
    file: "three_timelines.ar",
    year: "2025/26",
    tags: ["ar", "installation"],
    featured: false,
    accent: "#ffc98a",
    cover: "assets/projects/three-timelines/cover.webp",
    gallery: [],
    video: "",
    stack: ["WebAR", "MindAR.js", "A-Frame", "PWA"],
    links: [],
    it: {
      tagline: "La storia di una famiglia in tre tempi: prima, durante e dopo un incendio.",
      context: "Challenge universitaria per la Fondazione Marazzato · parte di Life on Wheels · A.A. 2025/26",
      role: "Project Manager e referente tecnico · sviluppo in autonomia dei deliverable tecnologici",
      concept: [
        "Un'esperienza AR che si apre dal browser del visitatore, senza installare niente. Inquadrando i marker accanto agli oggetti esposti si attivano layer narrativi, e una ghiera virtuale permette di spostarsi tra i tre momenti della storia.",
        "È pensata come aggiunta alla scenografia fisica: senza smartphone l'area funziona comunque come installazione."
      ],
      did: [
        "Coordinamento di un team interdisciplinare (architettura, pianificazione, meccanica, cinema)",
        "Sviluppo della WebAR e dell'interazione a ghiera"
      ],
      hood: null
    },
    en: {
      tagline: "A family's story in three times: before, during and after a fire.",
      context: "University challenge for Fondazione Marazzato · part of Life on Wheels · 2025/26",
      role: "Project Manager and technical lead · built the tech deliverables independently",
      concept: [
        "An AR experience that opens in the visitor's browser, with nothing to install. Pointing the phone at markers next to the exhibits triggers narrative layers, and a virtual dial moves between the three moments of the story.",
        "It's designed as an addition to the physical set: without a phone the area still works as an installation."
      ],
      did: [
        "Coordinated an interdisciplinary team (architecture, planning, mechanical engineering, film)",
        "Built the WebAR experience and the dial interaction"
      ],
      hood: null
    }
  },

  {
    id: "it-reminded-me-of-you",
    title: "It Reminded Me of You",
    file: "postcards.live",
    year: "2025/26",
    tags: ["gesture", "cv", "installation"],
    featured: false,
    accent: "#9fc3ff",
    cover: "assets/projects/it-reminded-me-of-you/cover.webp",
    gallery: [],
    video: "",
    stack: ["Firebase", "TouchDesigner", "MediaPipe", "Depth-sensing camera", "Vercel", "Node.js"],
    links: [],
    it: {
      tagline: "Cartoline d'epoca che si girano a mani libere, nell'aria.",
      context: "Challenge universitaria per la Fondazione Marazzato · parte di Life on Wheels · A.A. 2025/26",
      role: "Project Manager e referente tecnico · sviluppo in autonomia",
      concept: [
        "Un sistema in due parti che trasforma il motto del museo in un gesto. Da una web app il visitatore sceglie una foto d'epoca della collezione, ci scrive un messaggio e la manda a qualcuno a cui ha pensato durante la visita.",
        "Tutte le cartoline compaiono in tempo reale su uno schermo a parete. Con pinch e rotazione nell'aria, tracciati da una camera depth-sensing, le giri e leggi il messaggio di un altro visitatore."
      ],
      did: [
        "Web app per l'invio delle cartoline, con hosting su Vercel e proxy Node.js verso Firebase",
        "Installazione a parete in TouchDesigner, aggiornata in tempo reale",
        "Interazione a mani libere con MediaPipe e camera depth-sensing: pinch, drag, rotazione"
      ],
      hood: {
        intro: "Dal telefono del visitatore allo schermo a parete, in tempo reale e senza controller.",
        steps: [
          { t: "Invio", d: "Web app su Vercel. Un proxy Node.js fa da tramite verso Firebase, così le credenziali del database non sono esposte lato client." },
          { t: "Dati", d: "Firebase come database real-time: ogni nuova cartolina aggiorna subito l'installazione fisica." },
          { t: "Rendering", d: "TouchDesigner gestisce il layout dinamico delle cartoline con geometry instancing e un Texture 2D Array TOP." },
          { t: "Mani", d: "MediaPipe sulla camera depth-sensing traduce i movimenti del visitatore in gesture: pinch, drag, rotazione." }
        ]
      }
    },
    en: {
      tagline: "Vintage postcards you flip mid-air, hands-free.",
      context: "University challenge for Fondazione Marazzato · part of Life on Wheels · 2025/26",
      role: "Project Manager and technical lead · built it independently",
      concept: [
        "A two-part system that turns the museum's motto into a gesture. In a web app the visitor picks a vintage photo from the collection, adds a message and sends it to someone they thought of during the visit.",
        "All postcards appear in real time on a wall screen. With mid-air pinch and rotate gestures, tracked by a depth-sensing camera, you flip them and read another visitor's message."
      ],
      did: [
        "Web app for sending postcards, hosted on Vercel with a Node.js proxy to Firebase",
        "Wall installation in TouchDesigner, updated in real time",
        "Hands-free interaction with MediaPipe and a depth-sensing camera: pinch, drag, rotate"
      ],
      hood: {
        intro: "From the visitor's phone to the wall screen, in real time and without controllers.",
        steps: [
          { t: "Send", d: "Web app on Vercel. A Node.js proxy sits between frontend and Firebase, so database credentials are never exposed client-side." },
          { t: "Data", d: "Firebase as a real-time database: every new postcard updates the physical installation instantly." },
          { t: "Rendering", d: "TouchDesigner handles the dynamic postcard layout with geometry instancing and a Texture 2D Array TOP." },
          { t: "Hands", d: "MediaPipe on the depth-sensing camera turns the visitor's movements into gestures: pinch, drag, rotate." }
        ]
      }
    }
  },

  {
    id: "pulse",
    title: "Pulse",
    file: "pulse.sculpt",
    year: "2026",
    tags: ["audio", "installation", "art3d"],
    featured: false,
    accent: "#ff8fd8",
    cover: "assets/projects/pulse/cover.webp",
    gallery: [],
    video: "",
    stack: ["Unity (URP)", "C#", "Shader Graph", "Beat detection", "L-Systems"],
    links: [],
    it: {
      tagline: "Una scultura generativa che cresce con la musica.",
      context: "Progetto personale · pensato come installazione (schermo o proiettore)",
      role: "Progetto in autonomia",
      concept: [
        "Scegli un brano e il segnale audio controlla tutto. La sfera si deforma, i bassi la gonfiano lentamente e gli alti la increspano. A ogni beat spuntano rami procedurali, come un corallo sonoro diverso per ogni canzone."
      ],
      did: [
        "Analisi audio a bande e beat detection",
        "Vertex displacement in Shader Graph guidato da C#",
        "Crescita ramificata con L-Systems, parametri legati alla frequenza"
      ],
      hood: {
        intro: "Lo stesso sistema, infinite forme: ogni brano produce una scultura diversa.",
        steps: [
          { t: "Audio", d: "Volume, bande bassi / medi / alti, beat come trigger di eventi." },
          { t: "Scultura", d: "Displacement lungo la normale in Shader Graph, con proprietà esposte e controllate da script." },
          { t: "Crescita", d: "L-System: suoni gravi danno rami spessi e corti, acuti danno filamenti sottili e ramificati." },
          { t: "Luce", d: "Pavimento metallico riflettente, point light reattive, Bloom e Vignette via URP Volume." }
        ]
      }
    },
    en: {
      tagline: "A generative sculpture that grows with music.",
      context: "Personal project · designed as an installation (screen or projector)",
      role: "Solo project",
      concept: [
        "Pick a track and the audio signal drives everything. The sphere deforms: bass swells it slowly, highs make it ripple. On every beat procedural branches sprout, like a sonic coral that's different for every song."
      ],
      did: [
        "Band-split audio analysis and beat detection",
        "Shader Graph vertex displacement driven from C#",
        "L-System branching growth, parameters tied to frequency"
      ],
      hood: {
        intro: "Same system, endless forms: every track makes a different sculpture.",
        steps: [
          { t: "Audio", d: "Volume, bass / mid / high bands, beats as event triggers." },
          { t: "Sculpture", d: "Displacement along the normal in Shader Graph, exposed properties driven by script." },
          { t: "Growth", d: "L-System: low sounds give thick, short branches; highs give thin, branching filaments." },
          { t: "Light", d: "Reflective metallic floor, reactive point lights, Bloom and Vignette via URP Volume." }
        ]
      }
    }
  },

  {
    id: "claudio",
    title: "Claudio — VR Game Jam",
    file: "claudio.ai",
    year: "2026",
    tags: ["vr", "game"],
    featured: false,
    accent: "#a6e3a1",
    cover: "assets/projects/claudio/cover.webp",
    gallery: [],
    video: "",
    stack: ["Unity", "C#", "XR Interaction Toolkit", "Meta Quest"],
    links: [],
    it: {
      tagline: "Un'AI ti chiede di salvare il mondo. Solo dopo capisci che lo stai distruggendo.",
      context: "Game jam · 72 ore · tema \"Think Globally, Act Locally\"",
      role: "VR Developer",
      concept: [
        "Un'esperienza VR narrativa. Claudio, un'AI, gestisce un data center e ha bisogno del tuo aiuto per tenerlo acceso. Sollevi leve, devii fiumi, accendi centrali, e intanto l'ambiente si deteriora e le tue risorse calano più in fretta.",
        "Movimento fisico: cammini muovendo le braccia, ti arrampichi con i grip, bevi infilando la mano nella fontana."
      ],
      did: [
        "Game Manager a macchina a stati per il flusso di gioco",
        "Sistema task con tracciamento obiettivi e feedback UI",
        "Puzzle dei tubi (rotazione, rilevamento connessioni, validazione del flusso)",
        "Leve interattive collegate allo stato di gioco"
      ],
      hood: null
    },
    en: {
      tagline: "An AI asks you to save the world. Only later you realise you're destroying it.",
      context: "Game jam · 72 hours · theme \"Think Globally, Act Locally\"",
      role: "VR Developer",
      concept: [
        "A narrative VR experience. Claudio, an AI, runs a data centre and needs your help to keep it on. You pull levers, divert rivers, power plants, and meanwhile the world decays and your resources drain faster.",
        "Physical locomotion: you walk by swinging your arms, climb with the grips, drink by putting your hand in the fountain."
      ],
      did: [
        "State-machine Game Manager for the game flow",
        "Task system with objective tracking and UI feedback",
        "Pipe puzzle (rotation, connection detection, flow validation)",
        "Interactive levers tied to game state"
      ],
      hood: null
    }
  },

  {
    id: "shorekeepers",
    title: "Shorekeepers",
    file: "shorekeepers.world",
    year: "2024/25",
    tags: ["game", "art3d"],
    featured: false,
    accent: "#8fd3ff",
    cover: "assets/projects/shorekeepers/cover.webp",
    gallery: [],
    video: "",
    stack: ["Unity", "C#", "Blender", "Substance Painter"],
    links: [
      { label: { it: "Gioca su itch.io", en: "Play on itch.io" }, url: "https://dvdbsn.itch.io/shorekeepers" }
    ],
    it: {
      tagline: "Esplorazione narrativa in prima persona, pensata per arrivare in VR.",
      context: "Corso di Realtà Virtuale · Politecnico di Torino · A.A. 2024/25",
      role: "Tutta la componente grafica: direzione visiva e sviluppo degli asset",
      concept: [
        "Un prototipo narrativo per desktop, pensato per essere esteso in VR, che unisce narrazione ambientale, esplorazione libera e interazioni simboliche."
      ],
      did: [
        "Concept visivo e referenze",
        "Modellazione di ambienti e oggetti in Blender, texturing in Substance",
        "Illuminazione, composizione e integrazione in Unity",
        "Script C# per il comportamento base degli NPC"
      ],
      hood: null
    },
    en: {
      tagline: "First-person narrative exploration, built to grow into VR.",
      context: "Virtual Reality course · Politecnico di Torino · 2024/25",
      role: "All the visual side: art direction and asset development",
      concept: [
        "A narrative desktop prototype designed to be extended to VR, combining environmental storytelling, free exploration and symbolic interactions."
      ],
      did: [
        "Visual concept and references",
        "Environment and prop modelling in Blender, texturing in Substance",
        "Lighting, composition and integration in Unity",
        "C# scripts for basic NPC behaviour"
      ],
      hood: null
    }
  },

  {
    id: "bed-time",
    title: "Bed Time",
    file: "bed_time.dream",
    year: "2024/25",
    tags: ["game", "art3d", "animation"],
    featured: false,
    accent: "#c3a6ff",
    cover: "assets/projects/bed-time/cover.webp",
    gallery: [],
    video: "https://www.youtube.com/embed/eeDH5aBAOt4",
    stack: ["Unity", "C#", "VFX Graph", "Timeline", "Cinemachine"],
    links: [
      { label: { it: "Trailer", en: "Trailer" }, url: "https://youtu.be/eeDH5aBAOt4" }
    ],
    it: {
      tagline: "Un platformer 3D dentro i sogni lucidi di un bambino.",
      context: "Game design and gamification · Politecnico di Torino · A.A. 2024/25",
      role: "Lead Programmer · VFX Artist · Animator",
      concept: [
        "Luke ha il potere dei sogni lucidi e ogni notte entra in un mondo costruito dalla sua mente. Rallenta il tempo, si teletrasporta, crea piattaforme, tutto alimentato da una risorsa limitata, la Lucidità. Poi il suo Dreamworld inizia a incrinarsi."
      ],
      did: [
        "Coordinamento tecnico, sistemi core e architettura del codice",
        "VFX onirici in VFX Graph",
        "Animazioni di personaggi ed elementi interattivi"
      ],
      hood: null
    },
    en: {
      tagline: "A 3D platformer inside a child's lucid dreams.",
      context: "Game design and gamification · Politecnico di Torino · 2024/25",
      role: "Lead Programmer · VFX Artist · Animator",
      concept: [
        "Luke can dream lucidly, and every night he dives into a world built by his own mind. He slows time, teleports, creates platforms, all powered by a limited resource called Lucidity. Then his Dreamworld starts to crack."
      ],
      did: [
        "Technical lead, core systems and code architecture",
        "Dreamlike VFX in VFX Graph",
        "Character and interactive-element animation"
      ],
      hood: null
    }
  },

  /* ---------- LAB ---------- */
  {
    id: "ar-markerless",
    lab: true,
    title: "AR Markerless, from scratch",
    file: "ar_pipeline.py",
    year: "2026",
    tags: ["cv", "ar"],
    accent: "#7fe0ff",
    cover: "assets/projects/ar-markerless/cover.webp",
    gallery: [],
    video: "",
    stack: ["Python", "OpenCV (ORB, BFMatcher, RANSAC, solvePnP)", "NumPy", "trimesh", "pyrender"],
    links: [],
    it: {
      tagline: "Come fa il telefono a sapere dove mettere l'oggetto? Ho ricostruito la pipeline da zero.",
      context: "Lab · ricerca personale in computer vision",
      role: "Progetto in autonomia",
      concept: [
        "Ogni app AR markerless, che sia MindAR, ARKit o ARCore, risolve lo stesso problema: riconoscere un'immagine nel mondo reale e agganciarci un contenuto 3D mentre la camera si muove.",
        "Dopo averla usata a livello applicativo, ho voluto vedere cosa c'è sotto: ho riscritto in Python e OpenCV tutta la pipeline, dal riconoscimento dei punti fino a una mesh 3D con texture e luce ancorata al foglio."
      ],
      did: [
        "Pipeline completa detect → match → pose → render → stabilizza",
        "Bridge tra camera reale e camera virtuale (OpenCV ↔ OpenGL)",
        "Test empirici sui limiti: rotazione, foreshortening, illuminazione"
      ],
      hood: {
        intro: "Cinque passaggi, ripetuti a ogni frame della webcam.",
        steps: [
          { t: "Detect", d: "ORB trova i punti caratteristici del target e del frame. È veloce e senza licenza, adatto al tempo reale." },
          { t: "Match", d: "BFMatcher con distanza di Hamming (i descrittori sono binari) e cross-check per scartare i falsi positivi." },
          { t: "Pose", d: "Omografia + RANSAC per tenere solo i match coerenti, poi solvePnP per la posa 3D della camera." },
          { t: "Render", d: "Prima un wireframe proiettato, poi una mesh PBR con pyrender. Stessi intrinseci e conversione degli assi OpenCV → OpenGL." },
          { t: "Stabilizza", d: "EMA su rvec/tvec (α = 0.3). Funziona per piccole oscillazioni, mentre per rotazioni ampie servirebbe SLERP." }
        ],
        table: {
          caption: "Il problema più duro: rotazione + cambio di luce",
          head: ["Tentativo", "Risultato"],
          rows: [
            ["CLAHE + più feature", "Miglioramento marginale"],
            ["Normalizzazione dell'illuminazione", "Peggioramento: statistiche diverse tra target e frame"],
            ["Ritorno a CLAHE", "Baseline stabile, limite fisico in luce estrema"]
          ]
        },
        lesson: "Con ombre forti l'informazione non c'è più nei pixel e nessun filtro la recupera. Il passo naturale successivo è il tracking multi-frame (optical flow, visual odometry / SLAM)."
      }
    },
    en: {
      tagline: "How does your phone know where to put the object? I rebuilt the pipeline from scratch.",
      context: "Lab · personal computer vision research",
      role: "Solo project",
      concept: [
        "Every markerless AR app, whether MindAR, ARKit or ARCore, solves the same problem: recognise an image in the real world and anchor 3D content to it while the camera moves.",
        "After using it at application level, I wanted to see what's underneath. I rewrote the whole pipeline in Python and OpenCV, from keypoint detection to a textured, lit 3D mesh anchored to the page."
      ],
      did: [
        "Full pipeline detect → match → pose → render → stabilise",
        "Bridge between real and virtual camera (OpenCV ↔ OpenGL)",
        "Empirical tests on the limits: rotation, foreshortening, lighting"
      ],
      hood: {
        intro: "Five steps, repeated on every webcam frame.",
        steps: [
          { t: "Detect", d: "ORB finds keypoints in the target and the frame. It's fast and licence-free, good for real time." },
          { t: "Match", d: "BFMatcher with Hamming distance (binary descriptors) and cross-check to drop false positives." },
          { t: "Pose", d: "Homography + RANSAC to keep only consistent matches, then solvePnP for the 3D camera pose." },
          { t: "Render", d: "First a projected wireframe, then a PBR mesh with pyrender. Same intrinsics, OpenCV → OpenGL axis conversion." },
          { t: "Stabilise", d: "EMA on rvec/tvec (α = 0.3). Works for small jitter; large rotations would need SLERP." }
        ],
        table: {
          caption: "The hardest problem: rotation + lighting change",
          head: ["Attempt", "Result"],
          rows: [
            ["CLAHE + more features", "Marginal improvement"],
            ["Illumination normalisation", "Worse: different statistics between target and frame"],
            ["Back to CLAHE", "Stable baseline, physical limit in extreme light"]
          ]
        },
        lesson: "With hard shadows the information is simply gone from the pixels and no filter brings it back. The natural next step is multi-frame tracking (optical flow, visual odometry / SLAM)."
      }
    }
  }
];
