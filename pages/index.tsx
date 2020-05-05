import { TextField, Button, TextAreaField, Well } from "../lib/ui";
import { useState } from "react";
import { useRouter } from "next/router";
import confetti from "canvas-confetti";
import Layout from "../lib/Layout";
import useLocalStorage from "../lib/useLocalStorage";

function Main() {
  // Uses local storage so if you leave and come back you don't
  // lose your work.
  const [name, setName] = useLocalStorage("req-name", "");
  const [email, setEmail] = useLocalStorage("req-email", "");
  const [description, setDescription] = useLocalStorage("req-description", "");
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

    // Reset description when we're done so someone
    // can request office hours again.
    setDescription("");
    // NOTE: That we keep the name and email so
    // someone doesn't have to type it in again
    // when they request again.

    router.replace("/success");

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
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
      />

      <TextField
        title="Email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder={"smiles@mcgeeswellingtonthewebsite.com"}
        hint="Fear not, we delete this from the server after 14 days for your privacy."
      />

      <TextAreaField
        title="What do you want to talk about?"
        description="This can be technical like 'stuck on launching Heroku', or it can be non-technical like 'launching on product hunt'."
        value={description}
        placeholder="Try to include as much information as you can."
        onChange={(e) => setDescription(e.target.value)}
        hint="If this is a technical request, don't forget to include the language and technologies you're using."
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
    <Layout>
      <Main />
    </Layout>
  );
}
