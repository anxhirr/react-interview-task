"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { JobDialog } from "../dialogs";

const AddJobBtn = () => {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(true);
  };

  return (
    <>
      <Button onClick={onClick}>
        Add Job
        <Plus />
      </Button>

      <JobDialog open={open} onOpenChange={setOpen} />
    </>
  );
};

export { AddJobBtn };
