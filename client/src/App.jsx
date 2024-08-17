import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import LiveEvent from "./pages/liveevent/liveEvent";
// import TreeStructure from "./pages/flowchart/FlowChart";

function App() {
  return (
    <>
      <LiveEvent />
      {/* <TreeStructure/> */}
    </>
  );
}

export default App;
