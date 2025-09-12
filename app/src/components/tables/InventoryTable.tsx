"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ItemT } from "@/db/types";
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
import { useState } from "react";
import { TableHeaderBtn } from "../buttons";

type Props = {
  data: ItemT[];
};

const columns: ColumnDef<ItemT>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <TableHeaderBtn column={column}>Name</TableHeaderBtn>
    ),
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="font-medium cursor-pointer hover:text-blue-600 hover:underline">
          {item.name}
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <TableHeaderBtn column={column}>Quantity</TableHeaderBtn>
    ),
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as number;
      return (
        <div className="cursor-pointer hover:text-blue-600">{quantity}</div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <TableHeaderBtn column={column}>Description</TableHeaderBtn>
    ),
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return (
        <div className="cursor-pointer hover:text-blue-600">{description}</div>
      );
    },
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <TableHeaderBtn column={column}>Notes</TableHeaderBtn>
    ),
    cell: ({ row }) => {
      const notes = row.getValue("notes") as string;
      return (
        <div className="cursor-pointer hover:text-blue-600">{notes || "-"}</div>
      );
    },
  },
];

const InventoryTable = ({ data }: Props) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const table = useReactTable({
    data,
    columns,
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
                  className="hover:bg-gray-50 cursor-pointer"
                  onDoubleClick={() => {
                    // TODO:
                  }}
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
                    <p className="text-gray-500 text-lg">No items found.</p>
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

export { InventoryTable };
