export const handleBallStart = (
  striker: any,
  nonStricker: any,
  bowler: any,
  mutateBall: (body: { ballId: string; matchId: string; overNumber: number; ballNumberInOver: number; runs: number, striker: string, nonStricker: string, bowler: string, }) => void,
  matchId: string,
  overs: number,
  ballsInCurrentOver: number,
) => {
  // Generate ballId dynamically
  const ballId = `ball${overs * 6 + ballsInCurrentOver}`;

  // Construct the body object
  const body = {
    ballId, // e.g., "ball7" for the 7th ball (overs * 6 + ballsInCurrentOver)
    matchId,
    overNumber: overs,
    ballNumberInOver: ballsInCurrentOver,
    batsman: striker?.name as string,
    nonStriker: nonStricker?.name as string,
    bowler: bowler?.name as string
  };
  console.log('body before mutation:', body);

  // Call mutateBall with the constructed body
  mutateBall(body);
};

export const handleAddRun = async (
  mutateGame: (payload: any) => void, // Function to send data to the backend
  striker: any, // Striker's player object
  bowler: any, // Bowler's player object
  runs: number, // Runs scored
  matchDetails: any, // Match ID
  isWide = false, // Indicates if the ball is a wide
  nonStriker: any, // Non-striker's player object
  ballDetails:any[]
) => {
  try {
    // Generate ballId dynamically
    // const ballId = `ball_${Date.now()}`;

    // Prepare ball data
    console.log('ballDetails?.slice(-1)?.[0]?.ballId :', ballDetails?.slice(-1)?.[0]?.ballId);
    const ballData = {
      ballId: ballDetails?.slice(-1)?.[0]?.ballId,
      matchId: matchDetails?.matchId,
      overNumber: 10, // Replace with actual over number
      ballNumberInOver: 3, // Replace with actual ball number
      batsman: isWide ? null : striker?.name,
      nonStriker: isWide ? null : nonStriker?.name,
      bowler: bowler?.name,
      runs: isWide ? 0 : runs, // Runs for the ball (0 for wides)
      extras: isWide ? { type: "Wide", runs } : null,
    };

    // Update match data
    console.log('matchDetails :', matchDetails);
    const matchUpdate = {
      matchId: matchDetails?.matchId,
      currentScore: {
        runs: isWide
          ? matchDetails?.currentScore?.runs + runs
          : matchDetails?.currentScore?.runs + runs,
        wickets: matchDetails?.currentScore?.wickets, // No wicket falls here
        overs: matchDetails?.currentScore?.overs,
        ballsInCurrentOver: isWide
          ? matchDetails?.currentScore?.ballsInCurrentOver
          : matchDetails?.currentScore?.ballsInCurrentOver + 1,
      },
      extras: isWide
        ? {
            ...matchDetails?.extras,
            wides: matchDetails?.extras?.wides + 1,
          }
        : matchDetails?.extras,
    };

    // Update striker stats
    const strikerUpdate = isWide
      ? null
      : {
          playerId: striker?.playerId,
          stats: {
            batting: {
              runs: striker?.stats?.batting?.runs + runs,
              ballsFaced: striker?.stats?.batting?.ballsFaced + 1,
              fours:
                runs === 4
                  ? striker?.stats?.batting?.fours + 1
                  : striker?.stats?.batting?.fours,
              sixes:
                runs === 6
                  ? striker?.stats?.batting?.sixes + 1
                  : striker?.stats?.batting?.sixes,
              strikeRate:
                ((striker?.stats?.batting?.runs + runs) /
                  (striker?.stats?.batting?.ballsFaced + 1)) *
                100,
            },
          },
        };

    // Update bowler stats
    const bowlerUpdate = {
      playerId: bowler?.playerId,
      stats: {
        bowling: {
          runsConceded: bowler?.stats?.bowling?.runsConceded + runs,
          wides: isWide ? bowler?.stats?.bowling?.wides + 1 : bowler?.stats?.bowling?.wides,
          overs: isWide
            ? bowler?.stats?.bowling?.overs
            : Math.floor((matchDetails?.currentScore?.ballsInCurrentOver + 1) / 6),
          economyRate: (bowler?.stats?.bowling?.runsConceded + runs) /
            Math.max(1, Math.floor((matchDetails?.currentScore?.ballsInCurrentOver + 1) / 6)),
        },
      },
    };

    // Construct payload
    const payload = {
      ball: ballData,
      match: matchUpdate,
      batsman: strikerUpdate,
      bowler: bowlerUpdate,
    };
    console.log('payload :', payload);

    // Send the payload to the backend
    await mutateGame(payload);
  } catch (error) {
    console.error("Error updating game data:", error);
  }
};

export const handleWicket = () => {
  throw new Error("Function not implemented.");
}

export const handleNoBall = () => {
  throw new Error("Function not implemented.");
}

export const handleBowlerStop = () => {
  throw new Error("Function not implemented.");
}

export const handleRunDecide = () => {
  throw new Error("Function not implemented.");
}

export const handleBallAir = () => {
  throw new Error("Function not implemented.");
}

export const handleOthers = () => {
  throw new Error("Function not implemented.");
}

export const handleBounrdyCheck = () => {
  throw new Error("Function not implemented.");
}

export const handleApeal = () => {
  throw new Error("Function not implemented.");
}

export const handleMisField = () => {
  throw new Error("Function not implemented.");
}

export const handleBye = () => {
  throw new Error("Function not implemented.");
}

export const handleThirdUmpire = () => {
  throw new Error("Function not implemented.");
}

export const handleReview = () => {
  throw new Error("Function not implemented.");
}

export const handleDone = () => {
  throw new Error("Function not implemented.");
}

export const handleOverthrow = () => {
  throw new Error("Function not implemented.");
}
