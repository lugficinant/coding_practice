import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import { IndexKind } from "typescript";

function App() {
  const [items, setItems] = React.useState([]);

  function addItem(newInput) {
    // setItems(function (pre) {
    //   console.log("123");
    //   pre.push(newInput);

    //   return pre;
    // });

    setItems(function (pre) {
      return [...pre, newInput];
    });
  }

  function deleteItem(id) {
    setItems(function (pre) {
      return pre.filter((cur, index) => index !== id);
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addItem} />
      {items.map((cur, index) => (
        <Note
          key={index}
          id={index}
          title={cur.title}
          content={cur.content}
          onAdd={deleteItem}
        />
      ))}

      <Footer />
    </div>
  );
}

export default App;

//all need to know 😎😎😎

// how to communicate between the parent and child
// ``````` lifting state up `````````😜😜😜
// 1 The parent component holds the state that needs to be shared or managed.
// 2 The parent passes both the state and a function to update the state down to the child components via props.
// 3 The child component calls the function (passed down via props) to update the parent's state when necessary.

//`````````````````````````` this case
// so in this case, paret App hold the state Items and function addItem and deleteItem
// but child will decide when to add and delete in event onClick
// so App just pass these item when component is created as props into child. 😘😘😘
// so child can define how to use those function or state in their own component function !!!!!!!!😜😜😜

// extra tips, it cant be reversed !!!😒😒😒

// In React, the data flow is unidirectional, meaning it flows from parent to child.
// The parent can pass props (which can include functions) to the child, but the parent cannot directly manipulate the child's internal state or call the child's internal functions
// unless those functions are passed up to the parent through a mechanism like callback functions or refs.
