export const useLeaderboard = () => {
  const updateLeaderboard = async ({ username, email, score }: any) => {
    try {
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        body: JSON.stringify({ username, email, score }),
      });
      if (!response.ok) {
        console.error("Failed to update leaderboard");
      }
    } catch (error) {
      console.error("An error occurred while updating leaderboard:", error);
    }
  };

  return { updateLeaderboard };
};
