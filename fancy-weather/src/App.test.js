import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders Fancy Weather heading", () => {
  const { getByText } = render(<App />);
  const h1Element = getByText(/Fancy Weather/i);
  expect(h1Element).toBeInTheDocument();
});
