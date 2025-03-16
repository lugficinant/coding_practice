import React from "react";

function CreateArea(props) {
  const [inputAreaState, setInputAreaState] = React.useState({
    title: "",
    content: "",
  });

  function handleChange(e) {
    const { value, name } = e.target;
    // console.log(value);
    // console.log(name);
    //
    // set state is a async function
    setInputAreaState(function (pre) {
      return {
        ...pre,
        [name]: value,
      };
    });
    // set state is a async function
    // so the output value will be previous state
    // when you tye aaa, you will see aa.
    // console.log(inputAreaState.title);
  }

  return (
    <div>
      <form>
        <input
          name="title"
          placeholder="Title"
          value={inputAreaState.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          placeholder="Take a note..."
          rows="3"
          value={inputAreaState.context}
          onChange={handleChange}
        />
        <button
          onClick={(event) => {
            props.onAdd(inputAreaState);
            event.preventDefault();
          }}
        >
          Add
        </button>
      </form>
    </div>
  );
}

export default CreateArea;
