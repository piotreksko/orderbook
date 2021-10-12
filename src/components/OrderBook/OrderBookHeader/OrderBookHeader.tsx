import { OrderBook } from "src/types/orderBook.type";
import useStyles from "./OrderBookHeaderJSS";
import OrderBookSpread from "../OrderBookSpread/OrderBookSpread";

interface Props {
  orderBook: OrderBook;
  isMobile: boolean;
}

const OrderBookHeader = ({
  orderBook,
  isMobile,
}: Props): React.ReactElement => {
  const styles = useStyles();
  return (
    <div className={styles.container}>
      <div className={styles.header}>Order Book</div>
      {!isMobile && <OrderBookSpread orderBook={orderBook} />}
      <div className={styles.header} />
    </div>
  );
};

export default OrderBookHeader;
