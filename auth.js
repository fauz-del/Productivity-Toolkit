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
  const storedUser = JSON.parse(globalThis.localStorage.getItem("user")) || []; // if its null respond with empty []

  if (!email || !password) {
    // globalThis lets the code run in outside of the web environments which is more universal
    globalThis.alert("please fill-out all the fields");
    return;
  }

  if (storedUser && storedUser.email === email && storedUser.password === password) {
    globalThis.alert("Welcome back, " + storedUser.name + "!");
    globalThis.location.href = "dashboard.html";
  } else {
    globalThis.alert("Invalid credentials or user not found.");
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
    globalThis.alert("Please fill out all fields.");
    return;
  }

  if (password !== confirmPassword) {
    password.value = ""; // clear password if no match
    globalThis.alert("Passwords do not match.");
    return;
  }

  globalThis.localStorage.setItem("user", JSON.stringify({ name, email, password }));
  globalThis.alert("Account created successfully! You can now log in.");

  signupForm.reset();
  signupForm.classList.remove("active");
  loginForm.classList.add("active");
});
