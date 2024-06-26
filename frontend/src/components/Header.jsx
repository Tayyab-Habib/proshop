import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Badge,Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import {FaShoppingCart, FaUser} from 'react-icons/fa'
import logo from '../assets/logo.png'
import {LinkContainer} from 'react-router-bootstrap'
import {useSelector, useDispatch} from 'react-redux'
import {logout} from '../slices/authSlice'
import { useLogoutMutation } from '../slices/usersApiSlice'
import { toast } from 'react-toastify'
import { resetCart} from '../slices/cartSlice'
import SearchBox from '../components/SearchBox'



const Header = () => {

  const { cartItems } = useSelector((state) => state.cart)
  const {userInfo} = useSelector((state)=>state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutFunction] = useLogoutMutation()
   const logoutHandler=async ()=>{
    try {
      await logoutFunction().unwrap()
      dispatch(logout())
      dispatch (resetCart())
      navigate('/')
    } catch (err) {
      toast.error(err?.data?.message || err.error)
    }
   }
  return (
    <header>
        <Navbar bg="dark" variant='dark' expand='lg' collapseOnSelect>
            <Container>
              <LinkContainer to='/'>
                <Navbar.Brand >
                  <img src={logo} alt="ProShop" />
                  ProShop
                  </Navbar.Brand>
              </LinkContainer>
                <Navbar.Toggle aria-controls='basic-navbar-nav'></Navbar.Toggle>
                <Navbar.Collapse id='basic-navbar-nav'>
                    <Nav className='ms-auto'>
                      <SearchBox/>
                      <LinkContainer to='/cart'>
                      <Nav.Link>
                        <FaShoppingCart/> Cart
                        {
                          cartItems.length > 0 && (
                            <Badge pill bg='success' style={{marginLeft:"3px"}}>
                              {cartItems.reduce((acc,item)=>acc + item.qty,0)}
                            </Badge>
                          )
                        }
                        </Nav.Link>
                      </LinkContainer>
                      { userInfo ? (<NavDropdown title={userInfo.name} id='username'>
                        <LinkContainer to='/profile'>
                          <NavDropdown.Item>Profile</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                      </NavDropdown>) : (<LinkContainer to="/login">

                      <Nav.Link>
                        <FaUser/> Sign In
                        </Nav.Link>
                      </LinkContainer>)}

                       {userInfo && userInfo.isAdmin && (

                        <NavDropdown title='Admin' id='adminmenu'>
                          <LinkContainer to="/admin/listproducts">
                            <NavDropdown.Item>Products</NavDropdown.Item>
                          </LinkContainer>

                          <LinkContainer to="/admin/listorders">
                            <NavDropdown.Item>Orders</NavDropdown.Item>
                          </LinkContainer>

                          <LinkContainer to="/admin/listusers">
                            <NavDropdown.Item>Users</NavDropdown.Item>
                          </LinkContainer>
                        </NavDropdown>
                        
                       )
                      }
                      
                      
                      
                    </Nav>
                </Navbar.Collapse>
            </Container>

        </Navbar>
    </header>
  )
}

export default Header