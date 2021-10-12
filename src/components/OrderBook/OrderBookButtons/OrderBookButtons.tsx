import useStyles from "./OrderBookButtonsJSS";

interface Props {
  disconnectedOnBlur: boolean;
  reconnect: () => void;
  toggleFeed: () => void;
}

const OrderBookButtons = ({
  disconnectedOnBlur,
  reconnect,
  toggleFeed,
}: Props): React.ReactElement => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      {disconnectedOnBlur && (
        <div className={classes.disconnectContainer}>
          <button className={classes.greenButton} onClick={reconnect}>
            Reconnect
          </button>
          <div className={classes.disconnectText}>
            The feed has been disconnected due to inactivity.
          </div>
        </div>
      )}
      {!disconnectedOnBlur && (
        <button className={classes.violetButton} onClick={toggleFeed}>
          Toggle feed
        </button>
      )}
    </div>
  );
};

export default OrderBookButtons;
