import { useReducer, useEffect, useState } from "react";
import AddOrderForm from "./AddOrderForm";
import ClientForm from "./ClientForm";
import ProductForm from "./ProductForm";
import addReducer, {initialState, validators} from "./AddReducer";
import { addDoc, collection } from "firebase/firestore"; 
import { uploadBytes, getDownloadURL, ref, getStorage } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { db } from "../../app/firebaseConfig";

function AddReclamationForm() {

const storage = getStorage();
const auth = getAuth();

const [uid, setUid] = useState(null)
const [state, dispatch] = useReducer(addReducer, initialState);

useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    if (user) {
      setUid(user.uid);
    } else {
      setUid(null);
    }
  });
  return () => unsubscribe();
}, [auth]);


const handleOnChange = (e) => {
    // const { value, type, name, files } = e.target;
    // const payload = type === 'file' ? files[0] : value;
    // dispatch({ type: 'SET_FIELD', payload, fieldName: name });
    dispatch({ type: 'SET_FIELD', payload: e.target.value, fieldName: e.target.name,  });
};


const handleOnBlur = (e) => {
    dispatch({ type: 'VALIDATE_FIELD', payload: e.target.value, fieldName: e.target.name,  });
}


const validateAllFields = (fields) => {
    const newErrors = {};

    Object.keys(fields).forEach(key => {
      const value = fields[key];
      const inputdDataCorrect = validators[key] ? validators[key](value, fields) : true;
      newErrors[key] = !inputdDataCorrect;
    });
    dispatch({ type: 'VALIDATE_ALL_FIELDS', newErrors});

    const anyErrorsNow = Object.values(newErrors).some(e => e === true)
    if(anyErrorsNow) { return false } else return true
}


// i can not setup cors...
const handleUpload = async (file) => {
    const storageRef = ref(storage, `pdfs/${file.name}`)
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef)
    console.log("url: ", url)
}

const handleAddReclamation = async (e) => {
    e.preventDefault();

    const validationStatus = validateAllFields(state.fields) 
    if(validationStatus) {
        // handleUpload(state.fields.attachment)
        try {
            await addDoc(collection(db, "users", uid, "reclamations"), state.fields);
            console.log("successs");
            dispatch({ type: 'RESET_FIELDS' });
            } catch (error) {
            console.error(error);
            }
    } else {
        console.log("errors in inputs, form not sended")
    }
};

const handleResetForm = () => {
    dispatch({ type: 'RESET_FIELDS'});
}

return (
    <>
        <form onSubmit={handleAddReclamation}>
            <AddOrderForm 
                handleOnChange={handleOnChange}
                handleOnBlur={handleOnBlur}
                state={state}
            />
            <ClientForm 
                handleOnChange={handleOnChange}
                handleOnBlur={handleOnBlur}
                state={state}
            />
            <ProductForm 
                handleOnChange={handleOnChange}
                handleOnBlur={handleOnBlur}
                state={state}
            />
            <button type="submit">Dodaj</button>

        </form>
        <button onClick={handleResetForm}>Reset</button>
    </>
    );
}

export default AddReclamationForm;