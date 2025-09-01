import { Routes, Route } from "react-router-dom";
import Layout from "./pages/layout";
import { Login, Signup } from "./pages/Auth";
import Projects from "./pages/Projects";
import "./index.css";
import Teams from "./pages/Teams";
import Tasks from "./pages/Tasks";
import { ProtectedRoutes } from "./protectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoutes>
              <Layout />
            </ProtectedRoutes>
          }
        >
          <Route path="/projects" element={<Projects />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>
        <Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
