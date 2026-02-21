import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import Dashboard from "./components/dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
