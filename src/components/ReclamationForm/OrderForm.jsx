function OrderForm({handleOnChange, handleOnBlur, state, modeEdit, settingsData}) {
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
            <option value="osobiście">osobiście</option>
            <option value="e-mail">e-mail</option>
            <option value="przysłano">przysłano</option>
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
            <option value="gwarancyjne">gwarancyjne</option>
            <option value="pogwarancyjne">pogwarancyjne</option>
          </select>
          <span>{errors.type ? `Wybierz typ zlecenia` : ""}</span>
        </p>
        <p>   
          <label htmlFor="priority">Priorytet</label>
          <select 
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  name="priority"
                  value={fields.priority}
                  id="priority"
                  // required
                  >
            <option value="niski">niski</option>
            <option value="normalny">normalny</option>
            <option value="wysoki">wysoki</option>
          </select>
          <span>{errors.priority ? `Wybierz priorytet` : ""}</span>
        </p>
        {modeEdit &&
        <p>   
          <label htmlFor="status">Status</label>
          <select 
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  name="status"
                  value={fields.status}
                  id="status"
                  // required
                  >
                    {settingsData.status.map((status, index) => (
                      <option key={index} value={status.name}>{status.name}</option>
                    ))}
          </select>
          <span>{errors.status ? `Wybierz status` : ""}</span>
        </p>
        }
        <p>   
          <label htmlFor="reason">Powód</label>
          <select 
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  name="reason"
                  value={fields.reason}
                  id="reason"
                  // required
                  >
            <option value="uszkodzono w dostawie">uszkodzono w dostawie</option>
            <option value="nie działa">nie działa</option>
            <option value="wada fabryczna">wada fabryczna</option>
            <option value="brak elementów w zestawie">brak elementów w zestawie</option>
            <option value="niska jakość wykonania">niska jakość wykonania</option>
          </select>
          <span>{errors.reason ? `Wybierz powód` : ""}</span>
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
          <label htmlFor="paymentMethod">Metoda płatności</label>
          <select 
                  onChange={handleOnChange}
                  onBlur={handleOnBlur}
                  name="paymentMethod"
                  value={fields.paymentMethod}
                  id="paymentMethod"
                  // required
                  >
            <option value="gotówka">gotówka</option>
            <option value="karta">karta</option>
            <option value="przelew">przelew</option>
          </select>
          <span>{errors.paymentMethod ? `Wybierz metodę płatności` : ""}</span>
        </p>
        <p>
          <label htmlFor="orderDescription">Dodatkowy opis zlecenia</label>
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
                // optional
                />
          <span>{errors.attachment ? `Coś poszło nie tak, spróbuj ponownie` : ""}</span>
          {modeEdit && fields.attachmentUrl && (
            <a href={fields.attachmentUrl} download>
              Pobierz {fields.attachment}
            </a>
          )}
        </p>
</fieldset>
  </>
}

export default OrderForm;









