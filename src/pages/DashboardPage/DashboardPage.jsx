import { getAuth, signOut } from "firebase/auth";
import ReclamationsList from "../../components/ReclamationList/ReclamationList";

function DashboardPage({setUserLogged}) {
  
  const auth = getAuth();

  const handleLogout = async() => {
    signOut(auth).then(() => {
     setUserLogged(false)
    }).catch((error) => {
      console.log(error)
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