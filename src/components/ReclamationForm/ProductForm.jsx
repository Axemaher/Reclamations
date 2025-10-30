function ProductForm({handleOnChange, handleOnBlur, state}) {
  const {fields, errors} = state;
  return <>
    <fieldset>
        <legend>Dane produktu</legend>
        <p>
            <label htmlFor="manufacturer">Producent</label>
            <input
            type="text"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="manufacturer"
            value={fields.manufacturer}
            id="manufacturer"
            // required
            />
            <span>{errors.manufacturer ? `Podaj producenta` : ""}</span>
        </p>

        <p>
            <label htmlFor="shortName">Nazwa skrócona / symbol</label>
            <input
            type="text"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="shortName"
            value={fields.shortName}
            id="shortName"
            // required
            />
            <span>{errors.shortName ? `Podaj nazwę skróconą produktu` : ""}</span>
        </p>

        <p>
            <label htmlFor="fullName">Nazwa pełna</label>
            <input
            type="text"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="fullName"
            value={fields.fullName}
            id="fullName"
            />
            <span>{errors.fullName ? `Podaj pełną nazwę produktu` : ""}</span>
        </p>

        <p>
            <label htmlFor="catalogNumber">Numer katalogowy producenta</label>
            <input
            type="text"
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="catalogNumber"
            value={fields.catalogNumber}
            id="catalogNumber"
            // required
            />
            <span>{errors.catalogNumber ? `Podaj numer katalogowy` : ""}</span>
        </p>

        <p>
            <label htmlFor="additionalDescription">Opis dodatkowy</label>
            <textarea
            onChange={handleOnChange}
            onBlur={handleOnBlur}
            name="additionalDescription"
            value={fields.additionalDescription}
            id="additionalDescription"
            rows="4"
            cols="33"
            />
        </p>
    </fieldset>
  </>
}

export default ProductForm;









