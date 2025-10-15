import { useNavigate } from "react-router-dom";

function RegisterForm({ setUserLogged }) {

  const navigate = useNavigate();


  const handleRegister = async() => {
    // register
    
    // after succes register
    setUserLogged(true);
    return navigate(`/dashboard/`, { replace: true });
  };

  return (
    <div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default RegisterForm;