import { query as q, Client } from "faunadb";

// This secret is to the development db of Fauna
// it's not a live secret. chill. it's all good, deep breaths.
const DEV_SECRET = "fnADq-QoIkACCSsStFqCMYW5Dwtm96Cdm5tdKjoR";

const client = new Client({ secret: process.env.FAUNA_SECRET || DEV_SECRET });

export { client, q };
