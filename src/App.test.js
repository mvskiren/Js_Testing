// import { render, screen } from "@testing-library/react";
import App from "./App";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

test("renders app component without errors", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.exists()).toBe(true);
});

test("renders counter component without errors", () => {
  const wrapper = shallow(<App />);
  expect(wrapper.exists()).toBe(true);
});

test("renders display component without errors", () => {});

test("render counter dispaly starts at 0", () => {});

test("clicking button inc counter display", () => {});

// RTL
// render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
