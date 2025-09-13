import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "../../../__tests__/utils/test-utils";
import { SearchInput } from "../../inputs";

const mockPush = jest.fn();
const mockReplace = jest.fn();

const mockUseRouter = jest.fn();
const mockUseSearchParams = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: () => mockUseRouter(),
  useSearchParams: () => mockUseSearchParams(),
}));

describe("SearchInput", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: mockReplace,
      refresh: jest.fn(),
    });
    mockUseSearchParams.mockReturnValue(
      new URLSearchParams("?page=1&search=existing")
    );
  });

  it("should render with placeholder", () => {
    render(<SearchInput placeholder="Search items..." />);

    expect(screen.getByPlaceholderText("Search items...")).toBeInTheDocument();
  });

  it("should display existing search value from URL params", () => {
    render(<SearchInput placeholder="Search items..." />);

    expect(screen.getByDisplayValue("existing")).toBeInTheDocument();
  });

  it("should update URL when user types", async () => {
    render(<SearchInput placeholder="Search items..." />);

    const input = screen.getByPlaceholderText("Search items...");
    await user.clear(input);
    await user.type(input, "new search");

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("?page=1&search=new+search");
    });
  });

  it("should debounce search input", async () => {
    render(<SearchInput placeholder="Search items..." />);

    const input = screen.getByPlaceholderText("Search items...");
    await user.clear(input);
    await user.type(input, "test");

    expect(mockReplace).not.toHaveBeenCalled();

    await waitFor(
      () => {
        expect(mockReplace).toHaveBeenCalledWith("?page=1&search=test");
      },
      { timeout: 500 }
    );
  });

  it("should clear search when clear button is clicked", async () => {
    render(<SearchInput placeholder="Search items..." />);

    const clearButton = screen.getByRole("button");
    await user.click(clearButton);

    expect(mockReplace).toHaveBeenCalledWith("?page=1");
    expect(screen.getByDisplayValue("")).toBeInTheDocument();
  });

  it("should not show clear button when input is empty", () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("?page=1"));

    render(<SearchInput placeholder="Search items..." />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("should reset page to 1 when searching", async () => {
    mockUseSearchParams.mockReturnValue(new URLSearchParams("?page=3"));

    render(<SearchInput placeholder="Search items..." />);

    const input = screen.getByPlaceholderText("Search items...");
    await user.clear(input);
    await user.type(input, "test");

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("?page=1&search=test");
    });
  });

  it("should handle empty search by removing search param", async () => {
    render(<SearchInput placeholder="Search items..." />);

    const input = screen.getByPlaceholderText("Search items...");
    await user.clear(input);
    await user.type(input, "   ");

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith("?page=1");
    });
  });
});
