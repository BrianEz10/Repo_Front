const logoutBtnHome = document.getElementById("logoutBtnHome");

logoutBtnHome?.addEventListener("click", () => {
    localStorage.removeItem("user");

    window.location.href = "/src/pages/auth/login/login.html";
});