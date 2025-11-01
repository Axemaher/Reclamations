import { validateField} from "../ReclamationForm/ReclamationReducer";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../app/AuthProvider";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../app/firebaseConfig";
import { ToastContext } from "../../components/ToastsNotification/ToastNotification";

function ActivityHistory({dispatch}) {
    
    const { addToast } = useContext(ToastContext);

    const { id } = useParams();
    const { uid } = useContext(AuthContext);

    const [activityData, setActivityData] = useState([])
    const [activityNote, setactivityNote] = useState('');
    const [activityError, setActivityError] = useState(false);
  
    useEffect(() => {
        if(!uid) {
            console.log('not logined')
            return
        } else {
        const getData = async () => {
            const docRef = doc(db, "users", uid, 'reclamations', id);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
            setActivityData(docSnap.data().activityData);
            } else {
            console.log("No such document!");
            }
        };
        getData();
        }
    
    },[uid, id] );

    const handleOnChange = (e) => {
        setactivityNote(e.target.value)
    };

    const saveActivity = async (newData) => {
        try {
            await updateDoc(doc(db, "users", uid, "reclamations", id), {
            activityData: newData
        });
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteActivity = (index) => {
        const arrCopy = [...activityData];
        const newActivityData = arrCopy.filter((el) => el.id !== index);
        setActivityData(newActivityData);
        dispatch({ type: 'SET_ACTIVITY_HISTORY', payload: newActivityData});
        saveActivity(newActivityData);
        addToast('Pomyślnie usunięto aktywność', 'success')
    }

    const handleAddActivity = (e) => {
        e.preventDefault();
        if(validateField('activityNote', activityNote)) {
            setActivityError(true);
        } else {
            setActivityError(false);
            const newActivityData = [...activityData];
            newActivityData.push(
                {
                    id: crypto.randomUUID(),
                    addDate: new Date().toISOString().slice(0, 10),
                    activity: activityNote
                }
            );
            setActivityData(newActivityData);
            dispatch({ type: 'SET_ACTIVITY_HISTORY', payload: newActivityData});
            saveActivity(newActivityData);
            setactivityNote('');
            addToast('Pomyślnie dodano aktywność', 'success')
        }
    }

  return (
    <form onSubmit={handleAddActivity}>
        <fieldset>
            <legend>Historia aktywności</legend>
            {activityData &&
                <ul className="activity-list">
                    {activityData.map((el) => (
                        <li key={el.id}>
                            <p>{el.addDate}</p>
                            <p>{el.activity}</p>
                            {
                                el.id !== 'initial' &&
                                <button type="button" onClick={() => handleDeleteActivity(el.id)}>usuń</button>
                            }
                        </li>
                    ) )
                    }
                </ul>
            }

            <p>
            <label htmlFor="activityNote">Notatka</label>
            <textarea
                    type=""
                    onChange={handleOnChange}
                    name="activityNote"
                    value={activityNote}
                    id="activityNote"
                    // required
                    />
            <span>{activityError ? `Tekst musi posiadać co najmniej 3 znaki` : ""}</span>
            <button type="submit">Dodaj notatkę</button>
            </p>
        </fieldset>
    </form>
    )
}

export default ActivityHistory;









