# Ejemplo básico de ruta dinámica `[id]` en Next.js (Pages Router)

## Estructura del proyecto

```
/pages
 ├─ /products
 │   ├─ index.js      ← lista de productos
 │   └─ [id].js       ← detalle del producto
```

---

## 1. Listado de productos (`pages/products/index.js`)

```jsx
// pages/products/index.js
import Link from "next/link";

const products = [
  { id: 1, name: "Laptop", price: 1200 },
  { id: 2, name: "Mouse", price: 25 },
  { id: 3, name: "Keyboard", price: 80 },
];

export default function ProductsPage() {
  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <Link href={`/products/${p.id}`}>
              {p.name} - ${p.price}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

---

## 2. Detalle del producto (`pages/products/[id].js`)

```jsx
// pages/products/[id].js
import { useRouter } from "next/router";

const products = [
  { id: 1, name: "Laptop", price: 1200, description: "A powerful laptop." },
  { id: 2, name: "Mouse", price: 25, description: "Wireless mouse." },
  { id: 3, name: "Keyboard", price: 80, description: "Mechanical keyboard." },
];

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const product = products.find((p) => p.id === Number(id));

  if (!product) return <h2>Product not found</h2>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>Description: {product.description}</p>
    </div>
  );
}
```

---

## 3. Explicación

- `[id].js` define una ruta dinámica.
- `/products/1` mostrará el producto con ID 1.
- `useRouter()` de `next/router` permite acceder al parámetro dinámico `id`.
- `router.query.id` contiene el valor que se pasa en la URL.
- Este enfoque es usado en el Pages Router (carpeta `pages/`) de Next.js.
