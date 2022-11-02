import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile';
import Examination from './pages/Examination';
import SearchByKeyWord from './pages/SearchByKeyWord'
import Case from './pages/Case';
import AuthorizationList from './pages/AuthorizationList';
import Navbar from './components/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path ="/authlist" element={<AuthorizationList />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route exact path="/:username/:medicalInfoID" element={<Examination />} />
          <Route exact path="/medinfo/query_by_keyword/" element={<SearchByKeyWord />} />
          <Route exact path="/medinfo/query_by_keyword/:medID" element={<Case />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
