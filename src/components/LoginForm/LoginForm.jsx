import { useNavigate } from "react-router-dom";


function LoginForm({ setUserLogged }) {


  const navigate = useNavigate();


  const handleLogin = () => {

    // loging


    // after success login
    setUserLogged(true);
    return navigate(`/dashboard/`, { replace: true });
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default LoginForm;