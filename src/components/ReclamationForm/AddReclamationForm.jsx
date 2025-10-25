import { useReducer } from "react";
import AddOrderForm from "./AddOrderForm";
import ClientForm from "./ClientForm";
import ProductForm from "./ProductForm";
import addReducer, {initialState, validators} from "./AddReducer";
import { addDoc, collection } from "firebase/firestore"; 
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db } from "../../app/firebaseConfig";

function AddReclamationForm({userLogged, uid}) {

const storage = getStorage();

const [state, dispatch] = useReducer(addReducer, initialState);


const handleOnChange = (e) => {
    const {value, type, name, files} = e.target;
    console.log(e.target.type)
    if(type === 'file') {
        dispatch({ type: 'SET_FIELD', payload: files[0], fieldName: name,  });
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

    const anyErrorsNow = Object.values(newErrors).some(e => e === true)
    if(anyErrorsNow) { return false } else return true
}

async function uploadFile(uid, file) {
//     console.log(file)
//   if (!uid || !file) {
//     console.error("no file!");
//     return;
//   }
    console.log(file)
  const storageRef = ref(storage, `${uid}/${file.name}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log("sended, URL:", downloadURL);
    return downloadURL;
  } catch (error) {
    console.error(error);
  }
}


const handleAddReclamation = (e) => {
    e.preventDefault();

    const validationStatus = validateAllFields(state.fields) 
    if(validationStatus) {
        // console.log("success, no errors")


        // //FILE attachment
        // // Create a reference to 'mountains.jpg'
        // const attachmentRef = ref(storage, 'attachment.pdf');

        // // Create a reference to 'images/mountains.jpg'
        // const attachmentImagesRef = ref(storage, 'images/attachment.pdf');

        // // While the file names are the same, the references point to different files
        // attachmentRef.name === attachmentImagesRef.name;           // true
        // attachmentRef.fullPath === attachmentImagesRef.fullPath;   // false 

        // console.log(attachmentRef.name)

        const file = state.fields.attachment;
        // console.log(file)

        uploadFile(uid, file)

        // addDoc(collection(db, "users", uid, "reclamations"), state);

        // dispatch({ type: 'RESET_FIELDS'});
    } else {
        console.log("errors! form not send")
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