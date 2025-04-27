import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

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

const form = document.getElementById("questionForm");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const que1 = document.getElementById("que1").value.trim();
  const que2 = document.getElementById("que2").value.trim();
  const que3 = document.getElementById("que3").value.trim();

  const itemKey = localStorage.getItem("returnItemKey");
  console.log("Item key from localStorage:", itemKey);

  if (!itemKey) {
    console.error("Item key not found in localStorage.");
    return;
  }

  const itemRef = ref(database, "returnedItems/" + itemKey);
  update(itemRef, {
    question1: que1,
    question2: que2,
    question3: que3,
  })
    .then(() => {
      window.location.href = "/html/user_dashboard.html";
    })
    .catch((error) => {
      console.error("Update failed:", error);
    });
});
