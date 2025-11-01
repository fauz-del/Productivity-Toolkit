// Sidebar toggle
const menuIcon = document.getElementById("menu-icon");
const sidebar = document.getElementById("sidebar");

menuIcon.addEventListener("click", () => {
  sidebar.classList.toggle("active");
});

// Dark mode toggle
const body = document.querySelector("body");
const modeToggle = document.querySelector(".mode-toggle");
const modeIcon = modeToggle.querySelector("i");

modeToggle.addEventListener("click", () => {
  body.classList.toggle("dark");

  // Change icon dynamically
  if (body.classList.contains("dark")) {
    modeIcon.classList.replace("fa-moon", "fa-sun");
  } else {
    modeIcon.classList.replace("fa-sun", "fa-moon");
  }
});

// Update Time & Date
function updateDateTime() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const date = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  document.getElementById("time").textContent = time;
  document.getElementById("date").textContent = date;
}

setInterval(updateDateTime, 1000);
updateDateTime();


// ===== Mini Calendar =====
function renderCalendar() {
  const calendarBody = document.getElementById('calendar-body');
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  let html = '';
  let date = 1;

  for (let i = 0; i < 6; i++) { // weeks
    html += '<tr>';
    for (let j = 0; j < 7; j++) { // days
      if (i === 0 && j < firstDay) {
        html += '<td></td>';
      } else if (date > lastDate) {
        html += '<td></td>';
      } else {
        const isToday = date === now.getDate() ? 'today' : '';
        html += `<td class="${isToday}">${date}</td>`;
        date++;
      }
    }
    html += '</tr>';
  }
  calendarBody.innerHTML = html;
}

renderCalendar();

// ===== Motivational Quotes =====
const quotes = [
  "Believe you can and you're halfway there.",
  "Do something today that your future self will thank you for.",
  "Every day is a second chance.",
  "Stay positive, work hard, make it happen.",
  "Small steps every day lead to big results.",
  "Your only limit is you.",
];

const quoteText = document.getElementById('quote-text');

function showRandomQuote() {
  const random = Math.floor(Math.random() * quotes.length);
  quoteText.textContent = quotes[random];
}

showRandomQuote();
setInterval(showRandomQuote, 120000); // Change every 2 minutes

// ===== Background Music =====
const bgMusic = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");
const musicIcon = musicToggle.querySelector("i");

musicToggle.addEventListener("click", () => {
  if (bgMusic.paused) {
    bgMusic.play();
    musicIcon.classList.replace("fa-play", "fa-pause");
  } else {
    bgMusic.pause();
    musicIcon.classList.replace("fa-pause", "fa-play");
  }
});