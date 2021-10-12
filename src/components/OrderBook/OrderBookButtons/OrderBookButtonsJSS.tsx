import { createUseStyles } from "react-jss";
import COLORS from "src/constants/colors";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "1rem",
  },
  button: {
    width: "8rem",
    height: "2rem",
    color: "white",
    borderRadius: "4px",
    border: "none",
  },
  violetButton: {
    composes: "$button",
    backgroundColor: COLORS.violet,
  },
  greenButton: {
    composes: "$button",
    backgroundColor: COLORS.positive1,
  },
  disconnectContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  disconnectText: {
    color: "white",
  },
});

export default useStyles;
