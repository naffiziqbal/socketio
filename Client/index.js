import { io } from "socket.io-client";

const mainContent = document.querySelector(".mainMessageBody");
const form = document.getElementById("form");
const roomInput = document.getElementById("roomInput");
console.log(form.roomName.value);

//?  URL
const production = "https://chat-app-n7go.onrender.com/";
const local = "http://localhost:3000";

//? Connecting Socket With Backend
const socket = io(production);

//? Connected Socket Profile Info
socket.on("connect", () => {
  displayProfileInfo(`You're Connected with id : ${socket.id}`);
});

//? Recive Message
socket.on("reciveMessage", (message) => {
  displayViewerMessage(message);
});

const displaySenderMessage = (message) => {
  const div = document.createElement("div");
  div.textContent = message;
  mainContent.appendChild(div);
  div.classList.add("senderMessage");

  // Scroll Down To Last Item
  mainContent.scrollTop = mainContent.scrollHeight;
};

const displayViewerMessage = (message) => {
  var newItem = document.createElement("div");
  newItem.textContent = message;
  mainContent.appendChild(newItem);
  newItem.classList.add("viewerMessage");

  // Scroll Down To Last Item
  mainContent.scrollTop = mainContent.scrollHeight;
};

const displayProfileInfo = (info) => {
  const div = document.createElement("div");
  div.textContent = info;
  document.querySelector(".profileInfo").append(div);
};

//?  Submit Message
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let message = form.message.value;
  const room = roomInput.value;
  console.log(room)
  // if (message === "" || room === "") return;
  displaySenderMessage(message);
  socket.emit("sendMessage", message, room);

  form.message.value = "";
});

// document.getElementById("roomBtn").addEventListener("click", (e) => {
//   e.preventDefault();
//   const room = roomInput.value;
//   socket.emit("sending-room", room);
//   console.log(room, 'room');
// });
