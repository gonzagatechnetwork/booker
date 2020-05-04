import { NextApiRequest, NextApiResponse } from "next";
import { q, client } from "../../lib/fauna";
import { OfficeHoursRequest, FaunaResponse, Claim } from "../../lib/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { author, email, requestID } = req.body;
  if (!author || !email || !requestID) {
    throw new Error("Bad req body in /api/confirm");
  }

  // Get the office hours request
  const ohRequest = await client.query<FaunaResponse<OfficeHoursRequest>>(
    q.Get(q.Match(q.Index("office_hours_requests_by_id"), requestID))
  );

  // If it doesn't exist, then return 404
  if (!ohRequest || !ohRequest.data) {
    res.statusCode = 404;
    res.json({ message: "This office hours request doesn't exist anymore!" });
  }

  // Otherwise update the record with the claimer
  await client.query(
    q.Update(q.Ref(q.Collection("office_hours_requests"), ohRequest.ref), {
      data: { claimedBy: author },
    })
  );

  // TODO: email the pair

  res.statusCode = 200;
  res.json({ author, email, requestID });
};
