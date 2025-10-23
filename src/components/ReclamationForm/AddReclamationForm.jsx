import { useReducer } from "react";
import AddOrderForm from "./AddOrderForm";
import addReducer, {initialState, validators} from "./AddReducer";

function AddReclamationForm() {

const [state, dispatch] = useReducer(addReducer, initialState);


const handleOnChange = (e) => {
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

const handleAddReclamation = (e) => {
    e.preventDefault();

    const validationStatus = validateAllFields(state.fields) 
    if(validationStatus) {
        console.log("success, no errors")
        dispatch({ type: 'RESET_FIELDS'});
    }
};

const handleResetForm = () => {
    dispatch({ type: 'RESET_FIELDS'});
    console.log(state)
}

return (
    <>
        <form onSubmit={handleAddReclamation}>
        <legend>Rejestracja</legend>
            <AddOrderForm 
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