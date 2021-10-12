import { useEffect, useState } from "react";
import useStyles from "./OrderBookJSS";
import OrderBookDisplay from "src/components/OrderBook/OrderBookDisplay/OrderBookDisplay";
import OrderBookHeader from "src/components/OrderBook/OrderBookHeader/OrderBookHeader";
import OrderBookButtons from "src/components/OrderBook/OrderBookButtons/OrderBookButtons";
import useOrderBookWorker from "src/hooks/useOrderBookWorker";
import {
  ProductId,
  WorkerMessages,
} from "../../constants/orderBookWebSocket.const";
import useIsMobile from "src/hooks/useIsMobile";

const OrderBook = (): React.ReactElement => {
  const classes = useStyles();
  const isMobile = useIsMobile();
  const [disconnectedOnBlur, setDisconnectedOnBlur] = useState(false);
  const [subscribedProduct, setSubscribedProduct] = useState(
    ProductId.pi_ethusd
  );
  const { worker, orderBook } = useOrderBookWorker();

  const reconnect = (): void => {
    setDisconnectedOnBlur(false);
    worker.postMessage({
      type: WorkerMessages.subscribe,
      productId: subscribedProduct,
    });
  };

  const toggleFeed = (): void => {
    const toSubscribe =
      subscribedProduct === ProductId.pi_ethusd
        ? ProductId.pi_xbtusd
        : ProductId.pi_ethusd;

    worker.postMessage({
      type: WorkerMessages.toggle_feed,
      productId: toSubscribe,
    });

    setSubscribedProduct(toSubscribe);
  };

  const onLostFocus = (): void => {
    if (!disconnectedOnBlur) {
      worker.postMessage({
        type: WorkerMessages.close_subscription,
      });
      setDisconnectedOnBlur(true);
    }
  };

  useEffect(() => {
    window.addEventListener("visibilitychange", onLostFocus);
    return () => {
      window.removeEventListener("visibilitychange", onLostFocus);
    };
  });

  return (
    <div className={classes.container}>
      <OrderBookHeader orderBook={orderBook} isMobile={isMobile} />

      <OrderBookDisplay orderBook={orderBook} isMobile={isMobile} />

      <OrderBookButtons
        disconnectedOnBlur={disconnectedOnBlur}
        reconnect={reconnect}
        toggleFeed={toggleFeed}
      />
    </div>
  );
};

export default OrderBook;
