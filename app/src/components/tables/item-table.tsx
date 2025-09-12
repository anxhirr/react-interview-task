"use client";

import { ItemT } from "@/db/types";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { TableHeaderBtn } from "../buttons";
import { ItemDialog } from "../dialogs";
import { DataTable } from "../ui/data-table";

type Props = {
  data: ItemT[];
  pagination: PaginationT;
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

const ItemTable = ({ data, pagination }: Props) => {
  const [editingRow, setEditingRow] = useState<ItemT | null>(null);

  // Update columns to handle double-click for editing
  const editableColumns: ColumnDef<ItemT>[] = columns.map((col) => ({
    ...col,
    cell: ({ row, ...cellProps }) => {
      const originalCell = col.cell;
      return (
        <div
          className="cursor-pointer"
          onDoubleClick={() => setEditingRow(row.original)}
        >
          {typeof originalCell === "function"
            ? originalCell({ row, ...cellProps })
            : originalCell}
        </div>
      );
    },
  }));

  return (
    <>
      <DataTable
        columns={editableColumns}
        data={data}
        pagination={pagination}
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
