import {
  fireEvent,
  mockItem,
  mockPagination,
  render,
  screen,
} from "../../../__tests__/utils/test-utils";
import { ItemTable } from "../item-table";

describe("ItemTable", () => {
  const mockItems = [
    mockItem,
    {
      ...mockItem,
      id: "item-2",
      name: "Item 2",
      quantity: 5,
      description: "Description 2",
      notes: "Notes 2",
    },
  ];

  it("should render the table with items", () => {
    render(<ItemTable data={mockItems} pagination={mockPagination} />);

    expect(screen.getByText("Nr.")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Quantity")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("Notes")).toBeInTheDocument();

    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getAllByText("10")).toHaveLength(2); // 10 appears twice (quantity and pagination)
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should open edit dialog on double-click", () => {
    render(<ItemTable data={mockItems} pagination={mockPagination} />);

    const firstRow = screen.getByText("Test Item");
    fireEvent.doubleClick(firstRow);

    expect(screen.getByText("Edit Item")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Item")).toBeInTheDocument();
  });

  it("should pass correct item data to edit dialog", () => {
    render(<ItemTable data={mockItems} pagination={mockPagination} />);

    const firstRow = screen.getByText("Test Item");
    fireEvent.doubleClick(firstRow);

    expect(screen.getByDisplayValue("Test Item")).toBeInTheDocument();
    expect(screen.getByDisplayValue("10")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Description")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Test Notes")).toBeInTheDocument();
  });
});
