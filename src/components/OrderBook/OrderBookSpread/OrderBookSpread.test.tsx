import { render, screen } from "@testing-library/react";
import mockOrderBook from "src/tests/mocks/mockOrderBook";

import OrderBookSpread from "./OrderBookSpread";

describe("OrderBookSpread", () => {
  it("should calculate spread", () => {
    render(<OrderBookSpread orderBook={mockOrderBook} />);
    const expectedSpread = "0.4 (0.01%)";
    const spread = screen.queryByText(expectedSpread, { exact: false });
    expect(spread).toBeInTheDocument();
  });
});
