import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import notes from "../notes";
//
function CreNote(props) {
  return <Note key={props.key} title={props.title} content={props.content} />;
}

const hehe = {
  title: "I am 666",
  content: "I am 666",
};

function App() {
  return (
    <div>
      <Header />
      {notes.map((cur) => CreNote(cur))}
      <Footer />
      {Note(hehe)}
    </div>
  );
}

export default App;
