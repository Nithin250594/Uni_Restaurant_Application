import {useContext} from 'react'
import CafeNavBar from '../CafeNavBar'
import CartItem from '../CartItem'
import CartContext from '../../CartContext'
import './index.css'

const CartRoute = () => {
  const {cartList, removeAllCartItems} = useContext(CartContext)
  const isCartEmpty = cartList.length === 0

  const onClickRemoveAll = () => {
    removeAllCartItems()
  }

  return (
    <>
      <CafeNavBar />
      {isCartEmpty ? (
        <div className="empty-cart-view">
          <h1 className="empty-cart-text">Cart is Empty</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            alt="empty-cart"
            className="empty-cart-img"
          />
        </div>
      ) : (
        <>
          <ul className="cart-view">
            <button
              type="button"
              className="remove-all-button"
              onClick={onClickRemoveAll}
            >
              Remove All
            </button>
            {cartList.map(eachDish => (
              <CartItem dishDetails={eachDish} />
            ))}
          </ul>
        </>
      )}
    </>
  )
}

export default CartRoute
