export type JobSiteT = {
  id: string;
  name: string;
  status: "in_progress" | "completed" | "on_hold";
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
