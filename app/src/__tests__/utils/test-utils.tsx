import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react";
import React, { ReactElement } from "react";

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">
) => render(ui, { wrapper: AllTheProviders, ...options });

// TODO: should i add types for each mock?

const mockJob = {
  id: "test-job-id",
  name: "Test Job Site",
  status: "in_progress" as const,
  createdAt: "2024-01-01T00:00:00Z",
  jobCategories: [
    {
      id: "test-job-category-id",
      jobId: "test-job-id",
      categoryId: "test-category-id",
      createdAt: "2024-01-01T00:00:00Z",
      category: {
        id: "test-category-id",
        name: "Test Category",
        createdAt: "2024-01-01T00:00:00Z",
        items: [],
      },
    },
  ],
  items: [],
};

const mockCategory = {
  id: "test-category-id",
  name: "Test Category",
  createdAt: "2024-01-01T00:00:00Z",
};

const mockItem = {
  id: "test-item-id",
  name: "Test Item",
  quantity: 10,
  description: "Test Description",
  notes: "Test Notes",
  jobId: "test-job-id",
  categoryId: "test-category-id",
  createdAt: "2024-01-01T00:00:00Z",
};

const mockPagination = {
  page: 1,
  limit: 10,
  total: 1,
  totalPages: 1,
  hasNext: false,
  hasPrev: false,
};

export * from "@testing-library/react";
export {
  mockCategory,
  mockItem,
  mockJob,
  mockPagination,
  customRender as render,
};
