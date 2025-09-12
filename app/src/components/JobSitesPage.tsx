"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryT, ItemT, JobCategoryT, JobT } from "@/db/types";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CreateJobSiteModal } from "./CreateJobSiteModal";
import { JobSitesTable } from "./tables";

type Props = {
  status: JobT["status"];
  data: (JobT & {
    jobCategories: (JobCategoryT & {
      category: CategoryT;
    })[];
    items: ItemT[];
  })[];
};

const JobSitesPage = ({ status, data }: Props) => {
  const router = useRouter();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleTabChange = (value: string) => {
    router.push(`/jobsites/${value}`);
  };

  return (
    <>
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold ">Job Sites</h1>
            <p className="text-gray-600 mt-2">
              Manage your construction job sites and inventory
            </p>
          </div>
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Job Site
          </Button>
        </div>

        <Tabs value={status} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="in_progress"
              className="flex items-center gap-2"
            >
              In Progress
            </TabsTrigger>
            <TabsTrigger value="on_hold" className="flex items-center gap-2">
              On Hold
            </TabsTrigger>
            <TabsTrigger value="completed" className="flex items-center gap-2">
              Completed
            </TabsTrigger>
          </TabsList>

          <TabsContent value="in_progress" className="mt-6">
            <JobSitesTable data={data} />
          </TabsContent>
          <TabsContent value="on_hold" className="mt-6">
            <JobSitesTable data={data} />
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            <JobSitesTable data={data} />
          </TabsContent>
        </Tabs>
      </div>

      <CreateJobSiteModal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
      />
    </>
  );
};

export { JobSitesPage };
