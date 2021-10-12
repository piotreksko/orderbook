import { render, screen } from "@testing-library/react";
import mockOrdersWithTotal from "src/tests/mocks/mockOrdersWithTotal";
import {
  commaEveryThirdChar,
  formatNumberWithCommas,
} from "src/utils/formatters";

import OrderBookRow from "./OrderBookRow";
import { columns } from "../OrderBookTable/OrderBookTable";

const testOrder = mockOrdersWithTotal[2];
const maxTotal = mockOrdersWithTotal[19].total;

describe("OrderBookRow", () => {
  it("should render row", () => {
    render(
      <table>
        <tbody>
          <OrderBookRow
            columns={columns}
            order={testOrder}
            maxTotal={maxTotal}
            isAsksTable={true}
            isMobile={true}
          />
        </tbody>
      </table>
    );
    const expectedPrice = formatNumberWithCommas(testOrder.price);
    const expectedSize = commaEveryThirdChar(testOrder.price);
    const expectedTotal = commaEveryThirdChar(testOrder.price);

    const price = screen.queryByText(expectedPrice, { exact: false });
    const size = screen.queryByText(expectedSize, { exact: false });
    const total = screen.queryByText(expectedTotal, { exact: false });

    expect(price).toBeInTheDocument();
    expect(size).toBeInTheDocument();
    expect(total).toBeInTheDocument();
  });
});
