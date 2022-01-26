import { initializeApp } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { getFirestore,query,getDocs,collection,where,addDoc, deleteDoc,doc, updateDoc} from "firebase/firestore";
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

const getAllBugs = async() => {
    try {
        const q = query(collection(db, "bugs"));
        const docs = await getDocs(q);
        return docs.docs;
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

const addBug = async(data) => {
    try {
        await addDoc(collection(db, "bugs"), data);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

const editBug = async(data, bugId) => { //kind of messy way to edit but unable to get normal update function to work
    try {
        deleteBug(bugId);
        addBug(data);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

const deleteBug = async(bugId) => {
    try {
        await deleteDoc(doc(db, "bugs", bugId));
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

export {getBug, getAllBugs, addBug, deleteBug, editBug};