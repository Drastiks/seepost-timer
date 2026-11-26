export const LEVELS_CH5 = [
  {
    id: 34,
    chapter: 5,
    title: 'Le départ de Léo (Inspecteur & appendChild)',
    mechanic: 'dom',
    station: 'dom',
    objective: 'Inspecte les id (#colis-depart et #boite-client), stocke-les dans deux var et utilise appendChild.',
    leo: {
      present: true,
      leaving: true,
      messages: [
        'J’ai une grande nouvelle : je dois partir en mission dans un autre atelier ! À partir de maintenant, tu vas livrer les colis toi-même grâce au DOM !',
        'Suis ces 4 étapes : 1) Appuie sur F12 (ou clic droit → Inspecter). 2) Clique sur la petite flèche en haut à gauche de l’inspecteur (outil de sélection d’élément).',
        '3) Clique sur le colis à gauche pour lire son id ("colis-depart") puis sur la boîte client à droite ("boite-client").',
        '4) Stocke chacun dans une var avec document.getElementById("...") et déplace le colis avec : boite.appendChild(colis); !'
      ],
      hints: [
        'Récupère d’abord les deux éléments : var colis = document.getElementById("colis-depart"); et var boite = document.getElementById("boite-client");',
        'Termine par : boite.appendChild(colis);'
      ],
      success: 'INCROYABLE ! Tu as déplacé un vrai élément HTML dans la page ! Je peux partir l’esprit tranquille. Bonne chance !'
    },
    domParcels: [
      { id: 'colis-depart', label: 'Colis Départ', value: 'Valise', color: '#f59e0b' }
    ],
    domTargets: [
      {
        id: 'boite-client',
        label: 'Zone de dépôt',
        clientName: 'Camille',
        avatar: 'camille',
        orderText: 'Bon voyage Léo ! Tu peux déposer le colis dans ma boîte ?'
      }
    ],
    expectedPlacements: [
      { parcelId: 'colis-depart', targetId: 'boite-client' }
    ],
    starterCode: '// 1. Inspecte le colis et la boîte client avec F12\n// 2. Récupère les deux éléments avec document.getElementById("...")\n// 3. Déplace le colis dans la boîte avec appendChild\n',
    solution: 'var colis = document.getElementById("colis-depart");\nvar boite = document.getElementById("boite-client");\nboite.appendChild(colis);'
  },
  {
    id: 35,
    chapter: 5,
    title: 'Trouver les vrais id avec F12',
    mechanic: 'dom',
    station: 'dom',
    objective: 'Inspecte la page (F12) pour trouver l’id du colis et l’id de la zone client, puis livre avec appendChild.',
    leo: {
      present: false,
      messages: [
        'Post-it de Léo : Je suis parti ! Cette fois, je ne te donne plus les id dans la consigne.',
        'Ouvre l’inspecteur (F12), sélectionne le colis sur le tapis roulant pour lire son id, puis sélectionne la zone de dépôt de Nora à droite pour lire le sien.',
        'Stocke les deux dans des variables var avec document.getElementById(...) et utilise appendChild !'
      ],
      hints: [
        'Avec l’outil de sélection F12, clique sur le colis "Boussole" sur le tapis : son attribut id apparaît dans le panneau Elements.',
        'Les id sont "colis-boussole" et "panier-nora" :\nvar colis = document.getElementById("colis-boussole");\nvar panier = document.getElementById("panier-nora");\npanier.appendChild(colis);'
      ],
      success: 'Bravo ! Tu sais lire le vrai HTML de la page avec l’inspecteur F12 et déplacer un élément !'
    },
    domParcels: [
      { id: 'colis-boussole', label: 'Boussole', value: 'Nord', color: '#0ea5e9' }
    ],
    domTargets: [
      {
        id: 'panier-nora',
        label: 'Zone de dépôt',
        clientName: 'Nora',
        avatar: 'nora',
        orderText: 'Bonjour ! Pouvez-vous placer la boussole dans mon panier ?'
      }
    ],
    expectedPlacements: [
      { parcelId: 'colis-boussole', targetId: 'panier-nora' }
    ],
    starterCode: '// Utilise F12 pour découvrir les 2 id dans la page !\n',
    solution: 'var colis = document.getElementById("colis-boussole");\nvar panier = document.getElementById("panier-nora");\npanier.appendChild(colis);'
  },
  {
    id: 36,
    chapter: 5,
    title: 'Livrer le bon colis parmi trois',
    mechanic: 'dom',
    station: 'dom',
    objective: 'Inspecte les 3 colis sur le tapis et ne déplace que le colis rouge dans la zone de Sami.',
    leo: {
      present: false,
      messages: [
        'Post-it de Léo : Trois colis attendent sur le tapis roulant, mais Sami ne veut que le colis rouge !',
        'Utilise l’inspecteur F12 pour relever l’id du colis rouge et l’id du comptoir de Sami, puis déplace uniquement ce colis avec appendChild.'
      ],
      hints: [
        'Ne déplace pas les colis vert et bleu, uniquement le colis rouge !',
        'var rouge = document.getElementById("colis-rouge");\nvar comptoir = document.getElementById("comptoir-sami");\ncomptoir.appendChild(rouge);'
      ],
      success: 'Parfait ! Tu as ciblé exactement le bon élément DOM sans toucher aux autres !'
    },
    domParcels: [
      { id: 'colis-vert', label: 'Paquet Vert', value: 'Vert', color: '#16a34a' },
      { id: 'colis-rouge', label: 'Paquet Rouge', value: 'Rouge', color: '#dc2626' },
      { id: 'colis-bleu', label: 'Paquet Bleu', value: 'Bleu', color: '#2563eb' }
    ],
    domTargets: [
      {
        id: 'comptoir-sami',
        label: 'Zone de dépôt',
        clientName: 'Sami',
        avatar: 'sami',
        orderText: 'Je voudrais uniquement le paquet rouge, merci !'
      }
    ],
    expectedPlacements: [
      { parcelId: 'colis-rouge', targetId: 'comptoir-sami' }
    ],
    starterCode: '// Inspecte les id avec F12 et livre uniquement le colis rouge\n',
    solution: 'var rouge = document.getElementById("colis-rouge");\nvar comptoir = document.getElementById("comptoir-sami");\ncomptoir.appendChild(rouge);'
  },
  {
    id: 37,
    chapter: 5,
    title: 'Deux clients en même temps',
    mechanic: 'dom',
    station: 'dom',
    objective: 'Inspecte les 4 id et livre le café à Maya et le croissant à Lucas.',
    leo: {
      present: false,
      messages: [
        'Post-it de Léo : Coup de feu au comptoir ! Deux clients attendent leur commande.',
        'Inspecte les id des deux colis sur le tapis et les id des deux tables clients, stocke-les dans des var, puis livre chaque colis sur la bonne table avec appendChild.'
      ],
      hints: [
        'Tu as besoin de 4 variables var (2 colis + 2 tables) et 2 appels à appendChild.',
        'var cafe = document.getElementById("colis-cafe");\nvar croissant = document.getElementById("colis-croissant");\nvar tableMaya = document.getElementById("table-maya");\nvar tableLucas = document.getElementById("table-lucas");\ntableMaya.appendChild(cafe);\ntableLucas.appendChild(croissant);'
      ],
      success: 'Double livraison réussie sans aucune erreur de table !'
    },
    domParcels: [
      { id: 'colis-cafe', label: 'Café', value: 'Chaud', color: '#92400e' },
      { id: 'colis-croissant', label: 'Croissant', value: 'Doré', color: '#d97706' }
    ],
    domTargets: [
      {
        id: 'table-maya',
        label: 'Zone de Maya',
        clientName: 'Maya',
        avatar: 'maya',
        orderText: 'Un café sur ma table, s’il vous plaît !'
      },
      {
        id: 'table-lucas',
        label: 'Zone de Lucas',
        clientName: 'Lucas',
        avatar: 'lucas',
        orderText: 'Et pour moi, le croissant !'
      }
    ],
    expectedPlacements: [
      { parcelId: 'colis-cafe', targetId: 'table-maya' },
      { parcelId: 'colis-croissant', targetId: 'table-lucas' }
    ],
    starterCode: '// Inspecte les 2 colis et les 2 zones clients, puis livre chacun au bon endroit\n',
    solution: 'var cafe = document.getElementById("colis-cafe");\nvar croissant = document.getElementById("colis-croissant");\nvar tableMaya = document.getElementById("table-maya");\nvar tableLucas = document.getElementById("table-lucas");\ntableMaya.appendChild(cafe);\ntableLucas.appendChild(croissant);'
  },
  {
    id: 38,
    chapter: 5,
    title: 'Boucle for + DOM',
    mechanic: 'dom',
    station: 'dom',
    objective: 'Utilise une boucle for de 1 à 3 pour déplacer #colis-1, #colis-2 et #colis-3 vers la palette de Hugo.',
    leo: {
      present: false,
      messages: [
        'Post-it de Léo : On peut combiner les boucles for avec le DOM !',
        'Inspecte les 3 colis numérotés ("colis-1", "colis-2", "colis-3") et la palette de Hugo.',
        'Dans une boucle for (var i = 1; i <= 3; i++), récupère chaque colis avec document.getElementById("colis-" + i) et ajoute-le à la palette avec appendChild !'
      ],
      hints: [
        'Récupère la palette avant la boucle : var palette = document.getElementById("palette-hugo");',
        'var palette = document.getElementById("palette-hugo");\nfor (var i = 1; i <= 3; i++) {\n  var colis = document.getElementById("colis-" + i);\n  palette.appendChild(colis);\n}'
      ],
      success: 'Les 3 colis déplacés d’un coup avec une seule boucle for ! Impressionnant !'
    },
    domParcels: [
      { id: 'colis-1', label: 'Colis 1', value: '#1', color: '#6366f1' },
      { id: 'colis-2', label: 'Colis 2', value: '#2', color: '#6366f1' },
      { id: 'colis-3', label: 'Colis 3', value: '#3', color: '#6366f1' }
    ],
    domTargets: [
      {
        id: 'palette-hugo',
        label: 'Palette de livraison',
        clientName: 'Hugo',
        avatar: 'hugo',
        orderText: 'Chargez les 3 colis sur ma palette avec une boucle for !'
      }
    ],
    expectedPlacements: [
      { parcelId: 'colis-1', targetId: 'palette-hugo' },
      { parcelId: 'colis-2', targetId: 'palette-hugo' },
      { parcelId: 'colis-3', targetId: 'palette-hugo' }
    ],
    requireForLoop: true,
    starterCode: '// Inspecte l\'id de la palette puis déplace colis-1, colis-2, colis-3 avec un for\n',
    solution: 'var palette = document.getElementById("palette-hugo");\nfor (var i = 1; i <= 3; i++) {\n  var colis = document.getElementById("colis-" + i);\n  palette.appendChild(colis);\n}'
  },
  {
    id: 39,
    chapter: 5,
    title: 'Trier puis livrer dans le DOM (for + if)',
    mechanic: 'dom',
    station: 'dom',
    objective: 'Parcours paquet-1 à paquet-4 avec for, et livre uniquement ceux dont colis.textContent === "OK".',
    leo: {
      present: false,
      messages: [
        'Post-it de Léo : 4 paquets sont sur le tapis (inspecte leurs id : paquet-1 à paquet-4). Certains contiennent le texte "OK" et d’autres "NON".',
        'Pour lire le texte d’un élément HTML en JavaScript, on écrit colis.textContent !',
        'Fais une boucle for de 1 à 4 : récupère var colis = document.getElementById("paquet-" + i); et si colis.textContent === "OK", déplace-le dans la zone d’Inès avec appendChild !'
      ],
      hints: [
        'Inspecte la zone d’Inès pour trouver son id ("zone-ines").',
        'var zone = document.getElementById("zone-ines");\nfor (var i = 1; i <= 4; i++) {\n  var colis = document.getElementById("paquet-" + i);\n  if (colis.textContent === "OK") {\n    zone.appendChild(colis);\n  }\n}'
      ],
      success: 'Extraordinaire ! Tu viens de combiner var, for, if, getElementById, textContent et appendChild !'
    },
    domParcels: [
      { id: 'paquet-1', simpleText: 'NON', color: '#dc2626' },
      { id: 'paquet-2', simpleText: 'OK', color: '#16a34a' },
      { id: 'paquet-3', simpleText: 'NON', color: '#dc2626' },
      { id: 'paquet-4', simpleText: 'OK', color: '#16a34a' }
    ],
    domTargets: [
      {
        id: 'zone-ines',
        label: 'Zone d’Inès',
        clientName: 'Inès',
        avatar: 'ines',
        orderText: 'Livrez-moi uniquement les paquets marqués "OK" !'
      }
    ],
    expectedPlacements: [
      { parcelId: 'paquet-2', targetId: 'zone-ines' },
      { parcelId: 'paquet-4', targetId: 'zone-ines' }
    ],
    requireForLoop: true,
    requireIf: true,
    starterCode: '// Parcours paquet-1 à paquet-4 et déplace ceux dont colis.textContent === "OK"\n',
    solution: 'var zone = document.getElementById("zone-ines");\nfor (var i = 1; i <= 4; i++) {\n  var colis = document.getElementById("paquet-" + i);\n  if (colis.textContent === "OK") {\n    zone.appendChild(colis);\n  }\n}'
  },
  {
    id: 40,
    chapter: 5,
    title: 'Grand Final : Maître de l’Atelier !',
    mechanic: 'dom',
    station: 'dom',
    objective: 'Crée function livrer(idColis, idZone) avec getElementById + appendChild et livre les 3 colis aux 3 comptoirs !',
    leo: {
      present: false,
      messages: [
        'Dernier message de Léo : Voici l’épreuve finale ! Tu es désormais seul responsable de tout l’Atelier & Comptoir !',
        'Crée une fonction livrer(idColis, idZone) qui récupère le colis et la zone avec document.getElementById, puis appelle zone.appendChild(colis);.',
        'Inspecte les 3 colis (Étoile, Lune, Soleil) et les 3 comptoirs (Nord, Sud, Est) avec F12, puis appelle livrer(...) 3 fois !'
      ],
      hints: [
        'Déclare d’abord :\nfunction livrer(idColis, idZone) {\n  var colis = document.getElementById(idColis);\n  var zone = document.getElementById(idZone);\n  zone.appendChild(colis);\n}',
        'Appelle ensuite :\nlivrer("colis-etoile", "comptoir-nord");\nlivrer("colis-lune", "comptoir-sud");\nlivrer("colis-soleil", "comptoir-est");'
      ],
      success: 'FÉLICITATIONS ! Tu as terminé les 40 exercices du Mode Histoire d’Atelier & Comptoir ! Tu maîtrises les bases du JavaScript et du DOM !'
    },
    domParcels: [
      { id: 'colis-etoile', label: 'Étoile', value: 'Nord', color: '#eab308' },
      { id: 'colis-lune', label: 'Lune', value: 'Sud', color: '#6366f1' },
      { id: 'colis-soleil', label: 'Soleil', value: 'Est', color: '#f97316' }
    ],
    domTargets: [
      {
        id: 'comptoir-nord',
        label: 'Comptoir Nord',
        clientName: 'Lina',
        avatar: 'lina',
        orderText: 'L’Étoile au Nord !'
      },
      {
        id: 'comptoir-sud',
        label: 'Comptoir Sud',
        clientName: 'Théo',
        avatar: 'theo',
        orderText: 'La Lune au Sud !'
      },
      {
        id: 'comptoir-est',
        label: 'Comptoir Est',
        clientName: 'Malo',
        avatar: 'malo',
        orderText: 'Le Soleil à l’Est !'
      }
    ],
    expectedPlacements: [
      { parcelId: 'colis-etoile', targetId: 'comptoir-nord' },
      { parcelId: 'colis-lune', targetId: 'comptoir-sud' },
      { parcelId: 'colis-soleil', targetId: 'comptoir-est' }
    ],
    requireFunction: { name: 'livrer', minParams: 2 },
    starterCode: '// Crée function livrer(idColis, idZone) puis livre les 3 colis aux bons comptoirs !\n',
    solution: 'function livrer(idColis, idZone) {\n  var colis = document.getElementById(idColis);\n  var zone = document.getElementById(idZone);\n  zone.appendChild(colis);\n}\n\nlivrer("colis-etoile", "comptoir-nord");\nlivrer("colis-lune", "comptoir-sud");\nlivrer("colis-soleil", "comptoir-est");'
  }
];
