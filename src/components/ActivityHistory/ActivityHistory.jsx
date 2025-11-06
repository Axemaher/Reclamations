import { validateField} from "../ReclamationForm/ReclamationReducer";
import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../app/AuthProvider";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../app/firebaseConfig";
import { ToastContext } from "../../components/ToastsNotification/ToastNotification";

function ActivityHistory({dispatch}) {
    
    const { addToast } = useContext(ToastContext);
    const { id } = useParams();
    const { uid } = useContext(AuthContext);

    const [activityData, setActivityData] = useState([])
    const [activity, setActivity] = useState({
        note: '',
        error: false
    })
  

    useEffect(() => {
    if (!uid) return;

    const docRef = doc(db, "users", uid, "reclamations", id);

    const unsubscribe = onSnapshot( docRef, (docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data().activityData || [];
            setActivityData(data);
            dispatch({ type: 'SET_ACTIVITY_HISTORY', payload: data });
        } else {
            console.log("No such document!");
        }
        }
    );

    return () => unsubscribe();
    }, [uid, id, dispatch]);

    const handleOnChange = (e) => {
        setActivity((prevState) => ({...prevState, note: e.target.value}))
    };

    const saveActivity = async (newData) => {
        try {
            await updateDoc(doc(db, "users", uid, "reclamations", id), {
                activityData: newData
            });
            setActivityData(newData);
            resetActivity();
            dispatch({ type: 'SET_ACTIVITY_HISTORY', payload: newData});
        } catch (error) {
            addToast('Błąd zapisu aktywności', 'error');
            console.log(error);
        };
    };

    const resetActivity = () => {
        setActivity({note: '', error: false})
    }

    const handleDeleteActivity = (index) => {
        const newActivityData = activityData.filter(el => el.id !== index);
        saveActivity(newActivityData);
        addToast('Pomyślnie usunięto aktywność', 'success')
    }

    const handleAddActivity = (e) => {
        e.preventDefault();
        if (validateField('activityNote', activity.note)) {
            setActivity((prevState) => ({ ...prevState, error: true }));
            return;
        }

        setActivity((prevState) => ({ ...prevState, error: false }));
        const newActivityData = [...activityData, {
            id: crypto.randomUUID(),
            addDate: new Date().toISOString().slice(0, 10),
            activity: activity.note
        }];
        saveActivity(newActivityData);
        addToast('Pomyślnie dodano aktywność', 'success');
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
                        value={activity.note}
                        id="activityNote"
                        // required
                        />
                <span>{activity.error ? `Tekst musi posiadać co najmniej 3 znaki` : ""}</span>
                <button type="submit">Dodaj notatkę</button>
                </p>
            </fieldset>
        </form>
    )
}

export default ActivityHistory;









