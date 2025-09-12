import { getJobsAction } from "@/actions";
import { AddJobBtn } from "@/components/buttons";
import { JobTable } from "@/components/tables";
import { SearchInput } from "@/components/ui/search-input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DEFAULT_LIMIT, DEFAULT_PAGE } from "@/constants/defaults";
import { JOB_SITE_STATUS_LABELS } from "@/constants/map";
import { JobT } from "@/db/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ status: JobT["status"] }>;
  searchParams: Promise<{ page?: string; limit?: string; search?: string }>;
};

const validStatuses: JobT["status"][] = ["in_progress", "on_hold", "completed"];

const tabsConfig: {
  value: JobT["status"];
  activeClassName: string;
  inactiveClassName: string;
}[] = [
  {
    value: "in_progress",
    activeClassName:
      "data-[state=active]:bg-yellow-500 data-[state=active]:text-white",
    inactiveClassName:
      "data-[state=inactive]:text-yellow-700 data-[state=inactive]:hover:bg-yellow-100",
  },
  {
    value: "on_hold",
    activeClassName:
      "data-[state=active]:bg-red-500 data-[state=active]:text-white",
    inactiveClassName:
      "data-[state=inactive]:text-red-700 data-[state=inactive]:hover:bg-red-100",
  },
  {
    value: "completed",
    activeClassName:
      "data-[state=active]:bg-green-500 data-[state=active]:text-white",
    inactiveClassName:
      "data-[state=inactive]:text-green-700 data-[state=inactive]:hover:bg-green-100",
  },
] as const;

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
          <TabsList className="grid w-full grid-cols-3 h-14 p-1">
            {tabsConfig.map((tab) => {
              return (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className={cn(
                    "text-base",
                    tab.activeClassName,
                    tab.inactiveClassName
                  )}
                  asChild
                >
                  <Link href={`/job/list/${tab.value}`}>
                    {JOB_SITE_STATUS_LABELS[tab.value]}
                  </Link>
                </TabsTrigger>
              );
            })}
          </TabsList>
        </Tabs>
        <div className="my-4">
          <SearchInput
            placeholder="Search job sites by name..."
            className="max-w-md"
          />
        </div>
        <JobTable data={data} pagination={pagination} />
      </div>
    </>
  );
};

export default Page;
