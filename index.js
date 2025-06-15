const form = document.getElementById("guest-form");
const guestInput = document.getElementById("guest-name");
const guestList = document.getElementById("guest-list");

let guests = [];

// Load guests from localStorage on page load
window.addEventListener("DOMContentLoaded", () => {
  const storedGuests = localStorage.getItem("guests");
  if (storedGuests) {
    guests = JSON.parse(storedGuests);
    updateList();
  }
});