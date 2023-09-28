const getAllHomeQuery = `
      WITH cte AS(
        SELECT 
          t.team_name as name,
          SUM(CASE
                WHEN m.home_team_goals > m.away_team_goals THEN 3
                WHEN m.home_team_goals = m.away_team_goals THEN 0
                ELSE 1
              END) as totalPoints,
          COUNT(*) as totalGames,
          SUM( IF(m.home_team_goals > m.away_team_goals, 1, 0) ) as totalVictories,
          SUM( IF( m.home_team_goals = m.away_team_goals, 1, 0) ) as totalDraws,
          SUM( IF( m.home_team_goals < m.away_team_goals, 1, 0) ) as totalLosses,
          SUM (m.home_team_goals) as goalsFavor,
          SUM ( m.away_team_goals) as goalsOwn,
          SUM(m.home_team_goals - m.away_team_goals) as goalsBalance
        FROM teams t
        INNER JOIN matches m
        ON t.id = m.home_team_id 
        WHERE m.in_progress=false
        GROUP BY t.team_name
        ORDER BY totalVictories DESC, goalsBalance DESC, goalsFavor DESC)
      SELECT 
        name,
        totalPoints,
        totalGames,
        totalVictories,
        totalDraws,
        totalLosses,
        goalsFavor,
        goalsOwn,
        goalsBalance,
        ROUND((totalPoints / (totalGames * 3) * 100), 2) as efficiency 
      FROM cte;
`;

export default getAllHomeQuery;
