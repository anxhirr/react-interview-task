import { pgTable, uuid, timestamp, text, foreignKey, doublePrecision, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const jobStatus = pgEnum("JOB_STATUS", ['in_progress', 'on_hold', 'completed'])


export const category = pgTable("category", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: text().notNull(),
});

export const item = pgTable("item", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: text().notNull(),
	quantity: doublePrecision().notNull(),
	description: text().notNull(),
	notes: text(),
	jobId: uuid("job_id").notNull(),
	categoryId: uuid("category_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [category.id],
			name: "item_categoryId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.jobId],
			foreignColumns: [job.id],
			name: "item_jobId_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const jobCategory = pgTable("job_category", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	jobId: uuid("job_id").notNull(),
	categoryId: uuid("category_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.categoryId],
			foreignColumns: [category.id],
			name: "job_category_category_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
	foreignKey({
			columns: [table.jobId],
			foreignColumns: [job.id],
			name: "job_category_job_id_fkey"
		}).onUpdate("cascade").onDelete("cascade"),
]);

export const job = pgTable("job", {
	id: uuid().defaultRandom().primaryKey().notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow().notNull(),
	name: text().notNull(),
	status: jobStatus().notNull(),
});
