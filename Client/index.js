const senderContent = document.querySelector(".senderMessage");
const viewerContent = document.querySelector(".viewerMessage");
const form = document.getElementById("form");
// const room = document.getElementById("room-input");

senderContent.textContent = "Hello";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let message = form.message.value;
  // const room = roomInput.value;

  if (message === "") return;
  displayMessage(message);
  form.message.value = "";
});


const displayMessage = (message) => {
  const div = document.createElement('div')
  div.textContent = message
  document.querySelector('.sender').append(div)
  div.classList.add('senderMessage')

}
