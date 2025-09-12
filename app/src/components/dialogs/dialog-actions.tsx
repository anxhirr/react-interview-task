"use client";

import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { ReactNode } from "react";

type DialogActionsProps = {
  onOpenChange: (open: boolean) => void;
  isSubmitting?: boolean;
  children?: ReactNode;
};

export const DialogActions = ({
  onOpenChange,
  isSubmitting = false,
  children,
}: DialogActionsProps) => {
  return (
    <div className="flex justify-end gap-3 pt-4">
      <Button
        type="button"
        variant="outline"
        onClick={() => onOpenChange(false)}
        disabled={isSubmitting}
      >
        <X />
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting}>
        <Check />
        {isSubmitting ? "Saving..." : "Save Changes"}
      </Button>
      {children}
    </div>
  );
};
