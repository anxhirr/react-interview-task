"use server";

import { db } from "@/db/instance";

const getCategoriesAction = async () => {
  const data = await db.query.category.findMany({
    orderBy: (categories, { asc }) => [asc(categories.name)],
  });
  return data;
};

export { getCategoriesAction };
