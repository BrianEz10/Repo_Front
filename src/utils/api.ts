// ✅ Archivo temporal hasta que el backend entregue las rutas reales
export function getProducts() {
  return Promise.resolve([
    { name: "Pizza Mozzarella", description: "Extra queso 😋", price: 1500, image: "https://i.imgur.com/UGP1M8v.jpeg" },
    { name: "Coca-Cola 500ml", description: "Bien fría 🧊", price: 800, image: "https://i.imgur.com/uNhj0y7.jpeg" }
  ]);
}

export function getCategories() {
  return Promise.resolve([
    { id: 1, name: "Pizzas", description: "Todas las pizzas", image: "" },
    { id: 2, name: "Bebidas", description: "Todas las gaseosas", image: "" }
  ]);
}