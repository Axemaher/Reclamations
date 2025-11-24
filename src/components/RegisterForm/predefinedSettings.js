const predefinedSettings = {
  deliveryMethod: [
    { id: null, name: "osobiście" },
    { id: null, name: "e-mail" },
    { id: null, name: "przysłano" },
  ],
  type: [
    { id: null, name: "gwarancyjne" },
    { id: null, name: "pogwarancyjne" },
  ],
  priority: [
    { id: null, name: "niski" },
    { id: null, name: "normalny" },
    { id: null, name: "wysoki" },
  ],
  status: [
    { id: null, name: "przyjęto" },
    { id: null, name: "oczekiwanie na dostarczenie" },
    { id: null, name: "wysłano do producenta" },
    { id: null, name: "diagnoza" },
    { id: null, name: "w trakcie" },
    { id: null, name: "zakończono" },
  ],
  reason: [
    { id: null, name: "uszkodzono w dostawie" },
    { id: null, name: "nie działa" },
    { id: null, name: "wada fabryczna" },
    { id: null, name: "brak elementów w zestawie" },
  ],
  paymentMethod: [
    { id: null, name: "gotówka" },
    { id: null, name: "karta" },
    { id: null, name: "przelew" },
  ],
};

export default predefinedSettings;
