import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import CreateTask from "./components/CreateTask";
import ViewTask from "./components/ViewTask";
import UpdateTask from "./components/UpdateTask";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/create-task" element={<CreateTask />} />
        <Route path="/view-task" element={<ViewTask />} />
        <Route path="/update-task" element={<UpdateTask />} />
      </Routes>
    </>
  );
};

export default App;
