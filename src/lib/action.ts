"use server";

import client from "./mongodb";

const db = client.db("tic-tac-toe");

export async function getScores() {
  try {
    const scores = await db.collection("scores").find().toArray();
    return scores;
  } catch (e) {
    console.error(e);
  }
}
