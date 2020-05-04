import { NextApiRequest, NextApiResponse } from "next";
import { q, client } from "../../lib/fauna";
import { OfficeHoursRequest, FaunaResponse, Claim } from "../../lib/types";
import sgMail from "@sendgrid/mail";

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
    q.Update(q.Ref(q.Collection("office_hours_requests"), ohRequest.ref.id), {
      data: { claimedBy: author },
    })
  );

  // In production, email the two
  if (process.env.NODE_ENV === "production") {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    sgMail.send({
      to: email,
      // Split up to avoid spammers on github, please keep it like this.
      from: "evan" + "@" + "room" + "service" + ".dev",
      cc: ohRequest.data?.email,
      subject: `Office Hours with ${ohRequest.data.author}!`,
      html: `
<p>Hey ${author}, meet ${ohRequest.data.author}. </p>

<p>${ohRequest.data.author} is requesting office hours with 
the following message:</p>

<p><pre>
${ohRequest.data.body}
</pre></p>

<p>I'll leave it to you two to schedule something!</p>

<p>Sincerely,<p>
McBeepBoop, the GTN Office Hours Booker Bot
      `.trim(),
    });
  }

  res.statusCode = 200;
  res.json({ author, email, requestID });
};
