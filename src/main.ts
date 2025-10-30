import { getUser, isAdmin } from "./utils/auth";

// ======== CONTROL DE SESIÓN ========
(function checkRootRedirect() {
  const user = getUser();
  const currentPath = window.location.pathname;

  const loginPath = "/src/pages/auth/login/login.html";
  const adminPath = "/src/pages/admin/adminHome/adminHome.html";
  const storePath = "/src/pages/store/home/home.html";

  if (!user) {
    if (currentPath !== loginPath) {
      window.location.href = loginPath;
    }
  } else if (isAdmin()) {
    // ✅ Si está en el admin, no redirigir
    if (!currentPath.includes("/admin/") && currentPath !== adminPath) {
      window.location.href = adminPath;
    }
  } else {
    if (currentPath !== storePath) {
      window.location.href = storePath;
    }
  }
})();

// ======== CARGA DINÁMICA DE SCRIPTS SEGÚN LA PÁGINA ========
const current = window.location.pathname;

// Función auxiliar para verificar que el archivo existe y mostrar un log
async function safeImport(path: string) {
  try {
    await import(path);
    console.log(`✅ Script cargado: ${path}`);
  } catch (err) {
    console.warn(`⚠️ No se pudo cargar el script ${path}`, err);
  }
}

// ==== Detectar qué script cargar ====
if (current.includes("categories.html")) {
  safeImport("/src/pages/admin/categories/categories.ts");
}

if (current.includes("/admin/adminHome/")) {
  safeImport("./pages/admin/adminHome/adminHome.ts");
}

if (current.includes("/admin/products/")) {
  safeImport("./pages/admin/products/products.ts");
}

if (current.includes("/store/home/")) {
  safeImport("./pages/store/home/home.ts");
}
