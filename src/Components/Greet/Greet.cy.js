import React from "react";
import Greet from "./Greet/Greet";

describe("<Greet />", () => {
  it("renders", () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<Greet />);
  });
});
