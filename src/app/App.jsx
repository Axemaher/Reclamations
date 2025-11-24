import { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../global_styles/global.scss";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../components/Layout/Layout";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import ResetPage from "../pages/ResetPage/ResetPage";
import DashboardPage from "../pages/DashboardPage/DashboardPage";
import AddReclamationPage from "../pages/AddReclamationPage/AddReclamationPage";
import EditReclamationPage from "../pages/EditReclamationPage/EditReclamationPage";
import SettingsPage from "../pages/SettingsPage/SettingsPage";
import Navbar from "../components/Navbar/Navbar";
import { AuthContext } from "./AuthProvider";

function App() {
  const { userLogged } = useContext(AuthContext);

  return (
    <Layout>
      <BrowserRouter>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/resetPassword" element={<ResetPage />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute userLogged={userLogged}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/addReclamation"
              element={
                <ProtectedRoute userLogged={userLogged}>
                  <AddReclamationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute userLogged={userLogged}>
                  <EditReclamationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute userLogged={userLogged}>
                  <SettingsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </Layout>
  );
}

export default App;
