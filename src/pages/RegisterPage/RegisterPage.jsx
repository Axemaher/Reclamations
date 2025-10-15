import RegisterForm from "../../components/RegisterForm/RegisterForm";

function RegisterPage({setUserLogged}) {
  return (
    <>
      <h1>Register page</h1>
      <RegisterForm setUserLogged={setUserLogged}/>
    </>
  )
}

export default RegisterPage