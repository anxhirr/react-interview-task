"use client";

import { JobSiteT } from "@/types";
import { createContext, ReactNode, useContext, useState } from "react";

type AppContextType = {
  jobSites: JobSiteT[];
  addJobSite: (jobSite: Omit<JobSiteT, "id">) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

// Mock data for initial state
const mockJobSites: JobSiteT[] = [
  {
    id: "1",
    name: "Downtown Construction",
    status: "In Progress",
    categories: [
      {
        id: "cat-1",
        name: "Sidewalk Shed",
        items: [],
      },
      {
        id: "cat-2",
        name: "Scaffold",
        items: [],
      },
    ],
  },
  {
    id: "2",
    name: "Highway Bridge Project",
    status: "On Hold",
    categories: [
      {
        id: "cat-3",
        name: "Shoring",
        items: [],
      },
    ],
  },
  {
    id: "3",
    name: "Residential Complex",
    status: "Completed",
    categories: [
      {
        id: "cat-4",
        name: "Sidewalk Shed",
        items: [],
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

  return (
    <AppContext.Provider
      value={{
        jobSites,
        addJobSite,
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
