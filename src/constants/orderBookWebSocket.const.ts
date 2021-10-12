export enum ProductId {
  pi_ethusd = "PI_ETHUSD",
  pi_xbtusd = "PI_XBTUSD",
}

export enum EventType {
  subscribe = "subscribe",
  unsubscribe = "unsubscribe",
}

export const FeedTypes = {
  book_ui_1: "book_ui_1",
  book_ui_1_snapshot: "book_ui_1_snapshot",
};

export const WorkerMessages = {
  update_orderbook: "update_orderbook",
  toggle_feed: "toggle_feed",
  close_subscription: "close_subscription",
  subscribe: "subscribe",
};

export const DEFAULT_PRODUCT_ID = ProductId.pi_ethusd;
export const WS_ENDPOINT = "wss://www.cryptofacilities.com/ws/v1";
