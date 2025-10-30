const initialState = { 
    fields: {
        // order
        submissionDate: new Date().toISOString().slice(0, 10),
        deadlineDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        deliveryMethod: 'email',
        type: 'po gwarancyjna',
        dateOfSale: new Date().toISOString().slice(0, 10),
        salesDocNumber: '',
        orderDescription: '',
        attachment: '',
        attachmentUrl: '',
        // client
        clientName: '',
        nip: '',
        address: '',
        postalCode: '',
        city: '',
        email: '',
        phonePrefix: "+48",
        phoneNumber: '',
        clientNote: '',
        // product
        manufacturer: '',
        shortName: '',
        fullName: '',
        catalogNumber: '',
        additionalDescription: '',
        // activity history
        activityData: [
            {
                id: 'initial',
                addDate: new Date().toISOString().slice(0, 10),
                activity: 'Reklamacja dodana do systemu'
            }],
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
        attachmentUrl: false,
        clientName: false,
        nip: false,
        address: false,
        postalCode: false,
        city: false,
        email: false,
        phonePrefix: false,
        phoneNumber: false,
        clientNote: false,
        manufacturer: false,
        shortName: false,
        fullName: false,
        catalogNumber: false,
        additionalDescription: false,
    }
 };

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const postalCodePattern = /^\d{2}[- ]?\d{3}$/;
const phonePrefixPattern = /^\+\d{1,3}$/;
const phoneNumberPattern = /^(?:\s?\d){6,12}$/;

const validators = {
    // order
        submissionDate: (v, fields) => v,
        deadlineDate: (v, fields) => v,
        deliveryMethod: v => v,
        type: v => v,
        dateOfSale: v => v <= new Date().toISOString().slice(0, 10),
        salesDocNumber: v => v.length >= 3,
        orderDescription: v => v.length >= 3,
    // client
        clientName: v => v.length >= 3,
        // nip: v => v,
        address: v => v.length >= 3,
        postalCode: v => postalCodePattern.test(v),
        city: v => v.length >= 3,
        email: v => emailPattern.test(v),
        phonePrefix: v => phonePrefixPattern.test(v),
        phoneNumber: v => phoneNumberPattern.test(v),
        // clientNote: v => v,
    // product
        manufacturer: v => v.length >= 3,
        shortName: v => v.length >= 3,
        fullName: v => v.length >= 3,
        catalogNumber: v => v.length >= 1,
        // additionalDescription: v => v
        activityNote: v => v.length >=3
    };

const validateField = (name, value, fields) => {
    if (!validators[name]) return false;
    const isValid = validators[name](value, fields)
    return !isValid
}

const reclamationReducer = (state, action) => {
    const {payload, fieldName, newErrors} = action
    switch (action.type) {
        case 'SET_FIELD':
            return { ...state, 
                    fields: {
                        ...state.fields, 
                        [fieldName]: payload
                    } 
                };
        case 'SET_ALL_FIELDS':
            return { ...state, 
                    fields: payload
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
        return { 
            ...state, 
            fields: { ...initialState.fields },
            errors: { ...initialState.errors }
        };
        case 'SET_ACTIVITY_HISTORY':
            return {
                ...state,
                fields: {
                    ...state.fields,
                    activityData: payload,
                }
            };
        default:
            return state;
    }
};

export default reclamationReducer;
export {initialState, validators, validateField}
