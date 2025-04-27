import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";
import {
  getDatabase,
  ref,
  get,
  child,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";
// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBbyVa-ZQlyPhf_y3Tm32VI6-aiRLjxPqg",
  authDomain: "foundit-1393d.firebaseapp.com",
  databaseURL: "https://foundit-1393d-default-rtdb.firebaseio.com/",
  projectId: "foundit-1393d",
  storageBucket: "foundit-1393d.appspot.com",
  messagingSenderId: "111188176676",
  appId: "1:111188176676:web:9fddd7fbd3318125890db1",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
const auth = firebase.auth();
const container = document.getElementById("cardContainer");

auth.onAuthStateChanged((user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const approvedRef = db.ref("approvedClaims/" + user.uid);

  approvedRef.once("value").then((snapshot) => {
    if (!snapshot.exists()) {
      container.innerHTML =
        "<p style='text-align:center;'>No approved items found.</p>";
      return;
    }

    const data = snapshot.val();
    Object.values(data).forEach((item) => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
          <h3>Item Type: ${item.itemType}</h3>
          <div class="info"><strong>Department:</strong> ${
            item.department
          }</div>
          <div class="info"><strong>Uploader Contact:</strong> ${
            item.uploaderEmail
          }</div>
          <div class="info"><strong>Your Answer 1:</strong> ${
            item.answer1
          }</div>
          <div class="info"><strong>Your Answer 2:</strong> ${
            item.answer2
          }</div>
          <div class="info"><strong>Your Answer 3:</strong> ${
            item.answer3
          }</div>
          <div class="info"><strong>Approved On:</strong> ${new Date(
            item.timestamp
          ).toLocaleString()}</div>
        `;
      container.appendChild(card);
    });
  });
});
