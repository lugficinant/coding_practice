import React, { useState } from "react";

function ToDoItem(props) {
  const [isClicked, setClicked] = useState(false);

  //dynami style function
  function beClicked() {
    return {
      color: isClicked ? "red" : "black",
      textDecoration: isClicked ? "line-through" : null,
    };
  }
  function toClick() {
    setClicked(!isClicked);
  }

  return (
    <div>
      {/* put your dynamic style here */}
      {/* notice, one is immedia call function when render for style 
      one is callback function when click 😎😎 */}
      <li style={beClicked()} onClick={toClick}>
        {props.text}
      </li>
    </div>
  );
}

export default ToDoItem;
