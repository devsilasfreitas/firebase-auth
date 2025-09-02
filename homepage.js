import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import {
    getAuth,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, setDoc, getDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC3lna98Dixo-R5wulrQ__I4Q178GNVI28",
    authDomain: "openidconnect-9986c.firebaseapp.com",
    projectId: "openidconnect-9986c",
    storageBucket: "openidconnect-9986c.firebasestorage.app",
    messagingSenderId: "654304253921",
    appId: "1:654304253921:web:5dd940d1cf8c2f2d8924a0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, user => {
    const loggedInUserId = localStorage.getItem("loggedInUserId");

    if (loggedInUserId) {
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);

        getDoc(docRef)
            .then(docSnap => {
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    document.getElementById("loggedUserFName").innerText = userData.firstName;
                    document.getElementById("loggedUserEmail").innerText = userData.email;
                    document.getElementById("loggedUserLName").innerText = userData.lastName;
                } else {
                    console.log("ID não encontrado no documento")
                }
            })
            .catch(error => {
                console.log("documento não encontrado")
            });
    } else {
        console.log("ID de usuário não encontrado no localStorage");
    }
});

const logoutButton = document.getElementById("logout");
logoutButton.addEventListener("click", () => {
    localStorage.removeItem("loggedInUserId");
    signOut(auth)
        .then(() => {
            window.location.href = "index.html";
        })
        .catch(error => {
            console.error("Error signing out: ", error);
        });
});