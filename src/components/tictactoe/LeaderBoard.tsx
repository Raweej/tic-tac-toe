"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { LeaderScore } from "@/types/tic-tac-toe.types";

const Leaderboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [leaderboard, setLeaderboard] = useState<LeaderScore[]>([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await fetch("/api/leaderboard");
      const data = await response.json();
      setLeaderboard(data);
      setIsLoading(false);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Leaderboard</h2>
      <Table className="block h-[400px]">
        <TableHeader className="overflow-y-auto">
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Score</TableHead>
          </TableRow>
        </TableHeader>
        {isLoading ? (
          <TableBody>
            <TableRow>
              <TableCell>Loading...</TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {leaderboard.map((entry, index) => (
              <TableRow key={entry.username}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{entry.username}</TableCell>
                <TableCell>{entry.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default Leaderboard;
