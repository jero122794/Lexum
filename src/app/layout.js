export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <title>Lexum</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="/styles/global.css" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
