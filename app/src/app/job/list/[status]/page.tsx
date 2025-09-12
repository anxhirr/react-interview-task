import { getJobsAction } from "@/actions";
import { AddJobBtn } from "@/components/buttons";
import { JobTable } from "@/components/tables";
import { SearchInput } from "@/components/ui/search-input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constants/defaults";
import { JobT } from "@/db/types";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ status: JobT["status"] }>;
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
};

const validStatuses: JobT["status"][] = ["in_progress", "on_hold", "completed"];

const Page = async ({ params, searchParams }: Props) => {
  const { status } = await params;
  const {
    page = DEFAULT_PAGE,
    limit = DEFAULT_LIMIT,
    search,
  } = await searchParams;

  if (!validStatuses.includes(status)) return notFound();

  const { data, pagination } = await getJobsAction(status, {
    page: Number(page),
    limit: Number(limit),
    search,
  });

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
          <AddJobBtn />
        </div>

        <Tabs value={status} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger
              value="in_progress"
              className="flex items-center gap-2"
              asChild
            >
              <Link href="/job/list/in_progress">In Progress</Link>
            </TabsTrigger>
            <TabsTrigger
              value="on_hold"
              className="flex items-center gap-2"
              asChild
            >
              <Link href="/job/list/on_hold">On Hold</Link>
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="flex items-center gap-2"
              asChild
            >
              <Link href="/job/list/completed">Completed</Link>
            </TabsTrigger>
          </TabsList>

          {/* Search Input */}
          <div className="mt-6 mb-4">
            <SearchInput
              placeholder="Search job sites by name..."
              className="max-w-md"
            />
          </div>

          <TabsContent value="in_progress" className="mt-6">
            <JobTable data={data} pagination={pagination} />
          </TabsContent>
          <TabsContent value="on_hold" className="mt-6">
            <JobTable data={data} pagination={pagination} />
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            <JobTable data={data} pagination={pagination} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
