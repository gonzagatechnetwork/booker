import { NextApiRequest, NextApiResponse } from "next";
import { q, client } from "../../../lib/fauna";
import { OfficeHoursRequest, FaunaResponse } from "../../../lib/types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.statusCode = 404;
    return res.json({ message: "needs a get request" });
  }

  const { id } = req.query;
  if (!id) {
    res.statusCode = 400;
    return res.json({ message: "wtf" });
  }

  let ohRequest: FaunaResponse<OfficeHoursRequest>;
  try {
    ohRequest = await client.query<FaunaResponse<OfficeHoursRequest>>(
      q.Get(q.Match(q.Index("office_hours_requests_by_id"), id))
    );
  } catch (err) {
    console.error(err);
    res.statusCode = 404;
    return res.json({ message: "not found" });
  }

  if (!(ohRequest && ohRequest.data)) {
    res.statusCode = 404;
    return res.json({ message: "not found" });
  }

  res.statusCode = 200;
  res.json(ohRequest.data);
};
