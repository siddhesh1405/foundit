// claim_item.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
  getDatabase,
  ref,
  get,
  push,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// 🔧 Replace with actual Firebase config
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
const db = getDatabase(app);

// Get itemId from URL
const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("itemId");

// Handle missing itemId
if (!itemId) {
  alert("Error: Missing item ID. Please select an item to claim.");
  window.location.href = "/html/find_item.html"; // redirect to item listing page
} else {
  const itemRef = ref(db, `returnedItems/${itemId}`);
  get(itemRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const item = snapshot.val();
        document.getElementById("label1").innerText =
          item.question1 || "Question 1";
        document.getElementById("label2").innerText =
          item.question2 || "Question 2";
        document.getElementById("label3").innerText =
          item.question3 || "Question 3";
      } else {
        alert("Item not found. Please go back and try again.");
        window.location.href = "/html/find_item.html";
      }
    })
    .catch((error) => {
      console.error("Error fetching item:", error);
      alert("Error retrieving item details. Try again later.");
    });
}

// Form submission handler
document
  .getElementById("questionForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const ans1 = document.getElementById("que1").value.trim();
    const ans2 = document.getElementById("que2").value.trim();
    const ans3 = document.getElementById("que3").value.trim();

    if (!ans1 || !ans2 || !ans3) {
      alert("Please answer all questions before submitting.");
      return;
    }

    const claimData = {
      itemId: itemId,
      answer1: ans1,
      answer2: ans2,
      answer3: ans3,
      timestamp: new Date().toISOString(),
      status: "Pending",
    };

    const claimsRef = ref(db, "claimRequests");

    push(claimsRef, claimData)
      .then(() => {
        alert("Request submitted! You will be notified after review.");
        window.location.href = "/html/user_dashboard.html";
      })
      .catch((error) => {
        console.error("Error submitting claim:", error);
        alert("There was an error. Please try again.");
      });
  });
