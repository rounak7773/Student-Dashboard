const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const showRegister = document.getElementById("showRegister");
const showLogin = document.getElementById("showLogin");

showRegister.addEventListener("click", function (e) {
    e.preventDefault();

    loginForm.style.display = "none";
    registerForm.style.display = "block";
});
showLogin.addEventListener("click", function (e) {
    e.preventDefault();

    registerForm.style.display = "none";
    loginForm.style.display = "block";

});

const register = document.getElementById("Register");

register.addEventListener("submit", function (e) {
    e.preventDefault();
    const fullName = document.getElementById("fullname").value;
    const email = document.getElementById("registeremail").value;
    const password = document.getElementById("registerpassword").value;
    const confirmPassword = document.getElementById("confirmpassword").value;

    // alert(password);
    // alert(confirmPassword);

    console.log(fullName);
    console.log(email);
    console.log(password);
    console.log(confirmPassword);
    console.log(document.getElementById("registerpassword"));
    console.log(document.getElementById("confirmpassword"));



    const user = {
        fullName: fullName,
        email: email,
        password: password
    };

    if (password !== confirmPassword) {
        alert("Password do not match");
    }

    localStorage.setItem("user", JSON.stringify(user));


    alert("Registration Successful");


    register.requestFullscreen();

    registerForm.style.display = "none";
    loginForm.style.display = "block";




})

const login = document.getElementById("login");

login.addEventListener("submit", function (e) {
    e.preventDefault();

    const loginEmail = document.getElementById("loginemail").value;
    const loginPassword = document.getElementById("loginpassword").value;

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && loginEmail === user.email && loginPassword === user.password) {
        alert("Login Successful");
        window.location.href = "dashboard.html";
    } else {
        alert("Invalid Email or Password");
    }
});

if (
    fullName === "" ||
    email === "" ||
    password === "" ||
    confirmPassword === ""
) {
    alert("Please fill all firlds");
}
