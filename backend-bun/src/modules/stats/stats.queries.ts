import { sql } from "drizzle-orm";

export const buildActivityQuery = (
  period: number,
  userId: string,
  isAdmin: boolean,
) => sql`
  WITH months AS (
    SELECT generate_series(
      date_trunc('month', now() - (${period} * interval '1 month')),
      date_trunc('month', now()),
      '1 month'::interval
    ) AS month_date
  )
  SELECT
    to_char(m.month_date, 'YYYY-MM') AS month,
    COALESCE(COUNT(p.id), 0)::int    AS count
  FROM months m
  LEFT JOIN posts p
    ON date_trunc('month', p.created_at) = m.month_date
    ${isAdmin ? sql`` : sql`AND p.author_id = ${userId}`}
  GROUP BY m.month_date
  ORDER BY m.month_date ASC
`;
