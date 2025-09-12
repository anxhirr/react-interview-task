"use server";

import { db } from "@/db/instance";
import { item, job, jobCategory } from "@/db/schema";
import { JobT } from "@/db/types";
import { eq } from "drizzle-orm";

const createJobAction = async (jobData: {
  name: string;
  status: JobT["status"];
  categoryIds: string[];
}) =>
  await db.transaction(async (tx) => {
    // Create the job
    const [newJob] = await tx
      .insert(job)
      .values({
        name: jobData.name,
        status: jobData.status,
      })
      .returning();

    // Create job-category relationships
    await tx.insert(jobCategory).values(
      jobData.categoryIds.map((categoryId) => ({
        jobId: newJob.id,
        categoryId: categoryId,
      }))
    );
  });

const getJobAction = async (jobId: string) => {
  const data = await db.query.job.findFirst({
    where: eq(job.id, jobId),
    with: {
      jobCategories: {
        with: {
          category: {
            with: {
              items: {
                where: eq(item.jobId, jobId),
              },
            },
          },
        },
      },
    },
  });
  return data;
};

const getJobsAction = async (status: JobT["status"]) => {
  const data = await db.query.job.findMany({
    where: eq(job.status, status),
    with: {
      jobCategories: {
        with: {
          category: true,
        },
      },
      items: true,
    },
  });
  return data;
};

const getCategoriesAction = async () => {
  const data = await db.query.category.findMany({
    orderBy: (categories, { asc }) => [asc(categories.name)],
  });
  return data;
};

export { createJobAction, getCategoriesAction, getJobAction, getJobsAction };
