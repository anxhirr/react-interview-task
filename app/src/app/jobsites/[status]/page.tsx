import { JobSitesPage } from "@/components/JobSitesPage";
import { db } from "@/db/instance";
import { job } from "@/db/schema";
import { JobSiteT } from "@/types";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ status: JobSiteT["status"] }>;
};

const validStatuses: JobSiteT["status"][] = [
  "in_progress",
  "on_hold",
  "completed",
];

const Page = async ({ params }: Props) => {
  const { status } = await params;

  const jobs = await db.query.job.findMany({
    where: eq(job.status, status),
  });
  console.log("jobs", jobs);

  if (!validStatuses.includes(status)) return notFound();

  return <JobSitesPage status={status} />;
};

export default Page;
