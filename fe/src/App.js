import UserProfile from './pages/UserProfile';
import Examination from './pages/Examination';
import SearchByKeyWord from './pages/SearchByKeyWord'
import Case from './pages/Case';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route exact path="/:username/:medicalInfoID" element={<Examination />} />
          <Route exact path="/record" element={<SearchByKeyWord />} />
          <Route exact path="/record/query/:username" element={<Case />} />
      </Routes>
    </BrowserRouter>
  )
};
export default App;