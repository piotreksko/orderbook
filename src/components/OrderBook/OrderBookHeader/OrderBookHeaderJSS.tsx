import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    justifyContent: "space-between",
    margin: ".5rem 0",
  },
  header: {
    color: "white",
    textAlign: "left",
    width: "100%",
    display: "flex",
    alignItems: "center",
  },
});

export default useStyles;
