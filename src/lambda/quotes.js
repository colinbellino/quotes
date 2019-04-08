const data = [
  {
    id: "1",
    text: "Valérie tu touches pour voir si ça colle (?).",
    date: "2019-03-31T22:00:00.000Z",
    author: "Julie",
  },
  {
    id: "2",
    text: "Bonjour, je suis pomme verte aujourd'hui!",
    date: "2019-03-31T22:00:00.000Z",
    author: "Valérie",
  },
  {
    id: "3",
    text: '"Enculé" c\'est joyeux!',
    date: "2019-03-31T22:00:00.000Z",
    author: "Colin",
  },
  {
    id: "4",
    text: "Pourquoi t'as des trous?!",
    date: "2019-03-31T22:00:00.000Z",
    author: "Valérie",
  },
  {
    id: "5",
    text: "(en regardant Colin) J'en ai marre de ce truc absurde!",
    date: "2019-03-31T22:00:00.000Z",
    author: "Valérie",
  },
  {
    id: "6",
    text: "C'est pas MVP la sécurité.",
    date: "2019-03-31T22:00:00.000Z",
    author: "Julie",
  },
  {
    id: "7",
    text: "Le but de mourir c'est que tu fais plus de paperasse.",
    date: "2019-03-31T22:00:00.000Z",
    author: "Colin",
  },
  {
    id: "8",
    text: "Tu veux que je te la mette à coté?",
    date: "2019-03-31T22:00:00.000Z",
    author: "David",
  },
  {
    id: "9",
    text: "Putain, le wifi c'est dingue!",
    date: "2019-03-31T22:00:00.000Z",
    author: "Cédric",
  },
  {
    id: "10",
    text: "Est-ce que les gens qui font du Java prennent vraiment du plaisir?",
    date: "2019-02-28T23:00:00.000Z",
    author: "Wolfgang",
  },
  {
    id: "11",
    text: "Tant qu'à faire un truc que tu aimes, autant le faire payer.",
    date: "2019-02-28T23:00:00.000Z",
    author: "Colin",
  },
  {
    id: "12",
    text: "On dirait pas mais je réflechi.",
    date: "2019-02-28T23:00:00.000Z",
    author: "Julie",
  },
  {
    id: "13",
    text: "J'ai peur d'être gentille maintenant.",
    date: "2019-02-28T23:00:00.000Z",
    author: "Valérie",
  },
  {
    id: "14",
    text: "Enfin... Il faut se retirer le doigt vite!",
    date: "2019-02-28T23:00:00.000Z",
    author: "Rudy",
  },
  {
    id: "15",
    text: "[...] Dans le trou noir de Gauthier.",
    date: "2019-02-28T23:00:00.000Z",
    author: "Valérie",
  },
  {
    id: "16",
    text: "C'est nul le cloud!",
    date: "2019-02-28T23:00:00.000Z",
    author: "Wolfgang",
  },
  {
    id: "17",
    text: "C'est pas bien d'échouer.",
    date: "2019-02-28T23:00:00.000Z",
    author: "Wolfgang",
  },
  {
    id: "18",
    text: "[...] mais au final, c'est toujours nous qui fistons!",
    date: "2019-02-28T23:00:00.000Z",
    author: "Valérie",
  },
  {
    id: "19",
    text: "Les mecs ils ont ubérisé l'ubérisation.",
    date: "2019-01-31T23:00:00.000Z",
    author: "Julien",
  },
  {
    id: "20",
    text: "Ouais mais t'as pas de style!",
    date: "2019-01-31T23:00:00.000Z",
    author: "Julie",
  },
  {
    id: "21",
    text: "Viens là que je te raffermisse!",
    date: "2019-01-31T23:00:00.000Z",
    author: "Julie",
  },
  {
    id: "22",
    text: "J'en ai marre de TypeScript!",
    date: "2019-01-31T23:00:00.000Z",
    author: "Wolfgang",
  },
  {
    id: "23",
    text: "La bienveillance elle peut aller se faire foutre.",
    date: "2019-01-31T23:00:00.000Z",
    author: "Cédric",
  },
  {
    id: "24",
    text: "J'ai eu ta maladie partout sur mon ordinateur.",
    date: "2019-04-08T00:00:00.000Z",
    author: "Valérie",
  },
  {
    id: "25",
    text: "Franchement, j'en ai marre de moi!",
    date: "2019-04-08T00:00:04.000Z",
    author: "Julie",
  },
  {
    id: "26",
    text: "Je suis perdu dans ma tête.",
    date: "2019-04-08T00:00:06.000Z",
    author: "Cédric",
  },
];

export function handler(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ data }),
  });
}
