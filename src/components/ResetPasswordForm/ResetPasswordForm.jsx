import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState, useContext } from "react";
import { ToastContext } from "../ToastsNotification/ToastNotification";

function ResetPasswordForm() {
  const { addToast } = useContext(ToastContext);
  const auth = getAuth();

  const [emailSend, setEmailSend] = useState(null);
  const [email, setEmail] = useState("");

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  const [emailInputError, setEmailInputError] = useState(false);

  const checkEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = emailPattern.test(value);
    setEmailInputError(!result);
    return result;
  };

  const handleOnBlur = (e) => {
    const { value } = e.target;
    checkEmail(value);
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (checkEmail(email)) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setEmailSend(true);
          addToast(
            "Mail dot. resetu hasła został wysłany jeżeli podany email istnieje w naszej bazie",
            "success"
          );
        })
        .catch((error) => {
          console.log(error);
          addToast("Coś poszło nie tak", "error");
        });
    }
  };

  return (
    <form className="form" onSubmit={handleReset}>
      <fieldset className="form__fieldset">
        <legend className="form__legend">Resetowanie hasła</legend>

        <div className="form-row">
          <label className="form-row__label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="email"
            value={email}
            id="email"
            aria-invalid={emailInputError ? "true" : "false"}
            aria-describedby="email-error"
            className={`form-row__input ${
              emailInputError && "form-row__input-error"
            }`}
          />
          <span
            className="form-row__span-error"
            id="email-error"
            aria-live="polite"
          >
            {emailInputError && "Wpisz poprawny adres mailowy"}
          </span>
        </div>

        <button
          className="button button--primary"
          type="submit"
          disabled={emailSend}
        >
          Wyślij prośbę o zresetowanie hasła
        </button>
      </fieldset>
    </form>
  );
}

export default ResetPasswordForm;
