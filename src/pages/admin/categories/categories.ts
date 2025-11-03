// ==================== Seguridad ====================
import { getUser, isAdmin } from "../../../utils/auth";

const user = getUser();
if (!user || !isAdmin()) {
  alert("Acceso denegado ❌");
  window.location.href = "../../auth/login/login.html";
}

// Mostrar usuario en el encabezado del sidebar
const sidebarUser = document.getElementById("sidebarUser");
if (sidebarUser && user) {
  (sidebarUser as HTMLElement).textContent = `👤 ${user.name ?? "Admin"}`;
}

// ==================== Modelo ====================
interface Categoria {
  id: number;
  nombre: string;
}

// Estado global
let categorias: Categoria[] = [];

// Referencias UI
const listEl = document.getElementById("categoriesList") as HTMLElement;

// ==================== Cargar desde el backend ====================
async function cargarCategorias() {
  try {
    const res = await fetch("http://localhost:8080/api/categorias");
    if (!res.ok) throw new Error("Error al cargar categorías");
    categorias = await res.json();
    render();
  } catch (err) {
    console.error(err);
    listEl.innerHTML = `<p class="cat-empty">Error al cargar categorías.</p>`;
  }
}

// ==================== Renderizado ====================
function render() {
  listEl.innerHTML = "";

  if (!categorias || categorias.length === 0) {
    listEl.innerHTML = `<p class="cat-empty">No hay categorías cargadas.</p>`;
    return;
  }

  categorias.forEach((c) => {
    const row = document.createElement("div");
    row.className = "cat-row";
    row.setAttribute("data-id", String(c.id));

    row.addEventListener("click", () => {
      const q = encodeURIComponent(c.nombre);
      window.location.href = `../products/products.html?categoria=${q}`;
    });

    const iconBox = document.createElement("div");
    iconBox.className = "cat-icon";
    iconBox.textContent = "📁";

    const name = document.createElement("div");
    name.className = "cat-name";
    name.textContent = c.nombre.toUpperCase();

    row.append(iconBox, name);
    listEl.appendChild(row);
  });
}

// ==================== Sidebar ====================
const menuBtn = document.getElementById("menu-btn") as HTMLElement;
const sidebar = document.getElementById("sidebar") as HTMLElement;
const closeSidebar = document.getElementById("close-sidebar") as HTMLElement;
const logoutSidebarBtn = document.getElementById("logoutSidebarBtn") as HTMLElement;

menuBtn.addEventListener("click", () => sidebar.classList.add("active"));
closeSidebar.addEventListener("click", () => sidebar.classList.remove("active"));
logoutSidebarBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "../../auth/login/login.html";
});

document.querySelectorAll(".sidebar-nav a").forEach((a) =>
  a.addEventListener("click", () => sidebar.classList.remove("active"))
);

// ==================== Modal ====================
const btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
const modalBg = document.getElementById("modal-bg") as HTMLElement;
const btnSave = document.getElementById("btnSave") as HTMLButtonElement;
const btnCancel = document.getElementById("btnCancel") as HTMLButtonElement;
const catNameInput = document.getElementById("catName") as HTMLInputElement;

// Mostrar modal
btnAdd.addEventListener("click", () => {
  modalBg.style.display = "flex";
  catNameInput.value = "";
  catNameInput.focus();
});

// Ocultar modal
btnCancel.addEventListener("click", () => {
  modalBg.style.display = "none";
});

// Guardar nueva categoría
btnSave.addEventListener("click", async () => {
  const nombre = catNameInput.value.trim();
  if (!nombre) {
    alert("Por favor ingresa un nombre para la categoría");
    return;
  }

  try {
    const res = await fetch("http://localhost:8080/api/categorias", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre }),
    });

    if (!res.ok) throw new Error("Error al crear categoría");

    modalBg.style.display = "none";
    await cargarCategorias();
    alert("Categoría creada exitosamente ✅");
  } catch (err) {
    console.error(err);
    alert("Error al crear categoría: " + err);
  }
});

// ==================== Inicialización ====================
cargarCategorias();
