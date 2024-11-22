import React from 'react';
import MatchDropdowns from './components/MatchDropdowns.tsx';
import ButtonsGrid from './components/ButtonsGrid.tsx';
import ScoreCard from './components/ScoreCard.tsx';
import StartMatch from './components/StartMatch.tsx';

const App: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 p-4 bg-gray-100 min-h-screen">
      <header className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Match Commentary</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Settings</button>
      </header>
      <MatchDropdowns />
      <div className="flex w-full gap-6">
        <ButtonsGrid />
        <ScoreCard matchId={'match1'} />
      </div>
      <StartMatch />
    </div>
  );
};

export default App;
