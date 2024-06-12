import {useContext} from 'react'
import CartContext from '../../CartContext'
import './index.css'

const CartItem = props => {
  const {
    removeCartItem,
    decrementCartItemQuantity,
    incrementCartItemQuantity,
  } = useContext(CartContext)
  const {dishDetails} = props
  const {
    dishName,
    dishImage,
    dishId,
    quantity,
    dishCurrency,
    dishPrice,
  } = dishDetails

  const cartDishPrice = dishPrice * quantity
  const correctedPrice = cartDishPrice.toFixed(2)

  const onClickRemove = () => {
    removeCartItem(dishId)
  }

  const onDecrement = () => {
    decrementCartItemQuantity(dishId)
  }

  const onIncrement = () => {
    incrementCartItemQuantity(dishId)
  }

  return (
    <li key={dishId} className="cart-dish-item">
      <h1 className="cart-dish-name">{dishName}</h1>
      <img src={dishImage} alt={dishName} className="cart-dish-image" />
      <div className="dish-name-image">
        <h1 className="dish-name">{dishName}</h1>
        <img src={dishImage} alt={dishName} className="dish-image" />
      </div>
      <div className="cart-count-div">
        <button type="button" className="count-button" onClick={onDecrement}>
          -
        </button>
        <p className="dish-count">{quantity}</p>
        <button type="button" className="count-button" onClick={onIncrement}>
          +
        </button>
      </div>
      <p>
        {dishCurrency} {correctedPrice}
      </p>
      <button type="button" className="remove-button" onClick={onClickRemove}>
        Remove
      </button>
    </li>
  )
}

export default CartItem
