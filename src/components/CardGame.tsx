"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useUser } from "@auth0/nextjs-auth0/client";

import Image from "next/image";
import TicTacToeGame from "./tictactoe/TicTacToeGame";
import { Button } from "./ui/button";
import Leaderboard from "./tictactoe/LeaderBoard";

export default function CardGame() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user) {
    return (
      <div className="grid gap-5">
        <h1 className="text-4xl font-bold">Tic-Tac-Toe Challenge</h1>
        <Button
          className="w-fit justify-self-center"
          onClick={() => {
            window.location.href = "/api/auth/login";
          }}>
          Login
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap w-full justify-center gap-10 md: mt-10">
      <Card className="w-full h-fit min-h-96 max-w-96  overflow-hidden">
        <CardHeader className="bg-slate-400">
          <CardTitle className=" text-center">Tic Tac Toe</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-5 pt-5">
          <div className="flex items-center gap-2">
            <Image
              src={user.picture || "/logo.png"}
              alt="Profile Picture"
              width={30}
              height={30}
              className="rounded-full"
            />
            <p>{user.nickname}</p>
          </div>

          <TicTacToeGame />
        </CardContent>
      </Card>
      <Leaderboard />
    </div>
  );
}
