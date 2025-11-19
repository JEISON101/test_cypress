import Message from "../components/Message";

describe("<Message/>", () => {
  it("mostrar", () => {
    cy.mount(<Message />);
    cy.contains("hello");
  });
});
