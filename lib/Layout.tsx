import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div className="container">
      <Head>
        <title>Booker Bot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="florish" />
      {children}
      <div className="footer">Made with ❤️ by the Gonzaga Tech Network</div>

      <style jsx>
        {`
          .florish {
            height: 8px;
            background: #f8a5c2;
            border-bottom: 4px dashed #f78fb3;
            width: 100%;
          }

          .footer {
            margin: 0 auto;
            text-align: center;
            padding: 24px;
          }

          .container {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
        `}
      </style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
