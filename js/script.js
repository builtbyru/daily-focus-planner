const dateElement = document.getElementById("current-date");

const today = new Date();

dateElement.textContent = today.toDateString();