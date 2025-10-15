import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import '../App.scss';
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout/Layout";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";



function App() {
  const [userLogged, setUserLogged] = useState(null);


  return (
    <Layout>
    <BrowserRouter>
      <nav>
        <Link to="/"> Home </Link>|
        <Link to="/login"> Login </Link>|
        <Link to="/register"> Register </Link>|
        <Link to="/dashboard"> Dashboard </Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage setUserLogged={setUserLogged}/>} />
        <Route path="/register" element={<RegisterPage setUserLogged={setUserLogged}/>} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute userLogged={userLogged}>
              <DashboardPage setUserLogged={setUserLogged}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
    </Layout>
  )
}

export default App
