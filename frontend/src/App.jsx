import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import CreateAccount from "./components/CreateAccount";
import CommunityAid from "./components/CommunityAid";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/community-aid" element={<CommunityAid />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
