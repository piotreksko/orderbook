import { createUseStyles } from "react-jss";
import COLORS from "src/constants/colors";
import { SMALL_SCREEN_MEDIA_QUERY } from "src/utils/styles";

const useStyles = createUseStyles({
  table: {
    borderCollapse: "collapse",
    width: "100%",
    maxWidth: "900px",
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    display: "flex",
    color: "grey",
    width: "100%",
    justifyContent: "space-between",
    border: `1px solid ${COLORS.dark}`,
    borderLeft: "none",
    borderRight: "none",
    padding: "2px 0",
  },
  body: {
    display: "flex",
    flexDirection: "column",
  },
  cell: {
    textAlign: "center",
    width: "100%",
  },
  [SMALL_SCREEN_MEDIA_QUERY]: {
    body: {
      flexDirection: "column-reverse",
    },
  },
});

export default useStyles;
