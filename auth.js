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

signupForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("signupName").value.trim();
  const email = document.getElementById("signupEmail").value.trim();
  const password = document.getElementById("signupPassword").value.trim();

  if (!name || !email || !password) {
    globalThis.alert("please fill out all the fields");
  }

  try {
    // axios is nicer to use rather than the plain fetch method
    const response = await axios.post("https://productivity-toolkit-production.up.railway.app/signup", {
      name,
      email,
      password
    });
    globalThis.alert(response.data.message); // display the data
    signupForm.reset();
  }
  catch (error) {
    // checking if response exists in the error
    error.response ? globalThis.alert(error.response.data.error) : globalThis.alert("something went wrong");
  }
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // we only need the email and pass to validate the user
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  try {
    const response = await axios.post("https://productivity-toolkit-production.up.railway.app/login", {
      email,
      password
    });
    globalThis.alert(response.data.message);
    loginForm.reset();

    // redirect user to dashboard via globalThis when successful
    globalThis.location.href = "dashboard.html";

  } catch (error) {
    error.response ? globalThis.alert(error.response.data.error) : globalThis.alert("something went wrong");
  }
});