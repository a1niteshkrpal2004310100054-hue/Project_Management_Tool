import { Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import { Login, Signup } from "./pages/auth";
import "./index.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}></Route>
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
