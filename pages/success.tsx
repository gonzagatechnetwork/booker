import Layout from "../lib/Layout";

export default () => {
  return (
    <Layout>
      <div>
        <h1>Success!</h1>
        🚀 You've done the thing! Check your email soon! 🚀
        <style jsx>{`
          div {
            margin: 0 auto;
            text-align: center;
            padding: 24px;
          }
        `}</style>
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
    </Layout>
  );
};
