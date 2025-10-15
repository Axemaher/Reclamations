import { useNavigate } from "react-router-dom";


function DashboardPage({setUserLogged}) {
  const navigate = useNavigate();
  
  const handleLogout = async() => {

    setUserLogged(false)
    return navigate(`/`, { replace: true });
  }

  return (
    <>
      <h1>Dashboard page</h1>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default DashboardPage;