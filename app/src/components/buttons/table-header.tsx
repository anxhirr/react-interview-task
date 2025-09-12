import { Column, RowData } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../ui/button";

const TableHeaderBtn = <T extends RowData>({
  children,
  column,
}: {
  children: React.ReactNode;
  column: Column<T>;
}) => {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {children}
      <ArrowUpDown />
    </Button>
  );
};

export { TableHeaderBtn };
