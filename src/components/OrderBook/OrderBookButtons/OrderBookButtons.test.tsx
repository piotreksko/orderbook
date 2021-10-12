import { render, screen } from "@testing-library/react";

import OrderBookButtons from "./OrderBookButtons";

const reconnect = jest.fn();
const toggleFeed = jest.fn();

describe("OrderBookButtons", () => {
  it("should render Toggle Button and not Reconnect Button", () => {
    render(
      <OrderBookButtons
        disconnectedOnBlur={false}
        reconnect={reconnect}
        toggleFeed={toggleFeed}
      />
    );

    const toggleButtonText = screen.queryByText("Toggle feed");
    const reconnectButtonText = screen.queryByText("Reconnect");
    expect(toggleButtonText).toBeInTheDocument();
    expect(reconnectButtonText).toBeNull();
  });

  it("should render Reconnect Button and not Toggle Button", () => {
    render(
      <OrderBookButtons
        disconnectedOnBlur={true}
        reconnect={reconnect}
        toggleFeed={toggleFeed}
      />
    );

    const toggleButtonText = screen.queryByText("Toggle feed");
    const reconnectButtonText = screen.queryByText("Reconnect");
    expect(toggleButtonText).toBeNull();
    expect(reconnectButtonText).toBeInTheDocument();
  });
});
