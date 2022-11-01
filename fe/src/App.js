<<<<<<< HEAD

import LoginPage from "./pages/LoginPage";
import UserProfile from "./pages/UserProfile";
import Examination from "./pages/Examination";
import SearchByKeyWord from "./pages/SearchByKeyWord";
import Case from "./pages/Case";

import AuthorizationList from './pages/AuthorizationList';
import QueryPatient from "./pages/QueryPatient";
import QueryPatientContext from "./pages/QueryPatientContext";

import Navbar from './components/Navbar'
=======
import LoginPage from './pages/LoginPage';
import UserProfile from './pages/userProfile';
import Examination from './pages/Examination';
import SearchByKeyWord from './pages/SearchByKeyWord'
import Case from './pages/Case';
import AuthorizationList from './pages/AuthorizationList';
import Navbar from './components/navbar'
>>>>>>> origin
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD

    <Navbar/>
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path ="/authlist" element={<AuthorizationList />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route exact path="/:username/:medicalInfoID" element={<Examination />} />
        <Route exact path="/record" element={<SearchByKeyWord />} />
        <Route exact path="/medinfo/patient_query_medicalinfo/:medID" element={<Case />} />
        
        <Route exact path='/operator/query_patient' element={<QueryPatient/>} />
        <Route exact path='/operator/query_patient/:patient' element={<QueryPatientContext/>} />

        <Route exact path="/medinfo/query_by_keyword" element={<SearchByKeyWord />} />
        <Route exact path="/medinfo/query_by_keyword/:medID" element={<Case />} />

    </Routes>
=======
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
          <Route path="/" element={<LoginPage />} />
          <Route path ="/authlist" element={<AuthorizationList />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route exact path="/:username/:medicalInfoID" element={<Examination />} />
          <Route exact path="/record" element={<SearchByKeyWord />} />
          <Route exact path="/medinfo/patient_query_medicalinfo/:medID" element={<Case />} />
      </Routes>
>>>>>>> origin
    </BrowserRouter>
  );
}
export default App;
