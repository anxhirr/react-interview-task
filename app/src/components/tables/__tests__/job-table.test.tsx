import {
  mockJob,
  mockPagination,
  render,
  screen,
} from "../../../__tests__/utils/test-utils";
import { JobTable } from "../job-table";

describe("JobTable", () => {
  const mockJobs = [
    mockJob,
    {
      ...mockJob,
      id: "job-2",
      name: "Job Site 2",
      status: "completed" as const,
      jobCategories: [
        {
          id: "jc-2",
          jobId: "job-2",
          categoryId: "cat-2",
          createdAt: "2024-01-01T00:00:00Z",
          category: {
            id: "cat-2",
            name: "Category 2",
            createdAt: "2024-01-01T00:00:00Z",
            items: [],
          },
        },
      ],
      items: [
        {
          id: "item-1",
          name: "Item 1",
          quantity: 5,
          description: "Description 1",
          notes: "Notes 1",
          jobId: "job-2",
          categoryId: "cat-2",
          createdAt: "2024-01-01T00:00:00Z",
        },
      ],
    },
  ];

  it("should render the table with job data", () => {
    render(<JobTable data={mockJobs} pagination={mockPagination} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(screen.getByText("Items")).toBeInTheDocument();

    expect(screen.getByText("Test Job Site")).toBeInTheDocument();
    expect(screen.getByText("Job Site 2")).toBeInTheDocument();
  });

  it("should display job names as clickable links", () => {
    render(<JobTable data={mockJobs} pagination={mockPagination} />);

    const jobLinks = screen.getAllByRole("link");
    expect(jobLinks).toHaveLength(2);

    expect(jobLinks[0]).toHaveAttribute(
      "href",
      "/job/test-job-id/test-category-id"
    );
    expect(jobLinks[1]).toHaveAttribute("href", "/job/job-2/cat-2");
  });

  it("should display status badges with correct styling", () => {
    render(<JobTable data={mockJobs} pagination={mockPagination} />);

    const inProgressBadge = screen.getByText("In Progress");
    const completedBadge = screen.getByText("Completed");

    expect(inProgressBadge).toBeInTheDocument();
    expect(completedBadge).toBeInTheDocument();
  });

  it("should display category count", () => {
    render(<JobTable data={mockJobs} pagination={mockPagination} />);

    const categoryCounts = screen.getAllByText("1");
    expect(categoryCounts.length).toBeGreaterThan(0);
  });

  it("should display item count", () => {
    render(<JobTable data={mockJobs} pagination={mockPagination} />);

    const zeroElements = screen.getAllByText("0");
    const oneElements = screen.getAllByText("1");

    expect(zeroElements.length).toBeGreaterThan(0);
    expect(oneElements.length).toBeGreaterThan(0);
  });

  it("should use first category for job link when multiple categories exist", () => {
    const jobWithMultipleCategories = {
      ...mockJob,
      jobCategories: [
        {
          id: "jc-1",
          jobId: "job-1",
          categoryId: "cat-1",
          createdAt: "2024-01-01T00:00:00Z",
          category: {
            id: "cat-1",
            name: "Category 1",
            createdAt: "2024-01-01T00:00:00Z",
            items: [],
          },
        },
        {
          id: "jc-2",
          jobId: "job-1",
          categoryId: "cat-2",
          createdAt: "2024-01-01T00:00:00Z",
          category: {
            id: "cat-2",
            name: "Category 2",
            createdAt: "2024-01-01T00:00:00Z",
            items: [],
          },
        },
      ],
    };

    render(
      <JobTable
        data={[jobWithMultipleCategories]}
        pagination={mockPagination}
      />
    );

    const jobLink = screen.getByRole("link");
    expect(jobLink).toHaveAttribute("href", "/job/test-job-id/cat-1");
  });
});
