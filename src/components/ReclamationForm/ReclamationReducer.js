const initialState = { 
    fields: {
        // order fields
        submissionDate: new Date().toISOString().slice(0, 10),
        deadlineDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        deliveryMethod: 'email',
        type: 'po gwarancyjna',
        priority: 'normalny',
        status: 'przyjęto',
        reason: 'uszkodzenie',
        dateOfSale: new Date().toISOString().slice(0, 10),
        salesDocNumber: '',
        paymentMethod: 'gotówka',
        orderDescription: '',
        attachment: '',
        attachmentUrl: '',

        // client fields 
        contactPerson: '',
        companyName: '',
        nip: '',
        address: '',
        postalCode: '',
        city: '',
        email: '',
        phonePrefix: "+48",
        phoneNumber: '',
        clientNote: '',

        // product fields
        manufacturer: '',
        shortName: '',
        fullName: '',
        catalogNumber: '',
        serialNumber: '',
        quantity: '1',
        additionalDescription: '',

        // logistic fields
        returnTrackingNumber: '',
        courier: '',
        returnAddress: '',
        productIsReturned: 'wybierz', 

        // activity history fields
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
        priority: false,
        status: false,
        reason: false,
        dateOfSale: false,
        salesDocNumber: false,
        paymentMethod: false,
        orderDescription: false,
        attachment: false,
        attachmentUrl: false,

        contactPerson: false,
        companyName: false,
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
        serialNumber: false,
        quantity: false,
        additionalDescription: false,

        returnTrackingNumber: false,
        courier: false,
        returnAddress: false,
        productIsReturned: false,
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
        priority: v => v,
        status: v => v,
        reason: v => v,
        dateOfSale: v => v <= new Date().toISOString().slice(0, 10),
        salesDocNumber: v => v.length >= 3,
        // orderDescription: v => v.length >= 3,
    // client
        contactPerson: v => v.length >= 3,
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
        quantity: v => v !== 0 && v.length >=1,
        activityNote: v => v.length >=3,

        // returnTrackingNumber: v => v,
        // courier: v => v,
        // returnAddress: v => v,
        productIsReturned: v => v === 'tak' || v === 'nie',
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
