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
        Add Item
        <Plus />
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
