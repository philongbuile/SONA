import LoginPage from './pages/LoginPage';
import UserProfile from './pages/UserProfile';
import Examination from './pages/Examination';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/:username/:medicalInfoID" element={<Examination />} />
      </Routes>
    </BrowserRouter>
  )
};
export default App;