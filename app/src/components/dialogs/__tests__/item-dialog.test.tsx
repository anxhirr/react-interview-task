import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import {
  mockItem,
  render,
  screen,
  waitFor,
} from "../../../__tests__/utils/test-utils";
import { createItemAction, updateItemAction } from "../../../actions/item";
import { ItemDialog } from "../item-dialog";

jest.mock("../../../actions/item", () => ({
  createItemAction: jest.fn(),
  updateItemAction: jest.fn(),
}));

const mockCreateItemAction = createItemAction as jest.MockedFunction<
  typeof createItemAction
>;
const mockUpdateItemAction = updateItemAction as jest.MockedFunction<
  typeof updateItemAction
>;

describe("ItemDialog", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Create Mode", () => {
    it("should render the dialog in create mode", () => {
      render(<ItemDialog open={true} onOpenChange={jest.fn()} item={null} />);

      expect(screen.getByText("Create New Item")).toBeInTheDocument();
      expect(screen.getByLabelText("Name *")).toBeInTheDocument();
      expect(screen.getByLabelText("Quantity *")).toBeInTheDocument();
      expect(screen.getByLabelText("Description *")).toBeInTheDocument();
      expect(screen.getByLabelText("Notes")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /save changes/i })
      ).toBeInTheDocument();
    });

    it("should validate required fields", async () => {
      render(<ItemDialog open={true} onOpenChange={jest.fn()} item={null} />);

      const submitButton = screen.getByRole("button", {
        name: /save changes/i,
      });
      await user.click(submitButton);

      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Description is required")).toBeInTheDocument();
      expect(mockCreateItemAction).not.toHaveBeenCalled();
    });

    it("should submit form with valid data", async () => {
      const onOpenChange = jest.fn();
      mockCreateItemAction.mockResolvedValue([mockItem]);

      render(
        <ItemDialog open={true} onOpenChange={onOpenChange} item={null} />
      );

      await user.type(screen.getByLabelText("Name *"), "Test Item");
      await user.type(screen.getByLabelText("Quantity *"), "10");
      await user.type(
        screen.getByLabelText("Description *"),
        "Test Description"
      );
      await user.type(screen.getByLabelText("Notes"), "Test Notes");

      const submitButton = screen.getByRole("button", {
        name: /save changes/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockCreateItemAction).toHaveBeenCalledWith({
          name: "Test Item",
          quantity: 10,
          description: "Test Description",
          notes: "Test Notes",
          jobId: "job-1",
          categoryId: "category-1",
        });
      });

      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });

  describe("Edit Mode", () => {
    it("should render the dialog in edit mode with pre-filled data", () => {
      render(
        <ItemDialog open={true} onOpenChange={jest.fn()} item={mockItem} />
      );

      expect(screen.getByText("Edit Item")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Test Item")).toBeInTheDocument();
      expect(screen.getByDisplayValue("10")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Test Description")).toBeInTheDocument();
      expect(screen.getByDisplayValue("Test Notes")).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: /save changes/i })
      ).toBeInTheDocument();
    });

    it("should submit form with updated data", async () => {
      const onOpenChange = jest.fn();
      mockUpdateItemAction.mockResolvedValue(undefined as never);

      render(
        <ItemDialog open={true} onOpenChange={onOpenChange} item={mockItem} />
      );

      const nameInput = screen.getByDisplayValue("Test Item");
      await user.clear(nameInput);
      await user.type(nameInput, "Updated Item");

      const submitButton = screen.getByRole("button", {
        name: /save changes/i,
      });
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockUpdateItemAction).toHaveBeenCalledWith("test-item-id", {
          name: "Updated Item",
          quantity: 10,
          description: "Test Description",
          notes: "Test Notes",
        });
      });

      expect(onOpenChange).toHaveBeenCalledWith(false);
    });
  });
});
