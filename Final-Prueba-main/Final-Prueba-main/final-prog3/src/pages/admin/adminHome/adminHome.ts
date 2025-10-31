import { getUser, isAdmin, clearUser } from "/src/utils/auth";

// Obtener usuario actual
const user = getUser();

// 🔐 Verificación de acceso
if (!user || !isAdmin()) {
  alert("Acceso denegado ❌");
  window.location.href = "/src/pages/auth/login/login.html";
}

// 👤 Mostrar nombre del admin
const usernameLabel = document.getElementById("adminName");
const sidebarUser = document.getElementById("sidebarUser");

if (usernameLabel && sidebarUser && user) {
  usernameLabel.textContent = user.name ?? "Administrador";
  sidebarUser.textContent = `👤 ${user.name ?? "Administrador"}`;
}

// 🧭 Sidebar funcional
const menuBtn = document.getElementById("menu-btn")!;
const sidebar = document.getElementById("sidebar")!;
const closeSidebar = document.getElementById("close-sidebar")!;
const logoutSidebarBtn = document.getElementById("logoutSidebarBtn")!;

// Abrir / cerrar menú
menuBtn.addEventListener("click", () => {
  sidebar.classList.toggle("active");
  menuBtn.classList.toggle("active");
  menuBtn.textContent = sidebar.classList.contains("active") ? "✕" : "☰";
});

closeSidebar.addEventListener("click", () => {
  sidebar.classList.remove("active");
  menuBtn.textContent = "☰";
  menuBtn.classList.remove("active");
});

// 🚪 Cerrar sesión
logoutSidebarBtn.addEventListener("click", () => {
  clearUser();
  window.location.href = "/src/pages/auth/login/login.html";
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll(".sidebar-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    sidebar.classList.remove("active");
    menuBtn.textContent = "☰";
    menuBtn.classList.remove("active");
  });
});

console.log("✅ adminHome.ts cargado correctamente");