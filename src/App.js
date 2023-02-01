import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Greet from "./Components/Greet/Greet";
import Excersice from "./Components/Excercise1/Excercise";

function App() {
  const [counter, setCounter] = useState(0);

  return (
    <div className="App">
      <Excersice />
    </div>
  );
}

export default App;

//Docker commands: docker run -rm -it --name web -p 3000:3000 -v $(pwd):/code react-docker:1.0.0dev
