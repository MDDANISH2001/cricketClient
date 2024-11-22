import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { cricketApiService } from "./cricketInstance";

// Query keys
export const cricketQueryKeys = {
  teams: ["teams"],
  teamId: ["teamId"],
  teamPlayers: (teamId: string) => ["teams", teamId, "players"],
  players: ["players"],
  matches: ["matches"],
  balls: ["balls"],
};

interface IPlayer {
  _id: string;
  playerId: string;
  name: string;
  teamId: string;
  role: string;
  createdAt: string; // ISO string for date
  updatedAt: string; // ISO string for date
  isOut: boolean;
  stats: {
    batting: {
      runs: number;
      ballsFaced: number;
      fours: number;
      sixes: number;
      strikeRate: number;
    };
    bowling: {
      overs: number;
      maidens: number;
      runsConceded: number;
      wickets: number;
      noBalls: number;
      wides: number;
      economyRate: number;
    };
    fielding: {
      catches: number;
      stumpings: number;
    };
  };
  __v: number;
}

// Teams
export const useTeamsQuery = (options?: UseQueryOptions) =>
  useQuery({
    queryKey: cricketQueryKeys.teams,
    queryFn: () => cricketApiService.getTeams(),
    ...options,
    refetchOnWindowFocus: false,
  });

export const useGetByTeamId = (teamId: string) =>
  useQuery<IPlayer[]>({
    queryKey: [cricketQueryKeys.teamId, teamId],
    queryFn: () => cricketApiService.fetchPlayersByTeam(teamId || "team1"),
    refetchOnWindowFocus: false,
  });

export const useTeamPlayersQuery = (
  teamId: string,
  options?: UseQueryOptions
) =>
  useQuery({
    queryKey: cricketQueryKeys.teamPlayers(teamId),
    queryFn: () => cricketApiService.getTeamPlayers(teamId),
    ...options,
    enabled: !!teamId,
    refetchOnWindowFocus: false,
  });

export const useCreateTeamMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cricketApiService.createTeam,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cricketQueryKeys.teams });
    },
  });
};

export const useStartMatchMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (matchId: string) => cricketApiService.startMatch(matchId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cricketQueryKeys.balls });
    },
  });
};

export const useGameMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => cricketApiService.gameUpdate(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cricketQueryKeys.balls });
    },
  });
};

// Fetch Match Data Hook
export const useMatchDataQuery = (matchId: string) =>
  useQuery({
    queryKey: ["match", matchId],
    queryFn: () => cricketApiService.getMatchData(matchId),
    enabled: !!matchId, // Ensures the query runs only if matchId exists
    refetchOnWindowFocus: false,
  });

// Players
export const usePlayersQuery = (options?: UseQueryOptions) =>
  useQuery({
    queryKey: cricketQueryKeys.players,
    queryFn: () => cricketApiService.getPlayers(),
    ...options,
    refetchOnWindowFocus: false,
  });

export const useCreatePlayerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cricketApiService.createPlayer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cricketQueryKeys.players });
    },
  });
};

// Matches
export const useMatchesQuery = (options?: UseQueryOptions) =>
  useQuery({
    queryKey: cricketQueryKeys.matches,
    queryFn: () => cricketApiService.getMatches(),
    ...options,
    refetchOnWindowFocus: false,
  });

export const useCreateMatchMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cricketApiService.createMatch,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cricketQueryKeys.matches });
    },
  });
};

// Balls
export const useBallsQuery = (options?: UseQueryOptions) =>
  useQuery({
    queryKey: cricketQueryKeys.balls,
    queryFn: () => cricketApiService.getBalls(),
    ...options,
    refetchOnWindowFocus: false,
  });

export const useCreateBallMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: {
      ballId: string;
      matchId: string;
      overNumber: number;
      ballNumberInOver: number;
      batsman: string,
      nonStriker: string,
      bowler: string,
    }) => cricketApiService.createBall(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cricketQueryKeys.balls });
    },
  });
};
