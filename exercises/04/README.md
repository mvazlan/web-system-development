# Module 04 – React Mini Shop (entrega por parejas)

## Enunciado
Ejercicio React Mini Shop del módulo 04. Aplicación React SPA con rutas `/`, `/products/:id` y `/cart`, catálogo local y carrito compartido con Context API.

## Ejecutar
Desde `exercises/04`:

```bash
npm install
npm run dev
```

Abrir la URL indicada por Vite. No usar Live Server ni abrir `index.html` directamente.

## Estado actual: primer commit (Manuel)
- Proyecto React + Vite con `@vitejs/plugin-react` (JSX automático).
- React Router con rutas `/`, `/products/:id`, `/cart` y error 404.
- Layout compartido con navegación básica.
- Productos locales en `src/data/products.js`.
- Catálogo con búsqueda controlada y `data-testid` exactos.
- Página de detalle usando `useParams`, con enlace de vuelta y botón de añadir.
- Estado básico compartido con CartContext, que permite añadir productos y aumentar cantidades.

## Pendiente para Marcos (segundo commit)
- Completar el header con `data-testid="cart-count"` usando `useCart`.
- Completar `CartContext.jsx` con `removeFromCart`, `updateQuantity`, `clearCart` y exponerlas en el Provider.
- Sustituir la página `Cart.jsx`: filas, cantidades, aumentar/disminuir, eliminar, precio total, estado vacío y checkout con nombre controlado.
- Respetar los `data-testid` exactos de las capturas del enunciado.
- Probar el flujo completo de compra, búsqueda, enlace directo al detalle, rutas 404 y navegación sin recarga.

**Importante**: Esta base es intencionadamente una primera parte funcional, NO la entrega final completa.
