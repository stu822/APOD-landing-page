let time = new Date();
let hr = time.getHours();
let mins = time.getMinutes();
let second = time.getSeconds();
const spinner = document.querySelector(".spinner");
const dateDisplay = document.getElementById("date");
const hrDisplay = document.getElementById("hr");
const minDisplay = document.getElementById("min");
const secondsDisplay = document.getElementById("secs");
const amPm = document.getElementById("am-pm");
const greeting = document.getElementById("day-time");
const userDisplay = document.getElementById("user");
const descriptionDisplay = document.getElementById("description");
const apodTitle = document.getElementById("apod-title");
let storedName = localStorage.getItem("user");

setUser();
displayDate();
displayTime();
displayClock();
displayGreeting();
getAPOD();

function displayGreeting() {
  let time = new Date();
  let hr = time.getHours();
  if (hr < 12) {
    greeting.textContent = "Morning";
  } else if (hr >= 12 && hr < 17) {
    greeting.textContent = "Afternoon";
  } else {
    greeting.textContent = "Evening";
  }
}

function displayTime() {
  let time = new Date();
  let hr = time.getHours();
  let mins = time.getMinutes();
  let second = time.getSeconds();
  if (mins < 10) {
    minDisplay.textContent = `0${mins}`;
  } else {
    minDisplay.textContent = mins;
  }
  if (hr > 12) {
    hrDisplay.textContent = `${hr - 12}`;
    amPm.textContent = "pm";
  } else if (hr === 12) {
    hrDisplay.textContent = hr;
    amPm.textContent = "pm";
  } else {
    hrDisplay.textContent = hr;
    amPm.textContent = "am";
  }
  if (second < 10) {
    secondsDisplay.textContent = `:0${second}`;
  } else {
    secondsDisplay.textContent = `:${second}`;
  }
}
function displayClock() {
  setInterval(() => {
    displayTime();
  }, 1000);
}

function setUser() {
  if (storedName) {
    userDisplay.textContent = storedName;
  } else {
    const userName = prompt("What is your name?");
    userDisplay.textContent = userName;
    localStorage.setItem("user", userName);
  }
}

function displayDate() {
  let today = new Date();
  let options = {
    weekday: "long",
    month: "long",
    day: "2-digit",
    year: "numeric",
  };

  dateDisplay.textContent = today.toLocaleDateString("en-US", options);
}

function getAPOD() {
  let apiUrl = "/.netlify/functions/getapodData";
  try {
    axios
      .get(apiUrl)

      .then((res) => {
        console.log(res.data);
        const img = res.data.apodData.hdurl;
        const apodInfo = res.data.apodData.explanation;
        const title = res.data.apodData.title;

        apodTitle.textContent = title;
        document.body.style.backgroundImage = `url(${img})`;
        spinner.style.display = "none";
        descriptionDisplay.textContent = apodInfo;
      });
  } catch (e) {
    document.body.style.backgroundImage = url("/imgs/default-pic.jpg");
    apodTitle.textContent =
      "The Astronomy Picture of the Day couldn't be loaded. Please refresh.";
    console.log(e);
  }
}
