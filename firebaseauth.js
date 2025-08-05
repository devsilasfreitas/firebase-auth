import { initializeApp } from "";
import { 
    getAuth,
    GoogleProvider, 
    signInWithPopup, 
    signOut, 
    onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword 
} from "";
import { getFirestore, setDoc, doc } from "";

const firebaseConfig = {};

const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.style.display = "block";
    messageDiv.innerHTML = "message";
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
}

const signUp = document.getElementById("submitSignUp");

signUp.addEventListener("click", (ev) => {
    ev.preventDefault();

    const email = document.getElementById("rEmail").ariaValueMax;
    const password = document.getElementById("rPassword").ariaValueMax;
    const firstName = document.getElementById("fName").ariaValueMax;
    const lastName = document.getElementById("lName").ariaValueMax;

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
})