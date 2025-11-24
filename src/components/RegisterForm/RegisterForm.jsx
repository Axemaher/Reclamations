import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../app/firebaseConfig";
import { ToastContext } from "../ToastsNotification/ToastNotification";
import predefinedSettings from "./predefinedSettings";
import "../../global_styles/forms.scss";

function RegisterForm() {
  const { addToast } = useContext(ToastContext);
  const navigate = useNavigate();
  const auth = getAuth();

  const [registerData, setRegisterData] = useState({
    firstName: "Marcin",
    lastName: "Boczkowski",
    email: "mb2@gm.pl",
    password: "123456",
    confirmPassword: "123456",
  });

  const handleOnChange = (e) => {
    setRegisterData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [inputErrors, setInputErrors] = useState({
    firstNameError: null,
    lastNameError: null,
    emailError: null,
    passwordError: null,
    confirmPasswordError: null,
  });

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validators = {
    firstName: (v) => v.trim().length >= 3,
    lastName: (v) => v.trim().length >= 3,
    email: (v) => emailPattern.test(v),
    password: (v) => v.length >= 6,
    confirmPassword: (v) => v.length >= 6 && v === registerData.password,
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

    //get all input names from registerData
    Object.keys(registerData).forEach((key) => {
      const value = registerData[key];

      //exist valid function for this input in validators and check data
      //if validator not exist or data ok return true
      const inputdDataCorrect = validators[key] ? validators[key](value) : true;
      newErrors[`${key}Error`] = !inputdDataCorrect;
    });

    setInputErrors((prevState) => ({ ...prevState, ...newErrors }));

    // if any error = true return false
    const anyErrorsNow = Object.values(newErrors).some((e) => e === true);
    if (anyErrorsNow) {
      return false;
    } else return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (validationCorrectCheck()) {
      createUserWithEmailAndPassword(
        auth,
        registerData.email,
        registerData.password
      )
        .then(async (userCredential) => {
          addToast("Rejestracja przebiegła pomyślnie", "success");

          const { uid } = userCredential.user;

          await setDoc(doc(db, "users", uid, "profile", "main"), {
            firstName: registerData.firstName,
            lastName: registerData.lastName,
          });

          await setDoc(
            doc(db, "users", uid, "profile", "settings"),
            predefinedSettings
          );

          navigate(`/dashboard/`, { replace: true });
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            addToast("Email jest już zarejestrowany", "error");
          }
        });
    }
  };

  const {
    firstNameError,
    lastNameError,
    emailError,
    passwordError,
    confirmPasswordError,
  } = inputErrors;
  return (
    <form className="form" onSubmit={handleRegister}>
      <fieldset className="form__fieldset">
        <legend className="form__legend">Rejestracja</legend>

        <div className="form-row">
          <label className="form-row__label" htmlFor="firstName">
            Imię
          </label>
          <input
            type="text"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="firstName"
            value={registerData.firstName}
            id="firstName"
            aria-invalid={firstNameError ? "true" : "false"}
            aria-describedby="firstName-error"
            className={`form-row__input ${
              firstNameError && "form-row__input-error"
            }`}
          />
          <span
            className="form-row__span-error"
            id="firstName-error"
            aria-live="polite"
          >
            {firstNameError && "Wpisz imię (co najmniej 3 znaki)"}
          </span>
        </div>

        <div className="form-row">
          <label className="form-row__label" htmlFor="lastName">
            Nazwisko
          </label>
          <input
            type="text"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="lastName"
            value={registerData.lastName}
            id="lastName"
            aria-invalid={lastNameError ? "true" : "false"}
            aria-describedby="lastName-error"
            className={`form-row__input ${
              lastNameError && "form-row__input-error"
            }`}
          />
          <span
            className="form-row__span-error"
            id="lastName-error"
            aria-live="polite"
          >
            {lastNameError && "Wpisz nazwisko (co najmniej 3 znaki)"}
          </span>
        </div>

        <div className="form-row">
          <label className="form-row__label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="email"
            value={registerData.email}
            id="email"
            aria-invalid={emailError ? "true" : "false"}
            aria-describedby="email-error"
            className={`form-row__input ${
              emailError && "form-row__input-error"
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
            value={registerData.password}
            id="password"
            aria-invalid={passwordError ? "true" : "false"}
            aria-describedby="password-error"
            className={`form-row__input ${
              passwordError && "form-row__input-error"
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

        <div className="form-row">
          <label className="form-row__label" htmlFor="confirmPassword">
            Potwierdź hasło
          </label>
          <input
            type="password"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="confirmPassword"
            value={registerData.confirmPassword}
            id="confirmPassword"
            aria-invalid={confirmPasswordError ? "true" : "false"}
            aria-describedby="confirmPassword-error"
            className={`form-row__input ${
              confirmPasswordError && "form-row__input-error"
            }`}
          />
          <span
            className="form-row__span-error"
            id="confirmPassword-error"
            aria-live="polite"
          >
            {confirmPasswordError &&
              "Hasła nie są takie same lub hasło jest za krótkie (minimum 6 znaków)"}
          </span>
        </div>
        <button className="button button--primary" type="submit">
          Zarejestruj się
        </button>
      </fieldset>
    </form>
  );
}

export default RegisterForm;
