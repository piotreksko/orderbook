import { createUseStyles } from "react-jss";
import COLORS from "src/constants/colors";

export const tableRow = (
  width: string,
  isAsksTable: boolean,
  isMobile: boolean
): { background: string } => {
  const direction = isAsksTable || isMobile ? "to right" : "to left";
  const color = isAsksTable ? COLORS.negative2 : COLORS.positive2;
  return {
    background: `linear-gradient(${direction}, ${color} ${width}%, ${COLORS.black} ${width}%)`,
  };
};

const useStyles = createUseStyles({
  row: {
    color: "white",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "flex-start",
    textAlign: "right",
    padding: "4px 0",
  },
  cell: {
    textAlign: "center",
    width: "100%",
  },
});

export default useStyles;
