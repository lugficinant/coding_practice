import React from "react";
//CHALLENGE: Make this app work by applying what you've learnt.
//1. When new text is written into the input, its state should be saved.
//2. When the add button is pressed, the current data in the input should be
//added to an array.
//3. The <ul> should display all the array items as <li>s

//``````````````````````````
// flow chart
// how many states do we need
// how to inspect change
// how to update change
// how then change will effect our page when rerender 😎😎😎
function App() {
  const [keeperState, setKeeperState] = React.useState({
    // for this inpu state, its tracking our input on real time 😎😎😎
    // we use this real time input date to dispaly on "input" ele
    // of cause we can use it as a date😜😜😜
    inpu: "",
    //
    toDo: ["123", "456"],
  });

  //handle change
  function handleChaneg(event) {
    //first check change from event
    const { name, value } = event.target;

    //update state
    console.log(keeperState.inpu);
    setKeeperState(function (pre) {
      return {
        ...pre,
        //we label a tag by name using to update change
        [name]: value,
      };
    });
  }
  //
  function handleClick(event) {
    event.preventDefault();
    keeperState.toDo.push(keeperState.inpu);
    // add something to array
    console.log(keeperState.toDo);
    //after adding we just need to update😎😎😎
    setKeeperState(function (pre) {
      return {
        ...pre,
      };
    });
  }
  //
  function creItem(item) {
    return <li>{item}</li>;
  }
  //
  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input
          type="text"
          name="inpu"
          value={keeperState.inpu}
          onChange={handleChaneg}
        />
        <button name="submit" onClick={handleClick}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>{keeperState.toDo.map((cur) => creItem(cur))}</ul>
      </div>
    </div>
  );
}

export default App;
