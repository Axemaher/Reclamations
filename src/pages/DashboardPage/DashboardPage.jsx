import { useContext } from "react";
import { getAuth, signOut } from "firebase/auth";
import ReclamationsList from "../../components/ReclamationList/ReclamationList";
import { ToastContext } from "../../components/ToastsNotification/ToastNotification";

function DashboardPage() {
  
  const auth = getAuth();
  const { addToast } = useContext(ToastContext);


  const handleLogout = async() => {
    signOut(auth).then(() => {
      console.log("logged out");
      addToast('Pomyślne wylogowanie', 'success')
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <>
      <h1>Dashboard page</h1>
      <ReclamationsList />
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default DashboardPage;