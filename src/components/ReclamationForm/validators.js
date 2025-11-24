const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const postalCodePattern = /^\d{2}[- ]?\d{3}$/;
const phonePrefixPattern = /^\+\d{1,3}$/;
const phoneNumberPattern = /^(?:\s?\d){6,12}$/;

export const validators = {
  // order
  submissionDate: (v, fields) => v,
  deadlineDate: (v, fields) => v,
  deliveryMethod: (v) => v,
  type: (v) => v,
  priority: (v) => v,
  status: (v) => v,
  reason: (v) => v,
  dateOfSale: (v) => v <= new Date().toISOString().slice(0, 10),
  salesDocNumber: (v) => v.length >= 3,
  // orderDescription: v => v.length >= 3,
  // client
  contactPerson: (v) => v.length >= 3,
  // nip: v => v,
  address: (v) => v.length >= 3,
  postalCode: (v) => postalCodePattern.test(v),
  city: (v) => v.length >= 3,
  email: (v) => emailPattern.test(v),
  phonePrefix: (v) => phonePrefixPattern.test(v),
  phoneNumber: (v) => phoneNumberPattern.test(v),
  // clientNote: v => v,
  // product
  manufacturer: (v) => v.length >= 3,
  shortName: (v) => v.length >= 3,
  fullName: (v) => v.length >= 3,
  catalogNumber: (v) => v.length >= 1,
  // additionalDescription: v => v
  quantity: (v) => v > 0,
  // logistic
  // returnTrackingNumber: v => v,
  // courier: v => v,
  // returnAddress: v => v,
  productIsReturned: (v) => v === "tak" || v === "nie",
  // activity history
  activityNote: (v) => v.length >= 3,
};

export const validateField = (name, value, fields) => {
  if (!validators[name]) return false;
  const isValid = validators[name](value, fields);
  return !isValid;
};

