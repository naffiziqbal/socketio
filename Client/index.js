import { io } from "socket.io-client";

// const senderContent = document.querySelector(".senderMessage");
const viewerContent = document.querySelector(".viewerMessage");
const form = document.getElementById("form");
// const room = document.getElementById("room-input");

// senderContent.textContent = "Hello";

const socket = io("http://localhost:3000");
socket.on("connect", () => {
  displayProfileInfo(`Youre Connected with id : ${socket.id}`);
});

socket.on("reciveMessage", (message) => {
  displayViewerMessage(message);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let message = form.message.value;
  // const room = roomInput.value;

  if (message === "") return;
  displaySenderMessage(message);
  socket.emit("sendMessage", message);
  form.message.value = "";
});

const displaySenderMessage = (message) => {
  const div = document.createElement("div");
  div.textContent = message;
  document.querySelector(".mainMessageBody").append(div);
  div.classList.add("senderMessage");
};

const displayViewerMessage = (message) => {
  const div = document.createElement("div");
  div.textContent = message;
  document.querySelector(".mainMessageBody").append(div);
  div.classList.add("viewerMessage");
};

const displayProfileInfo = (info) => {
  const div = document.createElement("div");
  div.textContent = info;
  document.querySelector(".profileInfo").append(div);
};
