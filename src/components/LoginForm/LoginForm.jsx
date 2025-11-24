import { useNavigate, Link } from "react-router-dom";
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserLocalPersistence,
} from "firebase/auth";
import { useState, useContext } from "react";
import { ToastContext } from "../ToastsNotification/ToastNotification";
import "../../global_styles/forms.scss";

function LoginForm() {
  const { addToast } = useContext(ToastContext);
  const auth = getAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState({
    email: "mb2@gm.pl",
    password: "123456",
  });
  const [inputErrors, setInputErrors] = useState({
    emailError: null,
    passwordError: null,
  });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validators = {
    email: (v) => emailPattern.test(v),
    password: (v) => v.length >= 6,
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
    setInputErrors((prevState) => ({
      ...prevState,
      [`${name}Error`]: !isValid,
    }));
  };

  const handleOnBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const validationCorrectCheck = () => {
    const newErrors = {};
    Object.keys(loginData).forEach((key) => {
      const value = loginData[key];
      const inputdDataCorrect = validators[key] ? validators[key](value) : true;
      newErrors[`${key}Error`] = !inputdDataCorrect;
    });
    setInputErrors((prevState) => ({ ...prevState, ...newErrors }));
    const anyErrorsNow = Object.values(newErrors).some((e) => e === true);
    if (anyErrorsNow) {
      return false;
    } else return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validationCorrectCheck()) return;

    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      navigate("/dashboard", { replace: true });
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        addToast(
          "Wprowadzony email lub hasło jest nieprawidłowe, jeżeli nie pamiętasz hasła to zresetuj je",
          "error",
          5000
        );
      }
    }
  };

  const { emailError, passwordError } = inputErrors;
  return (
    <form className="form" onSubmit={handleLogin}>
      <fieldset className="form__fieldset">
        <legend className="form__legend">Logowanie</legend>

        <div className="form-row">
          <label className="form-row__label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="email"
            value={loginData.email}
            id="email"
            aria-invalid={emailError ? "true" : "false"}
            aria-describedby="email-error"
            className={`form-row__input ${
              emailError && `form-row__input-error`
            }`}
          />
          <span
            className="form-row__span-error"
            id="email-error"
            aria-live="polite"
          >
            {emailError && "Wpisz poprawny adres mailowy"}
          </span>
        </div>

        <div className="form-row">
          <label className="form-row__label" htmlFor="password">
            Hasło
          </label>
          <input
            type="password"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="password"
            value={loginData.password}
            id="password"
            aria-invalid={passwordError ? "true" : "false"}
            aria-describedby="password-error"
            className={`form-row__input ${
              passwordError && `form-row__input-error`
            }`}
          />
          <span
            className="form-row__span-error"
            id="password-error"
            aria-live="polite"
          >
            {passwordError && "Wpisz hasło (co najmniej 6 znaków)"}
          </span>
        </div>
        <div className="form-row form-row__span-right">
          <span>
            <Link to="/resetPassword">zresetuj hasło</Link>
          </span>
        </div>
        <button className="button button--primary" type="submit">
          Zaloguj się
        </button>
      </fieldset>
    </form>
  );
}

export default LoginForm;
