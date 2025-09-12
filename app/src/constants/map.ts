import { JobT } from "@/db/types";

const JOB_SITE_STATUS_COLORS: Record<JobT["status"], string> = {
  in_progress: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
  on_hold: "bg-destructive hover:bg-destructive/90",
  completed: "bg-primary hover:bg-primary/90",
};

const JOB_SITE_STATUS_LABELS: Record<JobT["status"], string> = {
  in_progress: "In Progress",
  on_hold: "On Hold",
  completed: "Completed",
};

export { JOB_SITE_STATUS_COLORS, JOB_SITE_STATUS_LABELS };
