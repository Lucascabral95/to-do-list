import { NextResponse } from "next/server";
import Client from "../../models/Client.jsx";
import mongo from "../../services/MongoDB.jsx";

export async function POST(req) {
    await mongo();
      const { email, password } = await req.json();
}