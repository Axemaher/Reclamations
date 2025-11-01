function LogisticDataForm({ handleOnChange, handleOnBlur, state }) {
  const { fields, errors } = state;

  return (
    <fieldset>
      <legend>Dane logistyczne</legend>

      <p>
        <label htmlFor="returnTrackingNumber">Numer przesyłki zwrotnej</label>
        <input
          type="text"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="returnTrackingNumber"
          value={fields.returnTrackingNumber}
          id="returnTrackingNumber"
          // optional
        />
        <span>{errors.returnTrackingNumber ? `Podaj numer przesyłki` : ""}</span>
      </p>

      <p>
        <label htmlFor="courier">Firma kurierska</label>
        <input
          type="text"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="courier"
          value={fields.courier}
          id="courier"
          // optional
        />
        <span>{errors.courier ? `Podaj firmę kurierską` : ""}</span>
      </p>

      <p>
        <label htmlFor="returnAddress">Adres zwrotu</label>
        <input
          type="text"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="returnAddress"
          value={fields.returnAddress}
          id="returnAddress"
          // optional
        />
        <span>{errors.returnAddress ? `Podaj adres zwrotu` : ""}</span>
      </p>

      <p>
        <label htmlFor="productIsReturned">Produkt zwrócony?</label>
        <select
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="productIsReturned"
          value={fields.productIsReturned}
          id="productIsReturned"
          // optional
        >
          <option value="">Wybierz</option>
          <option value="tak">Tak</option>
          <option value="nie">Nie</option>
        </select>
        <span>{errors.productIsReturned ? `Wybierz status zwrotu` : ""}</span>
      </p>
    </fieldset>
  );
}

export default LogisticDataForm;
