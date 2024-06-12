import {createContext, useState} from 'react'

const CartContext = createContext()

export const CartProvider = ({children}) => {
  const [cartList, setCartList] = useState([])

  const removeAllCartItems = () => {
    setCartList([])
  }

  const removeCartItem = id => {
    setCartList(prevState =>
      prevState.filter(eachDishItem => eachDishItem.dishId !== id),
    )
  }

  const addCartItem = (dishItem, quantity) => {
    const isDishPresent = cartList.find(
      eachDish => eachDish.dishId === dishItem.dishId,
    )

    if (isDishPresent) {
      setCartList(prevState =>
        prevState.map(eachItem => {
          if (eachItem.dishId === isDishPresent.dishId) {
            const dishQuantity = eachItem.quantity + quantity
            return {...eachItem, quantity: dishQuantity}
          }
          return eachItem
        }),
      )
    } else {
      setCartList(prevState => [...prevState, {...dishItem, quantity}])
    }
  }

  const incrementCartItemQuantity = id => {
    const checkItem = cartList.find(eachDish => eachDish.dishId === id)

    if (checkItem) {
      setCartList(prevState =>
        prevState.map(eachDish => {
          if (eachDish.dishId === checkItem.dishId) {
            const newQuantity = eachDish.quantity + 1
            return {...eachDish, quantity: newQuantity}
          }
          return eachDish
        }),
      )
    }
  }

  const decrementCartItemQuantity = id => {
    const checkItem = cartList.find(eachDish => eachDish.dishId === id)

    if (checkItem && checkItem.quantity > 1) {
      setCartList(prevState =>
        prevState.map(eachDish => {
          if (eachDish.dishId === checkItem.dishId) {
            const newQuantity = eachDish.quantity - 1
            return {...eachDish, quantity: newQuantity}
          }
          return eachDish
        }),
      )
    } else {
      removeCartItem(id)
    }
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addCartItem,
        removeAllCartItems,
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContext
