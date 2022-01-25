import { initializeApp } from "firebase/app";
import { getFirestore,query,getDocs,collection,where,addDoc, deleteDoc,doc} from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getBug = async(name) => {
    try {
        const q = query(collection(db, "bugs"), where("name", "==", name));
        const docs = await getDocs(q);
        return docs.docs[0];
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

const addBug = async(name, description) => {
    try {
        const datetime = new Date(Date());
        await addDoc(collection(db, "bugs"), {
            name,
            description,
            datetime,
        });
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

const deleteBug = async(id) => {
    try {
        await deleteDoc(doc(db, "bugs", id));
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

export {getBug, addBug, deleteBug};