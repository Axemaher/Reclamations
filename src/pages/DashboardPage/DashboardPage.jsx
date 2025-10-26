import { getAuth, signOut } from "firebase/auth";
import ReclamationsList from "../../components/ReclamationList/ReclamationList";

function DashboardPage() {
  
  const auth = getAuth();

  const handleLogout = async() => {
    signOut(auth).then(() => {
      console.log("logged out");
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