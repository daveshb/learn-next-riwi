
# Diferencias entre Pages Router y App Router en Next.js

## 1. Estructura y Filosofía

| Aspecto | Pages Router (`/pages`) | App Router (`/app`) |
|----------|--------------------------|----------------------|
| Paradigma | Basado en rutas tradicionales (file-based routing clásico). | Basado en componentes del servidor y segmentación de rutas (server components). |
| Carpeta principal | `/pages` | `/app` |
| Nivel de control | Enfoque tipo React tradicional (CSR/SSR con `getServerSideProps`). | Más moderno, orientado al renderizado híbrido y asíncrono, pensado para React 18. |

---

## 2. Renderizado y Data Fetching

| Función | Pages Router | App Router |
|----------|---------------|-------------|
| SSR (Server-Side Rendering) | `getServerSideProps` | Uso directo de async components y `fetch()` en el servidor. |
| SSG (Static Site Generation) | `getStaticProps` y `getStaticPaths` | Usa `generateStaticParams()` y `fetch({ cache: 'force-cache' })`. |
| CSR (Client-Side Rendering) | Hooks como `useEffect()` | Componentes marcados con `"use client"`. |
| ISR (Incremental Static Regeneration) | `revalidate` dentro de `getStaticProps`. | Propiedad `revalidate` directamente en el `fetch` o layout. |

---

## 3. Componentes y Layouts

| Elemento | Pages Router | App Router |
|-----------|---------------|-------------|
| Layout global | `_app.js` y `_document.js` | Archivos `layout.js` en cada segmento (anidables). |
| Error handling | `pages/_error.js` o manejo manual. | Archivos dedicados: `error.js` y `not-found.js`. |
| Loading states | Manual o con `useState/useEffect`. | Archivos `loading.js` automáticos por ruta. |

---

## 4. Server Components

| Concepto | Pages Router | App Router |
|-----------|---------------|-------------|
| Server Components | No compatibles. Todo es client-side o SSR clásico. | Soportados nativamente (por defecto todo es server component). |
| Client Components | Todos los componentes lo son. | Se definen explícitamente con `"use client"`. |
| Ventaja | Menor curva de aprendizaje. | Mejora rendimiento y reduce bundle del cliente. |

---

## 5. Navegación y Links

| Elemento | Pages Router | App Router |
|-----------|---------------|-------------|
| Componente de enlace | `<Link href="/about">` de `next/link`. | Igual, pero con nuevas mejoras (`<Link prefetch>` automáticos). |
| Navegación programática | `useRouter()` de `next/router`. | `useRouter()` de `next/navigation` (API distinta). |
| Parámetros de ruta | `useRouter().query` | `useParams()` de `next/navigation`. |

---

## 6. Migración y Compatibilidad

| Tema | Pages Router | App Router |
|-------|---------------|-------------|
| Compatibilidad con versiones viejas | Disponible desde Next 1. | Disponible desde Next 13. |
| Convivencia | No soporta `/app`. | Puede convivir con `/pages` mientras migras. |
| Ideal para | Proyectos legacy o simples. | Nuevos proyectos y arquitecturas modernas (React 18+). |

---

## 7. Ejemplo Rápido

### Pages Router
```
/pages/index.js
/pages/about.js
/pages/blog/[id].js
```
```jsx
// pages/blog/[id].js
export async function getServerSideProps({ params }) {
  const data = await fetch(`https://api.example.com/blog/${params.id}`).then(r => r.json());
  return { props: { data } };
}
export default function Blog({ data }) {
  return <div>{data.title}</div>;
}
```

### App Router
```
/app/page.js
/app/about/page.js
/app/blog/[id]/page.js
```
```jsx
// app/blog/[id]/page.js
export default async function Blog({ params }) {
  const data = await fetch(`https://api.example.com/blog/${params.id}`).then(r => r.json());
  return <div>{data.title}</div>;
}
```

---

## 8. Uso de Children en React

**`children`** es una propiedad especial que permite pasar elementos hijos a un componente.  
Se usa comúnmente para envolver contenido reutilizable.

```jsx
// Layout.js
export default function Layout({ children }) {
  return (
    <div>
      <header>Header común</header>
      <main>{children}</main>
      <footer>Footer común</footer>
    </div>
  );
}
```

```jsx
// App.js
import Layout from "./Layout";

export default function App() {
  return (
    <Layout>
      <h1>Página principal</h1>
      <p>Este contenido se renderiza dentro del Layout.</p>
    </Layout>
  );
}
```

En el App Router, los `layout.js` funcionan igual: cada layout recibe `children` para anidar vistas.

---

## 9. Qué es un HOC (High Order Component)

Un **HOC (Higher-Order Component)** es una **función que recibe un componente y devuelve otro componente mejorado**.

Se usa para **reutilizar lógica** entre múltiples componentes (como autenticación, permisos o manejo de errores).

```jsx
// withAuth.js
export function withAuth(Component) {
  return function ProtectedComponent(props) {
    const isAuthenticated = true; // lógica de ejemplo
    if (!isAuthenticated) {
      return <p>No tienes acceso</p>;
    }
    return <Component {...props} />;
  };
}
```

```jsx
// Dashboard.js
function Dashboard() {
  return <h1>Panel principal</h1>;
}

// Exportamos el componente envuelto
export default withAuth(Dashboard);
```

**Ventajas de los HOC:**  
- Reutilizan lógica de manera limpia.  
- Separan responsabilidades.  
- Evitan duplicar código entre componentes.  

**Alternativas modernas:** Hooks personalizados y composiciones de componentes, más usados hoy en día que los HOC.

---

## 10. Conclusión

| Cuándo usar | Recomendado |
|--------------|--------------|
| Pages Router | Si mantienes un proyecto antiguo o no necesitas SSR avanzado ni server components. |
| App Router | Para proyectos nuevos con React 18+, layouts anidados, data fetching moderno y mejor rendimiento. |
