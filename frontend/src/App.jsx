import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home_Page from "./pages/Home_Page";
import Groups from "./pages/Groups";
import RoundOf32 from "./pages/RoundOf32";
import Eliminator from "./pages/Eliminator";
import Bracket from "./pages/Bracket";

function App() {
  return (
    <BrowserRouter>
      <ToastContainer position="top-right" theme="colored" autoClose={3000} />
      <Routes>
        <Route path="/" element={<Home_Page />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/round-of-32" element={<RoundOf32 />} />
        <Route path="/eliminator" element={<Eliminator />} />
        <Route path="/bracket" element={<Bracket />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
