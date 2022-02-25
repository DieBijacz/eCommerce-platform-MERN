import React from 'react'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../actions/userActions'

const Header = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
    <header>
      <Navbar bg="primary" variant='dark' collapseOnSelect expand="md">
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>Masta</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
          <LinkContainer to='/cart'>
              <Nav.Link ><i className='fas fa-shopping-cart'></i> Cart</Nav.Link>
          </LinkContainer>
          {userInfo ? userInfo.isAdmin ? (

              // ADMIN MENU

              <NavDropdown title={userInfo.name} id='adminMenu' menuVariant="light">
                <LinkContainer to='/profile'>
                  <NavDropdown.Item><i className='fas fa-user'></i> Profile</NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={logoutHandler}><i className="fa-solid fa-door-open"></i> Log out</NavDropdown.Item>
                <NavDropdown.Divider />
                <LinkContainer to='/admin/users'>
                  <NavDropdown.Item><i className="fa-solid fa-users"></i> Users</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/products'>
                  <NavDropdown.Item><i className="fa-solid fa-cubes"></i> Products</NavDropdown.Item>
                </LinkContainer>
                <LinkContainer to='/admin/orders'>
                  <NavDropdown.Item><i className="fa-solid fa-box"></i> Orders</NavDropdown.Item>
                </LinkContainer>
              </NavDropdown>
          ) : (

            // USER MENU

            <NavDropdown title={userInfo.name} id='username' menuVariant="light">
              <LinkContainer to='/profile'>
                <NavDropdown.Item><i className='fas fa-user'></i> Profile</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item onClick={logoutHandler}><i className="fa-solid fa-door-open"></i> Log out</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <LinkContainer to='/login'>
                <Nav.Link href="/login"><i className='fas fa-user'></i> Sign In</Nav.Link>
            </LinkContainer>
          )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
