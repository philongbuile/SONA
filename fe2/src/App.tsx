import './App.scss';
import './configs/antd/customized.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AppRoute from './routes/routes';
<<<<<<< HEAD
import TableList from './components/TableList/TableList';
import AppNavbar from './components/Navbar';
import AuthorizationList from './pages/AuthorizationList';
import Landingpage from './pages/Landingpage';
import CaseForm from './components/forms/CaseForm';
=======
>>>>>>> 6b5e1e77785fb912ce094e4ebd31447c028d35d3



function App() {
  return (
<<<<<<< HEAD
    <>
    <CaseForm/>
      {/* <ToastContainer
=======
    <div className="App">
      <ToastContainer
>>>>>>> 6b5e1e77785fb912ce094e4ebd31447c028d35d3
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
