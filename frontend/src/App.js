import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import User from "./components/User";
import Songs from "./components/Songs";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/artists" element={<User />} />
          <Route path="/songs" element={<Songs />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
