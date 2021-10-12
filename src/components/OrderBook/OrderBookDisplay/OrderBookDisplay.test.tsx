import { render, screen } from "@testing-library/react";
import mockOrderBook from "src/tests/mocks/mockOrderBook";

import OrderBookDisplay from "./OrderBookDisplay";

describe("OrderBookDisplay", () => {
  it("should render OrderBookSpread", () => {
    render(<OrderBookDisplay orderBook={mockOrderBook} isMobile={true} />);
    const spreadText = screen.queryByText("Spread", { exact: false });
    expect(spreadText).toBeInTheDocument();
  });

  it("should not render OrderBookSpread", () => {
    render(<OrderBookDisplay orderBook={mockOrderBook} isMobile={false} />);
    const spreadText = screen.queryByText("Spread", { exact: false });
    expect(spreadText).toBeNull();
  });
});
