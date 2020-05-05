import { NextApiRequest, NextApiResponse } from "next";
import { q, client } from "../../../lib/fauna";
import { v4 as uuid } from "uuid";
import { OfficeHoursRequest } from "../../../lib/types";
import fetch from "node-fetch";

async function createRequest(request: OfficeHoursRequest) {
  return client.query(
    q.Create(q.Collection("office_hours_requests"), {
      data: request,
    })
  );
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.statusCode = 404;
    return res.json({ message: "needs a post request" });
  }

  const { author, body, email } = req.body;
  if (!author || !body || !email) {
    throw new Error(`Bad req body in /api/request ${JSON.stringify(req.body)}`);
  }

  const id = uuid();
  await createRequest({
    author,
    body,
    email,
    id,
  });

  // Skip slack message in dev
  if (process.env.NODE_ENV === "development") {
    res.statusCode = 200;
    res.json({ author, body, email, id });
    return;
  }

  // Send a slack message to counselors.
  fetch(
    // Split to prevent crawlers
    process.env.SLACK_WEBHOOK,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        blocks: [
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*${author}* has requested office hours!`,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `*Message*\n> ${body}`,
            },
          },
          {
            type: "section",
            text: {
              type: "mrkdwn",
              text: `<https://booker.gonzagatech.network/claim/${id}|Click here to accept.>`,
            },
          },
        ],
        text: `${author} has requested office hours. Accept the office hours here: https://booker.gonzagatech.network/claim/${id}.

What they're looking to talk about:
${body}`,
      }),
    }
  ).then(() => {
    res.statusCode = 200;
    res.json({ author, body, email, id });
  });
};
