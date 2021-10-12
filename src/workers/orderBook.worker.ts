import { Order, RawOrder, WSSnapshot } from "src/types/orderBook.type";
import {
  DEFAULT_PRODUCT_ID,
  EventType,
  FeedTypes,
  ProductId,
  WorkerMessages,
  WS_ENDPOINT,
} from "../constants/orderBookWebSocket.const";

const SIXTY_SECONDS = 6000;

class OrderBookWebSocket {
  private ws: WebSocket;
  private subscribedProductId = <ProductId>"";
  private orderBook = { asks: [] as Order[], bids: [] as Order[] };
  private lastOrderBookPost: Date;
  private throttleMs = 500;
  private pingInterval: ReturnType<typeof setInterval> = null;
  private isClosed = false;

  constructor() {
    this.init(DEFAULT_PRODUCT_ID);
  }

  private init = (initialProductId: ProductId): void => {
    const ws = new WebSocket(WS_ENDPOINT);
    this.ws = ws;
    ws.onopen = () => {
      this.isClosed = false;
      this.subscribe(initialProductId);
      this.pingInterval = setInterval(() => {
        if (this.subscribedProductId && !this.isClosed) {
          this.ws.send("Keep alive");
        }
      }, SIXTY_SECONDS);
    };
    ws.onmessage = (event) => {
      this.onMessage(event);
    };
    ws.onclose = () => {
      clearInterval(this.pingInterval);
      this.isClosed = true;
    };
    ws.onerror = (error) => {
      this.ws.close();
      throw error;
    };
  };

  private generateMessage = (
    event: EventType,
    productId: ProductId
  ): string => {
    return JSON.stringify({
      event,
      feed: "book_ui_1",
      product_ids: [productId],
    });
  };

  public subscribe = (productId: ProductId): void => {
    if (this.isClosed) {
      this.init(productId);
    } else {
      const message = this.generateMessage(EventType.subscribe, productId);
      this.subscribedProductId = productId;
      this.ws.send(message);
    }
  };

  private unsubscribeCurrentProduct = (): void => {
    const message = this.generateMessage(
      EventType.unsubscribe,
      this.subscribedProductId
    );
    this.ws.send(message);
  };

  public toggleFeed = (productId: ProductId): void => {
    this.unsubscribeCurrentProduct();
    this.subscribe(productId);
  };

  public closeSubscription = (): void => {
    if (this.subscribedProductId) {
      this.unsubscribeCurrentProduct();
      this.subscribedProductId = null;
    }
  };

  private onMessage = (rawData: MessageEvent): void => {
    try {
      const timestamp = new Date();
      const data: WSSnapshot = JSON.parse(rawData.data);
      const hasAsksOrBids = data.asks || data.bids;
      if (data?.feed === FeedTypes.book_ui_1_snapshot) {
        this.saveSnapshot(data);
        this.lastOrderBookPost = timestamp;
      }
      if (data?.feed === FeedTypes.book_ui_1 && hasAsksOrBids) {
        this.aggregateOrderBook(data);
      }
      const lastPostTime = this.lastOrderBookPost?.getTime();
      const nextPostTimeStamp =
        lastPostTime && new Date(lastPostTime + this.throttleMs);
      if (timestamp > nextPostTimeStamp || !lastPostTime) {
        this.postOrderBookUpdate();
        this.lastOrderBookPost = timestamp;
      }
    } catch (err) {
      throw new Error(err);
    }
  };

  private postOrderBookUpdate = (): void => {
    self.postMessage({
      type: WorkerMessages.update_orderbook,
      orderBook: this.orderBook,
    });
  };

  private formatRawData = (data: RawOrder[]): Order[] =>
    data.map(([price, size]) => ({ price, size }));

  private aggregateOrderBook = (data: WSSnapshot): void => {
    const { asks: currentAsks, bids: currentBids } = this.orderBook;
    const hasAsks = data.asks?.length > 0;
    const hasBids = data.bids?.length > 0;

    if (hasAsks) {
      const orders = this.getNewOrders(
        this.formatRawData(data.asks),
        currentAsks
      );
      const sortedAsks = orders.sort((a, b) => a.price - b.price);
      const asks = sortedAsks;
      this.orderBook.asks = asks;
    }
    if (hasBids) {
      const orders = this.getNewOrders(
        this.formatRawData(data.bids),
        currentBids
      );
      const sortedBids = orders.sort((a, b) => b.price - a.price);
      const bids = sortedBids;
      this.orderBook.bids = bids;
    }
  };

  private getNewOrders = (
    newOrders: Order[],
    previousOrders: Order[]
  ): Order[] => {
    const orderPricesToRemove = newOrders.map(({ price }) => price);
    const ordersToAdd = newOrders.filter(({ size }) => size !== 0);
    const filteredOrders = previousOrders.filter(
      ({ price }) => !orderPricesToRemove.includes(price)
    );
    const orders = [...filteredOrders, ...ordersToAdd];
    return orders;
  };

  private saveSnapshot = (data: WSSnapshot): void => {
    this.orderBook = {
      asks: this.formatRawData(data.asks),
      bids: this.formatRawData(data.bids),
    };
    this.postOrderBookUpdate();
  };
}

export default OrderBookWebSocket;

export const socket = new OrderBookWebSocket();

self.addEventListener("message", (event) => {
  switch (event.data.type) {
    case WorkerMessages.toggle_feed: {
      socket.toggleFeed(event.data.productId);
      break;
    }
    case WorkerMessages.close_subscription: {
      socket.closeSubscription();
      break;
    }
    case WorkerMessages.subscribe: {
      socket.subscribe(event.data.productId);
      break;
    }
  }
});
