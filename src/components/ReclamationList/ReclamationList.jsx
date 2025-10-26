import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { collection, query, getDocs } from "firebase/firestore";
import './ReclamationList.scss';
import { db } from "../../app/firebaseConfig";
import { AuthContext } from "../../app/AuthProvider";

function ReclamationsList() {

const { uid } = useContext(AuthContext);
const navigate = useNavigate();

const [data, setData] = useState(null)


useEffect(() => {
    if(!uid) {
        setData(null);
    } else {
    const getData = async () => {
        const data = [];
        const q = query(collection(db, "users", uid, "reclamations"));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() });
        });
        setData(data);
    };
    getData();
    }
}, [uid]);

const handleEdit = (e) => {
    
    navigate(`/edit/${e.target.value}`, { replace: true });
}

return (
    <>
    {data ? 
        <table>
        <thead>
            <tr>
            <th scope="col">Data dodania</th>
            <th scope="col">Termin wykonania</th>
            <th scope="col">Metoda dostarczenia</th>
            <th scope="col">Typ</th>
            <th scope="col">Data sprzedaży</th>
            <th scope="col">Numer dokumentu sprzedaży</th>
            <th scope="col">Opis zlecenia</th>
            <th scope="col">Załącznik</th>
            <th scope="col">Klient</th>
            <th scope="col">NIP</th>
            <th scope="col">Adres</th>
            <th scope="col">Kod pocztowy</th>
            <th scope="col">Miasto</th>
            <th scope="col">Email</th>
            <th scope="col">Nr. telefonu</th>
            <th scope="col">Notatka do klienta</th>
            <th scope="col">PRoducent</th>
            <th scope="col">Nazwa skrócona</th>
            <th scope="col">Pełna nazwa</th>
            <th scope="col">NUmer katalogowy</th>
            <th scope="col">Dodatkowy opis produktu</th>
            </tr>
        </thead>
        <tbody>
                {data.map((el) => (
                    <tr key={el.id}>
                        <td><button value={el.id} onClick={handleEdit} >Edytuj</button></td>
                        <td>{el.submissionDate}</td>
                        <td>{el.deadlineDate}</td>
                        <td>{el.deliveryMethod}</td>
                        <td>{el.type}</td>
                        <td>{el.dateOfSale}</td>
                        <td>{el.salesDocNumber}</td>
                        <td>{el.orderDescription}</td>
                        <td>{el.attachment}</td>
                        <td>{el.clientName}</td>
                        <td>{el.nip}</td>
                        <td>{el.address}</td>
                        <td>{el.postalCode}</td>
                        <td>{el.city}</td>
                        <td>{el.email}</td>
                        <td>{el.phonePrefix} {el.phoneNumber}</td>
                        <td>{el.note}</td>
                        <td>{el.manufacturer}</td>
                        <td>{el.shortName}</td>
                        <td>{el.fullName}</td>
                        <td>{el.catalogNumber}</td>
                        <td>{el.additionalDescription}</td>
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
        : "loading data"}
    </>
    );
}

export default ReclamationsList;