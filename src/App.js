import {Route, Switch} from 'react-router-dom'
import {CartProvider} from './CartContext'
import ProtectedRoute from './components/ProtectedRoute'
import CafePage from './components/CafePage'
import LoginRoute from './components/LoginRoute'
import CartRoute from './components/CartRoute'
import './App.css'

const App = () => (
  <CartProvider>
    <Switch>
      <Route exact path="/login" component={LoginRoute} />
      <ProtectedRoute exact path="/" component={CafePage} />
      <ProtectedRoute exact path="/cart" component={CartRoute} />
    </Switch>
  </CartProvider>
)

export default App
