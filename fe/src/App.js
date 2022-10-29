import LoginPage from './pages/LoginPage';
import UserProfile from './pages/userProfile';
import Examination from './pages/Examination';
import SearchByKeyWord from './pages/SearchByKeyWord'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
          <Route path="/:username/:medicalInfoID" element={<Examination />} />
          <Route path="/" element={<SearchByKeyWord />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
