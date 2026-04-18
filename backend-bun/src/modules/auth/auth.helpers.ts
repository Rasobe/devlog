import { db } from "@/db";
import { users } from "@/db/schema";
import { generateUsername } from "@/lib/username";
import { eq } from "drizzle-orm";

export const resolveUniqueUsername = async (
  displayName: string,
): Promise<string> => {
  const base = generateUsername(displayName);

  const existing = await db.query.users.findFirst({
    where: eq(users.username, base),
  });

  if (!existing) return base;

  let username = "";
  let attempts = 0;

  do {
    const suffix = Math.floor(Math.random() * 9000) + 1000;
    username = `${base}${suffix}`;
    const taken = await db.query.users.findFirst({
      where: eq(users.username, username),
    });
    if (!taken) break;
    attempts++;
  } while (attempts < 10);

  return username;
};
