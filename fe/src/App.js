import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile';
import Examination from './pages/Examination';
import AuthorizationList from './pages/AuthorizationList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <LandingPage/>
    // <BrowserRouter>
    //   <Routes>
    //       <Route path="/" element={<AuthorizationList />} />
    //       <Route path="/:username/:medicalInfoID" element={<Examination />} />
    //   </Routes>
    // </BrowserRouter>
  )
};
export default App;