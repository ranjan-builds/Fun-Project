// DOM Elements
const dayInput = document.getElementById("dayinput");
const monthInput = document.getElementById("monthinput");
const yearInput = document.getElementById("yearinput");
const submitBtn = document.getElementById("submitBtn");
const box = document.getElementById("box");
const states = document.getElementById("states");
const loaderContainer = document.getElementById("loaderContainer");
const themeToggle = document.getElementById("themeToggle");
const sunIcon = document.getElementById("sunIcon");
const moonIcon = document.getElementById("moonIcon");

// Data Elements
const dataDay = document.querySelector("[data-day]");
const dataMn = document.querySelector("[data-mn]");
const dataDate = document.querySelector("[data-date]");
const dataYear = document.querySelector("[data-year]");
const dataHeartBeat = document.querySelector("[data-heart-beat]");
const dataBloodPump = document.querySelector("[data-blood-pump]");
const dataTotalDays = document.querySelector("[data-tl-days]");
const dataBreath = document.querySelector("[data-breath]");
const dataBlink = document.querySelector("[data-blink]");
const dataSleep = document.querySelector("[data-sleep]");
const dataY = document.querySelector("[data-y]");
const dataM = document.querySelector("[data-m]");
const dataTravel = document.querySelector("[data-travel]");
const dataSaliva = document.querySelector("[data-saliva]");
const dataSkin = document.querySelector("[data-skin]");
const dataUrine = document.querySelector("[data-urine]");
const dataCo2 = document.querySelector("[data-co2]");
const dataSunTravel = document.querySelector("[data-sunTravel]");
const dataMoonOrbit = document.querySelector("[data-moonOrbit]");
const dataMoonAway = document.querySelector("[data-moonaway]");
const dataNxtBday = document.querySelector("[data-bday]");

// Input Validation
document.querySelectorAll("input").forEach((elem) => {
  elem.addEventListener("keyup", () => {
    if (
      dayInput.value > 0 &&
      dayInput.value <= 31 &&
      monthInput.value > 0 &&
      monthInput.value <= 12 &&
      yearInput.value.length === 4 &&
      yearInput.value < new Date().getFullYear() &&
      yearInput.value >= new Date().getFullYear() - 100
    ) {
      submitBtn.removeAttribute("disabled");
    } else {
      submitBtn.disabled = true;
    }
  });
});

// Scroll Animation
function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  const viewportHeight = window.innerHeight;
  const elementMidPoint = rect.top + rect.height / 2;
  const targetPosition = viewportHeight * 0.6;

  return elementMidPoint >= targetPosition;
}

function applyDarkClass() {
  const paragraphs = document.querySelectorAll(".lines .text");
  let activeFound = false;

  paragraphs.forEach((paragraph) => {
    const imageId = paragraph.getAttribute("data-image");
    const image = document.getElementById(imageId);

    if (!activeFound && isElementInViewport(paragraph)) {
      paragraph.classList.remove("text-gray-300", "dark:text-gray-600");
      paragraph.classList.add("text-gray-800", "dark:text-white");
      image.classList.remove("hidden");
      image.classList.add("block");

      activeFound = true;
    } else {
      paragraph.classList.remove("text-gray-800", "dark:text-white");
      paragraph.classList.add("text-gray-300", "dark:text-gray-600");
      image.classList.remove("block");
      image.classList.add("hidden");
    }
  });
}

window.addEventListener("scroll", applyDarkClass);

// Date Parsing
function parseDate(dateString) {
  const [day, month, year] = dateString.split("/");
  const dateObject = new Date(`${year}-${month}-${day}`);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = daysOfWeek[dateObject.getDay()];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = monthsOfYear[dateObject.getMonth()];

  return {
    day: dayName,
    date: parseInt(day),
    month: monthName,
    year: parseInt(year),
  };
}

// Time Difference Calculation
function calculateTimeDifference(dateString) {
  const [day, month, year] = dateString.split("/");
  const providedDate = new Date(`${year}-${month}-${day}`);
  const currentDate = new Date();
  const diffInMs = currentDate - providedDate;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  let years = currentDate.getFullYear() - providedDate.getFullYear();
  let months = currentDate.getMonth() - providedDate.getMonth();

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  return {
    years: years,
    months: years * 12 + months,
    days: diffInDays,
    hours: diffInHours,
    minutes: diffInMinutes,
    seconds: diffInSeconds,
  };
}

// Initialize Stats
function init() {
  const dateF = `${dayInput.value}/${monthInput.value}/${yearInput.value}`;
  const times = calculateTimeDifference(dateF);
  let i = 0;
  let b = 0;
  let sunT = 0;

  dataTotalDays.innerHTML = formattedNumberIn(times.days);
  dataY.innerHTML = formattedNumberIn(times.years);
  dataM.innerHTML = formattedNumberIn(times.months);

  setInterval(() => {
    i++;
    dataHeartBeat.innerHTML = formattedNumberIn(times.minutes * 78 + i);
    dataBloodPump.innerHTML = formattedNumberIn(times.minutes * 6);
    dataTravel.innerHTML = formattedNumberIn(times.days * 1200);
    dataSaliva.innerHTML = formattedNumberIn(times.days * 1);
    dataSkin.innerHTML = formattedNumberIn(Math.round(times.years * 4));
    dataUrine.innerHTML = formattedNumberIn(Math.round(times.days * 1.5));
    dataCo2.innerHTML = Math.round(times.years * 0.55);
    dataMoonOrbit.innerHTML = Math.round(times.days / 27.3);
    dataMoonAway.innerHTML = Math.round(times.years * 3.82);
    dataNxtBday.innerHTML = daysUntilNextBirthday(dateF);
  }, 1000);

  setInterval(() => {
    sunT += 30;
    dataSunTravel.innerHTML = formattedNumberIn(times.seconds * 30 + sunT);
  }, 100);

  setInterval(() => {
    b++;
    dataBreath.innerHTML = formattedNumberIn(times.minutes * 14 + b);
    dataBlink.innerHTML = formattedNumberIn(times.minutes * 12 + b);
  }, 4000);

  dataSleep.innerHTML = formattedNumberIn(Math.round(times.days / 3));

  const parsedDate = parseDate(dateF);
  dataDay.innerHTML = parsedDate.day;
  dataDate.innerHTML = parsedDate.date;
  dataMn.innerHTML = parsedDate.month;
  dataYear.innerHTML = yearInput.value;
}

// Navigation Functions
function go() {
  init();
  states.classList.remove("hidden");
  states.classList.add("flex");
  box.classList.add("hidden");
  document.querySelector(".border-image").classList.add("hidden");
}

function restart() {
  states.classList.remove("flex");
  states.classList.add("hidden");
  box.classList.remove("hidden");
  document.querySelector(".border-image").classList.remove("hidden");
  document.querySelectorAll("input").forEach((e) => (e.value = ""));
  submitBtn.disabled = true;
}

// Helper Functions
function formattedNumberIn(number) {
  const formatter = new Intl.NumberFormat();
  return formatter.format(number);
}

function daysUntilNextBirthday(dobString) {
  const [day, month, year] = dobString.split("/").map(Number);
  const today = new Date();
  const currentYear = today.getFullYear();
  let nextBirthday = new Date(currentYear, month - 1, day);

  if (today > nextBirthday) {
    nextBirthday.setFullYear(currentYear + 1);
  }

  const diffTime = nextBirthday - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// Dark Mode Toggle
function toggleTheme() {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark");
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
    localStorage.setItem("theme", "light");
  } else {
    document.documentElement.classList.add("dark");
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
    localStorage.setItem("theme", "dark");
  }
}

// Initialize Theme
function initTheme() {
  const savedTheme = localStorage.getItem("theme") || "light";
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
    sunIcon.classList.add("hidden");
    moonIcon.classList.remove("hidden");
  } else {
    document.documentElement.classList.remove("dark");
    sunIcon.classList.remove("hidden");
    moonIcon.classList.add("hidden");
  }
}

// Event Listeners
themeToggle.addEventListener("click", toggleTheme);
document
  .querySelector("form")
  .addEventListener("submit", (e) => e.preventDefault());

// Initialize
function stopLoading() {
  loaderContainer.style.display = "none";
}

// Initialize on load
window.addEventListener("DOMContentLoaded", () => {
  initTheme();
  stopLoading();
});
