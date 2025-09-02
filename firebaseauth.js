import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { 
    getAuth,
    // GoogleProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyC3lna98Dixo-R5wulrQ__I4Q178GNVI28",
    authDomain: "openidconnect-9986c.firebaseapp.com",
    projectId: "openidconnect-9986c",
    storageBucket: "openidconnect-9986c.firebasestorage.app",
    messagingSenderId: "654304253921",
    appId: "1:654304253921:web:5dd940d1cf8c2f2d8924a0"
};

const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

const signUp = document.getElementById("submitSignUp");

signUp.addEventListener("click", (ev) => {
    ev.preventDefault();

    const email = document.getElementById("rEmail").value;
    const password = document.getElementById("rPassword").value;
    const firstName = document.getElementById("fName").value;
    const lastName = document.getElementById("lName").value;

    const auth = getAuth();
    const db = getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
        .then( userCredential => {
            const user = userCredential.user;
            const userData = { email, firstName, lastName };

            showMessage("Conta criada com sucesso", "signUpMessage");

            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
                .then(() => {
                    window.location.href = "index.html";
                })
                .catch(error => {
                    console.error("Error writing document", error);
                })
        })
        .catch(error => {
            const errorCode = error.code;
            if (errorCode == "auth/email-already-in-use") {
                showMessage("Endereço de email já existe", "signUpMessage");
            } else {
                showMessage("Não é possível criar usuário", "signUpMessage");
            }
        });
});

const signIn = document.getElementById("submitSignIn");
signIn.addEventListener("click", event => {
    event.preventDefault();

    const email = document.getElementById("rEmail").value;
    const password = document.getElementById("rPassword").value;
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
        .then( userCredential => {
            showMessage("usuário logado com sucesso", "signInMessage");
            const user = userCredential.user;

            localStorage.setItem("loggedInUserId", user.uid);

            window.location.href = "homepage.html";
        })
        .catch(error => {
            const errorCode = error.code;
            if (errorCode === "auth/invalid-credential") {
                showMessage("Email ou Senha incorreta", "signInMessage");
            } else {
                showMessage("Essa conta não existe", "signInMessage");
            }
        });
});
