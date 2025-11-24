import { createContext, useState } from "react";
import ToastsWrapper from "./ToastsWrapper";

const ToastContext = createContext();

const ToastContextProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Toasts types:
  //     info: 'info',
  //     success: 'success',
  //     error: 'error'

  const addToast = (message, type, time = 4000) => {
    const id = crypto.randomUUID();
    setToasts((prevstate) => [...prevstate, { id, message, type }]);
    setTimeout(() => {
      setToasts((prevstate) => prevstate.filter((el) => el.id !== id));
    }, time);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastsWrapper toastsData={toasts} />
    </ToastContext.Provider>
  );
};

export default ToastContextProvider;
export { ToastContext };
