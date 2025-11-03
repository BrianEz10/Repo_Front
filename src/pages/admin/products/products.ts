const tabla = document.getElementById("tablaProductos") as HTMLTableSectionElement;
const modal = document.getElementById("modalProducto") as HTMLElement;
const form = document.getElementById("formProducto") as HTMLFormElement;
const btnNuevo = document.getElementById("btnNuevoProducto") as HTMLButtonElement;
const btnCancelar = document.getElementById("btnCancelarProducto") as HTMLButtonElement;
const selectCategoria = document.getElementById("pCategoria") as HTMLSelectElement;

let editando: number | null = null;

interface Categoria {
    id: number;
    nombre: string;
}

interface Producto {
    id: number;
    nombre: string;
    precio: number;
    imagenUrl: string;
    categoria: Categoria | null;
}

// ======================= CARGAR PRODUCTOS =======================
async function cargarProductos(): Promise<void> {
    try {
        const res = await fetch("http://localhost:8080/api/productos");
        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        const productos: Producto[] = await res.json();
        tabla.innerHTML = "";

        productos.forEach((p) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${p.id}</td>
                <td>${p.nombre}</td>
                <td>$${p.precio.toFixed(2)}</td>
                <td>${p.imagenUrl ? `<img src="${p.imagenUrl}" width="60" />` : "-"}</td>
                <td>${p.categoria ? p.categoria.nombre : "-"}</td>
                <td>
                    <button onclick="eliminarProducto(${p.id})" class="btn-logout">Eliminar</button>
                </td>
            `;
            tabla.appendChild(tr);
        });
    } catch (error) {
        console.error("Error cargando productos:", error);
        alert("Error al cargar productos: " + error);
    }
}

// ======================= CARGAR CATEGORÍAS =======================
// ======================= CARGAR CATEGORÍAS =======================
async function cargarCategorias(): Promise<void> {
try {
    const res = await fetch('http://localhost:8080/api/categorias');
    if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    const categorias = await res.json();

    const select = document.getElementById('pCategoria') as HTMLSelectElement;
    select.innerHTML = '';

    categorias.forEach((cat: any) => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = cat.nombre;
        select.appendChild(option);
    });
} catch (error) {
    console.error('Error cargando categorías:', error);
    alert('Error al cargar categorías: ' + error);
}
}


document.addEventListener('DOMContentLoaded', () => {
    cargarCategorias();
    cargarProductos();
});



// ======================= NUEVO PRODUCTO =======================
btnNuevo.addEventListener("click", () => {
    modal.style.display = "block";
    editando = null;
});

// ======================= CANCELAR =======================
btnCancelar.addEventListener("click", () => {
    modal.style.display = "none";
    form.reset();
});

// ======================= GUARDAR PRODUCTO =======================
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    try {
        const nombre = (document.getElementById("pNombre") as HTMLInputElement).value;
        const precio = parseFloat((document.getElementById("pPrecio") as HTMLInputElement).value);
        const categoriaId = parseInt(selectCategoria.value);
        const imagenInput = document.getElementById("pImagen") as HTMLInputElement;
        const imagenFile = imagenInput.files?.[0];

        let imagenUrl = "";
        if (imagenFile) {
            const fd = new FormData();
            fd.append("file", imagenFile);
            const res = await fetch("http://localhost:8080/api/productos/upload", {
                method: "POST",
                body: fd,
            });
            if (!res.ok) {
                throw new Error(`Error subiendo imagen: ${res.status}`);
            }
            imagenUrl = await res.text();
        }

        const productoData = {
            nombre,
            precio,
            imagenUrl,
            categoria: categoriaId ? { id: categoriaId } : null
        };

        const response = await fetch("http://localhost:8080/api/productos", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(productoData),
        });

        if (!response.ok) {
            throw new Error(`Error creando producto: ${response.status}`);
        }

        modal.style.display = "none";
        form.reset();
        await cargarProductos();
        alert("Producto creado exitosamente!");
        
    } catch (error) {
        console.error("Error guardando producto:", error);
        alert("Error al guardar producto: " + error);
    }
});

// ======================= ELIMINAR PRODUCTO =======================
async function eliminarProducto(id: number): Promise<void> {
    const confirmar = confirm("¿Eliminar producto?");
    if (confirmar) {
        try {
            const response = await fetch(`http://localhost:8080/api/productos/${id}`, {
                method: "DELETE",
            });
            
            if (!response.ok) {
                throw new Error(`Error eliminando producto: ${response.status}`);
            }
            
            await cargarProductos();
            alert("Producto eliminado exitosamente!");
        } catch (error) {
            console.error("Error eliminando producto:", error);
            alert("Error al eliminar producto: " + error);
        }
    }
}

// ======================= INICIALIZAR =======================
document.addEventListener("DOMContentLoaded", () => {
    cargarCategorias();
    cargarProductos();
});

// Hacer las funciones globales para los eventos onclick
(window as any).eliminarProducto = eliminarProducto;