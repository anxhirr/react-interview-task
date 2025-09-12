import { JobSitesPage } from "@/components/JobSitesPage";
import { JobSiteT } from "@/types";
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

  if (!validStatuses.includes(status)) return notFound();

  return <JobSitesPage status={status} />;
};

export default Page;
