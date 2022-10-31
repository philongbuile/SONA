import LoginPage from './pages/LoginPage';
import UserProfile from './pages/userProfile';
import Examination from './pages/Examination';
import AuthorizationList from './pages/AuthorizationList';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<AuthorizationList />} />
          <Route path="/:username/:medicalInfoID" element={<Examination />} />
      </Routes>
    </BrowserRouter>
  )
};
export default App;