import { OrderBook } from "src/types/orderBook.type";
import useStyles from "./OrderBookSpreadJSS";

interface Props {
  orderBook: OrderBook;
}

const OrderBookSpread = ({ orderBook }: Props): React.ReactElement => {
  const styles = useStyles();
  const highestBid = orderBook.bids?.[0]?.price;
  const lowestAsk = orderBook.asks?.[0]?.price;
  if (!highestBid || !lowestAsk) {
    return null;
  }
  const spread = (Number(lowestAsk) - Number(highestBid)).toFixed(1);
  const spreadPercentage = (
    (1 - Number(highestBid) / Number(lowestAsk)) *
    100
  ).toFixed(2);
  const displayedSpread = `Spread ${spread} (${spreadPercentage}%)`;

  return (
    <div className={styles.spreadContainer}>
      <span>{displayedSpread}</span>
    </div>
  );
};

export default OrderBookSpread;
