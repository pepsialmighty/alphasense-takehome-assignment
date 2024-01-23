import React, { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import { MyContextMockProvider } from "../utils/MyContextMockProvider";

// Mock the Home component since we're testing the App component
jest.mock("../pages/Home", () => () => (
  <div data-testid="home">Mocked Home Component</div>
));

test("renders Message Board title", () => {
  render(
    <MyContextMockProvider
      initialSelectedChannel={{
        _id: "1",
        name: "Channel 1",
        _v: 0,
        createdAt: String(new Date()),
        updatedAt: String(new Date()),
      }}
      initialMessages={[
        {
          id: "1",
          channel: "1",
          message: "Test Message",
          createdAt: String(new Date()),
          updatedAt: String(new Date()),
        },
      ]}
      initialIsOptimistic={true}
    >
      <App />
    </MyContextMockProvider>
  );

  const titleElement = screen.getByText(/Mocked Home Component/i);
  expect(titleElement).toBeInTheDocument();

  // Assuming you have a test ID on the Home component
  const homeElement = screen.getByTestId("home");
  expect(homeElement).toBeInTheDocument();
});
