const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");

// Switch between login and signup forms
showSignup.addEventListener("click", (e) => {
  e.preventDefault();
  loginForm.classList.remove("active");
  signupForm.classList.add("active");
});

showLogin.addEventListener("click", (e) => {
  e.preventDefault();
  signupForm.classList.remove("active");
  loginForm.classList.add("active");
});

// Handle Login
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!email || !password) {
    alert("Please fill out all fields.");
    return;
  }

  if (storedUser && storedUser.email === email && storedUser.password === password) {
    alert("Welcome back, " + storedUser.name + "!");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials or user not found.");
  }

  loginForm.reset();
});

// Handle Signup
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();

  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill out all fields.");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ name, email, password }));
  alert("Account created successfully! You can now log in.");

  signupForm.reset();
  signupForm.classList.remove("active");
  loginForm.classList.add("active");
});
