import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  uuid,
  timestamp,
  text,
  boolean,
  bigint,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["AUTHOR", "ADMIN"]);

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  displayName: text("display_name").notNull(),
  role: userRoleEnum("role").default("AUTHOR").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  excerpt: text("excerpt").notNull(),
  published: boolean("published").default(false).notNull(),
  authorId: uuid("author_id")
    .references(() => users.id)
    .notNull(),
  views: bigint("views", { mode: "number" }).default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const userRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const postRelations = relations(posts, ({ one }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id],
  }),
}));
