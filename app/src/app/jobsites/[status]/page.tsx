import { JobSitesPage } from "@/components/JobSitesPage";
import { JobT } from "@/db/types";
import { getJobsAction } from "@/lib/actions";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ status: JobT["status"] }>;
};

const validStatuses: JobT["status"][] = ["in_progress", "on_hold", "completed"];

const Page = async ({ params }: Props) => {
  const { status } = await params;

  if (!validStatuses.includes(status)) return notFound();

  const jobs = await getJobsAction(status);
  console.log("jobs", jobs);

  return <JobSitesPage status={status} data={jobs} />;
};

export default Page;
