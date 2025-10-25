function ClientForm({handleOnChange, handleOnBlur, state}) {
  const {fields, errors} = state;
  return <>
    <fieldset>
        <legend>Dane klienta</legend>
        <p>
            <label htmlFor="clientName">Pełna nazwa</label>
            <input
            type="text"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="clientName"
            value={fields.clientName}
            id="clientName"
            // required
            />
            <span>{errors.clientName ? `Wpisz pełną nazwę klienta` : ""}</span>
        </p>

        <p>
            <label htmlFor="nip">NIP</label>
            <input
            type="text"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="nip"
            value={fields.nip}
            id="nip"
            />
            <span>{errors.nip ? `Podaj prawidłowy NIP` : ""}</span>
        </p>

        <p>
            <label htmlFor="address">Ulica i numer</label>
            <input
            type="text"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="address"
            value={fields.address}
            id="address"
            // required
            />
            <span>{errors.address ? `Podaj ulicę i numer` : ""}</span>
        </p>

        <p>
            <label htmlFor="postalCode">Kod pocztowy i miasto</label>
            <input
            type="text"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="postalCode"
            value={fields.postalCode}
            id="postalCode"
            // required
            />
            <input
            type="text"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="city"
            value={fields.city}
            id="city"
            // required
            />
            <span>
                {errors.city && errors.postalCode ? 'Podaj poprawny kod pocztowy i miasto' : ""}
                {errors.city && !errors.postalCode ? 'Podaj miasto' : ""}
                {errors.postalCode && !errors.city ? 'Podaj poprawny kod pocztowy' : ""}
            </span>
        </p>

        <p>
            <label htmlFor="email">E-mail</label>
            <input
            type="email"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="email"
            value={fields.email}
            id="email"
            />
            <span>{errors.email ? `Podaj prawidłowy adres e-mail` : ""}</span>
        </p>

        <p>
            <label htmlFor="phone">Telefon</label>
            <input
            type="text"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="phonePrefix"
            value={fields.phonePrefix}
            id="phonePrefix"
            // required
            />
            <input
            type="text"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="phoneNumber"
            value={fields.phoneNumber}
            id="phoneNumber"
            // required
            />
            <span>
                {errors.phoneNumber && errors.phonePrefix ? 'Podaj poprawny prefiks i numer telefonu' : ""}
                {errors.phoneNumber && !errors.phonePrefix ? 'Podaj poprawny numer telefonu' : ""}
                {errors.phonePrefix && !errors.phoneNumber ? 'Podaj poprawny prefiks' : ""}
            </span>
        </p>

        <p>
            <label htmlFor="note">Notatka</label>
            <textarea
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="note"
            value={fields.note}
            id="note"
            rows="4"
            cols="33"
            />
            <span>{errors.note ? `Wpisz notatkę (opcjonalnie)` : ""}</span>
        </p>
</fieldset>
  </>
}

export default ClientForm;









