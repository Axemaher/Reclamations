function ClientForm({ handleOnChange, handleOnBlur, state }) {
  const { fields, errors } = state;
  return (
    <fieldset className="form__fieldset form__fieldset--width-form">
      <legend className="form__legend">Dane klienta</legend>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="contactPerson">
          Osoba kontaktowa
        </label>
        <input
          type="text"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="contactPerson"
          value={fields.contactPerson}
          id="contactPerson"
          aria-invalid={errors.contactPerson ? "true" : "false"}
          aria-describedby="contactPerson-error"
          className={`form-row__input ${
            errors.contactPerson && "form-row__input-error"
          }`}
        />
        <span
          className="form-row__span-error"
          id="contactPerson-error"
          aria-live="polite"
        >
          {errors.contactPerson && "Wpisz dane osoby kontaktowej"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="companyName">
          Firma
        </label>
        <input
          type="text"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="companyName"
          value={fields.companyName}
          id="companyName"
          aria-invalid={errors.companyName ? "true" : "false"}
          aria-describedby="companyName-error"
          className={`form-row__input ${
            errors.companyName && "form-row__input-error"
          }`}
        />
        <span
          className="form-row__span-error"
          id="companyName-error"
          aria-live="polite"
        >
          {errors.companyName && "Wpisz dane firmy"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="nip">
          NIP
        </label>
        <input
          type="text"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="nip"
          value={fields.nip}
          id="nip"
          aria-invalid={errors.nip ? "true" : "false"}
          aria-describedby="nip-error"
          className={`form-row__input ${errors.nip && "form-row__input-error"}`}
        />
        <span
          className="form-row__span-error"
          id="nip-error"
          aria-live="polite"
        >
          {errors.nip && "Podaj prawidłowy NIP"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="address">
          Ulica i numer
        </label>
        <input
          type="text"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="address"
          value={fields.address}
          id="address"
          aria-invalid={errors.address ? "true" : "false"}
          aria-describedby="address-error"
          className={`form-row__input ${
            errors.address && "form-row__input-error"
          }`}
        />
        <span
          className="form-row__span-error"
          id="address-error"
          aria-live="polite"
        >
          {errors.address && "Podaj ulicę i numer"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="postalCode">
          Kod i miasto
        </label>
        <div className="form-row__multiple">
          <input
            type="text"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="postalCode"
            value={fields.postalCode}
            id="postalCode"
            aria-invalid={errors.postalCode ? "true" : "false"}
            aria-describedby="postalCode-error"
            className={`form-row__input ${
              errors.postalCode && "form-row__input-error"
            }`}
          />
          <input
            type="text"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="city"
            value={fields.city}
            id="city"
            aria-invalid={errors.city ? "true" : "false"}
            aria-describedby="city-error"
            className={`form-row__input ${
              errors.city && "form-row__input-error"
            }`}
          />
        </div>
        <span className="form-row__span-error" aria-live="polite">
          {errors.city && errors.postalCode
            ? "Podaj poprawny kod pocztowy i miasto"
            : errors.city
            ? "Podaj miasto"
            : errors.postalCode
            ? "Podaj poprawny kod pocztowy"
            : ""}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="email">
          E-mail
        </label>
        <input
          type="email"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="email"
          value={fields.email}
          id="email"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby="email-error"
          className={`form-row__input ${
            errors.email && "form-row__input-error"
          }`}
        />
        <span
          className="form-row__span-error"
          id="email-error"
          aria-live="polite"
        >
          {errors.email && "Podaj prawidłowy adres e-mail"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="phonePrefix">
          Telefon
        </label>
        <div className="form-row__multiple">
          <input
            type="text"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="phonePrefix"
            value={fields.phonePrefix}
            id="phonePrefix"
            aria-invalid={errors.phonePrefix ? "true" : "false"}
            aria-describedby="phone-error"
            className={`form-row__input ${
              errors.phonePrefix && "form-row__input-error"
            }`}
          />
          <input
            type="text"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="phoneNumber"
            value={fields.phoneNumber}
            id="phoneNumber"
            aria-invalid={errors.phoneNumber ? "true" : "false"}
            aria-describedby="phone-error"
            className={`form-row__input ${
              errors.phoneNumber && "form-row__input-error"
            }`}
          />
        </div>
        <span
          className="form-row__span-error"
          id="phone-error"
          aria-live="polite"
        >
          {errors.phoneNumber && errors.phonePrefix
            ? "Podaj poprawny prefiks i numer telefonu"
            : errors.phoneNumber
            ? "Podaj poprawny numer telefonu"
            : errors.phonePrefix
            ? "Podaj poprawny prefiks"
            : ""}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="clientNote">
          Notatka
        </label>
        <textarea
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="clientNote"
          value={fields.clientNote}
          id="clientNote"
          rows="4"
          className="form-row__input"
        />
      </div>
    </fieldset>
  );
}

export default ClientForm;
