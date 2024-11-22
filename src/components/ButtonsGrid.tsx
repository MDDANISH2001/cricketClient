import React from "react";
import {
  handleBallStart,
  handleAddRun,
  handleApeal,
  handleBallAir,
  handleBounrdyCheck,
  handleBowlerStop,
  handleBye,
  handleDone,
  handleMisField,
  handleNoBall,
  handleOthers,
  handleOverthrow,
  handleReview,
  handleRunDecide,
  handleThirdUmpire,
  handleWicket,
} from "./buttonsGrid";
import { useMatchStore } from "./useMatchStore";
import { useCreateBallMutation, useGameMutation } from "../query/cricketHooks";

const ButtonsGrid: React.FC = () => {
  const matchDetails = useMatchStore((state) => state.matchData);
  const ballsDetails = useMatchStore((state) => state.ballData);
  console.log("matchDetails in buttoncomponent. :", matchDetails);
  const striker = useMatchStore((state) => state.stricker);
  const nonStriker = useMatchStore((state) => state.nonStricker);
  const bowler = useMatchStore((state) => state.bowler);

  const { mutate: mutateBall } = useCreateBallMutation();
  const { mutate: mutateGame } = useGameMutation();

  console.log('!ballsDetails?.slice(-1)?.[0]?.extras :', ballsDetails?.slice(-1));
  const buttonData = [
    {
      disable:
        !Object.keys(striker).length ||
        !Object.keys(nonStriker).length ||
        !Object.keys(bowler).length || !ballsDetails?.slice(-1)?.[0]?.extras,
      name: "Ball Start",
      color: "bg-green-600",
      func: () =>
        handleBallStart(
          striker,
          nonStriker,
          bowler,
          mutateBall,
          matchDetails?.matchId,
          matchDetails?.currentScore?.overs,
          matchDetails?.currentScore?.ballsInCurrentOver
        ),
    },
    {
      disable: false,
      name: "0",
      color: "bg-blue-500",
      func: () =>
        handleAddRun(
          mutateGame,
          striker,
          bowler,
          0,
          matchDetails,
          false,
          nonStriker,
          ballsDetails,
        ),
    },
    {
      disable: false,
      name: "1",
      color: "bg-blue-800",
      func: () =>
        handleAddRun(
          mutateGame,
          striker,
          bowler,
          1,
          matchDetails,
          false,
          nonStriker,
          ballsDetails
        ),
    },
    {
      disable: false,
      name: "Wicket",
      color: "bg-red-500",
      func: () => handleWicket(),
    },
    {
      disable: false,
      name: "Wide",
      color: "bg-orange-500",
      func: () =>
        handleAddRun(
          mutateGame,
          striker,
          bowler,
          1,
          matchDetails,
          true,
          nonStriker,
          ballsDetails
        ),
    },
    {
      disable: false,
      name: "No Ball",
      color: "bg-blue-300",
      func: () => handleNoBall(),
    },
    {
      disable: false,
      name: "2",
      color: "bg-gray-300",
      func: () =>
        handleAddRun(
          mutateGame,
          striker,
          bowler,
          2,
          matchDetails,
          false,
          nonStriker,
          ballsDetails
        ),
    },
    {
      disable: false,
      name: "6",
      color: "bg-gray-500",
      func: () =>
        handleAddRun(
          mutateGame,
          striker,
          bowler,
          6,
          matchDetails,
          false,
          nonStriker,
          ballsDetails
        ),
    },
    {
      disable: false,
      name: "4",
      color: "bg-green-300",
      func: () =>
        handleAddRun(
          mutateGame,
          striker,
          bowler,
          4,
          matchDetails,
          false,
          nonStriker,
          ballsDetails
        ),
    },
    {
      disable: false,
      name: "Bowler Stop",
      color: "bg-purple-500",
      func: () => handleBowlerStop(),
    },
    {
      disable: false,
      name: "1 or 2",
      color: "bg-purple-700",
      func: () => handleRunDecide(),
    },
    {
      disable: false,
      name: "2 or 4",
      color: "bg-purple-900",
      func: () => handleRunDecide(),
    },
    {
      disable: false,
      name: "4 or 6",
      color: "bg-yellow-500",
      func: () => handleRunDecide(),
    },
    {
      disable: false,
      name: "Ball In Air",
      color: "bg-indigo-500",
      func: () => handleBallAir(),
    },
    {
      disable: false,
      name: "Others",
      color: "bg-slate-700",
      func: () => handleOthers(),
    },
    {
      disable: false,
      name: "3",
      color: "bg-indigo-800",
      func: () =>
        handleAddRun(
          mutateGame,
          striker,
          bowler,
          3,
          matchDetails,
          false,
          nonStriker,
          ballsDetails
        ),
    },
    {
      disable: false,
      name: "Boundry Check",
      color: "bg-slate-700",
      func: () => handleBounrdyCheck(),
    },
    {
      disable: false,
      name: "Apeal",
      color: "bg-slate-500",
      func: () => handleApeal(),
    },
    {
      disable: false,
      name: "Catch Drop",
      color: "bg-slate-500",
      func: () => handleMisField(),
    },
    {
      disable: false,
      name: "Leg Bye",
      color: "bg-cyan-500",
      func: () => handleBye(),
    },
    {
      disable: false,
      name: "Bye",
      color: "bg-green-500",
      func: () => handleBye(),
    },
    {
      disable: false,
      name: "Third Umpire",
      color: "bg-slate-500",
      func: () => handleThirdUmpire(),
    },
    {
      disable: false,
      name: "Review",
      color: "bg-red-500",
      func: () => handleReview(),
    },
    {
      disable: false,
      name: "Done",
      color: "bg-green-800",
      func: () => handleDone(),
    },
    {
      disable: false,
      name: "Misfiled",
      color: "bg-slate-700",
      func: () => handleMisField(),
    },
    {
      disable: false,
      name: "Overthrow",
      color: "bg-indigo-600",
      func: () => handleOverthrow(),
    },
    {
      disable: false,
      name: "Wicket Confirm",
      color: "bg-red-500",
      func: () => handleWicket(),
    },
  ];

  return (
    <div className="grid grid-cols-4 gap-4 w-3/4 bg-slate">
      {buttonData.map((button, index) => (
        <button
          key={index}
          className={`p-4 text-white text-center font-medium rounded ${button.color}`}
          onClick={button.func}
          disabled={button.disable}
        >
          {button.name}
        </button>
      ))}
    </div>
  );
};

export default ButtonsGrid;
