import { useState } from 'react'
import { useCart } from '../context/CartContext.jsx'

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart()
  const [customerName, setCustomerName] = useState('')
  const [error, setError] = useState('')
  const [confirmedName, setConfirmedName] = useState('')

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function handleCheckout(event) {
    event.preventDefault()
    const name = customerName.trim()

    if (name === '') {
      setError('Please enter your name.')
      return
    }

    clearCart()
    setConfirmedName(name)
    setCustomerName('')
    setError('')
  }

  return (
    <section>
      <h1>Cart</h1>

      {confirmedName && (
        <p className="confirmation" data-testid="order-confirmation">
          Thank you, {confirmedName}! Your order has been placed.
        </p>
      )}

      {cartItems.length === 0 ? (
        <p data-testid="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map(item => (
              <li className="cart-item" data-testid={`cart-item-${item.id}`} key={item.id}>
                <span className="cart-name">{item.name}</span>
                <span>€{item.price.toFixed(2)}</span>
                <div className="cart-quantity">
                  <button
                    data-testid={`decrease-${item.id}`}
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    aria-label={`Decrease ${item.name}`}
                  >
                    −
                  </button>
                  <span data-testid={`quantity-${item.id}`}>{item.quantity}</span>
                  <button
                    data-testid={`increase-${item.id}`}
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    aria-label={`Increase ${item.name}`}
                  >
                    +
                  </button>
                </div>
                <button data-testid={`remove-${item.id}`} onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <p className="cart-total">
            Total: <strong data-testid="cart-total">€{total.toFixed(2)}</strong>
          </p>

          <form className="checkout" onSubmit={handleCheckout}>
            <label htmlFor="customer-name">Name</label>
            <input
              id="customer-name"
              data-testid="customer-name"
              value={customerName}
              onChange={event => setCustomerName(event.target.value)}
            />
            {error && <p className="error">{error}</p>}
            <button type="submit" data-testid="checkout">Checkout</button>
          </form>
        </>
      )}
    </section>
  )
}
