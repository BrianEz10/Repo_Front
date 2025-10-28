// login
export async function login(email: string, password: string) {
    const response = await fetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
    throw new Error("Error de autenticación");
    }

    const userData = await response.json();
    return userData;
}

// register
export async function register(name: string, email: string, password: string) {
    const response = await fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
    throw new Error("Error al registrarse");
    }

    const userData = await response.json();
    return userData;
}

export function logout() {
    localStorage.removeItem("user");
}

export function getCurrentUser() {
    const data = localStorage.getItem("user");
    return data ? JSON.parse(data) : null;
}
