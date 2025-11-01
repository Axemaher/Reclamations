import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, getDocs } from "firebase/firestore";
import './ReclamationList.scss';
import { db } from "../../app/firebaseConfig";
import { AuthContext } from "../../app/AuthProvider";
import { Link } from "react-router-dom";

function ReclamationsList() {

const { uid } = useContext(AuthContext);
const navigate = useNavigate();

const [data, setData] = useState(null)
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
  if (!uid) {
    setData([]);
    setLoading(false);
    return;
  }

  const getData = async () => {
    try {
      const data = [];
      const q = query(collection(db, "users", uid, "reclamations"));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc => data.push({ id: doc.id, ...doc.data() }));
      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  getData();
}, [uid]);

const handleEdit = (e) => {
    
    navigate(`/edit/${e.target.value}`, { replace: true });
}

if (loading) return <p>Ładowanie</p>
if (error) return <p>Błąd wczytywania, spróbuj ponownie</p>
if (Array.isArray(data) && data.length === 0) return <p>Brak danych <Link to="/addReclamation">Dodaj pierwszą reklamalcję</Link></p>
if (data.length >=1) return (
    <div className="table-wrapper">
        <table>
        <thead>
          <tr>
            <th></th>
            <th>Pozostałe dni</th>
            <th>Data dodania</th>
            <th>Termin wykonania</th>
            <th>Metoda dostarczenia</th>
            <th>Typ</th>
            <th>Priorytet</th>
            <th>Status</th>
            <th>Powód</th>
            <th>Data sprzedaży</th>
            <th>Numer dokumentu sprzedaży</th>
            <th>Metoda płatności</th>
            <th>Dodatkowy opis zlecenia</th>
            <th>Załącznik</th>
            <th>Link do załącznika</th>
            <th>Dane kontaktowe klienta</th>
            <th>Nazwa firmy</th>
            <th>NIP</th>
            <th>Adres</th>
            <th>Kod pocztowy</th>
            <th>Miasto</th>
            <th>Email</th>
            <th>Nr. telefonu</th>
            <th>Notatka do klienta</th>
            <th>Producent</th>
            <th>Nazwa skrócona</th>
            <th>Pełna nazwa</th>
            <th>Numer katalogowy</th>
            <th>Numer seryjny</th>
            <th>Ilość</th>
            <th>Dodatkowy opis produktu</th>
            <th>Numer przesyłki</th>
            <th>Firma kurierska</th>
            <th>Adres zwrotu</th>
            <th>Produkt zwrócony?</th>
            <th>Historia aktywności</th>
          </tr>
        </thead>
        <tbody>
          {data.map(el => (
            <tr key={el.id}>
              <td><button value={el.id} onClick={handleEdit}>Edytuj</button></td>
              <td>{(() => {
                const diff = Math.round(
                  (Date.parse(el.submissionDate) - Date.parse(el.deadlineDate)) / (1000 * 60 * 60 * 24)
                );
                return diff > 0 ? `+${diff} dni po terminie`
                     : diff < 0 ? `${Math.abs(diff)} dni`
                     : 'W terminie';
              })()}</td>
              <td>{el.submissionDate}</td>
              <td>{el.deadlineDate}</td>
              <td>{el.deliveryMethod}</td>
              <td>{el.type}</td>
              <td>{el.priority}</td>
              <td>{el.status}</td>
              <td>{el.reason}</td>
              <td>{el.dateOfSale}</td>
              <td>{el.salesDocNumber}</td>
              <td>{el.paymentMethod}</td>
              <td>{el.orderDescription}</td>
              <td>{el.attachment}</td>
              <td>{el.attachmentUrl}</td>
              <td>{el.contactPerson}</td>
              <td>{el.companyName}</td>
              <td>{el.nip}</td>
              <td>{el.address}</td>
              <td>{el.postalCode}</td>
              <td>{el.city}</td>
              <td>{el.email}</td>
              <td>{el.phonePrefix} {el.phoneNumber}</td>
              <td>{el.clientNote}</td>
              <td>{el.manufacturer}</td>
              <td>{el.shortName}</td>
              <td>{el.fullName}</td>
              <td>{el.catalogNumber}</td>
              <td>{el.serialNumber}</td>
              <td>{el.quantity}</td>
              <td>{el.additionalDescription}</td>
              <td>{el.returnTrackingNumber}</td>
              <td>{el.courier}</td>
              <td>{el.returnAddress}</td>
              <td>{el.productIsReturned}</td>
              <td>
                {el.activityData?.map(act => (
                  <div key={act.id}>{act.addDate}: {act.activity}</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
            <tr>
            <th scope="row" colspan="2">Average age</th>
            <td>33</td>
            </tr>
        </tfoot> */}
        </table>
    </div>)
}

export default ReclamationsList;