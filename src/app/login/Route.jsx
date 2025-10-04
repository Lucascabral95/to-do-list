import mongo from "../../services/MongoDB";

export async function POST(req) {
  await mongo();
  const { email, password } = await req.json();
}