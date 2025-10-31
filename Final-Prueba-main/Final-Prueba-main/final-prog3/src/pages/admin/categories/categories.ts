import { getUser, isAdmin } from "/src/utils/auth";

// ---- Seguridad ----
const user = getUser();
if (!user || !isAdmin()) {
  alert("Acceso denegado ❌");
  window.location.href = "/src/pages/auth/login/login.html";
}

const sidebarUser = document.getElementById("sidebarUser");
if (sidebarUser && user) {
  (sidebarUser as HTMLElement).textContent = `👤 ${user.name ?? "Admin"}`;
}

// ---- Modelo ----
interface Categoria {
  id: number;
  nombre: string;
  icono?: string; // reservado por si luego querés íconos custom
}

// Estado
let categorias: Categoria[] = JSON.parse(localStorage.getItem("categorias") || "[]");

// UI refs
const listEl = document.getElementById("categoriesList") as HTMLElement;
const modalBG = document.getElementById("modal-bg") as HTMLElement;
const modalTitle = document.getElementById("modal-title") as HTMLElement;
const inputName = document.getElementById("catName") as HTMLInputElement;
const btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
const btnSave = document.getElementById("btnSave") as HTMLButtonElement;
const btnCancel = document.getElementById("btnCancel") as HTMLButtonElement;

let editingId: number | null = null;

// ---- Render ----
function render() {
  listEl.innerHTML = "";

  if (categorias.length === 0) {
    listEl.innerHTML = `<p class="cat-empty">No hay categorías creadas aún.</p>`;
    return;
  }

  categorias.forEach((c) => {
    // Fila estilo “píldora”
    const row = document.createElement("div");
    row.className = "cat-row";
    row.setAttribute("data-id", String(c.id));

    // click en la fila → navegar a productos filtrados
    row.addEventListener("click", () => {
      const q = encodeURIComponent(c.nombre);
      window.location.href = `/src/pages/admin/products/products.html?categoria=${q}`;
    });

    // Baldosa icono (placeholder)
    const iconBox = document.createElement("div");
    iconBox.className = "cat-icon";
    iconBox.textContent = "📁";

    // Nombre
    const name = document.createElement("div");
    name.className = "cat-name";
    name.textContent = c.nombre.toUpperCase();

    // Acciones (editar/eliminar)
    const actions = document.createElement("div");
    actions.className = "cat-actions";

    const btnEdit = document.createElement("button");
    btnEdit.className = "icon-action";
    btnEdit.title = "Editar";
    btnEdit.innerText = "✎";
    btnEdit.addEventListener("click", (e) => {
      e.stopPropagation(); 
      openModal(c.id);
    });

    const btnDel = document.createElement("button");
    btnDel.className = "icon-action";
    btnDel.title = "Eliminar";
    btnDel.innerText = "🗑";
    btnDel.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteCat(c.id);
    });

    actions.append(btnEdit, btnDel);
    row.append(iconBox, name, actions);
    listEl.appendChild(row);
  });
}

// ---- Modal ----
function openModal(id: number | null) {
  editingId = id;
  modalTitle.textContent = id ? "Editar Categoría" : "Nueva Categoría";
  inputName.value = id ? (categorias.find((x) => x.id === id)?.nombre ?? "") : "";
  modalBG.style.display = "flex";
}

function closeModal() {
  modalBG.style.display = "none";
  inputName.value = "";
  editingId = null;
}

btnAdd.addEventListener("click", () => openModal(null));
btnCancel.addEventListener("click", closeModal);

btnSave.addEventListener("click", () => {
  const name = inputName.value.trim();
  if (!name) {
    alert("Ingresá un nombre para la categoría.");
    return;
  }

  if (editingId) {
    categorias = categorias.map((c) => (c.id === editingId ? { ...c, nombre: name } : c));
  } else {
    categorias.push({ id: Date.now(), nombre: name });
  }

  localStorage.setItem("categorias", JSON.stringify(categorias));
  closeModal();
  render();
});

// ---- Eliminar ----
function deleteCat(id: number) {
  if (!confirm("¿Eliminar esta categoría?")) return;
  categorias = categorias.filter((c) => c.id !== id);
  localStorage.setItem("categorias", JSON.stringify(categorias));
  render();
}

// ---- Sidebar (hamburguesa) ----
const menuBtn = document.getElementById("menu-btn") as HTMLElement;
const sidebar = document.getElementById("sidebar") as HTMLElement;
const closeSidebar = document.getElementById("close-sidebar") as HTMLElement;
const logoutSidebarBtn = document.getElementById("logoutSidebarBtn") as HTMLElement;

menuBtn.addEventListener("click", () => sidebar.classList.add("active"));
closeSidebar.addEventListener("click", () => sidebar.classList.remove("active"));
logoutSidebarBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/src/pages/auth/login/login.html";
});
document.querySelectorAll(".sidebar-nav a").forEach((a) =>
  a.addEventListener("click", () => sidebar.classList.remove("active"))
);

// ---- Seed opcional (si no hay nada) ----
if (!categorias || categorias.length === 0) {
  categorias = [
    { id: 1, nombre: "Bebidas" },
    { id: 2, nombre: "Postres" },
    { id: 3, nombre: "Hamburguesas" },
  ];
  localStorage.setItem("categorias", JSON.stringify(categorias));
}

// ---- Init ----
render();