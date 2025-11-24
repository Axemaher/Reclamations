import { validateField } from "./validators";

const initialState = {
  fields: {
    // order fields
    submissionDate: new Date().toISOString().slice(0, 10),
    deadlineDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .slice(0, 10),
    deliveryMethod: "email",
    type: "po gwarancyjna",
    priority: "normalny",
    status: "przyjęto",
    reason: "uszkodzenie",
    dateOfSale: new Date().toISOString().slice(0, 10),
    salesDocNumber: "",
    paymentMethod: "gotówka",
    orderDescription: "",
    attachment: "",
    attachmentUrl: "",

    // client fields
    contactPerson: "",
    companyName: "",
    nip: "",
    address: "",
    postalCode: "",
    city: "",
    email: "",
    phonePrefix: "+48",
    phoneNumber: "",
    clientNote: "",

    // product fields
    manufacturer: "",
    shortName: "",
    fullName: "",
    catalogNumber: "",
    serialNumber: "",
    quantity: "1",
    additionalDescription: "",

    // logistic fields
    returnTrackingNumber: "",
    courier: "",
    returnAddress: "",
    productIsReturned: "wybierz",

    // activity history fields
    activityData: [
      {
        id: "initial",
        addDate: new Date().toISOString().slice(0, 10),
        activity: "Reklamacja dodana do systemu",
      },
    ],
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
  },
};

const reclamationReducer = (state, action) => {
  const { payload, fieldName, newErrors } = action;
  switch (action.type) {
    case "SET_FIELD":
      return {
        ...state,
        fields: {
          ...state.fields,
          [fieldName]: payload,
        },
      };
    case "SET_ALL_FIELDS":
      return { ...state, fields: payload };
    case "VALIDATE_FIELD":
      return {
        ...state,
        errors: {
          ...state.errors,
          [fieldName]: validateField(fieldName, payload, state.fields),
        },
      };
    case "VALIDATE_ALL_FIELDS":
      return { ...state, errors: newErrors };
    case "RESET_FIELDS":
      return {
        ...state,
        fields: { ...initialState.fields },
        errors: { ...initialState.errors },
      };
    case "SET_ACTIVITY_HISTORY":
      return {
        ...state,
        fields: {
          ...state.fields,
          activityData: payload,
        },
      };
    default:
      return state;
  }
};

export default reclamationReducer;
export { initialState };
