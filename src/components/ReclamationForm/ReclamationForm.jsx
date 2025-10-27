import { useReducer, useState, useContext, useEffect } from "react";
import { useParams } from "react-router";import { doc, getDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import OrderForm from "./OrderForm";
import ClientForm from "./ClientForm";
import ProductForm from "./ProductForm";
import reclamationReducer, {initialState, validators} from "./ReclamationReducer";
import { addDoc, updateDoc, collection } from "firebase/firestore"; 
import { uploadBytes, getDownloadURL, ref, getStorage } from "firebase/storage";
import { db } from "../../app/firebaseConfig";
import { AuthContext } from "../../app/AuthProvider";

function ReclamationForm({mode}) {

const { id } = useParams();
const { uid } = useContext(AuthContext);
const storage = getStorage();
const navigate = useNavigate();
const modeEdit = mode === 'edit' ? true : false;


useEffect(() => {
    if(modeEdit) {
        if(!uid) {
            console.log('not logined')
            return
        } else {
        const getData = async () => {
            const docRef = doc(db, "users", uid, 'reclamations', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
            dispatch({ type: 'SET_ALL_FIELDS', payload: docSnap.data(),  });
            console.log(docSnap.data())
            } else {
            console.log("No such document!");
            }
        };
        getData();
        }
    }
    
  },[uid, id, modeEdit] );


const [attachment, setAttachment] = useState(null)
const [state, dispatch] = useReducer(reclamationReducer, initialState);


const handleOnChange = (e) => {
    const { value, type, name, files } = e.target;

    if(type === 'file') {
        setAttachment(files[0]);
        dispatch({ type: 'SET_FIELD', payload: files[0].name, fieldName: name });
        dispatch({ type: 'SET_FIELD', payload: '', fieldName: 'attachmentUrl' });
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
    if (!file) return null;

    const storageRef = ref(storage, `users/${uid}/reclamations/${id}/${file.name}`);
    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);
    return url;
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const validationStatus = validateAllFields(state.fields) 

    if(validationStatus) {
        let reclamationRef = null;
        try {
            if(modeEdit){
                reclamationRef = await updateDoc(doc(db, "users", uid, "reclamations", id), state.fields);
            } else if(!modeEdit){
                reclamationRef = await addDoc(collection(db, "users", uid, "reclamations"), state.fields);
                dispatch({ type: 'RESET_FIELDS' });
                setAttachment(null);
            }
            const reclamationId = modeEdit ? id : reclamationRef.id;
            const attachmentUrl = await uploadAttachment(attachment, reclamationId);
            if (attachmentUrl) {
                await updateDoc(doc(db, "users", uid, "reclamations", reclamationId), {
                    attachmentUrl
                });
            }               
            console.log(modeEdit ? 'reclamation saved' : 'reclamation added')
            navigate(`/dashboard/`, { replace: true });
            } catch (error) {
                console.log(error);
            }
    } else {
        console.log("errors in inputs, form not sended")
    }
}


const handleResetForm = () => {
    dispatch({ type: 'RESET_FIELDS'});
}

return (
    <>
        <form onSubmit={handleSubmit}>
            <OrderForm 
                handleOnChange={handleOnChange}
                handleOnBlur={handleOnBlur}
                state={state}
                modeEdit={modeEdit}
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
            <button type="submit">{modeEdit ? 'Zapisz zmiany' : 'Dodaj reklamację'}</button>

        </form>
        <button onClick={handleResetForm}>Reset</button>
    </>
    );
}

export default ReclamationForm;