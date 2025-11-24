function ProductForm({ handleOnChange, handleOnBlur, state }) {
  const { fields, errors } = state;
  return (
    <fieldset className="form__fieldset form__fieldset--width-form">
      <legend className="form__legend">Dane produktu</legend>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="manufacturer">
          Producent
        </label>
        <input
          type="text"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="manufacturer"
          value={fields.manufacturer}
          id="manufacturer"
          aria-invalid={errors.manufacturer ? "true" : "false"}
          aria-describedby="manufacturer-error"
          className={`form-row__input ${
            errors.manufacturer && "form-row__input-error"
          }`}
        />
        <span
          className="form-row__span-error"
          id="manufacturer-error"
          aria-live="polite"
        >
          {errors.manufacturer && "Podaj producenta"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="shortName">
          Nazwa skrócona / symbol
        </label>
        <input
          type="text"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="shortName"
          value={fields.shortName}
          id="shortName"
          aria-invalid={errors.shortName ? "true" : "false"}
          aria-describedby="shortName-error"
          className={`form-row__input ${
            errors.shortName && "form-row__input-error"
          }`}
        />
        <span
          className="form-row__span-error"
          id="shortName-error"
          aria-live="polite"
        >
          {errors.shortName && "Podaj nazwę skróconą produktu"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="fullName">
          Nazwa pełna
        </label>
        <input
          type="text"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="fullName"
          value={fields.fullName}
          id="fullName"
          aria-invalid={errors.fullName ? "true" : "false"}
          aria-describedby="fullName-error"
          className={`form-row__input ${
            errors.fullName && "form-row__input-error"
          }`}
        />
        <span
          className="form-row__span-error"
          id="fullName-error"
          aria-live="polite"
        >
          {errors.fullName && "Podaj pełną nazwę produktu"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="catalogNumber">
          Numer kat. producenta
        </label>
        <input
          type="text"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="catalogNumber"
          value={fields.catalogNumber}
          id="catalogNumber"
          aria-invalid={errors.catalogNumber ? "true" : "false"}
          aria-describedby="catalogNumber-error"
          className={`form-row__input ${
            errors.catalogNumber && "form-row__input-error"
          }`}
        />
        <span
          className="form-row__span-error"
          id="catalogNumber-error"
          aria-live="polite"
        >
          {errors.catalogNumber && "Podaj numer katalogowy"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="serialNumber">
          Numer seryjny
        </label>
        <input
          type="text"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="serialNumber"
          value={fields.serialNumber}
          id="serialNumber"
          aria-invalid={errors.serialNumber ? "true" : "false"}
          aria-describedby="serialNumber-error"
          className={`form-row__input ${
            errors.serialNumber && "form-row__input-error"
          }`}
        />
        <span
          className="form-row__span-error"
          id="serialNumber-error"
          aria-live="polite"
        >
          {errors.serialNumber && "Podaj numer seryjny"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="quantity">
          Ilość sztuk
        </label>
        <input
          type="number"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="quantity"
          value={fields.quantity}
          id="quantity"
          aria-invalid={errors.quantity ? "true" : "false"}
          aria-describedby="quantity-error"
          className={`form-row__input ${
            errors.quantity && "form-row__input-error"
          }`}
        />
        <span
          className="form-row__span-error"
          id="quantity-error"
          aria-live="polite"
        >
          {errors.quantity && "Podaj ilość sztuk"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="additionalDescription">
          Opis dodatkowy
        </label>
        <textarea
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="additionalDescription"
          value={fields.additionalDescription}
          id="additionalDescription"
          rows="4"
          className="form-row__input"
        />
      </div>
    </fieldset>
  );
}

export default ProductForm;
