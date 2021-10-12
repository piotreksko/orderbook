import { OrderWithTotal } from "src/types/orderBook.type";
import OrderBookRow from "../OrderBookRow/OrderBookRow";
import useStyles from "./OrderBookTableJSS";

export enum Column {
  price = "price",
  size = "size",
  total = "total",
}

interface Props {
  orders: OrderWithTotal[];
  maxTotal: number;
  isAsksTable?: boolean;
  isMobile: boolean;
}

export const columns = [Column.price, Column.size, Column.total];

const OrderBookTable = (props: Props): React.ReactElement => {
  const styles = useStyles();
  const { orders, maxTotal, isAsksTable, isMobile } = props;
  const reverseColumns = !isAsksTable && !isMobile;
  const columnsToRender = reverseColumns ? [...columns].reverse() : columns;

  const ordersToRender =
    isMobile && !isAsksTable ? [...orders].reverse() : orders;
  const hideHeader = isMobile && !isAsksTable;

  return (
    <table className={styles.table}>
      {!hideHeader && (
        <thead>
          <tr className={styles.heading}>
            {columnsToRender.map((column) => (
              <th key={column} className={styles.cell}>
                {column.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody className={styles.body}>
        {ordersToRender.map((order) => (
          <OrderBookRow
            key={order.price}
            columns={columnsToRender}
            order={order}
            maxTotal={maxTotal}
            isAsksTable={isAsksTable}
            isMobile={isMobile}
          />
        ))}
      </tbody>
    </table>
  );
};

export default OrderBookTable;
