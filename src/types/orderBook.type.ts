import { ProductId } from "src/constants/orderBookWebSocket.const";

export type Order = {
  price: number;
  size: number;
};

export type RawOrder = [number, number];

export interface WSSnapshot {
  product_id: ProductId;
  numLevels: number;
  feed: string;
  bids: RawOrder[];
  asks: RawOrder[];
}

export interface FormattedData {
  price: number;
  size: number;
}

export interface OrderBook {
  asks: Order[];
  bids: Order[];
}

export interface OrderWithTotal {
  price: number;
  size: number;
  total: number;
}
