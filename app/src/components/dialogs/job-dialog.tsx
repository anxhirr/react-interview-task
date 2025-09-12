"use client";

import { createJobAction } from "@/actions";
import { DialogActions } from "@/components/dialogs/dialog-actions";
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
import { JobT } from "@/db/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CategorySelect, StatusSelect } from "../selects";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const JobDialog = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <Content open={open} onOpenChange={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
};

const schema = z.object({
  name: z
    .string()
    .min(1, "Job site name is required")
    .max(100, "Name must be less than 100 characters"),
  status: z.custom<JobT["status"]>(),
  categoryIds: z.array(z.string()).min(1, "At least one category is required"),
});

type SchemaT = z.infer<typeof schema>;

const Content = ({ onOpenChange }: Props) => {
  const router = useRouter();
  const { status } = useParams<{ status: JobT["status"] }>();

  const form = useForm<SchemaT>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      status,
      categoryIds: [],
    },
  });

  const onSubmit = async (data: SchemaT) => {
    try {
      await createJobAction(data);

      onOpenChange(false);
      router.refresh();
    } catch (error) {
      console.error("Error creating job site:", error);
      // TODO: show a toast
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>Create New Job Site</DialogTitle>
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
                  <Input placeholder="Enter job site name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <StatusSelect
                  onValueChange={field.onChange}
                  value={field.value}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryIds"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Categories</FormLabel>
                <FormControl>
                  <CategorySelect
                    value={field.value}
                    onValueChange={field.onChange}
                    placeholder="Select a category to add"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <DialogActions
            onOpenChange={onOpenChange}
            isSubmitting={form.formState.isSubmitting}
          />
        </form>
      </Form>
    </>
  );
};

export { JobDialog };
