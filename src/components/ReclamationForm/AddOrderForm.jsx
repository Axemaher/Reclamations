function AddOrderForm({handleOnChange, handleOnBlur, state}) {
  const {fields, errors} = state;
  return <>
    <fieldset>
        <legend>Dodanie zlecenia</legend>
        <p>
          <label htmlFor="submissionDate">Data zgłoszenia</label>
          <input
                type="date"
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                name="submissionDate"
                value={fields.submissionDate}
                id="submissionDate"
                // required
                />
          <span>{errors.submissionDate ? `Podaj prawidłową datę dodania zgłoszenia, data zgłoszenia musi być przed datą wykonania zlecenia` : ""}</span>
        </p>
        <p>
          <label htmlFor="deadlineDate">Termin wykonania (domyślnie 14 dni)</label>
          <input
                type="date"
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                name="deadlineDate"
                value={fields.deadlineDate}
                id="deadlineDate"
                // required
                />
          <span>{errors.deadlineDate ? `Termin wykonania zlecenia musi być po dacie dodania zlecenia` : ""}</span>
        </p>

        <p>   
          <label htmlFor="deliveryMethod">Sposób dostarczenia</label>
          <select 
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  name="deliveryMethod"
                  value={fields.deliveryMethod}
                  id="deliveryMethod"
                  // required
                  >
            <option value="person">osobiście</option>
            <option value="email">e-mail</option>
            <option value="send">przysłano</option>
          </select>
          <span>{errors.deliveryMethod ? `Wybierz metodę dostarczenia` : ""}</span>
        </p>
        <p>   
          <label htmlFor="type">Typ zlecenia</label>
          <select 
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  name="type"
                  value={fields.type}
                  id="type"
                  // required
                  >
            <option value="warranty">gwarancyjne</option>
            <option value="postWarranty">pogwarancyjne</option>
          </select>
          <span>{errors.type ? `Wybierz typ zlecenia` : ""}</span>
        </p>
        <p>
          <label htmlFor="dateOfSale">Data sprzedaży</label>
          <input
                type="date"
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                name="dateOfSale"
                value={fields.dateOfSale}
                id="dateOfSale"
                // required
                />
          <span>{errors.dateOfSale ? `Data sprzedaży nie może być z przyszłości` : ""}</span>
        </p>
        <p>
          <label htmlFor="salesDocNumber">Numer dokumentu sprzedaży</label>
          <input
                type="text"
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                name="salesDocNumber"
                value={fields.salesDocNumber}
                id="salesDocNumber"
                // required
                />
          <span>{errors.salesDocNumber ? `Wpisz numer dokumentu sprzedaży` : ""}</span>
        </p>
        <p>
          <label htmlFor="orderDescription">Opis zlecenia</label>
          <textarea
                type="text"
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                name="orderDescription"
                value={fields.orderDescription}
                id="orderDescription"
                rows="5" 
                cols="33"
                // required
                />

          <span>{errors.orderDescription ? `Wpisz opis zlecenia` : ""}</span>
        </p>
        <p>
          <label htmlFor="attachment">Załącznik</label>
          <input
                type="file"
                onChange={handleOnChange}
                onBlur={handleOnBlur}
                name="attachment"
                id="attachment"
                // required
                />
          <span>{errors.attachment ? `Coś poszło nie tak, spróbuj ponownie` : ""}</span>
        </p>
</fieldset>
  </>
}

export default AddOrderForm;









