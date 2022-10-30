import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile';
import Examination from './pages/Examination';
import AuthorizationList from './pages/AuthorizationList';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';

function App() {
  return (
<<<<<<< HEAD
    <LandingPage/>
    // <BrowserRouter>
    //   <Routes>
    //       <Route path="/" element={<UserProfile />} />
    //       <Route path="/:username/:medicalInfoID" element={<Examination />} />
    //   </Routes>
    // </BrowserRouter>
=======
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<AuthorizationList />} />
          <Route path="/:username/:medicalInfoID" element={<Examination />} />
      </Routes>
    </BrowserRouter>
>>>>>>> 987e51095e659623e7b1ca1e63827b579f55ba09
  )
};
export default App;