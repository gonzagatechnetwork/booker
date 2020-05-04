export default () => {
  return (
    <div>
      <h1>Success!</h1>
      🚀 You've requested office hours! We'll get back to you as soon as
      possible. 🚀
      <style jsx>{`
        div {
          margin: 0 auto;
          text-align: center;
          height: 100vh;

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
  );
};
