import './App.scss';
import './configs/antd/customized.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AppRoute from './routes/routes';
import AppNavbar from './components/Navbar';
import AuthorizationList from './pages/Case/CaseDetail';
import Landingpage from './pages/Landing/Landingpage';
import CaseForm from './components/forms/CaseForm';




function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      /> 
      <AppRoute />
      </div>
  );
}

export default App;
