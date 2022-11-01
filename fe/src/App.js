<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> d4b24b26 (..)
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/userProfile';
import Examination from './pages/Examination';
import SearchByKeyWord from './pages/SearchByKeyWord'
import Case from './pages/Case';
<<<<<<< HEAD
import Navbar from './components/Navbar'
=======
import LoginPage from "./pages/LoginPage";
import UserProfile from "./pages/userProfile";
import Examination from "./pages/Examination";
import SearchByKeyWord from "./pages/SearchByKeyWord";
import Case from "./pages/Case";
import Navbar from "./components/navbar";
>>>>>>> 42bfe293 (merge)
=======
import AuthorizationList from './pages/AuthorizationList';
<<<<<<< HEAD
import Navbar from './components/Navbar'
>>>>>>> d4b24b26 (..)
=======
import Navbar from './components/navbar'
>>>>>>> 8b92306e (Front-end: GUI Authorization List)
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
    <Navbar/>
      <Routes>
<<<<<<< HEAD
          <Route exact path="/:username/:medicalInfoID" element={<Examination />} />
          <Route exact path="/record" element={<SearchByKeyWord />} />
          <Route exact path="/record/query/:id" element={<Case />} />
=======
=======
      {/* <Navbar /> */}
      {/* <Routes>
>>>>>>> 8b92306e (Front-end: GUI Authorization List)
        <Route
          exact
          path="/:username/:medicalInfoID"
          element={<Examination />}
        />
        <Route exact path="/record" element={<SearchByKeyWord />} />
        <Route exact path="/record/query/:id" element={<Case />} /> */}
      <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path ="/authlist" element={<AuthorizationList />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route exact path="/:username/:medicalInfoID" element={<Examination />} />
          <Route exact path="/record" element={<SearchByKeyWord />} />
          <Route exact path="/medinfo/patient_query_medicalinfo/:medID" element={<Case />} />
>>>>>>> d4b24b26 (..)
      </Routes>
    </BrowserRouter>
  );
}
export default App;
