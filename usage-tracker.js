let startTime = Date.now();

function initAppUsage(pageName) {
  let usageData = JSON.parse(localStorage.getItem("appUsage")) || {};

  if (!usageData[pageName]) {
    usageData[pageName] = {
      totalTime: 0, 
      visits: 0,
      lastVisit: null,
      history: []
    };
  }

  usageData[pageName].visits += 1;
  usageData[pageName].lastVisit = new Date().toISOString();

  localStorage.setItem("appUsage", JSON.stringify(usageData));

  window.addEventListener("beforeunload", () => {
    const endTime = Date.now();
    const sessionDuration = endTime - startTime;
    usageData = JSON.parse(localStorage.getItem("appUsage")) || {};

    if (usageData[pageName]) {
      usageData[pageName].totalTime += sessionDuration;
      usageData[pageName].history.push({
        date: new Date().toLocaleString(),
        duration: sessionDuration
      });
      localStorage.setItem("appUsage", JSON.stringify(usageData));
    }
  });
}