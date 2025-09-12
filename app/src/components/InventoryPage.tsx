"use client";

import { InventoryTable } from "@/components/tables";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  JOB_SITE_STATUS_COLORS,
  JOB_SITE_STATUS_LABELS,
} from "@/constants/map";
import { CategoryT, ItemT, JobCategoryT, JobT } from "@/db/types";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  job: JobT & {
    jobCategories: (JobCategoryT & {
      category: CategoryT & {
        items: ItemT[];
      };
    })[];
  };
  categoryId: string;
};

const InventoryPage = ({ job, categoryId }: Props) => {
  const categories = job.jobCategories.map((jc) => jc.category);

  if (!categories.find((cat) => cat.id === categoryId)) {
    notFound();
  }

  const selectedCategory = categories.find((cat) => cat.id === categoryId);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold ">{job.name}</h1>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-gray-600">Status:</span>
            <Badge className={JOB_SITE_STATUS_COLORS[job.status]}>
              {JOB_SITE_STATUS_LABELS[job.status]}
            </Badge>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Main Content Layout */}
      <div className="flex gap-6 h-[calc(100vh-200px)]">
        {/* Categories Sidebar */}
        <div className="w-80 flex-shrink-0">
          <div className="bg-white rounded-lg border h-full flex flex-col">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Categories</h2>
            </div>
            <div className="p-2 flex-1 overflow-auto">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  href={`/inventory/${job.id}/${category.id}`}
                  className={`w-full text-left p-3 rounded-lg mb-2 transition-colors block ${
                    categoryId === category.id
                      ? "bg-blue-50 border border-blue-200 text-blue-900"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.name}</span>
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {category.items.length}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="p-4 border-t">
              <Link href={`/jobsites/${job.status}`} className="w-full">
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Job Sites
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Items Content */}
        <div className="flex-1">
          <div className="bg-white rounded-lg border h-full">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">
                {selectedCategory?.name || "Select a Category"}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Double-click on any row to edit the item
              </p>
            </div>
            <div className="p-4 h-[calc(100%-80px)] overflow-auto">
              <InventoryTable data={selectedCategory?.items || []} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { InventoryPage };
