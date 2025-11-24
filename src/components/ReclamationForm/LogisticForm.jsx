function LogisticDataForm({ handleOnChange, handleOnBlur, state }) {
  const { fields, errors } = state;

  return (
    <fieldset className="form__fieldset form__fieldset--width-form">
      <legend className="form__legend">Dane logistyczne</legend>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="returnTrackingNumber">
          Numer przesyłki zwrotnej
        </label>
        <input
          type="text"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="returnTrackingNumber"
          value={fields.returnTrackingNumber}
          id="returnTrackingNumber"
          aria-invalid={errors.returnTrackingNumber ? "true" : "false"}
          aria-describedby="returnTrackingNumber-error"
          className={`form-row__input ${
            errors.returnTrackingNumber && "form-row__input-error"
          }`}
        />
        <span
          className="form-row__span-error"
          id="returnTrackingNumber-error"
          aria-live="polite"
        >
          {errors.returnTrackingNumber && "Podaj numer przesyłki"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="courier">
          Firma kurierska
        </label>
        <input
          type="text"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="courier"
          value={fields.courier}
          id="courier"
          aria-invalid={errors.courier ? "true" : "false"}
          aria-describedby="courier-error"
          className={`form-row__input ${
            errors.courier && "form-row__input-error"
          }`}
        />
        <span
          className="form-row__span-error"
          id="courier-error"
          aria-live="polite"
        >
          {errors.courier && "Podaj firmę kurierską"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="returnAddress">
          Adres zwrotu
        </label>
        <input
          type="text"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="returnAddress"
          value={fields.returnAddress}
          id="returnAddress"
          aria-invalid={errors.returnAddress ? "true" : "false"}
          aria-describedby="returnAddress-error"
          className={`form-row__input ${
            errors.returnAddress && "form-row__input-error"
          }`}
        />
        <span
          className="form-row__span-error"
          id="returnAddress-error"
          aria-live="polite"
        >
          {errors.returnAddress && "Podaj adres zwrotu"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="productIsReturned">
          Produkt zwrócony?
        </label>
        <select
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="productIsReturned"
          value={fields.productIsReturned}
          id="productIsReturned"
          aria-invalid={errors.productIsReturned ? "true" : "false"}
          aria-describedby="productIsReturned-error"
          className={`form-row__input ${
            errors.productIsReturned && "form-row__input-error"
          }`}
        >
          <option value="">Wybierz</option>
          <option value="tak">Tak</option>
          <option value="nie">Nie</option>
        </select>
        <span
          className="form-row__span-error"
          id="productIsReturned-error"
          aria-live="polite"
        >
          {errors.productIsReturned && "Wybierz status zwrotu"}
        </span>
      </div>
    </fieldset>
  );
}

export default LogisticDataForm;
