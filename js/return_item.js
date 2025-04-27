import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbyVa-ZQlyPhf_y3Tm32VI6-aiRLjxPqg",
  authDomain: "foundit-1393d.firebaseapp.com",
  projectId: "foundit-1393d",
  storageBucket: "foundit-1393d.appspot.com",
  messagingSenderId: "111188176676",
  appId: "1:111188176676:web:9fddd7fbd3318125890db1",
  measurementId: "G-0VTTZPM3XE",
  databaseURL: "https://foundit-1393d-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

let currentUID = null; // ✅ Define globally

// Get current user and fetch their data
onAuthStateChanged(auth, (user) => {
  if (user) {
    currentUID = user.uid; // ✅ Assign UID to global variable

    const userRef = ref(database, "users/" + currentUID);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        console.log(data.fullName);
        document.getElementById("name").value = data.fullName;
        document.getElementById("email").value = data.email;
      }
    });
  } else {
    window.location.href = "index.html";
  }
});

// Form submission
const form = document.querySelector("form");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const department = document.getElementById("department").value;
  const itemType = document.getElementById("itemType").value;

  if (!currentUID) {
    console.error("UID not found");
    return;
  }

  const newRef = push(ref(database, "returnedItems"));
  const newKey = newRef.key;

  set(newRef, {
    fullName: name,
    email: email,
    department: department,
    itemType: itemType,
    uid: currentUID,
    status: false,
    timestamp: new Date().toISOString(),
  }).then(() => {
    localStorage.setItem("returnItemKey", newKey);
    window.location.href = "/html/security_que.html";
  });
});
