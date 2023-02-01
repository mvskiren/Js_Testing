import React from "react";
import { useState, useRef, useEffect } from "react";

function Excercise() {
  const bonusValue = 1;
  const [amount, setAmount] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const testList = ["prod", "dev"];

  const [showInstances, setShowInstances] = useState(false);

  const [posts, setPosts] = useState([]);

  const [showPost, setShowPost] = useState(false);

  const [loading, setLoading] = useState(null);

  const [showLogin, setShowLogin] = useState(false);

  const amountRef = useRef(0);

  useEffect(() => {
    setTimeout(() => {
      setShowLogin(true);
    }, 2000);
  }, []);

  const incBonus = () => {
    setAmount((amount) => amount + bonusValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAmount((amount) => amount + Number(amountRef.current.value));
  };

  const fetchPosts = async () => {
    setShowPost(true);
    setLoading(true);
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();
      console.log(data, "This is data");
      setPosts(data);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  };
  if (posts.length > 0)
    console.log(posts, posts.length > 0 && loading == false);

  return (
    <>
      {showLogin && <h2>User LoggedIn</h2>}
      <h1>
        Total Amount:<span data-testid="amountValue">{amount}</span>
      </h1>
      <form>
        <label htmlFor="amount">Enter Amount : </label>
        <input type="text" name="amount" id="amount" ref={amountRef} />
        <br />
        <br />
        <label htmlFor="amount">Terms and conditions </label>
        <input
          type="checkbox"
          name="terms"
          id="terms"
          onChange={() => {
            setIsChecked((val) => !val);
            setIsButtonDisabled((val) => !val);
          }}
          checked={isChecked}
        />
        <br />
        <br />
        <input
          type="submit"
          value="submit"
          disabled={isButtonDisabled}
          onClick={handleSubmit}
        />
      </form>
      <br />
      <button data-testid="bonus" onClick={incBonus}>
        Add Bonus
      </button>
      <br />
      <h1>SCENARIO :2 [LIST OF ITEMS]</h1>
      <h3>Available Instances in Project: </h3>
      <button onClick={() => setShowInstances((value) => !value)}>
        Click here to show
      </button>
      {showInstances && (
        <ul role="list" style={{ display: "flex", gap: "20px" }}>
          {testList.map((item, index, arr) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )}
      <h1>SCENARIO :3 [FETCH DATA - MOCK MSW]</h1>
      <button onClick={fetchPosts}>Fetch Posts</button>
      <ul role="posts">
        {showPost && posts.length > 0 && loading == false ? (
          posts.slice(0, 3).map((item, index) => (
            <>
              <li key={item.title[0]}>{item.title.slice(0, 3)}</li>
            </>
          ))
        ) : showPost && loading ? (
          <span>Loading...</span>
        ) : (
          ""
        )}
      </ul>
    </>
  );
}

export default Excercise;
