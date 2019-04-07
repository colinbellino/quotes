const data = [
  {
    id: "1",
    text: "Valérie tu touches pour voir si ça colle (?)",
    date: "April 2019",
    author: "Julie",
  },
  {
    id: "2",
    text: "Bonjour, je suis pomme verte aujourd'hui !",
    date: "April 2019",
    author: "Valérie",
  },
  {
    id: "3",
    text: '"Enculé " c\'est joyeux !',
    date: "April 2019",
    author: "Colin",
  },
  {
    id: "4",
    text: "Pourquoi t'as des trous ?!",
    date: "April 2019",
    author: "Valérie",
  },
  {
    id: "5",
    text: "(en regardant Colin) J'en ai marre de ce truc absurde!",
    date: "April 2019",
    author: "Valérie",
  },
  {
    id: "6",
    text: "C'est pas MVP la sécurité.",
    date: "April 2019",
    author: "Julie",
  },
  {
    id: "7",
    text: "Le but de mourir c'est que tu fais plus de paperasse",
    date: "April 2019",
    author: "Cedric",
  },
  {
    id: "8",
    text: "Tu veux que je te la mette à coté?",
    date: "April 2019",
    author: "David",
  },
  {
    id: "9",
    text: "Putain, le wifi c'est dingue!",
    date: "April 2019",
    author: "Cédric",
  },
  {
    id: "10",
    text: "Est-ce que les gens qui font du Java prennent vraiment du plaisir ?",
    date: "March 2019",
    author: "Wolfgang",
  },
  {
    id: "11",
    text: "tant qu'à faire un truc que tu aimes, autant le faire payer",
    date: "March 2019",
    author: "Colin",
  },
  {
    id: "12",
    text: "On dirait pas mais je réflechi.",
    date: "March 2019",
    author: "Julie",
  },
  {
    id: "13",
    text: "J'ai peur d'être gentille maintenant",
    date: "March 2019",
    author: "Valérie",
  },
  {
    id: "14",
    text: "Enfin... Il faut se retirer le doigt vite!",
    date: "March 2019.",
    author: "Rudy",
  },
  {
    id: "15",
    text: "[...] Dans le trou noir de Gauthier.",
    date: "March 2019",
    author: "Valerie",
  },
  {
    id: "16",
    text: "C'est nul le cloud!",
    date: "March 2019",
    author: "Wolfgang",
  },
  {
    id: "17",
    text: "C'est pas bien d'échouer.",
    date: "March 2019",
    author: "Wolfgang",
  },
  {
    id: "18",
    text: "[...] mais au final, c'est toujours nous qui fistons!",
    date: "March 2019",
    author: "Valérie",
  },
  {
    id: "19",
    text: "Les mecs ils ont ubérisé l'ubérisation",
    date: "February 2019",
    author: "Julien",
  },
  {
    id: "20",
    text: "Ouais mais t'as pas de style!",
    date: "February 2019",
    author: "Julie",
  },
  {
    id: "21",
    text: "Viens là que je te raffermisse!",
    date: "February 2019",
    author: "Julie",
  },
  {
    id: "22",
    text: "J'en ai marre de TypeScript!",
    date: "February 2019",
    author: "Wolfgang",
  },
  {
    id: "23",
    text: "La bienveillance elle peut aller se faire foutre.",
    date: "February 2019",
    author: "Cedric",
  },
];

export function handler(event, context, callback) {
  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ data }),
  });
}
