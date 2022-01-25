import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth,signInWithPopup,signInWithEmailAndPassword,createUserWithEmailAndPassword,sendPasswordResetEmail,signOut} from "firebase/auth";
import { getFirestore,query,getDocs,collection,where,addDoc,} from "firebase/firestore";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();
const logInWithGoogle = async() => {
    try {
        const response = await signInWithPopup(auth, googleProvider);
        const user = response.user;
        const q = query(collection(db, "users"), where("id", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

const logInWithEmailAndPassword = async(email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.error(error);
        alert(error);
    }
};

const signUpWithEmailAndPassword = async(name, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await addDoc(collection(db, "users"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.error(error);
        alert(error);
    }
};

const sendPasswordReset = async(email) => {
    try {
        await sendPasswordResetEmail(auth, email);
        alert("Password reset link sent!");
    } catch (error) {
        console.error(error);
        alert(error.message);
    }
};

const logout = () => {
    signOut(auth);
};

export {auth, db, logInWithGoogle, logInWithEmailAndPassword, signUpWithEmailAndPassword, sendPasswordReset, logout};