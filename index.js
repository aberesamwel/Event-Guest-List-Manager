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


form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = guestInput.value.trim();
  if (!name) return;

  if (guests.length >= 10) {
    alert("Guest limit is 10!");
    return;
  }

  const guest = {
    id: Date.now(),
    name: name,
    attending: true
  };

  guests.push(guest);
  saveGuests();
  updateList();
  guestInput.value = "";
});
