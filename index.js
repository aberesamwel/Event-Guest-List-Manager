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
  const now = new Date();
  const dateAdded = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;

  const guest = {
    id: Date.now(),
    name: name,
    attending: true,
    addedOn: dateAdded
  };

  guests.push(guest);
  saveGuests();
  updateList();
  guestInput.value = "";
});

function updateList() {
  guestList.innerHTML = "";

  guests.forEach((guest) => {
    const li = document.createElement("li");

    const nameSpan = document.createElement("span");
    nameSpan.textContent = `${guest.name} - ${guest.attending ? "Attending" : "Not Attending"} (Added on: ${guest.addedOn})`;




    const rsvpBtn = document.createElement("button");
    rsvpBtn.textContent = "Toggle RSVP";
    rsvpBtn.onclick = () => {
      guest.attending = !guest.attending;
      saveGuests();
      updateList();
    };

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => {
      guests = guests.filter((g) => g.id !== guest.id);
      saveGuests();
      updateList();
    };

    li.append(nameSpan, rsvpBtn, removeBtn);
    guestList.appendChild(li);
  });
}



function saveGuests() {
  localStorage.setItem("guests", JSON.stringify(guests));
}
