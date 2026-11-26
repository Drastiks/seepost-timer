export const LEVELS_CH2 = [
  {
    id: 11,
    chapter: 2,
    title: 'Panne sur le tapis ! (if et ===)',
    mechanic: 'conditions',
    station: 'tapis',
    objective: 'Crée la variable "livre", vérifie-la avec if (===) puis appelle leo(...) dedans.',
    client: {
      name: 'Inès',
      avatar: 'ines',
      orderText: 'Bonjour ! Je voudrais un colis contenant "livre", s’il vous plaît.',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir d’Inès'
    },
    leo: {
      present: true,
      messages: [
        'Nouvelle cliente ! Comme d’habitude, prépare le colis "livre" dans une variable avec var.'
      ],
      bugMessage:
        'Alerte ! Le tapis roulant vient de buguer ! Regarde la sirène rouge et le « ? » sur ton colis : on n’est plus sûr de son contenu ! Écris une condition if (colis === "livre") { } pour l’envoyer au Centre de tri !',
      triMessage:
        'Super, j’ai déposé ton colis « ? » dans le Centre de tri ! Maintenant, écris leo(colis); À L’INTÉRIEUR des accolades { } du if pour ne livrer que si le colis vaut vraiment "livre" !',
      hints: [
        'Étape 1 : crée var colis = "livre"; — Étape 2 : écris if (colis === "livre") { ... }',
        'Solution :\nvar colis = "livre";\nif (colis === "livre") {\n  leo(colis);\n}'
      ],
      success: 'Ouf ! Grâce à ton if, le colis a pris la bonne valeur au Centre de tri et Inès a bien reçu son "livre" !'
    },
    starterCode: '// Crée ta variable pour le colis "livre"\n',
    solution: 'var colis = "livre";\nif (colis === "livre") {\n  leo(colis);\n}',
    inputVar: 'colis',
    allowImplicitDelete: true,
    parcels: [
      { value: 'caillou', expectedAction: 'delete' },
      { value: 'bouchon', expectedAction: 'delete' },
      { value: 'livre', expectedAction: 'keep' },
      { value: 'chaussette', expectedAction: 'delete' },
      { value: 'clou', expectedAction: 'delete' }
    ],
    requireSyntax: ['if', '===']
  },
  {
    id: 12,
    chapter: 2,
    title: 'Garder ou supprimer (if / else)',
    mechanic: 'conditions',
    station: 'tri',
    objective: 'Crée ta variable 42, puis si elle vaut 42 appelle leo(...), sinon supprimer();.',
    client: {
      name: 'Théo',
      avatar: 'theo',
      orderText: 'Salut ! Il me faudrait le colis numéro 42, s’il vous plaît.',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Théo'
    },
    leo: {
      present: true,
      messages: [
        'Le tapis est toujours capricieux ! Crée ta variable avec le nombre 42, puis ajoute un bloc if / else.',
        'Si ta variable === 42 appelle leo(taVariable);, sinon dans else { supprimer(); } pour jeter les colis parasites !'
      ],
      bugMessage:
        'Le bug est toujours là ! Ajoute if (numero === 42) { leo(numero); } else { supprimer(); } pour trier au Centre de tri.',
      triMessage:
        'Colis déposé au Centre de tri ! Mets leo(...) dans le if et supprimer(); dans le else.',
      hints: [
        'Pour un nombre comme 42, on ne met PAS de guillemets !',
        'var numero = 42;\nif (numero === 42) {\n  leo(numero);\n} else {\n  supprimer();\n}'
      ],
      success: 'Tri chirurgical ! Le numéro 42 a été livré et les parasites ont été supprimés.'
    },
    starterCode: '// Crée ta variable (42) puis trie avec if / else (leo(...) et supprimer())\n',
    solution: 'var numero = 42;\nif (numero === 42) {\n  leo(numero);\n} else {\n  supprimer();\n}',
    inputVar: 'numero',
    parcels: [
      { value: 9, expectedAction: 'delete' },
      { value: 42, expectedAction: 'keep' },
      { value: 13, expectedAction: 'delete' },
      { value: 7, expectedAction: 'delete' },
      { value: 99, expectedAction: 'delete' }
    ],
    requireSyntax: ['if', '===', 'else']
  },
  {
    id: 13,
    chapter: 2,
    title: 'Rejeter les colis cassés (!==)',
    mechanic: 'conditions',
    station: 'tri',
    objective: 'Crée ta variable "intact", puis livre avec leo(...) si etat !== "casse", sinon supprimer().',
    client: {
      name: 'Camille',
      avatar: 'camille',
      orderText: 'Bonjour ! Je voudrais un colis intact, surtout pas "casse".',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Camille'
    },
    leo: {
      present: true,
      messages: [
        'Pour vérifier si une valeur est DIFFÉRENTE d’une autre, on utilise !== (un point d’exclamation suivi de deux égal).',
        'Crée ta variable (par exemple var etat = "intact";), puis si etat !== "casse" appelle leo(etat);, sinon supprimer(); !'
      ],
      bugMessage:
        'Sirène rouge ! Vérifie que le colis n’est pas cassé avec if (etat !== "casse") { leo(etat); } else { supprimer(); }.',
      triMessage:
        'Au Centre de tri ! Appelle leo(...) quand le colis est différent de "casse", et supprimer(); dans le else.',
      hints: [
        'Utilise l’opérateur !== : if (etat !== "casse")',
        'var etat = "intact";\nif (etat !== "casse") {\n  leo(etat);\n} else {\n  supprimer();\n}'
      ],
      success: 'Super réflexe ! Le seul colis "intact" a été livré à Camille.'
    },
    starterCode: '// Crée ta variable ("intact") puis utilise !== dans un if / else\n',
    solution: 'var etat = "intact";\nif (etat !== "casse") {\n  leo(etat);\n} else {\n  supprimer();\n}',
    inputVar: 'etat',
    parcels: [
      { value: 'casse', expectedAction: 'delete' },
      { value: 'casse', expectedAction: 'delete' },
      { value: 'casse', expectedAction: 'delete' },
      { value: 'intact', expectedAction: 'keep' },
      { value: 'casse', expectedAction: 'delete' }
    ],
    requireSyntax: ['if', '!==', 'else']
  },
  {
    id: 14,
    chapter: 2,
    title: 'Plus lourd que 10 kg (>)',
    mechanic: 'conditions',
    station: 'tri',
    objective: 'Crée ta variable poids (ex. 18), puis livre avec leo(...) si poids > 10, sinon supprimer().',
    client: {
      name: 'Hugo',
      avatar: 'hugo',
      orderText: 'Je viens chercher mon colis de matériel : il pèse plus de 10 kg.',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Hugo'
    },
    leo: {
      present: true,
      messages: [
        'On peut aussi comparer des nombres avec > (strictement plus grand que).',
        'Crée ta variable (ex: var poids = 18;), puis livre avec leo(poids); uniquement si poids > 10, sinon supprimer();.'
      ],
      bugMessage:
        'Bug détecté ! Utilise > dans ton if : if (poids > 10) { leo(poids); } else { supprimer(); }.',
      triMessage:
        'Colis au Centre de tri ! Appelle leo(...) dans le if (> 10) et supprimer(); dans le else.',
      hints: [
        'Attention : 10 n’est pas strictement plus grand que 10, seul 18 passe !',
        'var poids = 18;\nif (poids > 10) {\n  leo(poids);\n} else {\n  supprimer();\n}'
      ],
      success: 'Exactement ! Le colis de 18 kg est bien arrivé chez Hugo.'
    },
    starterCode: '// Crée ta variable poids puis trie avec > 10\n',
    solution: 'var poids = 18;\nif (poids > 10) {\n  leo(poids);\n} else {\n  supprimer();\n}',
    inputVar: 'poids',
    parcels: [
      { value: 3, expectedAction: 'delete' },
      { value: 10, expectedAction: 'delete' },
      { value: 6, expectedAction: 'delete' },
      { value: 18, expectedAction: 'keep' },
      { value: 8, expectedAction: 'delete' }
    ],
    requireSyntax: ['if', '>', 'else']
  },
  {
    id: 15,
    chapter: 2,
    title: 'Moins cher que 10 euros (<)',
    mechanic: 'conditions',
    station: 'tri',
    objective: 'Crée ta variable prix (ex. 7), puis livre avec leo(...) si prix < 10, sinon supprimer().',
    client: {
      name: 'Maya',
      avatar: 'maya',
      orderText: 'Mon budget est petit : je voudrais un colis qui coûte moins de 10€.',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Maya'
    },
    leo: {
      present: true,
      messages: [
        'Maintenant essayons < (strictement plus petit que).',
        'Crée ta variable (ex: var prix = 7;), puis si prix < 10 appelle leo(prix);, sinon supprimer();.'
      ],
      bugMessage:
        'Alerte machine ! Filtre avec if (prix < 10) { leo(prix); } else { supprimer(); }.',
      triMessage:
        'Colis au Centre de tri ! Appelle leo(...) si prix < 10, sinon supprimer();.',
      hints: [
        'Condition attendue : prix < 10',
        'var prix = 7;\nif (prix < 10) {\n  leo(prix);\n} else {\n  supprimer();\n}'
      ],
      success: 'Bien vu ! Le colis à 7€ respecte le budget de Maya.'
    },
    starterCode: '// Crée ta variable prix puis trie avec < 10\n',
    solution: 'var prix = 7;\nif (prix < 10) {\n  leo(prix);\n} else {\n  supprimer();\n}',
    inputVar: 'prix',
    parcels: [
      { value: 25, expectedAction: 'delete' },
      { value: 10, expectedAction: 'delete' },
      { value: 7, expectedAction: 'keep' },
      { value: 19, expectedAction: 'delete' },
      { value: 14, expectedAction: 'delete' }
    ],
    requireSyntax: ['if', '<', 'else']
  },
  {
    id: 16,
    chapter: 2,
    title: 'Au moins 20 cm (>=)',
    mechanic: 'conditions',
    station: 'tri',
    objective: 'Crée ta variable taille (ex. 20), puis livre avec leo(...) si taille >= 20, sinon supprimer().',
    client: {
      name: 'Sami',
      avatar: 'sami',
      orderText: 'Il me faut un carton d’au moins 20 cm (20 cm inclus) !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Sami'
    },
    leo: {
      present: true,
      messages: [
        'Quand la valeur limite est acceptée ("au moins 20"), on utilise >= (supérieur ou égal).',
        'Crée ta variable (ex: var taille = 20;), puis livre avec leo(taille); si taille >= 20, sinon supprimer();.'
      ],
      bugMessage:
        'Le tapis bugue encore ! Ajoute if (taille >= 20) { leo(taille); } else { supprimer(); }.',
      triMessage:
        'Colis prêt au Centre de tri ! Appelle leo(...) si taille >= 20, sinon supprimer();.',
      hints: [
        'Écris >= sans espace entre > et =.',
        'var taille = 20;\nif (taille >= 20) {\n  leo(taille);\n} else {\n  supprimer();\n}'
      ],
      success: 'Impeccable ! Grâce à >=, le colis de exactement 20 cm a bien été livré.'
    },
    starterCode: '// Crée ta variable taille puis trie avec >= 20\n',
    solution: 'var taille = 20;\nif (taille >= 20) {\n  leo(taille);\n} else {\n  supprimer();\n}',
    inputVar: 'taille',
    parcels: [
      { value: 12, expectedAction: 'delete' },
      { value: 19, expectedAction: 'delete' },
      { value: 20, expectedAction: 'keep' },
      { value: 15, expectedAction: 'delete' },
      { value: 8, expectedAction: 'delete' }
    ],
    requireSyntax: ['if', '>=', 'else']
  },
  {
    id: 17,
    chapter: 2,
    title: '5 kg maximum (<=)',
    mechanic: 'conditions',
    station: 'tri',
    objective: 'Crée ta variable poids (ex. 5), puis livre avec leo(...) si poids <= 5, sinon supprimer().',
    client: {
      name: 'Nora',
      avatar: 'nora',
      orderText: 'Je rentre à vélo : je ne peux porter que 5 kg maximum !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Nora'
    },
    leo: {
      present: true,
      messages: [
        'Et voici le dernier comparateur : <= (inférieur ou égal), parfait pour un maximum autorisé !',
        'Crée ta variable (ex: var poids = 5;), puis livre avec leo(poids); si poids <= 5, sinon supprimer();.'
      ],
      bugMessage:
        'Sirène rouge ! Trie avec if (poids <= 5) { leo(poids); } else { supprimer(); }.',
      triMessage:
        'Au Centre de tri ! Appelle leo(...) si poids <= 5, sinon supprimer();.',
      hints: [
        'Écris <= sans espace entre < et =.',
        'var poids = 5;\nif (poids <= 5) {\n  leo(poids);\n} else {\n  supprimer();\n}'
      ],
      success: 'Nora peut rentrer à vélo tranquillement avec son colis de 5 kg !'
    },
    starterCode: '// Crée ta variable poids puis trie avec <= 5\n',
    solution: 'var poids = 5;\nif (poids <= 5) {\n  leo(poids);\n} else {\n  supprimer();\n}',
    inputVar: 'poids',
    parcels: [
      { value: 9, expectedAction: 'delete' },
      { value: 6, expectedAction: 'delete' },
      { value: 12, expectedAction: 'delete' },
      { value: 5, expectedAction: 'keep' },
      { value: 8, expectedAction: 'delete' }
    ],
    requireSyntax: ['if', '<=', 'else']
  },
  {
    id: 18,
    chapter: 2,
    title: 'Deux cas possibles (else if)',
    mechanic: 'conditions',
    station: 'tri',
    objective: 'Crée ta variable code, puis livre avec leo(...) si === "VIP" ou else if === "OR", sinon supprimer().',
    client: {
      name: 'Lucas',
      avatar: 'lucas',
      orderText: 'J’attends deux colis spéciaux : le code "VIP" et le code "OR" !',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Lucas'
    },
    leo: {
      present: true,
      messages: [
        'Parfois on a besoin de vérifier une deuxième condition si la première est fausse : c’est le rôle de else if !',
        'Crée ta variable (ex: var code = "VIP";), puis enchaîne : if (code === "VIP") { leo(code); } else if (code === "OR") { leo(code); } else { supprimer(); }.'
      ],
      bugMessage:
        'Alerte bug ! Utilise if, else if et else pour livrer "VIP" et "OR" avec leo(code); et supprimer les autres.',
      triMessage:
        'Colis au Centre de tri ! Pense à mettre leo(code); dans le if ET dans le else if, et supprimer(); dans le else.',
      hints: [
        'Enchaîne if, puis else if, puis else à la fin.',
        'var code = "VIP";\nif (code === "VIP") {\n  leo(code);\n} else if (code === "OR") {\n  leo(code);\n} else {\n  supprimer();\n}'
      ],
      success: 'Magnifique ! Les colis "VIP" et "OR" ont été livrés, et les 3 parasites supprimés !'
    },
    starterCode: '// Crée ta variable code puis utilise if / else if / else\n',
    solution: 'var code = "VIP";\nif (code === "VIP") {\n  leo(code);\n} else if (code === "OR") {\n  leo(code);\n} else {\n  supprimer();\n}',
    inputVar: 'code',
    parcels: [
      { value: 'STD', expectedAction: 'delete' },
      { value: 'VIP', expectedAction: 'keep' },
      { value: 'PUB', expectedAction: 'delete' },
      { value: 'OR', expectedAction: 'keep' },
      { value: 'ERR', expectedAction: 'delete' }
    ],
    requireSyntax: ['if', 'else if', 'else']
  },
  {
    id: 19,
    chapter: 2,
    title: 'Bilan : Colis à bonne température',
    mechanic: 'conditions',
    station: 'tri',
    objective: 'Crée temperature, supprime si < 10 ou else if > 30, sinon livre avec leo(...).',
    client: {
      name: 'Lina',
      avatar: 'lina',
      orderText: 'Mes plantes sont fragiles ! Il leur faut entre 10° et 30°.',
      dropZoneId: 'comptoir-client',
      dropZoneLabel: 'Comptoir de Lina'
    },
    leo: {
      present: true,
      messages: [
        'Défi final du Chapitre 2 ! Crée ta variable (ex: var temperature = 20;), puis utilise if, else if et else.',
        'Si temperature < 10 : supprimer();. Sinon si temperature > 30 : supprimer();. Sinon : leo(temperature); !'
      ],
      bugMessage:
        'Dernier bug du tapis ! Élimine < 10 et > 30 avec supprimer(); et mets leo(temperature); dans le else !',
      triMessage:
        'Au Centre de tri ! Supprime les extrêmes (< 10 et > 30) et appelle leo(...) dans le else.',
      hints: [
        'Seul le colis à 20° n’est ni < 10 ni > 30, il passera dans le else !',
        'var temperature = 20;\nif (temperature < 10) {\n  supprimer();\n} else if (temperature > 30) {\n  supprimer();\n} else {\n  leo(temperature);\n}'
      ],
      success: 'Chapitre 2 réussi ! Le Centre de tri n’a plus aucun secret pour toi !'
    },
    starterCode: '// Crée ta variable temperature, supprime < 10 et > 30, puis appelle leo(...) dans le else\n',
    solution: 'var temperature = 20;\nif (temperature < 10) {\n  supprimer();\n} else if (temperature > 30) {\n  supprimer();\n} else {\n  leo(temperature);\n}',
    inputVar: 'temperature',
    parcels: [
      { value: -2, expectedAction: 'delete' },
      { value: 40, expectedAction: 'delete' },
      { value: 20, expectedAction: 'keep' },
      { value: 5, expectedAction: 'delete' },
      { value: 35, expectedAction: 'delete' }
    ],
    requireSyntax: ['if', 'else if', 'else']
  }
];
