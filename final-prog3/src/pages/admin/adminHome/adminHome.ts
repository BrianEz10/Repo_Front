const logoutBtnAH = document.getElementById("logoutBtnAH");

logoutBtnAH?.addEventListener("click", () => {
    localStorage.removeItem("user");

    window.location.href = "/src/pages/auth/login/login.html";
});