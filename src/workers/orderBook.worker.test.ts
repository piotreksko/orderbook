import WS from "jest-websocket-mock";
import {
  DEFAULT_PRODUCT_ID,
  EventType,
  FeedTypes,
  WorkerMessages,
  WS_ENDPOINT,
} from "src/constants/orderBookWebSocket.const";
import mockOrderBookSnapshot from "src/tests/mocks/mockOrderBookSnapshot";
import OrderBookWebSocket from "./orderBook.worker";

const server = new WS(WS_ENDPOINT);

const postMessageMock = jest.fn();

self.postMessage = postMessageMock;

const snapshotPostMessage = {
  orderBook: {
    asks: [
      { price: 3524.05, size: 100 },
      { price: 3524.1, size: 2500 },
      { price: 3524.2, size: 1011 },
    ],
    bids: [
      { price: 3522.45, size: 1000 },
      { price: 3522.4, size: 1236 },
      { price: 3522.35, size: 1000 },
    ],
  },
  type: WorkerMessages.update_orderbook,
};

const initialMessage = JSON.stringify({
  event: EventType.subscribe,
  feed: "book_ui_1",
  product_ids: [DEFAULT_PRODUCT_ID],
});

describe("orderBook.worker", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("should connect and subscribe to default product on creation", async () => {
    new OrderBookWebSocket();
    await server.connected;

    await expect(server).toReceiveMessage(initialMessage);
    expect(server).toHaveReceivedMessages([initialMessage]);
  });

  it("should post message with snapshot", async () => {
    new OrderBookWebSocket();
    await server.connected;

    const snapshotMessage = JSON.stringify(mockOrderBookSnapshot);
    server.send(snapshotMessage);

    expect(postMessageMock).toHaveBeenCalledWith(snapshotPostMessage);
  });

  it("should remove orders with no size", async () => {
    new OrderBookWebSocket();
    await server.connected;

    const snapshotMessage = JSON.stringify(mockOrderBookSnapshot);

    server.send(snapshotMessage);
    expect(postMessageMock).toHaveBeenCalledWith(snapshotPostMessage);

    const updateMessage = JSON.stringify({
      feed: FeedTypes.book_ui_1,
      product_id: "PI_ETHUSD",
      bids: [],
      asks: [[3524.05, 0]],
    });
    const expectedUpdateMessage = {
      orderBook: {
        asks: [
          { price: 3524.1, size: 2500 },
          { price: 3524.2, size: 1011 },
        ],
        bids: [
          { price: 3522.45, size: 1000 },
          { price: 3522.4, size: 1236 },
          { price: 3522.35, size: 1000 },
        ],
      },
      type: WorkerMessages.update_orderbook,
    };
    server.send(updateMessage);
    expect(postMessage).toHaveBeenLastCalledWith(expectedUpdateMessage);
  });
});
