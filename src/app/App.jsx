import { useContext } from "react";
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
import { AuthContext } from "./AuthProvider";



function App() {

  const { userLogged } = useContext(AuthContext);

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
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/resetPassword" element={<ResetPage/>} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute userLogged={userLogged}>
                <DashboardPage/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/addReclamation"
            element={
              <ProtectedRoute userLogged={userLogged}>
                <AddReclamationPage/>
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit/:id"
            element={
              <ProtectedRoute userLogged={userLogged}>
                <EditReclamationPage/>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Layout>
  )
}

export default App
