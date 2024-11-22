const baseURL = "http://localhost:8800/backend/cricket";

class CricketApiService {
  async startMatch(matchId: string) {
    const response = await fetch(`${baseURL}/matches/start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ matchId }),
    });
    if (!response.ok) throw new Error("Failed to start match");
    return response.json();
  }

  async gameUpdate(data: any) {
    const response = await fetch(`${baseURL}/updateGameData`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data }),
    });
    if (!response.ok) throw new Error("Failed to start match");
    return response.json();
  }

  async getMatchData(matchId: string) {
    const response = await fetch(`${baseURL}/matches/${matchId}`);
    if (!response.ok) throw new Error("Failed to fetch match data");
    return response.json();
  }

  // Teams
  async getTeams() {
    const response = await fetch(`${baseURL}/teams`);
    if (!response.ok) throw new Error("Failed to fetch teams");
    return response.json();
  }

  async fetchPlayersByTeam(teamId: string) {
    const response = await fetch(
      `${baseURL}/players/getByTeamId?teamId=${teamId}`
    );
    if (!response.ok) throw new Error("Failed to fetch teams");
    return response.json();
  }

  async getTeamPlayers(teamId: string) {
    const response = await fetch(`${baseURL}/teams/${teamId}/players`);
    if (!response.ok)
      throw new Error(`Failed to fetch players for teamId: ${teamId}`);
    return response.json();
  }

  async createTeam(data: { teamId: string; name: string; players: string[] }) {
    const response = await fetch(`${baseURL}/teams`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create team");
    return response.json();
  }

  // Players
  async getPlayers() {
    const response = await fetch(`${baseURL}/players`);
    if (!response.ok) throw new Error("Failed to fetch players");
    return response.json();
  }

  async createPlayer(data: {
    playerId: string;
    name: string;
    teamId: string;
    role: string;
  }) {
    const response = await fetch(`${baseURL}/players`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create player");
    return response.json();
  }

  // Matches
  async getMatches() {
    const response = await fetch(`${baseURL}/matches`);
    if (!response.ok) throw new Error("Failed to fetch matches");
    return response.json();
  }

  async createMatch(data: {
    matchId: string;
    teams: { battingTeam: string; bowlingTeam: string };
    overs: number;
  }) {
    const response = await fetch(`${baseURL}/matches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create match");
    return response.json();
  }

  // Balls
  async getBalls() {
    const response = await fetch(`${baseURL}/balls`);
    if (!response.ok) throw new Error("Failed to fetch balls");
    return response.json();
  }

  async createBall(data: {
    ballId: string;
    matchId: string;
    overNumber: number;
    ballNumberInOver: number;
    batsman: string,
    nonStriker: string,
    bowler: string,
  }) {
    const response = await fetch(`${baseURL}/balls/createBall`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Failed to create ball");
    return response.json();
  }
}

export const cricketApiService = new CricketApiService();
