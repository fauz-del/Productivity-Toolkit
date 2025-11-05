document.addEventListener("DOMContentLoaded", () => {
  const usageData = JSON.parse(localStorage.getItem("appUsage")) || {};

  const pages = ["ToDo", "Note", "Weather"];
  const hours = pages.map(p => ((usageData[p]?.totalTime || 0) / 3600000).toFixed(1));

  const totalHours = hours.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
  document.getElementById("totalHours").innerText = `${totalHours.toFixed(1)}h`;

  const ctxPie = document.getElementById("usagePie").getContext("2d");
  const hasData = hours.some(h => parseFloat(h) > 0);

  new Chart(ctxPie, {
    type: "doughnut",
    data: {
      labels: ["To-Do", "Notes", "Weather"],
      datasets: [{
        data: hasData ? hours : [1, 1, 1],
        backgroundColor: ["#6A5ACD", "#FFB347", "#00BFFF"],
        borderWidth: 3,
        borderColor: "#fff",
        hoverOffset: 10
      }]
    },
    options: {
      cutout: "70%",
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              const label = context.label || '';
              const value = context.parsed;
              return `${label}: ${value}h`;
            }
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false
    }
  });

  const ctxLine = document.getElementById("usageLine").getContext("2d");
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const randomData = pages.map(() =>
    months.map(() => Math.floor(Math.random() * 10) + 1)
  );

  new Chart(ctxLine, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "To-Do",
          data: randomData[0],
          borderColor: "#6A5ACD",
          backgroundColor: "rgba(106,90,205,0.15)",
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6
        },
        {
          label: "Notes",
          data: randomData[1],
          borderColor: "#FFB347",
          backgroundColor: "rgba(255,179,71,0.15)",
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6
        },
        {
          label: "Weather",
          data: randomData[2],
          borderColor: "#00BFFF",
          backgroundColor: "rgba(0,191,255,0.15)",
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "bottom",
          labels: { color: "#444" }
        },
        tooltip: {
          backgroundColor: "#333",
          titleColor: "#fff",
          bodyColor: "#fff",
          cornerRadius: 8
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: "rgba(0,0,0,0.1)" },
          ticks: { color: "#666" }
        },
        x: {
          grid: { display: false },
          ticks: { color: "#666" }
        }
      }
    }
  });

  document.querySelectorAll(".insight-card").forEach(card => {
    const page = card.dataset.page;
    const info = usageData[page] || {};
    const totalTime = (info.totalTime || 0) / 3600000;
    const visits = info.visits || 0;
    const lastVisit = info.lastVisit ? new Date(info.lastVisit).toLocaleString() : "N/A";

    card.querySelector(".card-brief").textContent = `Used ${visits} times • ${totalTime.toFixed(1)}h total`;
    card.querySelector(".card-more").innerHTML = `
      <p>Last visited: ${lastVisit}</p>
      <p>Average session: ${(totalTime / (visits || 1)).toFixed(1)}h</p>
      <p>Entries recorded: ${info.history?.length || 0}</p>
    `;

    card.addEventListener("mouseenter", () => {
      card.querySelector(".card-more").hidden = false;
      card.style.transform = "scale(1.05)";
    });
    card.addEventListener("mouseleave", () => {
      card.querySelector(".card-more").hidden = true;
      card.style.transform = "scale(1)";
    });
  });

  const usageEntries = document.getElementById("usageEntries");
  usageEntries.innerHTML = "";
  let allEntries = [];
  for (const [page, data] of Object.entries(usageData)) {
    if (data.history) {
      data.history.forEach(entry => {
        allEntries.push({ page, ...entry });
      });
    }
  }

  allEntries.sort((a, b) => new Date(b.date) - new Date(a.date));

  if (allEntries.length === 0) {
    usageEntries.innerHTML = "<li>No recent activity yet.</li>";
  } else {
    allEntries.slice(0, 10).forEach(entry => {
      const li = document.createElement("li");
      const hours = (entry.duration / 3600000).toFixed(2);
      li.innerHTML = `<strong>${entry.page}</strong> – ${hours}h on ${entry.date}`;
      usageEntries.appendChild(li);
    });
  }
});