<<<<<<< HEAD
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile';
import Examination from './pages/Examination';
import SearchByKeyWord from './pages/SearchByKeyWord'
import Case from './pages/Case';
import AuthorizationList from './pages/AuthorizationList';
import Navbar from './components/Navbar'
=======
import LoginPage from "./pages/LoginPage";
import UserProfile from "./pages/userProfile";
import Examination from "./pages/Examination";
>>>>>>> 5a89dc1cbabb85a30d1f94474522884856efa84f
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

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
<<<<<<< HEAD
          <Route path="/" element={<LoginPage />} />
          <Route path ="/authlist" element={<AuthorizationList />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route exact path="/:username/:medicalInfoID" element={<Examination />} />
          <Route exact path="/record" element={<SearchByKeyWord />} />
          <Route exact path="/medinfo/patient_query_medicalinfo/:medID" element={<Case />} />
=======
        <Route path="/" element={<UserProfile />} />
        <Route path="/:username/:medicalInfoID" element={<Examination />} />
>>>>>>> 5a89dc1cbabb85a30d1f94474522884856efa84f
      </Routes>
    </BrowserRouter>
  );
}
export default App;
