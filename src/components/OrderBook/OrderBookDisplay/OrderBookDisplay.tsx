import OrderBookTable from "../OrderBookTable/OrderBookTable";
import useStyles from "./OrderBookDisplayJSS";
import {
  OrderBook,
  Order,
  OrderWithTotal,
} from "../../../types/orderBook.type";
import OrderBookSpread from "../OrderBookSpread/OrderBookSpread";

interface Props {
  orderBook: OrderBook;
  isMobile: boolean;
}

const OrderBookDisplay = ({
  orderBook,
  isMobile,
}: Props): React.ReactElement => {
  const classes = useStyles();
  const ordersNumber = isMobile ? 12 : 20;

  const getOrdersWithTotal = (orders: Order[] = []): OrderWithTotal[] => {
    let previousTotal = 0;
    return orders.slice(0, ordersNumber).map((order) => {
      const total = Math.round(previousTotal + order.size);
      previousTotal = total;
      return {
        ...order,
        total,
      };
    });
  };

  const asksWithTotal = getOrdersWithTotal(orderBook.asks);
  const bidsWithTotal = getOrdersWithTotal(orderBook.bids);

  if (asksWithTotal.length < 1 && bidsWithTotal.length < 1) {
    return null;
  }

  const asksMaxTotal = asksWithTotal[ordersNumber - 1].total;
  const bidsMaxTotal = bidsWithTotal[ordersNumber - 1].total;
  const maxTotal = Math.max(asksMaxTotal, bidsMaxTotal);

  return (
    <div className={classes.container}>
      <OrderBookTable
        orders={bidsWithTotal}
        maxTotal={maxTotal}
        isMobile={isMobile}
      />
      {isMobile && <OrderBookSpread orderBook={orderBook} />}
      <OrderBookTable
        orders={asksWithTotal}
        maxTotal={maxTotal}
        isMobile={isMobile}
        isAsksTable
      />
    </div>
  );
};

export default OrderBookDisplay;
