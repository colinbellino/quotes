import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="fr">
      <Head />
      <body>
        <Main />
        <NextScript />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator && location.protocol === "https:") {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/service-worker.js');
                });
              }
            `,
          }}
        ></script>
      </body>
    </Html>
  )
}
