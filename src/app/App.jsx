import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import '../App.scss';
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout/Layout";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ResetPage from "../pages/ResetPage/ResetPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import AddReclamationPage from "../pages/AddReclamationPage/AddReclamationPage";
import EditReclamationPage from "../pages/EditReclamationPage/EditReclamationPage";

import { getAuth, onAuthStateChanged } from "firebase/auth";



function App() {

  const auth = getAuth();
  
  const [userLogged, setUserLogged] = useState(null);
  const [uid, setUid] = useState(null)


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogged(true);
        setUid(user.uid);
        console.log(user.uid)
      } else {
        setUserLogged(false);
      }
    });

    return () => unsubscribe();
  }, );

  return (
    <Layout>
    <BrowserRouter>
      <nav>
        <Link to="/"> Home </Link>|
        <Link to="/login"> Login </Link>|
        <Link to="/register"> Register </Link>|
        <Link to="/resetPassword"> Reset password </Link>|
        <Link to="/addReclamation"> Add </Link>|
        <Link to="/dashboard"> Dashboard </Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setUserLogged={setUserLogged}/>} />
        <Route path="/register" element={<RegisterPage setUserLogged={setUserLogged}/>} />
        <Route path="/resetPassword" element={<ResetPage/>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute userLogged={userLogged}>
              <DashboardPage setUserLogged={setUserLogged} uid={uid}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/addReclamation"
          element={
            <ProtectedRoute userLogged={userLogged}>
              <AddReclamationPage userLogged={userLogged} uid={uid}/>
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute userLogged={userLogged}>
              <EditReclamationPage userLogged={userLogged} uid={uid}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </Layout>
  )
}

export default App
