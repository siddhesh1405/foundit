import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// ✅ Firebase Config
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

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ✅ DOM Elements
const cardContainer = document.getElementById("cardContainer");
const searchInput = document.getElementById("searchInput");

// ✅ Fetch from returnedItems
const itemsRef = ref(database, "returnedItems");
let allItems = [];

onValue(itemsRef, (snapshot) => {
  allItems = [];
  cardContainer.innerHTML = ""; // clear container

  if (snapshot.exists()) {
    const data = snapshot.val();

    Object.keys(data).forEach((key) => {
      const item = data[key];
      item.id = key;

      // ✅ Show only items where status is false or not set
      if (!item.status) {
        allItems.push(item);
      }
    });

    if (allItems.length > 0) {
      displayItems(allItems);
    } else {
      cardContainer.innerHTML = "<p>No items available for claiming.</p>";
    }
  } else {
    cardContainer.innerHTML = "<p>No items found.</p>";
  }
});

// ✅ Search functionality
searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();

  const filteredItems = allItems.filter((item) => {
    return (
      item.itemType?.toLowerCase().includes(searchTerm) ||
      item.department?.toLowerCase().includes(searchTerm)
    );
  });

  displayItems(filteredItems);
});

// ✅ Display items in grid (3 per row)
function displayItems(items) {
  cardContainer.innerHTML = "";

  for (let i = 0; i < items.length; i += 3) {
    const row = document.createElement("div");
    row.className = "row";

    for (let j = i; j < i + 3 && j < items.length; j++) {
      const item = items[j];

      const col = document.createElement("div");
      col.className = "col-sm-4";
      col.innerHTML = `
        <div class="card" style="margin-bottom: 20px;">
          <h2>Item Type - <span>${item.itemType || "N/A"}</span></h2>
          <div class="info"><strong>Found By:</strong> <span>${
            item.fullName || "N/A"
          }</span></div>
          <div class="info"><strong>Department:</strong> <span>${
            item.department || "N/A"
          }</span></div>
          <button class="btn1 btn-block" data-key="${
            item.id
          }">Claim Item</button>
        </div>
      `;

      const button = col.querySelector("button");
      button.addEventListener("click", () => {
        localStorage.setItem("claimItemKey", item.id);
        window.location.href = "/html/claim_item.html?itemId=" + item.id;
      });

      row.appendChild(col);
    }

    cardContainer.appendChild(row);
  }
}
