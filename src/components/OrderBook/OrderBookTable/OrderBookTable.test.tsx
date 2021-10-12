import { render, screen } from "@testing-library/react";
import mockOrdersWithTotal from "src/tests/mocks/mockOrdersWithTotal";

import OrderBookTable from "./OrderBookTable";
const maxTotal = mockOrdersWithTotal[19].total;

describe("OrderBookTable", () => {
  it("should render all orders and header", () => {
    render(
      <OrderBookTable
        orders={mockOrdersWithTotal}
        maxTotal={maxTotal}
        isMobile
        isAsksTable
      />
    );
    const rows = screen.getAllByRole("row");
    const header = screen.getAllByRole("columnheader");
    // 1 extra for header row
    expect(rows.length).toEqual(mockOrdersWithTotal.length + 1);
    expect(header.length).toEqual(3);
  });

  it("should not render header", () => {
    render(
      <OrderBookTable
        orders={mockOrdersWithTotal}
        maxTotal={maxTotal}
        isMobile
      />
    );

    const header = screen.queryAllByRole("columnheader");
    expect(header.length).toEqual(0);
  });
});
