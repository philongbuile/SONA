import UserProfile from "./pages/UserProfile";
import Examination from "./pages/Examination";
import SearchByKeyWord from "./pages/SearchByKeyWord";
import Case from "./pages/Case";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import UserProfile from "./pages/userProfile";
import Examination from "./pages/Examination";
import SearchByKeyWord from "./pages/SearchByKeyWord";
import Case from "./pages/Case";
import AuthorizationList from "./pages/AuthorizationList";
import Navbar from "./components/navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      {/* <Routes>
        <Route
          exact
          path="/:username/:medicalInfoID"
          element={<Examination />}
        />
        <Route exact path="/record" element={<SearchByKeyWord />} />
        <Route exact path="/record/query/:id" element={<Case />} /> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route
          exact
          path="/:username/:medicalInfoID"
          element={<Examination />}
        />
        <Route exact path="/record" element={<SearchByKeyWord />} />
        <Route
          exact
          path="/medinfo/patient_query_medicalinfo/:medID"
          element={<Case />}
        />
        <Route path="/" element={<LoginPage />} />
        <Route path="/authlist" element={<AuthorizationList />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route
          exact
          path="/:username/:medicalInfoID"
          element={<Examination />}
        />
        <Route exact path="/record" element={<SearchByKeyWord />} />
        <Route
          exact
          path="/medinfo/patient_query_medicalinfo/:medID"
          element={<Case />}
        />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
