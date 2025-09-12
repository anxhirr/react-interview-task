import { CategoryT, ItemT, JobCategoryT, JobT } from "@/db/types";

type JobsActionT = {
  data: (JobT & {
    jobCategories: (JobCategoryT & {
      category: CategoryT;
    })[];
    items: ItemT[];
  })[];
  pagination: PaginationT;
};

export type { JobsActionT };
