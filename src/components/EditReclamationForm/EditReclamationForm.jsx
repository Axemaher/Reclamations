import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";import { doc, getDoc } from "firebase/firestore";
import { db } from "../../app/firebaseConfig";
import { AuthContext } from "../../app/AuthProvider";


function EditReclamationForm() {

  const { uid } = useContext(AuthContext);
  
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if(!uid) {
        setData(null);
    } else {
    const getData = async () => {
        const docRef = doc(db, "users", uid, 'reclamations', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setData(docSnap.data())
          console.log(docSnap.data())
        } else {
          console.log("No such document!");
        }
      };
    getData();
    }
  },[uid, id] );

  return (
    <>
      {data ? (
        <ul>
          {Object.entries(data).map(([key, value]) => (
            <li key={key}>
              {key} - {value}
            </li>
          ))}
        </ul>
      ) : (
        "loading data"
      )}
    </>
  );
}

export default EditReclamationForm;