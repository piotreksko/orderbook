import { act, render, screen } from "@testing-library/react";
import OrderBook from "./OrderBook";
import mockOrderBook from "src/tests/mocks/mockOrderBook";
import {
  ProductId,
  WorkerMessages,
} from "src/constants/orderBookWebSocket.const";

const postMessage = jest.fn();

const mockWorker = {
  postMessage,
};

jest.mock("src/hooks/useOrderBookWorker", () => ({
  __esModule: true,
  default: () => ({
    orderBook: mockOrderBook,
    // @ts-ignore
    worker: mockWorker,
  }),
}));

describe("OrderBookTable", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it("should render 2 tables", () => {
    render(<OrderBook />);
    const headerColumns = screen.queryAllByRole("columnheader");
    expect(headerColumns.length).toEqual(6);
  });

  it("should send Toggle feed message twice", () => {
    render(<OrderBook />);
    const toggleFeedButton = screen.getByText("Toggle feed");
    toggleFeedButton.click();
    toggleFeedButton.click();

    expect(postMessage.mock.calls).toEqual([
      [
        {
          productId: ProductId.pi_xbtusd,
          type: WorkerMessages.toggle_feed,
        },
      ],
      [
        {
          productId: ProductId.pi_ethusd,
          type: WorkerMessages.toggle_feed,
        },
      ],
    ]);
  });

  it("should unsubscribe and show reconnect on blur", () => {
    render(<OrderBook />);

    const reconnectButton = screen.queryByText("Reconnect");
    expect(reconnectButton).toBeNull();

    act(() => {
      window.dispatchEvent(new Event("visibilitychange"));
    });

    expect(postMessage).toHaveBeenCalledWith({
      type: WorkerMessages.close_subscription,
    });

    const renderedReconnectButton = screen.queryByText("Reconnect");
    expect(renderedReconnectButton).toBeInTheDocument();

    act(() => {
      renderedReconnectButton.click();
    });

    expect(postMessage.mock.calls).toEqual([
      [
        {
          type: WorkerMessages.close_subscription,
        },
      ],
      [
        {
          type: WorkerMessages.subscribe,
          productId: ProductId.pi_ethusd,
        },
      ],
    ]);
  });
});
