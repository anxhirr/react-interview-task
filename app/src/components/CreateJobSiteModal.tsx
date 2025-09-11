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
import { useApp } from "@/contexts/AppContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown, X } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z
    .string()
    .min(1, "Job site name is required")
    .max(100, "Name must be less than 100 characters"),
  status: z.enum(["In Progress", "On Hold", "Completed"]),
  categories: z
    .array(z.enum(["Sidewalk Shed", "Scaffold", "Shoring"]))
    .min(1, "At least one category is required"),
});

type SchemaT = z.infer<typeof schema>;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function CreateJobSiteModal({ open, onOpenChange }: Props) {
  const { addJobSite } = useApp();

  const form = useForm<SchemaT>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      status: "In Progress",
      categories: ["Scaffold"],
    },
  });

  const watchedCategories = useWatch({
    control: form.control,
    name: "categories",
  });

  const onSubmit = (data: SchemaT) => {
    const jobSiteData = {
      name: data.name.trim(),
      status: data.status,
      categories: data.categories.map((categoryName, index) => ({
        id: `cat-${Date.now()}-${index}`,
        name: categoryName,
        items: [],
      })),
    };

    addJobSite(jobSiteData);

    // Reset form
    form.reset({
      name: "",
      status: "In Progress",
      categories: ["Sidewalk Shed", "Scaffold", "Shoring"],
    });
    onOpenChange(false);
  };

  const addCategory = (
    categoryToAdd: "Sidewalk Shed" | "Scaffold" | "Shoring"
  ) => {
    const currentCategories = form.getValues("categories");
    if (!currentCategories.includes(categoryToAdd)) {
      form.setValue("categories", [...currentCategories, categoryToAdd]);
    }
  };

  const removeCategory = (
    categoryToRemove: "Sidewalk Shed" | "Scaffold" | "Shoring"
  ) => {
    const currentCategories = form.getValues("categories");
    form.setValue(
      "categories",
      currentCategories.filter((cat) => cat !== categoryToRemove)
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
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
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="On Hold">On Hold</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="categories"
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
                            <DropdownMenuItem
                              onClick={() => addCategory("Sidewalk Shed")}
                              className="flex items-center justify-between"
                            >
                              <span>Sidewalk Shed</span>
                              {watchedCategories.includes("Sidewalk Shed") && (
                                <Check className="h-4 w-4 text-green-600" />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => addCategory("Scaffold")}
                              className="flex items-center justify-between"
                            >
                              <span>Scaffold</span>
                              {watchedCategories.includes("Scaffold") && (
                                <Check className="h-4 w-4 text-green-600" />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => addCategory("Shoring")}
                              className="flex items-center justify-between"
                            >
                              <span>Shoring</span>
                              {watchedCategories.includes("Shoring") && (
                                <Check className="h-4 w-4 text-green-600" />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {watchedCategories.map((category) => (
                          <Badge
                            key={category}
                            variant="secondary"
                            className="flex items-center gap-1 px-2 py-1"
                          >
                            {category}
                            <button
                              type="button"
                              onClick={() => removeCategory(category)}
                              className="ml-1 hover:bg-gray-300 rounded-full p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>

                      {watchedCategories.length === 0 && (
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
                {form.formState.isSubmitting
                  ? "Creating..."
                  : "Create Job Site"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
