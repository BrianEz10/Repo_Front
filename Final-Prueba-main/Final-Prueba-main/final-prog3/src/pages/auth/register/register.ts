import { register } from "/src/utils/auth";

const form = document.getElementById("registerForm") as HTMLFormElement;

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = (document.getElementById("name") as HTMLInputElement).value.trim();
  const email = (document.getElementById("email") as HTMLInputElement).value.trim();
  const password = (document.getElementById("password") as HTMLInputElement).value;
  const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value;

  // 🔒 Validaciones básicas
  if (!name || !email || !password || !confirmPassword) {
    alert("Por favor completá todos los campos ❗");
    return;
  }

  if (password.length < 6) {
    alert("La contraseña debe tener al menos 6 caracteres ❗");
    return;
  }

  if (password !== confirmPassword) {
    alert("Las contraseñas no coinciden ❌");
    return;
  }

  try {
    const user = await register(name, email, password);
    alert("Registro exitoso ✅");
    localStorage.setItem("user", JSON.stringify(user));

    // Redirigir al login después de registrar
    window.location.href = "/src/pages/auth/login/login.html";
  } catch (error) {
    alert("Error al registrarse ❌");
    console.error(error);
  }
});
