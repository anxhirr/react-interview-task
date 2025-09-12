import { JobSiteT } from "@/types";

const JOB_SITE_STATUS_COLORS: Record<JobSiteT["status"], string> = {
  in_progress: "bg-green-100 text-green-800 hover:bg-green-200",
  on_hold: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  completed: "bg-blue-100 text-blue-800 hover:bg-blue-200",
};

const JOB_SITE_STATUS_LABELS: Record<JobSiteT["status"], string> = {
  in_progress: "In Progress",
  on_hold: "On Hold",
  completed: "Completed",
};

export { JOB_SITE_STATUS_COLORS, JOB_SITE_STATUS_LABELS };
