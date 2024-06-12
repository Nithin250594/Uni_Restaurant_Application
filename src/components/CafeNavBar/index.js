import {useState, useContext, useEffect} from 'react'
import Cookies from 'js-cookie'
import {useHistory, Link} from 'react-router-dom'
import {FaShoppingCart} from 'react-icons/fa'

import CartContext from '../../CartContext'
import './index.css'

const CafeNavBar = () => {
  const {cartList} = useContext(CartContext)

  const [restaurantName, setRestaurantName] = useState('')

  const cartCount = cartList.length

  useEffect(() => {
    const fetchRestaurantLogo = async () => {
      const dishesApiUrl =
        'https://run.mocky.io/v3/72562bef-1d10-4cf5-bd26-8b0c53460a8e'
      const options = {
        method: 'GET',
      }
      try {
        const response = await fetch(dishesApiUrl, options)
        const data = await response.json()
        setRestaurantName(data[0].restaurant_name)
      } catch (error) {
        console.error('Failed to fetch data:', error)
      }
    }
    fetchRestaurantLogo()
  }, [])

  const history = useHistory()

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onClickCartIcon = () => {
    history.replace('/cart')
  }

  return (
    <nav className="nav-bar">
      <Link to="/" className="cart-logo-Link">
        <h1 className="nav-logo">{restaurantName}</h1>
      </Link>
      <div className="cart-container">
        <Link to="/cart" className="my-orders-link">
          <p className="my-orders-text">My Orders</p>
        </Link>
        <button
          type="button"
          className="cart-link"
          onClick={onClickCartIcon}
          data-testid="cart"
        >
          <FaShoppingCart className="cart-logo" />
          <div className="CartCount">{cartCount}</div>
        </button>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}

export default CafeNavBar
