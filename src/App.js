import { useState } from "react";
import "./App.css";
import Details from "./components/Details";
import { Tiptap } from "./components/TipTap";

function App() {
  const [description, setDescription] = useState("");

  return (
    <div className="App">
      <div className="textEditor">
        <Tiptap setDescription={setDescription} />
      </div>
      <div className="Details">
        <Details description={description} />
      </div>
    </div>
  );
}

export default App;
