import Head from "next/head";
import { TextField, Button, TextAreaField } from "../lib/ui";
import { useState } from "react";
import { useRouter } from "next/router";
import confetti from "canvas-confetti";

function Main() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function submit() {
    setIsLoading(true);
    const result = await fetch("/api/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: name,
        email,
        body: description,
      }),
    });

    if (result.status !== 200) {
      router.replace("/error");
      setIsLoading(false);
      return;
    }

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      router.replace("/success");
    }, 300);
  }

  return (
    <main>
      <h1>The GTN Booker 👥</h1>
      <p>
        Book office hours with an alumni! Put in your details below and when an
        alumni accepts, we'll send you an email to schedule.
      </p>

      <hr />

      <TextField
        title="Name"
        value={name}
        type="name"
        onChange={(e) => setName(e.target.value)}
        placeholder={"Smiles McGeeswellington"}
        hint="Fear not, we delete this after 14 days for your privacy."
      />

      <TextField
        title="Email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder={"smiles@mcgeeswellingtonthewebsite.com"}
        hint="Fear not, we delete this after 14 days for your privacy."
      />

      <TextAreaField
        title="What do you want to talk about?"
        description="This can be technical like 'stuck on launching Heroku', or it can be non-technical like 'launching on product hunt'."
        value={description}
        placeholder="need help with ..."
        onChange={(e) => setDescription(e.target.value)}
      />

      <div>
        <Button
          onClick={submit}
          disabled={!(name && email && description) || isLoading}
          loading={isLoading}
        >
          Request
        </Button>
      </div>

      <style jsx>
        {`
          main {
            padding: 24px;
            margin: 0 auto;
            max-width: 720px;
            display: flex;
            flex-direction: column;
            height: 100%;
          }
        `}
      </style>
    </main>
  );
}

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Booker Bot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="florish" />
      <Main />
      <div className="footer">Made with ❤️ by the Gonzaga Tech Network</div>

      <style jsx>
        {`
          .florish {
            height: 24px;
            background: #f8a5c2;
            border-bottom: 4px solid #f78fb3;
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
