"use client";

import { JobsActionT } from "@/actions/types";
import { Badge } from "@/components/ui/badge";
import {
  JOB_SITE_STATUS_COLORS,
  JOB_SITE_STATUS_LABELS,
} from "@/constants/map";
import { ItemT, JobCategoryT, JobT } from "@/db/types";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { DataTable } from "../ui/data-table";

type DataT = JobsActionT["data"][number];

const columns: ColumnDef<DataT>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const job = row.original;
      const firstCategory = job.jobCategories[0]?.category;
      return (
        <Link
          href={`/job/${job.id}/${firstCategory?.id}`}
          className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
        >
          {job.name}
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as JobT["status"];
      return (
        <Badge className={JOB_SITE_STATUS_COLORS[status]}>
          {JOB_SITE_STATUS_LABELS[status]}
        </Badge>
      );
    },
  },
  {
    accessorKey: "jobCategories",
    header: "Categories",
    cell: ({ row }) => {
      const jobCategories = row.getValue("jobCategories") as JobCategoryT[];
      return <div>{jobCategories.length}</div>;
    },
  },
  {
    accessorKey: "items",
    header: "Items",
    cell: ({ row }) => {
      const items = row.getValue("items") as ItemT[];
      return <div>{items.length}</div>;
    },
  },
];

type Props = {
  data: DataT[];
  pagination: PaginationT;
};

const JobTable = ({ data, pagination }: Props) => {
  return <DataTable columns={columns} data={data} pagination={pagination} />;
};

export { JobTable };
