"use client";

import { CreateJobSiteModal } from "@/components/CreateJobSiteModal";
import { JobSitesDataTable } from "@/components/JobSitesDataTable";
import { useApp } from "@/contexts/AppContext";
import { useState } from "react";

export function JobSitesList() {
  const { jobSites } = useApp();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <>
      <JobSitesDataTable
        data={jobSites}
        onCreateJobSite={() => setIsCreateModalOpen(true)}
      />

      <CreateJobSiteModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </>
  );
}
