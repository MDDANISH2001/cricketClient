import React, { useState } from 'react';
import { useStartMatchMutation } from '../query/cricketHooks';

const StartMatch: React.FC<{}> = ({}) => {
  // Call the hook to get the mutation function and state
  const { mutate: startMatchMutation , isPending} = useStartMatchMutation();
  const [matchId, setMatchId] = useState<string>("match1"); // Default starting value is "match1"

  // Handle the start match button click
  const handleStartMatch = () => {
    startMatchMutation(matchId, {
      onSuccess: () => {
        alert("Match started successfully");
      },
      onError: (error: any) => {
        alert("Failed to start match");
        console.error(error);
      },
    });
  };

  return (
    <button
      onClick={handleStartMatch}
      className="bg-blue-500 text-white px-4 py-2 rounded"
      disabled={isPending} // Disable button during mutation
    >
      {isPending ? "Starting..." : "Start Match"}
    </button>
  );
};

export default StartMatch;
