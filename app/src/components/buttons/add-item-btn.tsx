"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { ItemDialog } from "../dialogs";

const AddItemBtn = () => {
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);

  const onClick = () => {
    setIsItemModalOpen(true);
  };

  return (
    <>
      <Button onClick={onClick}>
        <Plus className="h-4 w-4 mr-2" />
        Add Item
      </Button>

      <ItemDialog
        open={isItemModalOpen}
        onOpenChange={setIsItemModalOpen}
        item={null}
      />
    </>
  );
};

export { AddItemBtn };
