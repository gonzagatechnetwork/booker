import { NextApiRequest, NextApiResponse } from "next";
import { q, client } from "../../lib/fauna";
import { v4 as uuid } from "uuid";
import { OfficeHoursRequest } from "../../lib/types";

async function createRequest(request: OfficeHoursRequest) {
  return client.query(
    q.Create(q.Collection("office_hours_requests"), {
      data: request,
    })
  );
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
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

  res.statusCode = 200;
  res.json({ author, body, email, id });
};
