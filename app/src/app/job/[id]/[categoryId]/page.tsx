import { getItemsAction, getJobAction } from "@/actions";
import { AddItemBtn } from "@/components/buttons";
import { SearchInput } from "@/components/inputs";
import { EmptyState, SmallDot } from "@/components/layout";
import { ItemTable } from "@/components/tables";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constants/defaults";
import {
  JOB_SITE_STATUS_COLORS,
  JOB_SITE_STATUS_LABELS,
} from "@/constants/map";
import { ArrowLeft, Check, Package } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string; categoryId?: string }>;
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
};

const Page = async ({ params, searchParams }: Props) => {
  const { id, categoryId } = await params;
  const {
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT,
    search,
  } = await searchParams;

  if (!id || !categoryId) return notFound();

  const job = await getJobAction(id);

  if (!job) return notFound();

  const categories = job.jobCategories.map((jc) => jc.category);
  const selectedCategory = categories.find((cat) => cat.id === categoryId);

  const itemsResult = await getItemsAction(
    { categoryId, jobId: id },
    {
      page: Number(page),
      limit: Number(limit),
      search,
    }
  );

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
        <AddItemBtn />
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
              {categories.map((category) => {
                const isSelected = categoryId === category.id;

                return (
                  <Link
                    key={category.id}
                    href={`/job/${job.id}/${category.id}`}
                    className="w-full p-3 rounded-lg mb-2 flex items-center border hover:opacity-80"
                    style={{
                      backgroundColor: isSelected ? category.color : undefined,
                      color: isSelected ? "white" : category.color,
                    }}
                  >
                    <div className="flex items-center gap-2 flex-1">
                      <SmallDot color={category.color} />
                      <span className="font-medium">{category.name}</span>
                    </div>
                    {isSelected && <Check className="size-4" />}
                  </Link>
                );
              })}
            </div>
            <div className="p-4 border-t">
              <Link href={`/job/list/${job.status}`} className="w-full">
                <Button
                  variant="outline"
                  className="w-full flex items-center gap-2 bg-[#1264A3] text-white hover:bg-[#1264A3]/90 hover:text-white"
                >
                  Back to Job Sites
                  <ArrowLeft />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-lg border h-full">
            {selectedCategory ? (
              <>
                <div className="p-4 border-b">
                  <div className="flex items-center gap-3">
                    <SmallDot color={selectedCategory.color} />
                    <h2
                      className="text-lg font-semibold"
                      style={{ color: selectedCategory.color }}
                    >
                      {selectedCategory.name}
                    </h2>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    Double-click on any row to edit the item
                  </p>
                </div>

                <div className="p-4">
                  <SearchInput placeholder="Search items by name, description, or notes..." />
                </div>
                <div className="px-4">
                  <ItemTable
                    data={itemsResult.data}
                    pagination={itemsResult.pagination}
                  />
                </div>
              </>
            ) : (
              <EmptyState
                title="No Category Selected"
                description="Please select a category from the sidebar to view its items and start managing your inventory."
                icon={<Package className="size-12" />}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
