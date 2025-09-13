import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "../../../__tests__/utils/test-utils";
import { createJobAction } from "../../../actions/job";
import { JobDialog } from "../job-dialog";

jest.mock("../../../actions/job", () => ({
  createJobAction: jest.fn(),
}));

jest.mock("../../selects", () => ({
  CategorySelect: ({
    onValueChange,
    value,
    placeholder,
  }: {
    onValueChange: (value: string[]) => void;
    value?: string[];
    placeholder?: string;
  }) => (
    <select
      data-testid="category-select"
      onChange={(e) => onValueChange([e.target.value])}
      value={value?.[0] || ""}
    >
      <option value="">{placeholder}</option>
      <option value="category-1">Category 1</option>
      <option value="category-2">Category 2</option>
    </select>
  ),
  StatusSelect: ({
    onValueChange,
    value,
  }: {
    onValueChange: (value: string) => void;
    value?: string;
  }) => (
    <select
      data-testid="status-select"
      onChange={(e) => onValueChange(e.target.value)}
      value={value || ""}
    >
      <option value="in_progress">In Progress</option>
      <option value="on_hold">On Hold</option>
      <option value="completed">Completed</option>
    </select>
  ),
}));

const mockCreateJobAction = createJobAction as jest.MockedFunction<
  typeof createJobAction
>;

describe("JobDialog", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render the dialog with form fields", () => {
    render(<JobDialog open={true} onOpenChange={jest.fn()} />);

    expect(screen.getByText("Create New Job Site")).toBeInTheDocument();
    expect(screen.getByLabelText("Name *")).toBeInTheDocument();
    expect(screen.getByTestId("status-select")).toBeInTheDocument();
    expect(screen.getByTestId("category-select")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /save changes/i })
    ).toBeInTheDocument();
  });

  it("should validate required fields", async () => {
    const onOpenChange = jest.fn();
    render(<JobDialog open={true} onOpenChange={onOpenChange} />);

    const submitButton = screen.getByRole("button", { name: /save changes/i });
    await user.click(submitButton);

    expect(screen.getByText("Job site name is required")).toBeInTheDocument();
    expect(
      screen.getByText("At least one category is required")
    ).toBeInTheDocument();
    expect(mockCreateJobAction).not.toHaveBeenCalled();
  });

  it("should submit form with valid data", async () => {
    const onOpenChange = jest.fn();
    mockCreateJobAction.mockResolvedValue(undefined);

    render(<JobDialog open={true} onOpenChange={onOpenChange} />);

    await user.type(screen.getByLabelText("Name *"), "Test Job Site");
    await user.selectOptions(
      screen.getByTestId("status-select"),
      "in_progress"
    );
    await user.selectOptions(
      screen.getByTestId("category-select"),
      "category-1"
    );

    const submitButton = screen.getByRole("button", { name: /save changes/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(mockCreateJobAction).toHaveBeenCalledWith({
        name: "Test Job Site",
        status: "in_progress",
        categoryIds: ["category-1"],
      });
    });

    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
