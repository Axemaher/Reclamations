import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";


function ResetPasswordForm() {

  const auth = getAuth();

  const [emailSend, setEmailSend] = useState(null)
  const [email, setEmail] = useState('');
  
  const handleOnChange = (e) => {
    setEmail(e.target.value)
  };

  const [emailInputError, setEmailInputError] = useState(false);

  const checkEmail = (value) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const result = emailPattern.test(value)
    setEmailInputError(!result)
    return result  
  }

  const handleOnBlur = (e) => {
    const { value } = e.target;
    checkEmail(value)
  }

  const handleReset = (e) => {
    e.preventDefault();
    if(checkEmail(email)){
      sendPasswordResetEmail(auth, email)
        .then(() => {
          setEmailSend(true)
        })
        .catch((error) => {
          console.log(error)
          // ..
        });
    }
  };

  return (
    <>
      <form onSubmit={handleReset}>
        <fieldset>
          <legend>Resetowanie hasła</legend>
          <p>
            <label htmlFor="email">Email</label>
            <input
                  type="email"
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  name="email"
                  value={email}
                  id="email"
                  // required
                  />
            <span>{emailInputError ? `Wpisz poprawny adres mailowy` : ""}</span>
          </p>
          <button type="submit" disabled={emailSend}>Wyślij prośbę o zresetowanie hasła</button>
          <span>{emailSend ? "Mail dot. resetu hasła został wysłany jeżeli podany email istnieje w naszej bazie" : ""}</span>
        </fieldset>
      </form>
    </>
  );
}

export default ResetPasswordForm;





