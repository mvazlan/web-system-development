import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Header() {
  const { cartItems } = useCart()

  // Se suman las unidades, no los productos distintos.
  const totalUnits = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="site-header">
      <strong>Mini Shop</strong>
      <nav>
        <Link to="/" data-testid="nav-home">Home</Link>
        <Link to="/cart" data-testid="nav-cart">
          Cart (<span data-testid="cart-count">{totalUnits}</span>)
        </Link>
      </nav>
    </header>
  )
}
