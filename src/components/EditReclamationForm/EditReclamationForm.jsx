import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../app/firebaseConfig";



function EditReclamationForm() {

  const { id } = useParams();
  const auth = getAuth();

  const [data, setData] = useState(null);
  const [userLogged, setUserLogged] = useState(null);
  const [uid, setUid] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogged(true);
        setUid(user.uid);
        getData(user.uid, id);
        console.log(user.uid);
      } else {
        setUserLogged(false);
      }
    });

    return () => unsubscribe();
  },[id] );



  const getData = async (uid, id) => {
    const docRef = doc(db, "users", uid, 'reclamations', id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setData(docSnap.data())
    } else {
      console.log("No such document!");
    }
  }
  
  

  return (
    <>
      {data ? 
        <p>{data.clientName}</p>  
        : "loading data"
      }
    </>
  );
}

export default EditReclamationForm;