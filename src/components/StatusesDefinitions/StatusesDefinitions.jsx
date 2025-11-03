import { useEffect, useState, useContext } from "react";
import { doc, getDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../app/firebaseConfig";
import { AuthContext } from "../../app/AuthProvider";


function StatusesDefinitions() {

const { uid } = useContext(AuthContext);

const [settingsData, setSettingsData] = useState(null);
const [state, setState] = useState(
  {
    status: '',
  }
);
const [fieldsErrors, setFieldsErrors] = useState(
  {
    statusExist: false,
    statusInUse: false,
    statusValidationError: false 
  }
);
const [errorData, setErrorData] = useState(null);
const [loading, setLoading] = useState(true);


useEffect(() => {
        if(!uid) { return } 
        else {
        const getSettingsData = async () => {
          try {
            const docRef = doc(db, "users", uid, "profile", "settings");
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              setErrorData(false);
              setSettingsData(docSnap.data());
              console.log(docSnap.data());
            } else {
              console.log("No such document!");
              setErrorData(true);
            }
          } catch (error) {
            console.log("error:", error);
            setErrorData(true);
          } finally {
            setLoading(false);
          }
        };

        getSettingsData();
        }
  },[uid] );


  const handleDelete = async (id, statusName) => {
    try {
      const data = [];
      const q = query(collection(db, "users", uid, "reclamations"), where("status", "==", statusName));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
      if(data.length) {
        setFieldsErrors((prevState) => ({...prevState, statusInUse: true}));
      } else {
        setFieldsErrors((prevState) => ({...prevState, statusInUse: false}));
        let dataCopy = [...settingsData.status];
        dataCopy = settingsData.status.filter((el) => el.id !== id);
        setSettingsData((prevState) => ({...prevState, status: dataCopy}));
        // save in firestore
        try {
            await updateDoc(doc(db, "users", uid, "profile", "settings"), { status: dataCopy });
        } catch (error) {
            console.log(error);
        }
      }
    } catch (error) {
      console.log(error)
    }
  }


  const handleOnChange = (e) => {
    setFieldsErrors({ statusExist: false, statusInUse: false, statusValidationError: false });
    setState((prevState) => ({ ...prevState, status: e.target.value }));
  }


  const handleAdd = async () => {
    if(state.status.length < 3) {
      setErrorData((prevState) => ({...prevState, statusValidationError: true}));
    } else {
      setFieldsErrors({statusExist: false, statusInUse: false});
      const dataCopy = [...settingsData.status];
      const isAlreadyDeclared = dataCopy.some((el) => el.name === state.status);
      if (!isAlreadyDeclared) {
        dataCopy.push({id: crypto.randomUUID(), name: state.status});
        setSettingsData((prevState) => ({...prevState, status: dataCopy}));
        setState((prevState) => ({...prevState, status: ''}))
        setFieldsErrors((prevState) => ({...prevState, statusExist: false}));
        // save in firestore
        try {
            await updateDoc(doc(db, "users", uid, "profile", "settings"), { status: dataCopy });
        } catch (error) {
            console.log(error);
        }
      } else if (isAlreadyDeclared) {
        setFieldsErrors((prevState) => ({...prevState, statusExist: true}));
      }
    }
  }

if (errorData) return <p>Błąd wczytywania ustawienia, spróbuj ponownie</p>
if (loading) return <p>Ładowanie ustawień...</p>
else return (
    <div>
        <p>Statusy:</p>
        <ul>
          {settingsData.status.map((el, index) => (
            <li key={index}>
              {el.name}
              {el.id !== null &&
              <button onClick={() => handleDelete(el.id, el.name)}>usuń</button>
              }
            </li>
          ))}
        </ul>
        <p>
        <label htmlFor="addStatus">Dodaj status</label>
        <input
          type="text"
          onChange={handleOnChange}
          name="addStatus"
          value={state.status}
          id="addStatus"
        />
        <span>
          {fieldsErrors.statusExist && `Status o takiej nazwie już istnieje, wpisz inną nazwę`}
          {fieldsErrors.statusInUse && `Status jest w użyciu, zmień status w zleceniach na inny i wróc by go usunąć`}
          {fieldsErrors.statusValidationError && `Status musi mieć przynajmniej 3 znaki` }
        </span>
      </p>
      <button onClick={handleAdd}>Dodaj</button>
    </div>)
}

export default StatusesDefinitions;