"use server";

import { db } from "@/db/instance";
import { item } from "@/db/schema";
import { ItemT } from "@/db/types";
import { and, count, desc, eq } from "drizzle-orm";

const createItemAction = async (data: Omit<ItemT, "id" | "createdAt">) =>
  await db.insert(item).values(data).returning();

const updateItemAction = async (
  id: string,
  data: Omit<ItemT, "id" | "createdAt" | "jobId" | "categoryId">
) => await db.update(item).set(data).where(eq(item.id, id));

const getItemsAction = async (
  { categoryId, jobId }: { categoryId: string; jobId: string },
  params: PaginationParamsT
): Promise<{ data: ItemT[]; pagination: PaginationT }> => {
  const { page, limit } = params;
  const offset = (page - 1) * limit;

  const whereQuery = and(
    eq(item.categoryId, categoryId),
    eq(item.jobId, jobId)
  );

  const [data, [totalResult]] = await Promise.all([
    db.query.item.findMany({
      where: whereQuery,
      orderBy: [desc(item.createdAt)],
      limit,
      offset,
    }),
    db.select({ count: count() }).from(item).where(whereQuery),
  ]);

  const total = totalResult.count;
  const totalPages = Math.ceil(total / limit);
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

export { createItemAction, getItemsAction, updateItemAction };
