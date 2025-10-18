import LoginForm from "../../components/LoginForm/LoginForm";

function LoginPage({setUserLogged}) {
  return (
    <>
      <h1>Login page</h1>
      <LoginForm setUserLogged={setUserLogged}/>
    </>
  )
}

export default LoginPage