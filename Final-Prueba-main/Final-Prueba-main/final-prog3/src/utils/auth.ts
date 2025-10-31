export async function login(email: string, password: string) {
  const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) throw new Error("Error de autenticación");

  const userData = await response.json();

  // Guardamos el usuario logueado
  setUser(userData);

  return userData;
}

// ✅ REGISTER con el backend
export async function register(name: string, email: string, password: string) {
  const response = await fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.ok) throw new Error("Error al registrarse");

  const userData = await response.json();
  setUser(userData);
  return userData;
}

// ✅ Guardar sesión local (resiliente)
export function setUser(user: any) {
  try {
    localStorage.setItem("user", JSON.stringify(user));
  } catch (err) {
    console.error("Error al guardar usuario en localStorage:", err);
  }
}

// ✅ Obtener usuario actual (seguro)
export function getUser() {
  try {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Error al leer usuario de localStorage:", err);
    return null;
  }
}

// ✅ Cerrar sesión
export function clearUser() {
  localStorage.removeItem("user");
}

// ✅ Verificar rol administrador (soporta ROLE_ADMIN, ADMIN, admin)
export function isAdmin() {
  const user = getUser();
  if (!user || !user.role) return false;

  const role = user.role.toString().toLowerCase();
  return role.includes("admin");
}

// ✅ Verificar rol cliente (soporta ROLE_CLIENT, CLIENT, client)
export function isClient() {
  const user = getUser();
  if (!user || !user.role) return false;

  const role = user.role.toString().toLowerCase();
  return role.includes("client");
}