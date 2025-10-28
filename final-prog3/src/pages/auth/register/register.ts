import { register } from "../../../utils/auth";

const form = document.getElementById("registerForm") as HTMLFormElement;

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value;
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    try {
    const user = await register(name, email, password);
    alert("Registro exitoso ✅");
    localStorage.setItem("user", JSON.stringify(user));

    window.location.href = "/src/pages/auth/login/login.html";
    } catch (error) {
    alert("Error al registrarse ❌");
    console.error(error);
    }
});
