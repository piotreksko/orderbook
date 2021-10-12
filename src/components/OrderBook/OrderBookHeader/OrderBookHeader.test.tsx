import { render, screen } from "@testing-library/react";
import mockOrderBook from "src/tests/mocks/mockOrderBook";

import OrderBookHeader from "./OrderBookHeader";

describe("OrderBookHeader", () => {
  it("should render OrderBookSpread", () => {
    render(<OrderBookHeader orderBook={mockOrderBook} isMobile={false} />);
    const spreadText = screen.queryByText("Spread", { exact: false });
    expect(spreadText).toBeInTheDocument();
  });

  it("should not render OrderBookSpread", () => {
    render(<OrderBookHeader orderBook={mockOrderBook} isMobile={true} />);
    const spreadText = screen.queryByText("Spread", { exact: false });
    expect(spreadText).toBeNull();
  });
});
