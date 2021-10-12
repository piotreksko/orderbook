import COLORS from "src/constants/colors";
import { OrderWithTotal } from "src/types/orderBook.type";
import {
  commaEveryThirdChar,
  formatNumberWithCommas,
} from "src/utils/formatters";
import useStyles, { tableRow } from "./OrderBookRowJSS";
import { Column } from "../OrderBookTable/OrderBookTable";

interface Props {
  order: OrderWithTotal;
  isAsksTable?: boolean;
  maxTotal: number;
  columns: Column[];
  isMobile: boolean;
}

const OrderBookRow = ({
  order,
  isAsksTable,
  maxTotal,
  columns,
  isMobile,
}: Props): React.ReactElement => {
  const styles = useStyles();
  const backgroundWidth = ((order.total * 100) / maxTotal).toFixed(1);
  const getCellStyle = (column: Column): { color?: string } => {
    if (column !== Column.price) {
      return {};
    }
    return { color: isAsksTable ? COLORS.negative1 : COLORS.positive1 };
  };

  const formatValue = (value: number, column: Column): string =>
    column === Column.price
      ? formatNumberWithCommas(value)
      : commaEveryThirdChar(value);

  return (
    <tr
      className={styles.row}
      style={tableRow(backgroundWidth, isAsksTable, isMobile)}
      key={order.price}
    >
      {columns.map((column) => (
        <td key={column} className={styles.cell} style={getCellStyle(column)}>
          {formatValue(order[column], column)}
        </td>
      ))}
    </tr>
  );
};

export default OrderBookRow;
