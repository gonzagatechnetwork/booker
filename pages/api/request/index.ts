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

  // Send a slack message to counselors.
  fetch(
    "https://hooks.slack.com/services/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",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: `${author} has requested office hours. Accept the office hours here: http://localhost:3000/claim/${id}`,
      }),
    }
  ).then(() => {
    res.statusCode = 200;
    res.json({ author, body, email, id });
  });
};
