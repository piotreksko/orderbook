import { useState, useRef, useEffect } from "react";
import { WorkerMessages } from "src/constants/orderBookWebSocket.const";
import { OrderBook } from "src/types/orderBook.type";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import orderBookWorker from "workerize-loader!../workers/orderBook.worker";

export interface OrderBookHook {
  orderBook: OrderBook;
  worker: Worker;
}

export const useOrderBookWorker = (): OrderBookHook => {
  const [orderBook, setOrderBook] = useState(<OrderBook>{});
  const worker = useRef<Worker>();

  const onMessageHandler = (event: MessageEvent): void => {
    switch (event.data.type) {
      case WorkerMessages.update_orderbook: {
        setOrderBook(event.data.orderBook);
        break;
      }
    }
  };

  useEffect(() => {
    worker.current = orderBookWorker();
    worker.current.onmessage = onMessageHandler;
  }, []);

  return { orderBook, worker: worker.current };
};

export default useOrderBookWorker;
