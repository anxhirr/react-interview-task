"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  JOB_SITE_STATUS_COLORS,
  JOB_SITE_STATUS_LABELS,
} from "@/constants/map";
import { CategoryT, ItemT, JobCategoryT, JobT } from "@/db/types";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";
import { useState } from "react";
import { TableHeaderBtn } from "../buttons";

type DataT = JobT & {
  jobCategories: (JobCategoryT & {
    category: CategoryT;
  })[];
  items: ItemT[];
};

const columns: ColumnDef<DataT>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <TableHeaderBtn column={column}>Job Site Name</TableHeaderBtn>
    ),
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
    header: ({ column }) => (
      <TableHeaderBtn column={column}>Status</TableHeaderBtn>
    ),
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
    header: ({ column }) => (
      <TableHeaderBtn column={column}>Categories</TableHeaderBtn>
    ),
    cell: ({ row }) => {
      const jobCategories = row.getValue("jobCategories") as JobCategoryT[];
      return <div>{jobCategories.length}</div>;
    },
  },
  {
    accessorKey: "items",
    header: ({ column }) => (
      <TableHeaderBtn column={column}>Items</TableHeaderBtn>
    ),
    cell: ({ row }) => {
      const items = row.getValue("items") as ItemT[];
      return <div>{items.length}</div>;
    },
  },
];

type Props = {
  data: DataT[];
};

const JobTable = ({ data }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns: columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="font-semibold">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <p className="text-gray-500 text-lg">No job sites found.</p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export { JobTable };
