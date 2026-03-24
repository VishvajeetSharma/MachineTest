import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateTask from "./components/CreateTask";
import ViewTask from "./components/ViewTask";
import UpdateTask from "./components/UpdateTask";
import Navbar from "./components/Navbar";
import LogOut from "./components/LogOut";
import NotFound from "./components/NotFound";
import ProtectedRoute from "./hoc/protectedRoute";
import PublicRoute from "./hoc/PublicRoute";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />


        <Route path="/create-task" element={<ProtectedRoute><CreateTask /></ProtectedRoute>} />
        <Route path="/view-task" element={<ProtectedRoute><ViewTask /></ProtectedRoute>} />
        <Route path="/update-task/:id" element={<ProtectedRoute><UpdateTask /></ProtectedRoute>} />
        <Route path="/logout" element={<ProtectedRoute><LogOut /></ProtectedRoute>} />

        <Route path="*" element={<PublicRoute><NotFound /></PublicRoute>} />
      </Routes>
    </>
  );
};

export default App;
