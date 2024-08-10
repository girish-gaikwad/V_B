import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import TreeStructure from "./Pages/FlowChart";
import LiveEvent from "./Pages/LiveEvent";
import Demo from "./Pages/Demo";
import GoogleLoginButton from "./Pages/Login";

function App() {
  return (
    <>
    <LiveEvent/>
{/* <GoogleLoginButton/> */}
    </>
  );
}

export default App;
