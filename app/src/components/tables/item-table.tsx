"use client";

import { ItemT } from "@/db/types";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { ItemDialog } from "../dialogs";
import { DataTable } from "../ui/data-table";

type Props = {
  data: ItemT[];
  pagination: PaginationT;
};

const columns: ColumnDef<ItemT>[] = [
  {
    accessorKey: "id",
    header: "Nr.",
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "name",
    header: "Name",
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
    header: "Quantity",
    cell: ({ row }) => {
      const quantity = row.getValue("quantity") as number;
      return (
        <div className="cursor-pointer hover:text-blue-600">{quantity}</div>
      );
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return (
        <div className="cursor-pointer hover:text-blue-600">{description}</div>
      );
    },
  },
  {
    accessorKey: "notes",
    header: "Notes",
    cell: ({ row }) => {
      const notes = row.getValue("notes") as string;
      return (
        <div className="cursor-pointer hover:text-blue-600">{notes || "-"}</div>
      );
    },
  },
];

const ItemTable = ({ data, pagination }: Props) => {
  const [editingRow, setEditingRow] = useState<ItemT | null>(null);

  return (
    <>
      <DataTable
        columns={columns}
        data={data}
        pagination={pagination}
        onRowDoubleClick={(row) => setEditingRow(row.original)}
      />
      <ItemDialog
        open={!!editingRow}
        onOpenChange={() => setEditingRow(null)}
        item={editingRow}
      />
    </>
  );
};

export { ItemTable };
