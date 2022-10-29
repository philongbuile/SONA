import LoginPage from './pages/LoginPage';
import UserProfile from './pages/userProfile';
import Examination from './pages/Examination';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/:username/:medicalInfoID" element={<Examination />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
