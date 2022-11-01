import React, { useEffect } from 'react';
import TableItem from './components/TableList/TableItem';
import './App.scss';
import './configs/antd/customized.css';
import 'react-toastify/dist/ReactToastify.css';
import UserProfile from './pages/UserProfile'
import UserTable from './components/UserTable';

import { ToastContainer } from 'react-toastify';

import AppRoute from './routes/routes';
import TableList from './components/TableList/TableList';
import AppNavbar from './components/Navbar';
import AuthorizationList from './pages/AuthorizationList';
import Landingpage from './pages/Landingpage';
import CaseForm from './components/forms/CaseForm';



function App() {
  return (
    <>
    <CaseForm/>
      {/* <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
      /> 
       <AppRoute /> */}
    </>
  );
}

export default App;
