import LoginPage from "./pages/LoginPage";
import UserProfile from "./pages/userProfile";
import Examination from "./pages/Examination";
import SearchByKeyWord from "./pages/SearchByKeyWord";
import Case from "./pages/Case";
import Navbar from "./components/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          exact
          path="/:username/:medicalInfoID"
          element={<Examination />}
        />
        <Route exact path="/record" element={<SearchByKeyWord />} />
        <Route exact path="/record/query/:id" element={<Case />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
