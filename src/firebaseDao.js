import { initializeApp } from "firebase/app";
import { sendPasswordResetEmail } from "firebase/auth";
import { getFirestore,query,getDocs,collection,where,addDoc, deleteDoc,doc, updateDoc} from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getBugsByProject = async(projectId) => {
    try {
        const q = query(collection(db, "bugs"), where("projectId", "==", projectId));
        const docs = await getDocs(q);
        return docs.docs;
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

const getAllProjects = async() => {
    try {
        const q = query(collection(db, "projects"));
        const docs = await getDocs(q);
        return docs.docs;
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

const getAuthorisedProjects = async(userUid) => { //may be inefficient if too many accounts, might need to refine n^2 algo
    try {
        const docs = await getAllProjects();
        var filteredDocs = [];
        for (let i = 0; i < docs.length; i++) {
            const data = docs[i].data()
            for (let j = 0; j < data.teamMembers.length; j++) {
                if (data.teamMembers[j].uid === userUid) {
                    filteredDocs = [...filteredDocs, docs[i]];
                    break;
                }
            }
        }
        return filteredDocs;
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

const addProject = async(data) => {
    try {
        await addDoc(collection(db, "projects"), data);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

const editProject = async(data, projectId) => { //kind of messy way to edit but unable to get normal update function to work
    try {
        //await updateDoc(collection(db, "projects").reference(projectId                          ), data);
        deleteProject(projectId);
        addProject(data);
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

const deleteProject = async(projectId) => {
    try {
        await deleteDoc(doc(db, "projects", projectId));
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

const getAllUsers = async() => {
    try {
        const q = query(collection(db, "users"));
        const docs = await getDocs(q);
        return docs.docs;
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

const getUserById = async(uid) => {
    try {
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const docs = await getDocs(q);
        return docs.docs;
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
}

export {getBugsByProject, getAllBugs, addBug, deleteBug, editBug, getAllProjects, getAuthorisedProjects, addProject, editProject, deleteProject, getAllUsers, getUserById};