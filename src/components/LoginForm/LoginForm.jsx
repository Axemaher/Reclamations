import { useNavigate, Link } from "react-router-dom";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from "firebase/auth";
import { useState, useContext } from "react";
import { ToastContext } from "../ToastsNotification/ToastNotification";

function LoginForm() {

  const { addToast } = useContext(ToastContext);
  const auth = getAuth();
  const navigate = useNavigate();

  const [dataIncorrect, setDataIncorrect] = useState(null)
  const [loginData, setLoginData] = useState({
      email: 'mb2@gm.pl',
      password: '123456'
    });
  const [inputErrors, setInputErrors] = useState({
      emailError: null,
      passwordError: null,
    });


    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validators = {
      email: v => emailPattern.test(v),
      password: v => v.length >= 6,
    };

    const handleOnChange = (e) => {
      setLoginData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    const validateField = (name, value) => {
      if (!validators[name]) return;
      const isValid = validators[name](value);
      setInputErrors(prevState => ({
      ...prevState,
      [`${name}Error`]: !isValid
      }))
    };

    const handleOnBlur = (e) => {
      const { name, value } = e.target;
      validateField(name, value);
    }

    const validationCorrectCheck = () => {
      const newErrors = {};
      Object.keys(loginData).forEach(key => {
        const value = loginData[key];
        const inputdDataCorrect = validators[key] ? validators[key](value) : true;
        newErrors[`${key}Error`] = !inputdDataCorrect;
      });
      setInputErrors(prevState => ({ ...prevState, ...newErrors }));
      const anyErrorsNow = Object.values(newErrors).some(e => e === true)
      if(anyErrorsNow) { return false } else return true
    }

    const handleLogin = async (e) => {
      e.preventDefault();
      if (!validationCorrectCheck()) return;

      try {
        await setPersistence(auth, browserLocalPersistence);
        await signInWithEmailAndPassword(auth, loginData.email, loginData.password);
        navigate("/dashboard", { replace: true });
      } catch (error) {
        if (error.code === "auth/invalid-credential") setDataIncorrect(true);
        addToast('Email lub hasło są nieprawidłowe', 'error')
      }
    };

    const {emailError, passwordError} = inputErrors;
  return (
    <>
      <form onSubmit={handleLogin}>
        <legend>Logowanie</legend>
        <p>
          <label htmlFor="email">Email</label>
          <input
                type="email"
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                name="email"
                value={loginData.email}
                id="email"
                // required
                />
          <span>{emailError ? `Wpisz poprawny adres mailowy` : ""}</span>
        </p>
        <p>
          <label htmlFor="password">Hasło</label>
          <input
                type="password"
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                name="password"
                value={loginData.password}
                id="password"
                // required
                />
          <span>{passwordError ? `Wpisz hasło (co najmniej 6 znaków)` : ""}</span>
        </p>
        <button type="submit">Zaloguj się</button>
        {dataIncorrect ? 
          <>
            <span>Wprowadzony email lub hasło jest nieprawidłowe, jeżeli nie pamiętasz hasła to </span>
            <Link to="/resetPassword">zresetuj hasło</Link>
          </>:""
        }
      </form>
    </>
  );
}

export default LoginForm;