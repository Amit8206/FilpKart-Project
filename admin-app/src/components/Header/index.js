import React from 'react'
import { Navbar, Container, Nav } from "react-bootstrap"
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Link, Navigate, useNavigate } from 'react-router-dom'
import { signout } from '../../actions'



/**
* @author
* @function Header
**/

export const Header = (props) => {


    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
   



    const logout = () => {
        dispatch(signout());
    }



    const renderLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span role='button' className="nav-link" onClick={logout}>Signout</span>
                </li>
            </Nav>
        )
    }

    const renderNonLoggedInLinks = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <NavLink to='/signin' className="nav-link">SignIn</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink to='/signup' className="nav-link">SignUp</NavLink>
                </li>
            </Nav>
        )
    }



    return (
        <>
            <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark" style={{'zIndex': '1'}}>
                <Container fluid>
                    {/* <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand> */}
                    <li>
                        <Link to="/" className="navbar-brand">Admin Dashboard</Link>
                    </li>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            {/* <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link> */}
                            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown> */}
                        </Nav>

                        {auth.authenticate ? renderLoggedInLinks() : renderNonLoggedInLinks() }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )

}