const { getData, getDataFixtures } = require("../data");

const locale = "fr-FR";
const dateFormatter = new Intl.DateTimeFormat(locale, {
  year: "numeric",
  month: "long",
  day: "numeric",
});

const handler = async (_event, _context) => {
  const [error, data] = await getDataFixtures();
  if (error) {
    return { statusCode: 200, body: renderHTML(data, { message: "An error occured... If you see this message that means I messed something up, please let me know." }) };
  }

  return { statusCode: 200, body: renderHTML(data, error) };
};

function renderQuote(quote, author) {
  const formattedDate = dateFormatter.format(new Date(quote.date));

  return `
    <li class="Quote Quote_Quote__2z5ny">
      <cite>
        <a href="/person/${author.id}">
          <div class="Avatar Avatar_Avatar__3XQGm" style="background-color: ${author.color};">
            <img src="${author.avatar}" alt="${author.id}‘s avatar">
          </div>
          <div>
            <b style="color: ${author.color};">${author.id}</b>
            <i>&nbsp; ${formattedDate}</i>
          </div>
        </a>
      </cite>
      <blockquote>${quote.text}</blockquote>
    </li>`;
}

function renderHTML(data, error) {
  const { quotes, persons } = data;
  const authorsMap = persons.reduce((map, person) => {
    map[person.id] = person;
    return map;
  }, {});

  return `
    <!DOCTYPE html>
    <html lang="fr">

      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Quotes</title>
        <link rel="stylesheet" href="https://pouett.netlify.app/_next/static/css/9f365dd02e74fb824cc3.css">
        <link rel="stylesheet" href="https://pouett.netlify.app/_next/static/css/f53c086dca035f39e741.css">
      </head>

      <body>
        <main>
          ${error == null ? `<ul>
            ${quotes.map(quote => renderQuote(quote, authorsMap[quote.author])).join("")}
          </ul>` : ``}
        </main>
        <aside>
          <ul class="MainLayout_Tabs__2D18s">
            <li class="MainLayout_Tab__20JOx">
              <a class="active" href="/">
                <svg width="18" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
                  <path d="M20 2H4L2 4v18l4-4h14l2-2V4l-2-2zM9 11H7V9h2v2zm4 0h-2V9h2v2zm4 0h-2V9h2v2z"></path>
                  <path fill="none" d="M0 0h24v24H0z"></path>
                </svg>
                <div>Citations</div>
              </a>
            </li>
            <li class="MainLayout_Tab__20JOx">
              <a class="" href="/quiz">
                <svg width="18" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M11 18h2v-2h-2v2zm1-16a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm0-14c-2 0-4 2-4 4h2l2-2 2 2c0 2-3 2-3 5h2c0-2 3-2 3-5 0-2-2-4-4-4z"></path>
                </svg>
                <div>Quiz</div>
              </a>
            </li>
            <li class="MainLayout_Tab__20JOx">
              <a class="" href="/sounds">
                <svg width="18" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24">
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M12 3v9h-1a4 4 0 1 0 4 5V6h4V3h-7z"></path>
                </svg>
                <div>Sons</div>
              </a>
            </li>
          </ul>
        </aside>
      </body>

    </html>
  `;
}

module.exports = { handler };
