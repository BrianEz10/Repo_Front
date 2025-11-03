# Proyecto Final: Food Store (Programación 3)

Este repositorio contiene el código fuente completo para el proyecto "Food Store", dividido en un frontend (Vite + TypeScript) y un backend (Java + Spring Boot).

## 📋 Requisitos Previos

* **Java 17** o superior (para el backend)
* Un IDE de Java (como **IntelliJ IDEA** o Eclipse) (para el backend)
* **Visual Studio Code** (Recomendado para el frontend)
* **Node.js** v18 o superior (para el frontend)
* **npm** (generalmente incluido con Node.js) (para el frontend)

---

## ⚙️ 1. Inicialización del Backend (Spring Boot)

El backend es el servidor de Spring Boot que debe estar corriendo en `http://localhost:8080` para que el frontend pueda conectarse a él.

1.  **Abrir el Proyecto:**
    * Abre tu IDE de Java (ej. **IntelliJ IDEA**).
    * Selecciona `File` > `Open...` (Archivo > Abrir...).
    * Navega y selecciona la carpeta **`backend/`** de este repositorio.
    * Espera a que IntelliJ IDEA cargue e indexe el proyecto (puede tardar un minuto).

2.  **Ejecutar el Servidor:**
    * Busca el archivo de la aplicación principal, ubicado en `backend/src/main/java/com/foodstore/FoodStoreApplication.java`.
    * Haz clic derecho sobre el archivo y selecciona **"Run 'FoodStoreApplication.main()'"** (o presiona el botón de play verde ▶️).

3.  **Verificación:**
    * La consola de tu IDE debería mostrar un mensaje indicando que el servidor ha arrancado.
    * Busca la línea: `Tomcat started on port(s): 8080 (http)`
    * ¡El backend ya está listo! Déjalo corriendo.

---

## 🖥️ 2. Inicialización del Frontend (Vite)

El frontend es la aplicación web con la que interactúa el usuario, la cual se conectará al backend.

1.  **Abrir el Proyecto:**
    * Abre **Visual Studio Code**.
    * Selecciona `File` > `Open Folder...` (Archivo > Abrir Carpeta...).
    * Navega y selecciona la carpeta **`frontend/`** de este repositorio.

2.  **Abrir la Terminal:**
    * Dentro de VSCode, abre la terminal integrada.
    * Puedes hacerlo desde el menú superior: `Terminal` > `New Terminal` (Nueva Terminal).

3.  **Instalar Dependencias (Solo la primera vez):**
    * Este comando descarga todas las librerías que el proyecto necesita. En la terminal de VSCode, ejecuta:
    ```bash
    npm install
    ```

4.  **Ejecutar el Servidor de Desarrollo:**
    * En la misma terminal, inicia el servidor de Vite:
    ```bash
    npm run dev
    ```

5.  **Verificación:**
    * La terminal te mostrará un mensaje.
    * Busca la línea: `Local: http://localhost:5173/`
    * Abre esa URL (`http://localhost:5173`) en tu navegador (puedes hacer `Ctrl + Clic` en el enlace).

¡Y listo! Con ambos servidores corriendo, ahora puedes usar la aplicación web, que se conectará automáticamente al backend para el login y el resto de las funciones.
