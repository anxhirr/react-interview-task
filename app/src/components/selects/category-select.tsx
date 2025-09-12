"use client";

import { getCategoriesAction } from "@/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { Check, ChevronDown, X } from "lucide-react";

type Props = {
  value: string[];
  onValueChange: (value: string[]) => void;
  placeholder?: string;
};

const CategorySelect = ({
  value,
  onValueChange,
  placeholder = "Select categories to add",
}: Props) => {
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesAction,
    gcTime: 0, // always fetch fresh data
  });

  const toggleCategory = (categoryIdToAdd: string) => {
    const exists = value.includes(categoryIdToAdd);
    if (!exists) {
      onValueChange([...value, categoryIdToAdd]);
    } else {
      onValueChange(value.filter((cat) => cat !== categoryIdToAdd));
    }
  };

  const removeCategory = (categoryIdToRemove: string) => {
    onValueChange(value.filter((cat) => cat !== categoryIdToRemove));
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-full justify-between text-sm font-normal"
            >
              {placeholder}
              <ChevronDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="p-0 popover-content-width-full">
            <div className="space-y-1">
              {isLoadingCategories ? (
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                  Loading categories...
                </div>
              ) : categories.length === 0 ? (
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                  No categories available
                </div>
              ) : (
                categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => toggleCategory(category.id)}
                    className="flex w-full items-center justify-between rounded-sm px-2 py-1.5 text-sm hover:bg-accent hover:text-accent-foreground"
                  >
                    <span>{category.name}</span>
                    {value.includes(category.id) && (
                      <Check className="h-4 w-4 text-green-600" />
                    )}
                  </button>
                ))
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-wrap gap-2">
        {value.map((categoryId) => {
          const category = categories.find((cat) => cat.id === categoryId);
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

      {value.length === 0 && (
        <p className="text-sm text-gray-500">
          Add at least one category to organize your inventory.
        </p>
      )}
    </div>
  );
};

export { CategorySelect };
