const body = {
  data: [
    {
      id: 0,
      text: "Valérie tu touches pour voir si ça colle (?).",
      author: "Julie",
      date: "2019-03-31T22:00:00.000Z",
    },
    {
      id: 1,
      text: "Bonjour, je suis pomme verte aujourd'hui!",
      author: "Valérie",
      date: "2019-03-31T22:00:00.000Z",
    },
    {
      id: 2,
      text: "\"Enculé\" c'est joyeux!'",
      author: "Colin",
      date: "2019-03-31T22:00:00.000Z",
    },
    {
      id: 3,
      text: "Pourquoi t'as des trous?!",
      author: "Valérie",
      date: "2019-03-31T22:00:00.000Z",
    },
    {
      id: 4,
      text: "(en regardant Colin) J'en ai marre de ce truc absurde!",
      author: "Valérie",
      date: "2019-03-31T22:00:00.000Z",
    },
    {
      id: 5,
      text: "C'est pas MVP la sécurité.",
      author: "Julie",
      date: "2019-03-31T22:00:00.000Z",
    },
    {
      id: 6,
      text: "Le but de mourir c'est que tu fais plus de paperasse.",
      author: "Colin",
      date: "2019-03-31T22:00:00.000Z",
    },
    {
      id: 7,
      text: "Tu veux que je te la mette à coté?",
      author: "David",
      date: "2019-03-31T22:00:00.000Z",
    },
    {
      id: 8,
      text: "Putain, le wifi c'est dingue!",
      author: "Cédric",
      date: "2019-03-31T22:00:00.000Z",
    },
    {
      id: 9,
      text:
        "Est-ce que les gens qui font du Java prennent vraiment du plaisir?",
      author: "Wolfgang",
      date: "2019-02-28T23:00:00.000Z",
    },
    {
      id: 10,
      text: "Tant qu'à  faire un truc que tu aimes, autant le faire payer.",
      author: "Colin",
      date: "2019-02-28T23:00:00.000Z",
    },
    {
      id: 11,
      text: "On dirait pas mais je réflechi.",
      author: "Julie",
      date: "2019-02-28T23:00:00.000Z",
    },
    {
      id: 12,
      text: "J'ai peur d'être gentille maintenant.",
      author: "Valérie",
      date: "2019-02-28T23:00:00.000Z",
    },
    {
      id: 13,
      text: "Enfin... Il faut se retirer le doigt vite!",
      author: "Rudy",
      date: "2019-02-28T23:00:00.000Z",
    },
    {
      id: 14,
      text: "[...] Dans le trou noir de Gauthier.",
      author: "Valérie",
      date: "2019-02-28T23:00:00.000Z",
    },
    {
      id: 15,
      text: "C'est nul le cloud!",
      author: "Wolfgang",
      date: "2019-02-28T23:00:00.000Z",
    },
    {
      id: 16,
      text: "C'est pas bien d'échouer.",
      author: "Wolfgang",
      date: "2019-02-28T23:00:00.000Z",
    },
    {
      id: 17,
      text: "[...] mais au final, c'est toujours nous qui fistons!",
      author: "Valérie",
      date: "2019-02-28T23:00:00.000Z",
    },
    {
      id: 18,
      text: "Les mecs ils ont ubérisé l'ubérisation.",
      author: "Julien",
      date: "2019-01-31T23:00:00.000Z",
    },
    {
      id: 19,
      text: "Ouais mais t'as pas de style!",
      author: "Julie",
      date: "2019-01-31T23:00:00.000Z",
    },
    {
      id: 20,
      text: "Viens là que je te raffermisse!",
      author: "Julie",
      date: "2019-01-31T23:00:00.000Z",
    },
    {
      id: 21,
      text: "J'en ai marre de TypeScript!",
      author: "Wolfgang",
      date: "2019-01-31T23:00:00.000Z",
    },
    {
      id: 22,
      text: "La bienveillance elle peut aller se faire foutre.",
      author: "Cédric",
      date: "2019-01-31T23:00:00.000Z",
    },
    {
      id: 23,
      text: "J'ai eu ta maladie partout sur mon ordinateur.",
      author: "Valérie",
      date: "2019-04-08T00:00:00.000Z",
    },
    {
      id: 24,
      text: "Franchement, j'en ai marre de moi!",
      author: "Julie",
      date: "2019-04-08T00:00:04.000Z",
    },
    {
      id: 25,
      text: "Je suis perdu dans ma tête.",
      author: "Cédric",
      date: "2019-04-08T00:00:06.000Z",
    },
    {
      id: 26,
      text: "C'est sa période anale.",
      author: "Colin",
      date: "2019-04-08T22:00:00.000Z",
    },
    {
      id: 27,
      text: "On peut faire une bite dans un cœur.",
      author: "Colin",
      date: "2019-04-09T04:00:00.000Z",
    },
    {
      id: 28,
      text: "C'est nul sur 10.",
      author: "Colin",
      date: "2019-04-09T08:00:00.000Z",
    },
    {
      id: 29,
      text: "Je suis un canadair.",
      author: "Colin",
      date: "2019-04-09T09:00:00.000Z",
    },
    {
      id: 30,
      text: "Think like a tree.",
      author: "Bob",
      date: "2019-04-09T10:00:00.000Z",
    },
    {
      id: 31,
      text: "C'est une grosse croute.",
      author: "Julien",
      date: "2019-04-09T11:00:00.000Z",
    },
  ],
};

export function handler(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(body),
  });
}
