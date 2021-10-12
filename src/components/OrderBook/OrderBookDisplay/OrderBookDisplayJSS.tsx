import { createUseStyles } from "react-jss";
import { SMALL_SCREEN_MEDIA_QUERY } from "src/utils/styles";

const useStyles = createUseStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    margin: "auto",
    width: "100%",
  },
  [SMALL_SCREEN_MEDIA_QUERY]: {
    container: {
      flexDirection: "column-reverse",
    },
  },
});

export default useStyles;
