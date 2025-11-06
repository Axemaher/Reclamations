import { useEffect, useState, useContext } from "react";
import { doc, collection, query, where, getDocs, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../app/firebaseConfig";
import { AuthContext } from "../../app/AuthProvider";


function StatusesDefinitions() {

const { uid } = useContext(AuthContext);

const [settingsData, setSettingsData] = useState(null);
const [state, setState] = useState({
  loading: true,
  fieldValue: ''
})
const [errors, setErrors] = useState({
  fieldExist: false,
  fieldInUse: false,
  fieldValidation: false,
  settingsDataError: false,
})

  useEffect(() => {
    if (!uid) return;

    const docRef = doc(db, "users", uid, "profile", "settings");

    const unsubscribe = onSnapshot( docRef, (docSnap) => {
        if (docSnap.exists()) {
          errorReset();
          setSettingsData(docSnap.data());
        } else {
          console.log("No such document!");
          setErrors((prevState) => ({...prevState, settingsDataError: true}));
        }
        setState((prevState) => ({...prevState, loading: false}));
      },
      (error) => {
        console.log("error:", error);
        setErrors(prev => ({ ...prev, settingsDataError: true }));
        setState(prev => ({ ...prev, loading: false }));
      }
    );

    return () => unsubscribe();

  }, [uid]);


  const handleOnChange = (e) => {
    setState((prevState) => ({ ...prevState, fieldValue: e.target.value }));
  }

  const errorReset = () => {
    setErrors((prevState) =>({ ...prevState, fieldExist: false, fieldInUse: false, fieldValidation: false }));
  }

  const update = async (newData) => {
    try {
        await updateDoc(doc(db, "users", uid, "profile", "settings"), { status: newData });
        setSettingsData((prevState) => ({...prevState, status: newData}));
        setState((prevState) => ({...prevState, fieldValue: ''}));
    } catch (error) {
        console.log(error);
    }
  }

  const fieldInUse = async (fieldName) => {
    try {
      const data = [];
      const q = query(collection(db, "users", uid, "reclamations"), where("status", "==", fieldName));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
      return data.length;
    } catch (error) {
      console.log(error);
      return;
    }
  }

  const fieldNameDuplicated = (data) => {
    return data.some((el) => el.name === state.fieldValue);
  }

  const handleDelete = async (id, fieldName) => {
    errorReset();

    try {
      const inUse = await fieldInUse(fieldName);
      if(inUse) {
        setErrors((prevState) => ({...prevState, fieldInUse: true}));
        return;
      }

      let dataCopy = [...settingsData.status];
      dataCopy = dataCopy.filter((el) => el.id !== id);
      await update(dataCopy);
    } catch (error) {
      console.log(error)
    }
  }




  const handleAdd = async () => {
    errorReset();

    if(state.fieldValue.length < 3) {
      setErrors((prevState) =>({ ...prevState, fieldValidation: true }));
      return;
    }

    const dataCopy = [...settingsData.status];
    const duplicated = fieldNameDuplicated(dataCopy);

    if (duplicated) {
      setErrors((prevState) =>({ ...prevState, fieldExist: true }));
      return
    }
    
    dataCopy.push({id: crypto.randomUUID(), name: state.fieldValue});
    setErrors((prevState) =>({ ...prevState, fieldExist: false }));
    await update(dataCopy);
  }

if (errors.settingsDataError) return <p>Błąd wczytywania ustawienia, spróbuj ponownie</p>
if (state.loading) return <p>Ładowanie ustawień...</p>
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
          value={state.fieldValue}
          id="addStatus"
        />
        <span>
          {errors.fieldExist && `Status o takiej nazwie już istnieje, wpisz inną nazwę`}
          {errors.fieldInUse && `Status jest w użyciu, zmień status w zleceniach na inny i wróc by go usunąć`}
          {errors.fieldValidation && `Status musi mieć przynajmniej 3 znaki` }
        </span>
      </p>
      <button onClick={handleAdd}>Dodaj</button>
    </div>)
}

export default StatusesDefinitions;