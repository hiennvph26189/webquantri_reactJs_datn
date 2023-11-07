import './App.scss';
import Nav from './component/Navigation/Nav';
import React, { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter as Router,} from "react-router-dom";
import AppRoutes from './routes/AppRoutes';

function App() {
  const [account, setaccount] = useState({});

  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (session) {
      setaccount(JSON.parse(session));
    }
  }, [])

  return (
    <Router>
      <div className='app-header'>
        <Nav />
      </div>

      <div className='app-container'>
       <AppRoutes/>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />


    </Router>
  )
}

export default App;
