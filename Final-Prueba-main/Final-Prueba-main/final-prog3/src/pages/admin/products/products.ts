import { getUser, isAdmin } from "/src/utils/auth";

// ---- Seguridad ----
const user = getUser();
if (!user || !isAdmin()) {
  alert("Acceso denegado ❌");
  window.location.href = "/src/pages/auth/login/login.html";
}

// Mostrar usuario en sidebar
const sidebarUser = document.getElementById("sidebarUser");
if (sidebarUser && user) {
  sidebarUser.textContent = `👤 ${user.name ?? "Admin"}`;
}

// ---- Modelo ----
interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  imagen?: string;
}

let productos: Producto[] = JSON.parse(localStorage.getItem("productos") || "[]");

// ---- Referencias UI ----
const listEl = document.getElementById("productsList") as HTMLElement;
const modalBG = document.getElementById("modal-bg") as HTMLElement;
const modalTitle = document.getElementById("modal-title") as HTMLElement;
const inputName = document.getElementById("prodName") as HTMLInputElement;
const inputPrice = document.getElementById("prodPrice") as HTMLInputElement;
const selectCat = document.getElementById("prodCategory") as HTMLSelectElement;
const btnAdd = document.getElementById("btnAdd") as HTMLButtonElement;
const btnSave = document.getElementById("btnSave") as HTMLButtonElement;
const btnCancel = document.getElementById("btnCancel") as HTMLButtonElement;

let editingId: number | null = null;

// ---- Cargar categorías guardadas ----
function loadCategories() {
  const categorias = JSON.parse(localStorage.getItem("categorias") || "[]");
  selectCat.innerHTML = `<option value="">Selecciona una categoría</option>`;
  categorias.forEach((c: any) => {
    const option = document.createElement("option");
    option.value = c.nombre;
    option.textContent = c.nombre;
    selectCat.appendChild(option);
  });
}

// ---- Render ----
function render() {
  listEl.innerHTML = "";

  if (productos.length === 0) {
    listEl.innerHTML = `<p class="cat-empty">No hay productos registrados.</p>`;
    return;
  }

  productos.forEach((p) => {
    const row = document.createElement("div");
    row.className = "prod-row";

    const img = document.createElement("img");
    img.className = "prod-img";
    img.src = p.imagen || "https://via.placeholder.com/120x88?text=🍔";

    const name = document.createElement("div");
    name.className = "prod-name";
    name.textContent = p.nombre;

    const price = document.createElement("div");
    price.className = "prod-price";
    price.textContent = `$${p.precio}`;

    const cat = document.createElement("div");
    cat.className = "prod-cat";
    cat.textContent = p.categoria;

    const actions = document.createElement("div");
    actions.className = "prod-actions";

    const editBtn = document.createElement("button");
    editBtn.className = "prod-btn btn-edit";
    editBtn.textContent = "Editar";
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openModal(p.id);
    });

    const delBtn = document.createElement("button");
    delBtn.className = "prod-btn btn-delete";
    delBtn.textContent = "Eliminar";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteProduct(p.id);
    });

    actions.append(editBtn, delBtn);
    row.append(img, name, price, cat, actions);
    listEl.appendChild(row);
  });
}

// ---- Modal ----
function openModal(id: number | null) {
  loadCategories(); // 🔥 Siempre actualizamos las categorías disponibles
  editingId = id;
  modalTitle.textContent = id ? "Editar Producto" : "Nuevo Producto";
  const prod = id ? productos.find((x) => x.id === id) : null;

  inputName.value = prod?.nombre ?? "";
  inputPrice.value = prod?.precio?.toString() ?? "";
  selectCat.value = prod?.categoria ?? "";

  modalBG.style.display = "flex";
}

function closeModal() {
  modalBG.style.display = "none";
  inputName.value = "";
  inputPrice.value = "";
  selectCat.value = "";
  editingId = null;
}

btnAdd.addEventListener("click", () => openModal(null));
btnCancel.addEventListener("click", closeModal);

btnSave.addEventListener("click", () => {
  const nombre = inputName.value.trim();
  const precio = parseFloat(inputPrice.value);
  const categoria = selectCat.value.trim();

  if (!nombre || !precio || !categoria) {
    alert("Por favor completa todos los campos.");
    return;
  }

  if (editingId) {
    productos = productos.map((p) =>
      p.id === editingId ? { ...p, nombre, precio, categoria } : p
    );
  } else {
    productos.push({ id: Date.now(), nombre, precio, categoria });
  }

  localStorage.setItem("productos", JSON.stringify(productos));
  closeModal();
  render();
});

// ---- Eliminar ----
function deleteProduct(id: number) {
  if (!confirm("¿Eliminar este producto?")) return;
  productos = productos.filter((p) => p.id !== id);
  localStorage.setItem("productos", JSON.stringify(productos));
  render();
}

// ---- Sidebar ----
const menuBtn = document.getElementById("menu-btn")!;
const sidebar = document.getElementById("sidebar")!;
const closeSidebar = document.getElementById("close-sidebar")!;
const logoutSidebarBtn = document.getElementById("logoutSidebarBtn")!;

menuBtn.addEventListener("click", () => sidebar.classList.add("active"));
closeSidebar.addEventListener("click", () => sidebar.classList.remove("active"));
logoutSidebarBtn.addEventListener("click", () => {
  localStorage.removeItem("user");
  window.location.href = "/src/pages/auth/login/login.html";
});

document.querySelectorAll(".sidebar-nav a").forEach((a) =>
  a.addEventListener("click", () => sidebar.classList.remove("active"))
);

// ---- Seed inicial (demo) ----
if (!productos || productos.length === 0) {
  productos = [
    { id: 1, nombre: "Hamburguesa Doble", precio: 1500, categoria: "Comidas" },
    { id: 2, nombre: "Pizza Mozzarella", precio: 2000, categoria: "Pizzas" },
    { id: 3, nombre: "Coca Cola 500ml", precio: 900, categoria: "Bebidas" },
  ];
  localStorage.setItem("productos", JSON.stringify(productos));
}

render();
