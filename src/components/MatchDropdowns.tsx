import React, { useState } from "react";
import { useGetByTeamId } from "../query/cricketHooks";
import { useMatchStore } from "./useMatchStore";


const MatchDropdowns: React.FC = () => {

  const { data: batsMan, isLoading:batsmanLoading, error:batsmanError } = useGetByTeamId('team1');
  const { data: bowlers, isLoading:bowlersLoading, error:bowlersError } = useGetByTeamId('team2');

  const striker = useMatchStore((state) => state.stricker);
  const nonStriker = useMatchStore((state) => state.nonStricker);
  const bowler = useMatchStore((state) => state.bowler);
  const setStriker = useMatchStore((state) => state.setStricker);
  const setNonStriker = useMatchStore((state) => state.setNonStricker);
  const setBowler = useMatchStore((state) => state.setBowler);
  
  const setPlayer = (type: "striker" | "nonStriker" | "bowler", player: any) => {
    if (type === "striker") {
      setStriker(player);
    } else if (type === "nonStriker") {
      setNonStriker(player);
    } else if (type === "bowler") {
      setBowler(player);
    }
  };

  if (batsmanLoading || bowlersLoading) {
    return <div>Loading players...</div>;
  }

  if (batsmanError || bowlersError) {
    return <div>Error loading players: {batsmanError?.message || bowlersError?.message}</div>;
  }
  // Filter batsmen who are not out
  const availableBatsmen = batsMan?.filter((player) => !player.isOut);

  return (
    <div className="grid grid-cols-4 gap-4 items-center">
    {/* Striker Dropdown */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Batsman (Striker):</label>
      <select
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        value={striker?.name || ""}
        onChange={(e) => {
          const selectedPlayer = availableBatsmen?.find((player) => player.name === e.target.value);
          setPlayer("striker", selectedPlayer);
        }}
      >
        <option value="" disabled>
          Select Striker
        </option>
        {availableBatsmen
          ?.filter((batsman) => batsman.name !== nonStriker?.name) // Exclude the selected non-striker
          ?.map((batsman) => (
            <option key={batsman.name} value={batsman.name}>
              {batsman.name}
            </option>
          ))}
      </select>
    </div>

    {/* Non-Striker Dropdown */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Batsman (Non-Striker):</label>
      <select
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        value={nonStriker?.name || ""}
        onChange={(e) => {
          const selectedPlayer = availableBatsmen?.find((player) => player.name === e.target.value);
          setPlayer("nonStriker", selectedPlayer);
        }}
      >
        <option value="" disabled>
          Select Non-Striker
        </option>
        {availableBatsmen
          ?.filter((batsman) => batsman.name !== striker?.name) // Exclude the selected striker
          ?.map((batsman) => (
            <option key={batsman.name} value={batsman.name}>
              {batsman.name}
            </option>
          ))}
      </select>
    </div>

    {/* Bowler Dropdown */}
    <div>
      <label className="block text-sm font-medium text-gray-700">Bowler:</label>
      <select
        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
        value={bowler?.name || ""}
        onChange={(e) => {
          const selectedPlayer = bowlers?.find((player) => player.name === e.target.value);
          setPlayer("bowler", selectedPlayer);
        }}
      >
        <option value="" disabled>
          Select Bowler
        </option>
        {bowlers?.map((bowler) => (
          <option key={bowler.name} value={bowler.name}>
            {bowler.name}
          </option>
        ))}
      </select>
    </div>

    {/* Mute Button */}
    <button className="mt-6 px-4 py-2 bg-gray-500 text-white rounded">Mute & Text Off</button>
  </div>
);
};

export default MatchDropdowns;
