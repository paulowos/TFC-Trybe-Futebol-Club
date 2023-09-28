export interface CreationIMatch {
  homeTeamId: number;
  homeTeamGoals: number;
  awayTeamId: number;
  awayTeamGoals: number;
}
export default interface IMatch extends CreationIMatch {
  id: number;
  inProgress: boolean;
}
