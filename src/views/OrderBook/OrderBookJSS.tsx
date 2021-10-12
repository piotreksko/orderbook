import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "1280px",
    margin: "auto",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginRight: "30%",
  },
});

export default useStyles;
