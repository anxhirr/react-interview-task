"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { JobT } from "@/db/types";
import { createJobAction, getCategoriesAction } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronDown, X } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

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

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesAction,
  });

  const form = useForm<SchemaT>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      status,
      categoryIds: [],
    },
  });

  const formCategoryIds = useWatch({
    control: form.control,
    name: "categoryIds",
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

  const addCategory = (categoryIdToAdd: string) => {
    const currentCategories = form.getValues("categoryIds");
    if (!currentCategories.includes(categoryIdToAdd)) {
      form.setValue("categoryIds", [...currentCategories, categoryIdToAdd]);
    }
  };

  const removeCategory = (categoryIdToRemove: string) => {
    const currentCategories = form.getValues("categoryIds");
    form.setValue(
      "categoryIds",
      currentCategories.filter((cat) => cat !== categoryIdToRemove)
    );
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="on_hold">On Hold</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
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
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-between h-10 px-3 py-2 text-sm"
                          >
                            Select a category to add
                            <ChevronDown className="h-4 w-4 opacity-50" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-full min-w-[200px]">
                          {isLoadingCategories ? (
                            <DropdownMenuItem disabled>
                              <span>Loading categories...</span>
                            </DropdownMenuItem>
                          ) : categories.length === 0 ? (
                            <DropdownMenuItem disabled>
                              <span>No categories available</span>
                            </DropdownMenuItem>
                          ) : (
                            categories.map((category) => (
                              <DropdownMenuItem
                                key={category.id}
                                onClick={() => addCategory(category.id)}
                                className="flex items-center justify-between"
                              >
                                <span>{category.name}</span>
                                {formCategoryIds.includes(category.id) && (
                                  <Check className="h-4 w-4 text-green-600" />
                                )}
                              </DropdownMenuItem>
                            ))
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {formCategoryIds.map((categoryId) => {
                        const category = categories.find(
                          (cat) => cat.id === categoryId
                        );
                        return (
                          <Badge
                            key={categoryId}
                            variant="secondary"
                            className="flex items-center gap-1 px-2 py-1"
                          >
                            {category?.name || "Unknown"}
                            <button
                              type="button"
                              onClick={() => removeCategory(categoryId)}
                              className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        );
                      })}
                    </div>

                    {formCategoryIds.length === 0 && (
                      <p className="text-sm text-gray-500">
                        Add at least one category to organize your inventory.
                      </p>
                    )}
                  </div>
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
              {form.formState.isSubmitting ? "Creating..." : "Create Job Site"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export { JobDialog };
