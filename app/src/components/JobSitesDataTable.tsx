"use client";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobSiteT } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { JobSitesTable } from "./tables";

type Props = {
  data: JobSiteT[];
  onCreateJobSite: () => void;
};

export function JobSitesDataTable({ data, onCreateJobSite }: Props) {
  const [activeTab, setActiveTab] = useState<string>("In Progress");

  const filteredData = data.filter((jobSite) => jobSite.status === activeTab);

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Job Sites</h1>
          <p className="text-gray-600 mt-2">
            Manage your construction job sites and inventory
          </p>
        </div>
        <Button onClick={onCreateJobSite} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Create Job Site
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="In Progress" className="flex items-center gap-2">
            In Progress
          </TabsTrigger>
          <TabsTrigger value="On Hold" className="flex items-center gap-2">
            On Hold
          </TabsTrigger>
          <TabsTrigger value="Completed" className="flex items-center gap-2">
            Completed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="In Progress" className="mt-6">
          <JobSitesTable data={filteredData} />
        </TabsContent>
        <TabsContent value="On Hold" className="mt-6">
          <JobSitesTable data={filteredData} />
        </TabsContent>
        <TabsContent value="Completed" className="mt-6">
          <JobSitesTable data={filteredData} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
