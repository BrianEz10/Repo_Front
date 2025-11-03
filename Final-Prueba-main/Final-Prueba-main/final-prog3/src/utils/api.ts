//  Tipos de datos que usaremos en Front y luego vendrán del backend
export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
}

//  MOCK TEMPORAL — luego se reemplaza por llamadas fetch al backend
const mockCategories: Category[] = [
  { id: 1, name: "Pizzas", description: "Todas las pizzas disponibles", image: "https://i.imgur.com/UGP1M8v.jpeg" },
  { id: 2, name: "Bebidas", description: "Bebidas frías y gaseosas", image: "https://i.imgur.com/uNhj0y7.jpeg" },
];

const mockProducts: Product[] = [
  { id: 1, name: "Pizza Mozzarella", description: "Extra queso 😋", price: 1500, image: "https://i.imgur.com/UGP1M8v.jpeg" },
  { id: 2, name: "Coca-Cola 500ml", description: "Bien fría 🧊", price: 800, image: "https://i.imgur.com/uNhj0y7.jpeg" },
];

//  Funciones accesibles desde el Front
export function getCategories(): Promise<Category[]> {
  return Promise.resolve(mockCategories);
}

export function getProducts(): Promise<Product[]> {
  return Promise.resolve(mockProducts);
}