export type JobSiteT = {
  id: string;
  name: string;
  status: "In Progress" | "Completed" | "On Hold";
  categories: CategoryT[];
};

export type CategoryT = {
  id: string;
  name: "Sidewalk Shed" | "Scaffold" | "Shoring";
  items: InventoryItemT[];
};

export type InventoryItemT = {
  id: string;
  name: string;
  description: string;
  quantity: number;
  notes: string;
};
