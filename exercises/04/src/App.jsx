import { createBrowserRouter, RouterProvider, Link, Outlet } from 'react-router-dom'
import Catalog from './pages/Catalog.jsx'
import ProductDetail from './pages/ProductDetail.jsx'
import Cart from './pages/Cart.jsx'

function Layout() {
  return (
    <>
      {/* Marcos ampliará este header con el contador de unidades del carrito. */}
      <header className="site-header">
        <strong>Mini Shop</strong>
        <nav>
          <Link to="/" data-testid="nav-home">Home</Link>
          <Link to="/cart" data-testid="nav-cart">Cart</Link>
        </nav>
      </header>
      <main className="container"><Outlet /></main>
    </>
  )
}

function NotFound() {
  return <p data-testid="not-found">Page not found.</p>
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Catalog /> },
      { path: 'products/:id', element: <ProductDetail /> },
      { path: 'cart', element: <Cart /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])

export default function App() {
  return <RouterProvider router={router} />
}
