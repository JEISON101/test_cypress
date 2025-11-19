import { render, screen } from "@testing-library/react";
import Message from "../components/Message";

test("muestra de mensaje en pantalla", () => {
  render(<Message />);
  expect(screen.getByRole("p")).toHaveTextContent("hello");
  //expect(screen.getByText('hello')).toBeInTheDocument();
});
