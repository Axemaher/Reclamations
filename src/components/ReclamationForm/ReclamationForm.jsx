import { useReducer, useState, useContext } from "react";
import OrderForm from "./OrderForm";
import ClientForm from "./ClientForm";
import ProductForm from "./ProductForm";
import reclamationReducer, {initialState, validators} from "./ReclamationReducer";
import { addDoc, collection } from "firebase/firestore"; 
import { uploadBytes, getDownloadURL, ref, getStorage } from "firebase/storage";
import { db } from "../../app/firebaseConfig";
import { AuthContext } from "../../app/AuthProvider";

function ReclamationForm() {

const { uid } = useContext(AuthContext);
const storage = getStorage();

const [attachment, setAttachment] = useState(null)
const [state, dispatch] = useReducer(reclamationReducer, initialState);


const handleOnChange = (e) => {
    const { value, type, name, files } = e.target;

    if(type === 'file') {
        setAttachment(files[0]);
        dispatch({ type: 'SET_FIELD', payload: files[0].name, fieldName: name });
    } else {
        dispatch({ type: 'SET_FIELD', payload: value, fieldName: name,  });
    }
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

    const anyErrorsNow = Object.values(newErrors).some(e => e === true);
    if(anyErrorsNow) { return false } else return true;
}


const uploadAttachment = async (file, id) => {
    if(file) {
        const storageRef = ref(storage, `users/${uid}/reclamations/${id}/${file.name}`);
        await uploadBytes(storageRef, file);
        const url = await getDownloadURL(storageRef);
        console.log("url: ", url);
    } else {
        console.log('no attachments');
    }
}

const handleAddReclamation = async (e) => {
    e.preventDefault();

    const validationStatus = validateAllFields(state.fields) 
    if(validationStatus) {
        try {
            const reclamationRef = await addDoc(collection(db, "users", uid, "reclamations"), state.fields);
            const reclamationId = reclamationRef.id;
            uploadAttachment(attachment, reclamationId);
            dispatch({ type: 'RESET_FIELDS' });
            console.log('reclamation added');
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
            <OrderForm 
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

export default ReclamationForm;