import { getAuth, signOut } from "firebase/auth";

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
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default DashboardPage;