import {useContext, useState} from 'react'
import CartContext from '../../CartContext'
import './index.css'

const logosStickers = {
  veg:
    'https://res.cloudinary.com/dg14m0ern/image/upload/v1716537361/veg_logo.png',
  nonveg:
    'https://res.cloudinary.com/dg14m0ern/image/upload/v1716537361/non_veg_logo.png',
}

const DishCard = ({dishItem}) => {
  const [quantity, setQuantity] = useState(0)
  const {
    addCartItem,
    decrementCartItemQuantity,
    incrementCartItemQuantity,
  } = useContext(CartContext)

  const isCustomizeAvailable =
    dishItem.addonCat.length > 0 ? 'Customizations available' : ''

  const isVegLogo =
    dishItem.dishType === 2 ? logosStickers.veg : logosStickers.nonveg
  const incrementCount = () => {
    setQuantity(prevQuantity => prevQuantity + 1)
  }

  const decrementCount = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1)
    }
    decrementCartItemQuantity(dishItem.dishId)
  }

  const onClickAddCart = () => {
    addCartItem(dishItem, quantity)
    incrementCartItemQuantity(dishItem.dishId)
  }

  return (
    <li className="dish-item" key={dishItem.dishId}>
      <img src={isVegLogo} alt="veg_or_Non-veg" className="dish-type" />
      <div className="dish-details">
        <h1 className="dish-name">{dishItem.dishName}</h1>
        <p className="dish-cost">
          {dishItem.dishCurrency} {dishItem.dishPrice}
        </p>
        <p className="dish-description">{dishItem.dishDescription}</p>
        {dishItem.dishAvailability ? (
          <div className="add-to-cart-section">
            <div className="count-div">
              <button
                type="button"
                className="count-button"
                onClick={decrementCount}
              >
                -
              </button>
              <p className="dish-count">{quantity}</p>
              <button
                type="button"
                className="count-button"
                onClick={incrementCount}
              >
                +
              </button>
            </div>
            {quantity > 0 && (
              <button
                type="button"
                className="add-to-cart-button"
                onClick={onClickAddCart}
              >
                ADD TO CART
              </button>
            )}
          </div>
        ) : (
          <p className="dish-available-text"> Not available</p>
        )}

        {dishItem.addonCat.length > 0 && (
          <p className="customize-text">{isCustomizeAvailable}</p>
        )}
      </div>
      <p className="calories">{dishItem.dishCalories} Calories</p>
      <img
        src={dishItem.dishImage}
        alt={dishItem.dishName}
        className="dish-img"
      />
    </li>
  )
}

export default DishCard
