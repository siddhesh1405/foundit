import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBbyVa-ZQlyPhf_y3Tm32VI6-aiRLjxPqg",
  authDomain: "foundit-1393d.firebaseapp.com",
  projectId: "foundit-1393d",
  storageBucket: "foundit-1393d.appspot.com",
  messagingSenderId: "111188176676",
  appId: "1:111188176676:web:9fddd7fbd3318125890db1",
  measurementId: "G-0VTTZPM3XE",
  databaseURL: "https://foundit-1393d-default-rtdb.firebaseio.com"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app);

const registerButton = document.getElementById("registerButton");

registerButton.addEventListener("click", function (event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const uid = user.uid;

      set(ref(db, "users/" + uid), {
        uid: uid,
        fullName: fullName,
        email: email
      })
        .then(() => {
          alert("User registered successfully!");
          window.location.href = "index.html";
        })
        .catch((error) => {
          alert("Error saving user data: " + error.message);
        });
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        alert("This email is already registered. Please login instead.");
        window.location.href = "index.html";
      } else {
        alert("Registration failed: " + error.message);
      }
    });
});
