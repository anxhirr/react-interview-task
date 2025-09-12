"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobT } from "@/db/types";

const SmallDot = ({ value }: { value?: JobT["status"] }) => {
  if (!value) return null;
  const COLOR_MAP = {
    in_progress: "bg-yellow-500",
    on_hold: "bg-red-500",
    completed: "bg-green-500",
  };
  return <div className={`w-2 h-2 rounded-full ${COLOR_MAP[value]}`} />;
};

const StatusSelect = ({
  onValueChange,
  value,
}: {
  onValueChange: (value: JobT["status"]) => void;
  value: JobT["status"];
}) => {
  return (
    <Select onValueChange={onValueChange} defaultValue={value}>
      <SelectTrigger className="w-full">
        <div className="flex items-center gap-2">
          <SmallDot value={value} />
          <SelectValue placeholder="Select status" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem
          value="in_progress"
          className="hover:bg-yellow-100 hover:text-yellow-800 data-[highlighted]:bg-yellow-100 data-[highlighted]:text-yellow-800"
        >
          In Progress
        </SelectItem>
        <SelectItem
          value="on_hold"
          className="hover:bg-red-100 hover:text-red-800 data-[highlighted]:bg-red-100 data-[highlighted]:text-red-800"
        >
          On Hold
        </SelectItem>
        <SelectItem
          value="completed"
          className="hover:bg-green-100 hover:text-green-800 data-[highlighted]:bg-green-100 data-[highlighted]:text-green-800"
        >
          Completed
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export { StatusSelect };
