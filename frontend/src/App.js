import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import AdminUsersListScreen from './screens/AdminUsersListScreen'
import AdminEditUserScreen from './screens/AdminEditUserScreen'
import AdminProductListScreen from './screens/AdminProductListScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} />
            <Route path='/product/:id' element={<ProductScreen />} />
            <Route path='/login' element={<LoginScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/cart'>
              <Route path=':id' element={<CartScreen />} />
              <Route path='' element={<CartScreen />} />
            </Route>
            <Route path='/shipping' element={<ShippingScreen />} />
            <Route path='/payment' element={<PaymentScreen />} />
            <Route path='/placeorder' element={<PlaceOrderScreen />} />
            <Route path='/orders/:id' element={<OrderScreen />} />
            <Route path='/admin/users' element={<AdminUsersListScreen />} />
            <Route
              path='/admin/products'
              element={<AdminProductListScreen />}
            />
            <Route
              path='/admin/edit/user/:id'
              element={<AdminEditUserScreen />}
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
