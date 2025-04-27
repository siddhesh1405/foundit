// Import Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbyVa-ZQlyPhf_y3Tm32VI6-aiRLjxPqg",
  authDomain: "foundit-1393d.firebaseapp.com",
  projectId: "foundit-1393d",
  storageBucket: "foundit-1393d.appspot.com", // fixed typo in storageBucket
  messagingSenderId: "111188176676",
  appId: "1:111188176676:web:9fddd7fbd3318125890db1",
  measurementId: "G-0VTTZPM3XE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Handle login
const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", function(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // ✅ Login successful
    const user = userCredential.user;
    //alert("Login successful!");
    window.location.href = "user_dashboard.html";  // Redirect to dashboard
  })
  .catch((error) => {
    // ❌ Handle login errors
    const errorCode = error.code;
    let message = "Login failed.";

    switch (errorCode) {
      case "auth/user-not-found":
        message = "No user found with this email.";
        break;
      case "auth/wrong-password":
        message = "Incorrect password. Please try again.";
        break;
      case "auth/invalid-email":
        message = "Invalid email format.";
        break;
      case "auth/invalid-credential":
        message = "Incorrect email or password.";
        break;
      default:
        message = "Error: " + error.message;
    }

    alert(message);
  });

});
