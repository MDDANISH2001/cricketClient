import { create } from 'zustand';

interface MatchStore{
    matchData: any;
    setMatchData: (matchData: any) => void;
    ballData: any[];
    setBallData: (ballData: any[]) => void;
    stricker: any;
    setStricker: (stricker: any) => void;
    nonStricker: any;
    setNonStricker: (nonStricker: any) => void;
    bowler: any;
    setBowler: (bowler: any) => void;
}

export const useMatchStore = create<MatchStore>((set) => ({
    matchData: {},
    setMatchData: (matchData: any) => set({ matchData: matchData}),
    ballData: [],
    setBallData: (ballData: any[]) => set({ ballData: ballData }),
    stricker: {},
    setStricker: (stricker: any) => set({ stricker: stricker }),
    nonStricker: {},
    setNonStricker: (nonStricker: any) => set({ nonStricker: nonStricker }),
    bowler: {},
    setBowler: (bowler: any) => set({ bowler: bowler }),
}))