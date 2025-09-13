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
import { SmallDot } from "../layout";

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
  const { data: categories = [] } = useQuery({
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
          <PopoverContent className="p-1 popover-content-width-full">
            <div className="space-y-1">
              {categories.length === 0 ? (
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                  No categories available
                </div>
              ) : (
                categories.map((category) => {
                  const isSelected = value.includes(category.id);
                  return (
                    <Button
                      key={category.id}
                      onClick={() => toggleCategory(category.id)}
                      className="w-full flex justify-between items-center"
                      variant="ghost"
                      style={{
                        backgroundColor: isSelected
                          ? category.color
                          : undefined,
                        color: isSelected ? "white" : category.color,
                      }}
                    >
                      <span>{category.name}</span>
                      {value.includes(category.id) && <Check />}
                    </Button>
                  );
                })
              )}
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="flex flex-wrap gap-2">
        {value.map((categoryId) => {
          const category = categories.find((cat) => cat.id === categoryId)!;
          return (
            <Badge key={categoryId} variant="secondary">
              <SmallDot color={category.color} />
              {category.name}
              <Button
                size="icon"
                onClick={() => removeCategory(categoryId)}
                variant="destructive"
                className="size-5"
              >
                <X />
              </Button>
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
