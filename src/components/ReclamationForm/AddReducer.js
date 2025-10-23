const initialState = { 
    fields: {
        submissionDate: new Date().toISOString().slice(0, 10),
        deadlineDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        deliveryMethod: 'email',
        type: 'posWarranty',
        dateOfSale: new Date().toISOString().slice(0, 10),
        salesDocNumber: '',
        orderDescription: '',
        attachment: '',
    },
    errors: {
        submissionDate: false,
        deadlineDate: false,
        deliveryMethod: false,
        type: false,
        dateOfSale: false,
        salesDocNumber: false,
        orderDescription: false,
        attachment: false,
    }
 };

// const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const validators = {
        submissionDate: (v, fields) => v < fields.deadlineDate,
        deadlineDate: (v, fields) => v > fields.submissionDate,
        deliveryMethod: v => v,
        type: v => v,
        dateOfSale: v => v <= new Date().toISOString().slice(0, 10),
        salesDocNumber: v => v.length >= 6,
        orderDescription: v => v.length >= 6,
    };

const validateField = (name, value, fields) => {
    if (!validators[name]) return;
    const isValid = validators[name](value, fields)
    return !isValid
}

// const validateAllFields = (fields) => {
//        const newErrors = {};

//     //get all input names from registerData
//     Object.keys(fields).forEach(key => {
//       const value = fields[key];
//       //exist valid function for this input in validators and check data
//       //if validator not exist or data ok return true
//       const inputdDataCorrect = validators[key] ? validators[key](value, fields) : true;
//       newErrors[key] = !inputdDataCorrect;
//     });
//     console.log(newErrors)
//     // setInputErrors(prevState => ({ ...prevState, ...newErrors }));

    
//     return newErrors
// }

const addReducer = (state, action) => {
    const {payload, fieldName, newErrors} = action
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, 
                    fields: {
                        ...state.fields, 
                        [fieldName]: payload
                    } 
                };
        case 'VALIDATE_FIELD':
            return { ...state, 
                    errors: {
                        ...state.errors, 
                        [fieldName]: validateField(fieldName, payload, state.fields)
                    } 
                };
        case 'VALIDATE_ALL_FIELDS':
            return { ...state, 
                    errors: newErrors
                };
        case 'RESET_FIELDS':
            return { ...state, 
                    fields: initialState.fields,
                    errors: initialState.errors
                };
        default:
            return state;
    }
};

export default addReducer
export {initialState, validators}
