import { io } from "./_snowpack/pkg/socket.io-client.js";

// const senderContent = document.querySelector(".senderMessage");
const viewerContent = document.querySelector(".viewerMessage");
const form = document.getElementById("form");
const roomInput = document.getElementById("roomInput");

// senderContent.textContent = "Hello";

const socket = io("https://chat-app-n7go.onrender.com/");
socket.on("connect", () => {
  displayProfileInfo(`Youre Connected with id : ${socket.id}`);
});

socket.on("reciveMessage", (message) => {
  displayViewerMessage(message);
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let message = form.message.value;
  const room = roomInput.value;

  if (message === "") return;
  displaySenderMessage(message);
  socket.emit("sendMessage", message,room);
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
