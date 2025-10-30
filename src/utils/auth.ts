// ✅ LOGIN con el backend
export async function login(email: string, password: string) {
  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Error de autenticación");

  const user = await response.json();
  setUser(user); // ✅ Guardar sesión al loguear
  return user;
}

// ✅ REGISTER con el backend
export async function register(name: string, email: string, password: string) {
  const response = await fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) throw new Error("Error al registrarse");

  const user = await response.json();
  setUser(user);
  return user;
}

// ✅ Gestionar Sesión
export function setUser(user: any) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  const savedUser = localStorage.getItem("user");
  return savedUser ? JSON.parse(savedUser) : null;
}

export function clearUser() {
  localStorage.removeItem("user");
}

// ✅ Protecciones y Roles
export function requireLogin() {
  if (!getUser()) {
    window.location.href = "/src/pages/auth/login/login.html";
  }
}


export function isAdmin() {
  const user = getUser();
  return user && user.role === "admin";
}

export function isClient() {
  const user = getUser();
  return user && user.role === "client";
}