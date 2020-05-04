import { NextPage, GetServerSideProps } from "next";
import Layout from "../../lib/Layout";
import { useRouter } from "next/router";
import useLocalStorage from "../../lib/useLocalStorage";
import {
  TextField,
  TextAreaField,
  Button,
  Centered,
  FadeIn,
  Well,
} from "../../lib/ui";
import { useState, useEffect } from "react";
import { OfficeHoursRequest } from "../../lib/types";
import Spinner from "../../lib/spinner";
import confetti from "canvas-confetti";

function Form({ officeHours }: { officeHours: OfficeHoursRequest }) {
  const [name, setName] = useLocalStorage("claim-name", "");
  const [email, setEmail] = useLocalStorage("claim-email", "");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function submit() {
    const result = await fetch("/api/claim", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        author: name,
        email,
        requestID: officeHours.id,
      }),
    });

    if (result.status !== 200) {
      router.replace("/error");
      setIsLoading(false);
      return;
    }

    router.replace("/success");

    confetti({
      particleCount: 200,
      spread: 100,
      origin: { y: 0.6 },
    });
  }

  return (
    <main>
      <h1>
        {officeHours.author} is requesting office hours, fill out the form to
        accept the request.
      </h1>
      <p>Here's what they're asking about:</p>
      <Well>
        <p>{officeHours.body}</p>
        <pre>
          - {officeHours.author}, {officeHours.email}
        </pre>
      </Well>

      <p>
        When you fill out this form, we'll send you an email with{" "}
        <b>{officeHours.author}</b> CC'd to schedule a time that works for the
        both of you.
      </p>

      <TextField
        title="Your Name"
        value={name}
        type="name"
        onChange={(e) => setName(e.target.value)}
        placeholder={"Smiles McGeeswellington"}
      />

      <TextField
        title="Your Email"
        value={email}
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        placeholder={"smiles@mcgeeswellingtonthewebsite.com"}
        hint="Fear not, we only use this to send you an email, we don't store this data."
      />

      <div>
        <Button
          onClick={submit}
          disabled={!(name && email) || isLoading}
          loading={isLoading}
        >
          Accept
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

const Page: NextPage<any> = () => {
  const router = useRouter();
  const { id } = router.query;
  const [oh, setOH] = useState<OfficeHoursRequest>();

  useEffect(() => {
    if (!id) return;

    fetch("/api/request/" + id)
      .then((resp) => {
        if (resp.status !== 200) throw new Error("oh no bad lol");
        return resp;
      })
      .then((resp) => resp.json())
      .then(setOH)
      .catch((err) => {
        console.error(err);
        router.replace("/error");
      });
  }, [id]);

  if (!oh) {
    return (
      <Layout>
        <Centered>
          <Spinner color={"#F8A5C2"} size={22} />
        </Centered>
      </Layout>
    );
  }

  if (oh.claimedBy) {
    return (
      <Layout>
        <FadeIn>
          <Centered>
            This Office Hours request was claimed already by{" "}
            <b>{oh.claimedBy}!</b>
          </Centered>
        </FadeIn>
      </Layout>
    );
  }

  return (
    <Layout>
      <FadeIn>
        <Form officeHours={oh} />
      </FadeIn>
    </Layout>
  );
};

export default Page;
