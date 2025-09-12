import { ItemT } from "@/db/types";

type ItemsActionT = {
  data: ItemT[];
  pagination: PaginationT;
};

export type { ItemsActionT };
