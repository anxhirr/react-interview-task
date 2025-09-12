"use server";

import { db } from "@/db/instance";
import { item, job, jobCategory } from "@/db/schema";
import { JobT } from "@/db/types";
import { and, count, desc, eq, ilike } from "drizzle-orm";
import { JobsActionT } from "./types";

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

const getJobsAction = async (
  status: JobT["status"],
  params: QueryParamsT
): Promise<JobsActionT> => {
  const { page, limit, search } = params;
  const offset = (page - 1) * limit;

  const whereQuery = and(
    eq(job.status, status),
    ...(search ? [ilike(job.name, `%${search}%`)] : [])
  );

  const [totalResult] = await db
    .select({ count: count() })
    .from(job)
    .where(whereQuery);

  const total = totalResult.count;
  const totalPages = Math.ceil(total / limit);

  const data = await db.query.job.findMany({
    where: whereQuery,
    with: {
      jobCategories: {
        with: {
          category: true,
        },
      },
      items: true,
    },
    orderBy: [desc(job.createdAt)],
    limit,
    offset,
  });

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    },
  };
};

export { createJobAction, getJobAction, getJobsAction };
