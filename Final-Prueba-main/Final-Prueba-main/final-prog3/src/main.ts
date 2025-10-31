import { getUser, isAdmin } from "./utils/auth";

// ======== CONTROL DE SESIÓN ========
(function checkRootRedirect() {
  const user = getUser();
  const path = window.location.pathname;

  const loginPath = "src/pages/auth/login/login.html";
  const adminPath = "src/pages/admin/adminHome/adminHome.html";
  const storePath = "src/pages/store/home/home.html";

  function redirectTo(target: string) {
    const base = window.location.origin;
    window.location.href = `${base}/${target}`;
  }

  // Si no hay usuario, lo manda al login
  if (!user) {
    if (!path.includes("/auth/login")) redirectTo(loginPath);
    return;
  }

  // Si es admin
// Usuario admin → puede estar en cualquier subpágina del admin
if (isAdmin()) {
  if (!path.includes("/admin/")) {
    redirectTo(adminPath);
  }
  return;
}


  // Si es cliente
  if (!path.includes("/store/")) {
    redirectTo(storePath);
  }
})();
