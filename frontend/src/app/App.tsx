import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "../feature/pages/LandingPage";
import Dashboard from "../feature/pages/Dashboard";
import ConnectConsole from "../feature/pages/ConnectConsole";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/connect" element={<ConnectConsole />} />
      </Routes>
    </BrowserRouter>
  );
}
