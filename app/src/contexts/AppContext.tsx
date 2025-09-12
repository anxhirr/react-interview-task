"use client";

import { InventoryItemT, JobSiteT } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

type AppContextType = {
  jobSites: JobSiteT[];
  addJobSite: (jobSite: Omit<JobSiteT, "id">) => void;
  updateInventoryItem: (
    jobSiteId: string,
    categoryId: string,
    item: InventoryItemT
  ) => void;
  addInventoryItem: (
    jobSiteId: string,
    categoryId: string,
    item: Omit<InventoryItemT, "id">
  ) => void;
  deleteInventoryItem: (
    jobSiteId: string,
    categoryId: string,
    itemId: string
  ) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data for initial state
const mockJobSites: JobSiteT[] = [
  {
    id: "1",
    name: "Downtown Construction",
    status: "in_progress",
    categories: [
      {
        id: "cat-1",
        name: "Sidewalk Shed",
        items: [
          {
            id: "item-1",
            name: "Steel Beams",
            description: "Heavy duty steel beams for structural support",
            quantity: 25,
            notes: "Delivered on site, ready for installation",
          },
          {
            id: "item-2",
            name: "Plywood Sheets",
            description: "4x8 plywood sheets for flooring",
            quantity: 50,
            notes: "Check for water damage before use",
          },
        ],
      },
      {
        id: "cat-2",
        name: "Scaffold",
        items: [
          {
            id: "item-3",
            name: "Scaffold Pipes",
            description: "Standard scaffold pipes 6ft length",
            quantity: 100,
            notes: "Regular inspection required",
          },
          {
            id: "item-4",
            name: "Base Plates",
            description: "Heavy duty base plates for scaffold foundation",
            quantity: 30,
            notes: "Store in dry location",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Highway Bridge Project",
    status: "on_hold",
    categories: [
      {
        id: "cat-3",
        name: "Shoring",
        items: [
          {
            id: "item-5",
            name: "Hydraulic Jacks",
            description: "Heavy duty hydraulic jacks for lifting",
            quantity: 8,
            notes: "Maintenance due next month",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "Residential Complex",
    status: "completed",
    categories: [
      {
        id: "cat-4",
        name: "Sidewalk Shed",
        items: [
          {
            id: "item-6",
            name: "Safety Barriers",
            description: "Orange safety barriers for pedestrian protection",
            quantity: 15,
            notes: "Some wear and tear, check before next use",
          },
        ],
      },
    ],
  },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [jobSites, setJobSites] = useState<JobSiteT[]>(mockJobSites);

  const addJobSite = (jobSiteData: Omit<JobSiteT, "id">) => {
    const newJobSite: JobSiteT = {
      ...jobSiteData,
      id: Date.now().toString(),
    };
    setJobSites((prev) => [...prev, newJobSite]);
  };

  const updateInventoryItem = (
    jobSiteId: string,
    categoryId: string,
    item: InventoryItemT
  ) => {
    setJobSites((prev) =>
      prev.map((jobSite) => {
        if (jobSite.id !== jobSiteId) return jobSite;

        return {
          ...jobSite,
          categories: jobSite.categories.map((category) => {
            if (category.id !== categoryId) return category;

            return {
              ...category,
              items: category.items.map((existingItem) =>
                existingItem.id === item.id ? item : existingItem
              ),
            };
          }),
        };
      })
    );
  };

  const addInventoryItem = (
    jobSiteId: string,
    categoryId: string,
    itemData: Omit<InventoryItemT, "id">
  ) => {
    const newItem: InventoryItemT = {
      ...itemData,
      id: `item-${Date.now()}`,
    };

    setJobSites((prev) =>
      prev.map((jobSite) => {
        if (jobSite.id !== jobSiteId) return jobSite;

        return {
          ...jobSite,
          categories: jobSite.categories.map((category) => {
            if (category.id !== categoryId) return category;

            return {
              ...category,
              items: [...category.items, newItem],
            };
          }),
        };
      })
    );
  };

  const deleteInventoryItem = (
    jobSiteId: string,
    categoryId: string,
    itemId: string
  ) => {
    setJobSites((prev) =>
      prev.map((jobSite) => {
        if (jobSite.id !== jobSiteId) return jobSite;

        return {
          ...jobSite,
          categories: jobSite.categories.map((category) => {
            if (category.id !== categoryId) return category;

            return {
              ...category,
              items: category.items.filter((item) => item.id !== itemId),
            };
          }),
        };
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        jobSites,
        addJobSite,
        updateInventoryItem,
        addInventoryItem,
        deleteInventoryItem,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
