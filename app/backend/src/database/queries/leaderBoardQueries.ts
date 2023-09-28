const getAllHomeQuery = `
  WITH
    cte AS (
      SELECT
        t.team_name AS name,
        SUM(
          CASE
            WHEN m.home_team_goals > m.away_team_goals THEN 3
            WHEN m.home_team_goals = m.away_team_goals THEN 1
            ELSE 0
          END
        ) AS totalPoints,
        COUNT(*) AS totalGames,
        SUM(IF(m.home_team_goals > m.away_team_goals, 1, 0)) AS totalVictories,
        SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0)) AS totalDraws,
        SUM(IF(m.home_team_goals < m.away_team_goals, 1, 0)) AS totalLosses,
        SUM(m.home_team_goals) AS goalsFavor,
        SUM(m.away_team_goals) AS goalsOwn,
        SUM(m.home_team_goals - m.away_team_goals) AS goalsBalance
      FROM
        teams t
        INNER JOIN matches m ON t.id = m.home_team_id
      WHERE
        m.in_progress = false
      GROUP BY
        t.team_name
      ORDER BY
        totalPoints DESC,
        totalVictories DESC,
        goalsBalance DESC,
        goalsFavor DESC
    )
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
    ROUND((totalPoints / (totalGames * 3) * 100), 2) AS efficiency
  FROM
    cte;
`;

const getAllAwayQuery = `
  WITH
    cte AS (
      SELECT
        t.team_name AS name,
        SUM(
          CASE
            WHEN m.away_team_goals > m.home_team_goals THEN 3
            WHEN m.away_team_goals = m.home_team_goals THEN 1
            ELSE 0
          END
        ) AS totalPoints,
        COUNT(*) AS totalGames,
        SUM(IF(m.away_team_goals > m.home_team_goals, 1, 0)) AS totalVictories,
        SUM(IF(m.away_team_goals = m.home_team_goals, 1, 0)) AS totalDraws,
        SUM(IF(m.away_team_goals < m.home_team_goals, 1, 0)) AS totalLosses,
        SUM(m.away_team_goals) AS goalsFavor,
        SUM(m.home_team_goals) AS goalsOwn,
        SUM(m.away_team_goals - m.home_team_goals) AS goalsBalance
      FROM
        teams t
        INNER JOIN matches m ON t.id = m.away_team_id
      WHERE
        m.in_progress = false
      GROUP BY
        t.team_name
      ORDER BY
        totalPoints DESC,
        totalVictories DESC,
        goalsBalance DESC,
        goalsFavor DESC
    )
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
    ROUND((totalPoints / (totalGames * 3) * 100), 2) AS efficiency
  FROM
    cte;
`;

const getAllTotalQuery = `
  WITH
    cte1 AS (
      SELECT
        t.team_name AS name,
        SUM(
          CASE
            WHEN m.home_team_goals > m.away_team_goals THEN 3
            WHEN m.home_team_goals = m.away_team_goals THEN 1
            ELSE 0
          END
        ) AS totalPoints,
        COUNT(*) AS totalGames,
        SUM(IF(m.home_team_goals > m.away_team_goals, 1, 0)) AS totalVictories,
        SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0)) AS totalDraws,
        SUM(IF(m.home_team_goals < m.away_team_goals, 1, 0)) AS totalLosses,
        SUM(m.home_team_goals) AS goalsFavor,
        SUM(m.away_team_goals) AS goalsOwn,
        SUM(m.home_team_goals - m.away_team_goals) AS goalsBalance
      FROM
        teams t
        INNER JOIN matches m ON t.id = m.home_team_id
      WHERE
        m.in_progress = false
      GROUP BY
        t.team_name
    ),
    cte2 AS (
      SELECT
        t.team_name AS name,
        SUM(
          CASE
            WHEN m.away_team_goals > m.home_team_goals THEN 3
            WHEN m.away_team_goals = m.home_team_goals THEN 1
            ELSE 0
          END
        ) AS totalPoints,
        COUNT(*) AS totalGames,
        SUM(IF(m.away_team_goals > m.home_team_goals, 1, 0)) AS totalVictories,
        SUM(IF(m.away_team_goals = m.home_team_goals, 1, 0)) AS totalDraws,
        SUM(IF(m.away_team_goals < m.home_team_goals, 1, 0)) AS totalLosses,
        SUM(m.away_team_goals) AS goalsFavor,
        SUM(m.home_team_goals) AS goalsOwn,
        SUM(m.away_team_goals - m.home_team_goals) AS goalsBalance
      FROM
        teams t
        INNER JOIN matches m ON t.id = m.away_team_id
      WHERE
        m.in_progress = false
      GROUP BY
        t.team_name
    ),
    cte3 AS (
      SELECT
        c1.name AS name,
        c1.totalPoints + c2.totalPoints AS totalPoints,
        c1.totalGames + c2.totalGames AS totalGames,
        c1.totalVictories + c2.totalVictories AS totalVictories,
        c1.totalDraws + c2.totalDraws AS totalDraws,
        c1.totalLosses + c2.totalLosses AS totalLosses,
        c1.goalsFavor + c2.goalsFavor AS goalsFavor,
        c1.goalsOwn + c2.goalsOwn AS goalsOwn,
        c1.goalsBalance + c2.goalsBalance AS goalsBalance
      from
        cte1 c1
        JOIN cte2 c2 ON c1.name = c2.name
    )
  SELECT
    *,
    ROUND((c3.totalPoints / (c3.totalGames * 3) * 100), 2) AS efficiency
  from
    cte3 c3
  ORDER BY
    totalPoints DESC,
    totalVictories DESC,
    goalsBalance DESC,
    goalsFavor DESC
`;

export { getAllHomeQuery, getAllAwayQuery, getAllTotalQuery };
