"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ItemT } from "@/db/types";
import { createItemAction, updateItemAction } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  jobId: string;
  categoryId: string;
  item: ItemT | null; // null for create, ItemT for update
};

const Component = ({ open, onOpenChange, jobId, categoryId, item }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <Content
          open={open}
          onOpenChange={onOpenChange}
          jobId={jobId}
          categoryId={categoryId}
          item={item}
        />
      </DialogContent>
    </Dialog>
  );
};

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  quantity: z.number().min(0, "Quantity must be 0 or greater"),
  description: z.string().min(1, "Description is required"),
  notes: z.string().nullable(),
});

type SchemaT = z.infer<typeof schema>;

const Content = ({ onOpenChange, jobId, categoryId, item }: Props) => {
  const router = useRouter();
  const isEditing = !!item;

  const form = useForm<SchemaT>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: item?.name || "",
      quantity: item?.quantity || 0,
      description: item?.description || "",
      notes: item?.notes || "",
    },
  });

  const onSubmit = async (data: SchemaT) => {
    try {
      if (isEditing && item) {
        await updateItemAction(item.id, data);
      } else {
        await createItemAction({
          ...data,
          jobId,
          categoryId,
        });
      }

      onOpenChange(false);
      router.refresh();
    } catch (error) {
      console.error("Error saving item:", error);
      // TODO: show a toast
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>{isEditing ? "Edit Item" : "Create New Item"}</DialogTitle>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter item name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity *</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="Enter quantity"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description *</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter item description"
                    className="resize-none"
                    rows={3}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter additional notes (optional)"
                    className="resize-none"
                    rows={3}
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting
                ? isEditing
                  ? "Updating..."
                  : "Creating..."
                : isEditing
                ? "Update Item"
                : "Create Item"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export { Component as ItemModal };
