import { relations } from "drizzle-orm/relations";
import { category, item, job, jobCategory } from "./schema";

export const itemRelations = relations(item, ({one}) => ({
	category: one(category, {
		fields: [item.categoryId],
		references: [category.id]
	}),
	job: one(job, {
		fields: [item.jobId],
		references: [job.id]
	}),
}));

export const categoryRelations = relations(category, ({many}) => ({
	items: many(item),
	jobCategories: many(jobCategory),
}));

export const jobRelations = relations(job, ({many}) => ({
	items: many(item),
	jobCategories: many(jobCategory),
}));

export const jobCategoryRelations = relations(jobCategory, ({one}) => ({
	category: one(category, {
		fields: [jobCategory.categoryId],
		references: [category.id]
	}),
	job: one(job, {
		fields: [jobCategory.jobId],
		references: [job.id]
	}),
}));