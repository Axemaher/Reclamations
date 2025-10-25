const initialState = { 
    fields: {
        // order
        submissionDate: new Date().toISOString().slice(0, 10),
        deadlineDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        deliveryMethod: 'email',
        type: 'postWarranty',
        dateOfSale: new Date().toISOString().slice(0, 10),
        salesDocNumber: '112/STO/2023',
        orderDescription: 'nie działa',
        attachment: '',
        // client
        clientName: 'Marcin Boczkowski',
        nip: '822-237-41-59',
        address: 'Topolowa 3',
        postalCode: '05-300',
        city: 'Mińsk Mazowiecki',
        email: 'mb2@fdfs.pl',
        phonePrefix: "+48",
        phoneNumber: '665 213 441',
        note: 'nerwowy od początku',
        // product
        manufacturer: 'Beta',
        shortName: '1750/500',
        fullName: 'Smarownica',
        catalogNumber: '20/857',
        additionalDescription: ''
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
        clientName: false,
        nip: false,
        address: false,
        postalCode: false,
        city: false,
        email: false,
        phonePrefix: false,
        phoneNumber: false,
        note: false,
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
        submissionDate: (v, fields) => v < fields.deadlineDate,
        deadlineDate: (v, fields) => v > fields.submissionDate,
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
        // note: v => v,
    // product
        manufacturer: v => v.length >= 3,
        shortName: v => v.length >= 3,
        fullName: v => v.length >= 3,
        catalogNumber: v => v.length >= 1,
        // additionalDescription: v => v
    };

const validateField = (name, value, fields) => {
    if (!validators[name]) return;
    const isValid = validators[name](value, fields)
    return !isValid
}

const addReducer = (state, action) => {
    const {payload, fieldName, newErrors} = action
    switch (action.type) {
        case 'SET_FIELD':
            console.log(payload)
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
