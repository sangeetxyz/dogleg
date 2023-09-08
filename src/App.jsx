import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Account from "./components/Account";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/account" element={<Account />}></Route>
      </Routes>
      <ToastContainer/>
    </Router>
  );
}

export default App;
