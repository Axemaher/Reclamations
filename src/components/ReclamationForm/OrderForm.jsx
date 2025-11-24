function OrderForm({
  handleOnChange,
  handleOnBlur,
  state,
  modeEdit,
  settingsData,
}) {
  const { fields, errors } = state;
  return (
    <fieldset className="form__fieldset form__fieldset--width-form">
      <legend className="form__legend">Dane zlecenia</legend>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="submissionDate">
          Data zgłoszenia
        </label>
        <input
          type="date"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="submissionDate"
          value={fields.submissionDate}
          id="submissionDate"
          aria-invalid={errors.submissionDate ? "true" : "false"}
          aria-describedby="submissionDate-error"
          className={`form-row__input ${
            errors.submissionDate && "form-row__input-error"
          }`}
        />
        <span
          className="form-row__span-error"
          id="submissionDate-error"
          aria-live="polite"
        >
          {errors.submissionDate &&
            "Podaj prawidłową datę dodania zgłoszenia, data zgłoszenia musi być przed datą wykonania zlecenia"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="deadlineDate">
          Termin wykonania (domyślnie 14 dni)
        </label>
        <input
          type="date"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="deadlineDate"
          value={fields.deadlineDate}
          id="deadlineDate"
          aria-invalid={errors.deadlineDate ? "true" : "false"}
          aria-describedby="deadlineDate-error"
          className={`form-row__input ${
            errors.deadlineDate && "form-row__input-error"
          }`}
        />
        <span
          className="form-row__span-error"
          id="deadlineDate-error"
          aria-live="polite"
        >
          {errors.deadlineDate &&
            "Termin wykonania zlecenia musi być po dacie dodania zlecenia"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="deliveryMethod">
          Sposób dostarczenia
        </label>
        <select
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="deliveryMethod"
          value={fields.deliveryMethod}
          id="deliveryMethod"
          aria-invalid={errors.deliveryMethod ? "true" : "false"}
          aria-describedby="deliveryMethod-error"
          className={`form-row__input ${
            errors.deliveryMethod && "form-row__input-error"
          }`}
        >
          {settingsData.deliveryMethod.map((deliveryMethod, index) => (
            <option key={index} value={deliveryMethod.name}>
              {deliveryMethod.name}
            </option>
          ))}
        </select>
        <span
          className="form-row__span-error"
          id="deliveryMethod-error"
          aria-live="polite"
        >
          {errors.deliveryMethod && "Wybierz metodę dostarczenia"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="type">
          Typ zlecenia
        </label>
        <select
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="type"
          value={fields.type}
          id="type"
          aria-invalid={errors.type ? "true" : "false"}
          aria-describedby="type-error"
          className={`form-row__input ${
            errors.type && "form-row__input-error"
          }`}
        >
          {settingsData.type.map((type, index) => (
            <option key={index} value={type.name}>
              {type.name}
            </option>
          ))}
        </select>
        <span
          className="form-row__span-error"
          id="type-error"
          aria-live="polite"
        >
          {errors.type && "Wybierz typ zlecenia"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="priority">
          Priorytet
        </label>
        <select
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="priority"
          value={fields.priority}
          id="priority"
          aria-invalid={errors.priority ? "true" : "false"}
          aria-describedby="priority-error"
          className={`form-row__input ${
            errors.priority && "form-row__input-error"
          }`}
        >
          {settingsData.priority.map((priority, index) => (
            <option key={index} value={priority.name}>
              {priority.name}
            </option>
          ))}
        </select>
        <span
          className="form-row__span-error"
          id="priority-error"
          aria-live="polite"
        >
          {errors.priority && "Wybierz priorytet"}
        </span>
      </div>

      {modeEdit && (
        <div className="form-row form-row--width">
          <label className="form-row__label" htmlFor="status">
            Status
          </label>
          <select
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="status"
            value={fields.status}
            id="status"
            aria-invalid={errors.status ? "true" : "false"}
            aria-describedby="status-error"
            className={`form-row__input ${
              errors.status && "form-row__input-error"
            }`}
          >
            {settingsData.status.map((status, index) => (
              <option key={index} value={status.name}>
                {status.name}
              </option>
            ))}
          </select>
          <span
            className="form-row__span-error"
            id="status-error"
            aria-live="polite"
          >
            {errors.status && "Wybierz status"}
          </span>
        </div>
      )}

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="reason">
          Powód
        </label>
        <select
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="reason"
          value={fields.reason}
          id="reason"
          aria-invalid={errors.reason ? "true" : "false"}
          aria-describedby="reason-error"
          className={`form-row__input ${
            errors.reason && "form-row__input-error"
          }`}
        >
          {settingsData.reason.map((reason, index) => (
            <option key={index} value={reason.name}>
              {reason.name}
            </option>
          ))}
        </select>
        <span
          className="form-row__span-error"
          id="reason-error"
          aria-live="polite"
        >
          {errors.reason && "Wybierz powód"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="dateOfSale">
          Data sprzedaży
        </label>
        <input
          type="date"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="dateOfSale"
          value={fields.dateOfSale}
          id="dateOfSale"
          aria-invalid={errors.dateOfSale ? "true" : "false"}
          aria-describedby="dateOfSale-error"
          className={`form-row__input ${
            errors.dateOfSale && "form-row__input-error"
          }`}
        />
        <span
          className="form-row__span-error"
          id="dateOfSale-error"
          aria-live="polite"
        >
          {errors.dateOfSale && "Data sprzedaży nie może być z przyszłości"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="salesDocNumber">
          Numer dokumentu sprzedaży
        </label>
        <input
          type="text"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="salesDocNumber"
          value={fields.salesDocNumber}
          id="salesDocNumber"
          aria-invalid={errors.salesDocNumber ? "true" : "false"}
          aria-describedby="salesDocNumber-error"
          className={`form-row__input ${
            errors.salesDocNumber && "form-row__input-error"
          }`}
        />
        <span
          className="form-row__span-error"
          id="salesDocNumber-error"
          aria-live="polite"
        >
          {errors.salesDocNumber && "Wpisz numer dokumentu sprzedaży"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="paymentMethod">
          Metoda płatności
        </label>
        <select
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="paymentMethod"
          value={fields.paymentMethod}
          id="paymentMethod"
          aria-invalid={errors.paymentMethod ? "true" : "false"}
          aria-describedby="paymentMethod-error"
          className={`form-row__input ${
            errors.paymentMethod && "form-row__input-error"
          }`}
        >
          {settingsData.paymentMethod.map((paymentMethod, index) => (
            <option key={index} value={paymentMethod.name}>
              {paymentMethod.name}
            </option>
          ))}
        </select>
        <span
          className="form-row__span-error"
          id="paymentMethod-error"
          aria-live="polite"
        >
          {errors.paymentMethod && "Wybierz metodę płatności"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="orderDescription">
          Dodatkowy opis zlecenia
        </label>
        <textarea
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="orderDescription"
          value={fields.orderDescription}
          id="orderDescription"
          rows="5"
          className="form-row__input"
        />
        <span className="form-row__span-error" aria-live="polite">
          {errors.orderDescription && "Wpisz opis zlecenia"}
        </span>
      </div>

      <div className="form-row form-row--width">
        <label className="form-row__label" htmlFor="attachment">
          Załącznik
        </label>
        <input
          type="file"
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          name="attachment"
          id="attachment"
          className="form-row__input"
        />
        <span className="form-row__span-error" aria-live="polite">
          {errors.attachment && "Coś poszło nie tak, spróbuj ponownie"}
        </span>
        {modeEdit && fields.attachmentUrl && (
          <a href={fields.attachmentUrl} download>
            Pobierz {fields.attachment}
          </a>
        )}
      </div>
    </fieldset>
  );
}

export default OrderForm;
