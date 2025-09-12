import { AddJobBtn } from "@/components/buttons";
import { JobTable } from "@/components/tables";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JobT } from "@/db/types";
import { getJobsAction } from "@/lib/actions";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ status: JobT["status"] }>;
};

const validStatuses: JobT["status"][] = ["in_progress", "on_hold", "completed"];

const Page = async ({ params }: Props) => {
  const { status } = await params;

  if (!validStatuses.includes(status)) return notFound();

  const jobs = await getJobsAction(status);

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

          <TabsContent value="in_progress" className="mt-6">
            <JobTable data={jobs} />
          </TabsContent>
          <TabsContent value="on_hold" className="mt-6">
            <JobTable data={jobs} />
          </TabsContent>
          <TabsContent value="completed" className="mt-6">
            <JobTable data={jobs} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default Page;
