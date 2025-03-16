import React, { useState } from "react";

function InputArea(props) {
  const [inputText, setInputText] = useState("");

  function handleChange(event) {
    const inputValue = event.target.value;
    setInputText(inputValue);
  }

  return (
    <div className="form">
      <input onChange={handleChange} type="text" value={inputText} />
      <button
        onClick={function () {
          props.onAdd(inputText);
        }}
      >
        <span>Add</span>
      </button>
    </div>
  );
}

export default InputArea;
