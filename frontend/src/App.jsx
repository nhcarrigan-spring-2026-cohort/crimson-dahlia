import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Dashboard from "./components/dashboard";
import Profile from "./components/Profile";
import MyTasks from "./components/MyTasks";
import HelpRequest from "./components/HelpRequest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-tasks" element={<MyTasks />} />
        <Route path="/help-request" element={<HelpRequest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

