import { login } from "/src/utils/auth";

const form = document.getElementById("loginForm") as HTMLFormElement;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement).value;

  try {
    const user = await login(email, password);

    if (user) {
      alert("Inicio de sesión exitoso ✅");
      localStorage.setItem("user", JSON.stringify(user));

      const rol = user.role?.toLowerCase();

      // ✅ Redirección con rutas absolutas
      if (rol?.includes("admin")) {
        window.location.href = "/src/pages/admin/adminHome/adminHome.html";
      } else {
        window.location.href = "/src/pages/store/home/home.html";
      }
    }
  } catch (error) {
    alert("Credenciales incorrectas ❌");
    console.error(error);
  }
});
