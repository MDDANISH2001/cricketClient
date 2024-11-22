import React, { useEffect } from 'react';
import { useBallsQuery, useMatchDataQuery } from '../query/cricketHooks';
import { useMatchStore } from './useMatchStore';


const ScoreCard: React.FC<{ matchId: string }> = ({ matchId }) => {
  const { data: match, isLoading, error } = useMatchDataQuery(matchId);
  const { data: balls, isLoading: ballsLoading, isError: ballsError } = useBallsQuery();
  console.log('balls :', balls);

  console.log('match :', match);
  
  const setMatchDetails = useMatchStore((state) => state.setMatchData);
  const setBallsDetails = useMatchStore((state) => state.setBallData);
  
  useEffect(() => {
    if (match) {
      setMatchDetails(match);
    }
    if(balls){
      setBallsDetails(balls)
    }
  }, [match, setMatchDetails]);

  if (isLoading) return <div>Loading match data...</div>;
  if (error) return <div>Error loading match data</div>;


  return (
    <div className="bg-white p-4 shadow rounded w-1/4">
      <h2 className="text-lg font-bold mb-2">Scorecard</h2>
      <div className="text-sm mb-4">
        <p>
          <strong>Batting Team:</strong> {match?.teams?.battingTeam}
        </p>
        <p>
          <strong>Bowling Team:</strong> {match?.teams?.bowlingTeam}
        </p>
        <p>
          <strong>Runs:</strong> {match?.currentScore?.runs}
        </p>
        <p>
          <strong>Wickets:</strong> {match?.currentScore?.wickets}
        </p>
        <p>
          <strong>Overs:</strong> {match?.currentScore?.overs}
        </p>
      </div>
    </div>
  );
};

export default ScoreCard;
