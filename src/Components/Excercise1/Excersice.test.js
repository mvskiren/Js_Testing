import { render, screen, within, act, cleanup } from "@testing-library/react";
import user from "@testing-library/user-event";
import Excercise from "./Excercise";
import { prettyDOM } from "@testing-library/dom";

afterEach(cleanup);

// ARRANGE
//ACT
//ASSERT
// Debug- screen.debug()

test("components renders without errors", async () => {
  ////////////////ARRANGE
  user.setup();
  render(<Excercise />);
  const displayElement = screen.getByText((content) =>
    content.startsWith("Total Amount:")
  );
  //Test display value should be zero on Initial Render
  const displayValue = screen.getByTestId("amountValue");
  //Input textbox test
  const amountInputTextbox = screen.getByRole("textbox", {
    name: /enter amount :/i,
  });
  // checbox test unchecked
  const amountInputTerms = screen.getByRole("checkbox");
  // button text test
  const amountInputButton = screen.getByRole("button", {
    name: /submit/i,
  });
  const bonusButton = screen.getByRole("button", { name: /add bonus/i });

  const showLogin = await screen.findByRole(
    "heading",
    {
      name: /user loggedin/i,
    },
    {
      timeout: 2500,
    }
  );
  // Case to check if element is not present in DOM by query
  const Instances = screen.queryByTestId("instances");

  ////////////////////// ASSERT
  expect(Instances).not.toBeInTheDocument();
  expect(displayValue).toHaveTextContent("0");
  expect(amountInputTextbox).toHaveValue("");
  expect(amountInputTerms).not.toBeChecked();
  expect(amountInputButton).toBeDisabled();
  expect(displayElement).toBeInTheDocument(true);
  expect(showLogin).toBeInTheDocument();
});

test("click on bonus button should add one to current amount", async () => {
  user.setup();
  render(<Excercise />);
  const bonusButton = screen.getByRole("button", { name: /add bonus/i });
  await user.click(bonusButton);
  const currentDisplayValue = screen.getByTestId("amountValue");
  expect(currentDisplayValue).toHaveTextContent("1");
});

test("render all the available list items on clicking show button", async () => {
  user.setup();
  render(<Excercise />);
  const testList = ["prod", "dev"];
  const showInstances = screen.getByRole("button", {
    name: /click here to show/i,
  });
  await user.click(showInstances);
  const list = screen.getAllByRole("listitem");
  expect(list.length).toEqual(testList.length);
  expect(list.map((item) => item.textContent)).toEqual(testList);
  expect(list.map((item) => item.textContent)).toMatchInlineSnapshot(`
      Array [
        "prod",
        "dev",
      ]
    `);
});

test("render all the post from api", async () => {
  render(<Excercise />);
  user.setup();
  const fetchPostButton = screen.getByRole("button", { name: /fetch posts/i });
  await act(() => user.click(fetchPostButton));
  const allPosts = await screen.findAllByRole("listitem", {
    timeout: 3500,
  });

  expect(allPosts).toHaveLength(3);
});
