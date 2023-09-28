const matches = [
  {
    id: 1,
    homeTeamId: 16,
    homeTeamGoals: 1,
    awayTeamId: 8,
    awayTeamGoals: 1,
    inProgress: false,
    homeTeam: {
      teamName: 'São Paulo',
    },
    awayTeam: {
      teamName: 'Grêmio',
    },
  },
  {
    id: 41,
    homeTeamId: 16,
    homeTeamGoals: 2,
    awayTeamId: 9,
    awayTeamGoals: 0,
    inProgress: true,
    homeTeam: {
      teamName: 'São Paulo',
    },
    awayTeam: {
      teamName: 'Internacional',
    },
  },
];

const matchesInProgress = [matches[1]];
const matchesNotInProgress = [matches[0]];

const matchFromDb = {
  id: 1,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 8,
  awayTeamGoals: 2,
  inProgress: true,
};

const matchRequest = {
  homeTeamId: 16,
  awayTeamId: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

const matchRequestSameId = {
  homeTeamId: 8,
  awayTeamId: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2,
};

export {
  matches,
  matchesInProgress,
  matchesNotInProgress,
  matchFromDb,
  matchRequest,
  matchRequestSameId,
};
