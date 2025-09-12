import { createSelectSchema } from "drizzle-zod";
import z from "zod";
import { category, item, job, jobCategory } from "./schema";

const jobSchema = createSelectSchema(job);
type JobT = z.infer<typeof jobSchema>;

const categorySchema = createSelectSchema(category);
type CategoryT = z.infer<typeof categorySchema>;

const jobCategorySchema = createSelectSchema(jobCategory);
type JobCategoryT = z.infer<typeof jobCategorySchema>;

const itemSchema = createSelectSchema(item);
type ItemT = z.infer<typeof itemSchema>;

export type { CategoryT, ItemT, JobCategoryT, JobT };
