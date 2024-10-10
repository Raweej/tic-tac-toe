import { NextRequest, NextResponse } from "next/server";
import client from "@/lib/mongodb";
import { z } from "zod";
import { getSession } from "@auth0/nextjs-auth0";

const schema = z.object({
  username: z.string(),
  email: z.string(),
  score: z.number(),
});

export async function GET() {
  try {
    const db = client.db("tic-tac-toe");
    const score = await db
      .collection("scores")
      .find({})
      .sort({ score: -1 })
      .toArray();
    return NextResponse.json(score);
  } catch (e) {
    console.error(e);
  }
}

export async function POST(req: NextRequest) {
  const response = schema.safeParse(await req.json());
  if (!response.success) {
    return NextResponse.json({ message: response.error }, { status: 400 });
  }
  const { username, email, score } = response.data;

  // protect the route
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const db = client.db("tic-tac-toe");

  const foundUser = await db.collection("scores").findOne({ email });

  if (!foundUser) {
    await db.collection("scores").insertOne({ username, email, score });
    return NextResponse.json({ message: "success" });
  } else if (foundUser) {
    if (foundUser.score < score) {
      const id = foundUser._id;
      await db.collection("scores").updateOne(
        { _id: id },
        {
          $set: {
            score,
          },
        }
      );
      return NextResponse.json({ message: `success the id have upadated` });
    }

    return NextResponse.json({ message: "you have a lower score" });
  }
}
