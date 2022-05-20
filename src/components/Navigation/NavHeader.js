import './Nav.scss'
import { Link, NavLink, useLocation, useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import logo from '../../logo.svg'
import { logoutUser } from '../../services/userService';
import { toast } from 'react-toastify';

const NavHeader = () => {
    const { user, logoutContext } = useContext(UserContext)
    const location = useLocation()
    const history = useHistory()
    const handleLogOut = async () => {
        let data = await logoutUser() //clear cookie 
        if (data && +data.EC === 0) {
            toast.success('Logout succeeds...')
            localStorage.removeItem('jwt') //clear local storage
            logoutContext() // clear user in context
            history.push('/login')
        } else {
            toast.error(data.EM)
        }
    }
    if (user && user.isAuthenticated || location.pathname === '/') {
        return (
            <>
                {/* <div className="topnav">
                    <NavLink to="/" exact>Home</NavLink>
                    <NavLink to="/users">Users</NavLink>
                    <NavLink to="/projects">Projects</NavLink>
                    <NavLink to="/about">About</NavLink>
                </div> */}
                <div className='nav-header'>
                    <Navbar bg="header" expand="lg">
                        <Container>
                            <Navbar.Brand href="#home">
                                <img
                                    src={logo}
                                    width="30"
                                    height="30"
                                    className="d-inline-block align-top"
                                    alt="React Bootstrap logo"
                                />
                                <span className='brand-name'>React</span>
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="me-auto">
                                    <NavLink to="/" exact className='nav-link'>Home</NavLink>
                                    <NavLink to="/users" className='nav-link'>Users</NavLink>
                                    <NavLink to="/projects" className='nav-link'>Projects</NavLink>
                                    <NavLink to="/about" className='nav-link'>About</NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.isAuthenticated
                                        ?
                                        <>
                                            <Nav.Item className='nav-link'>
                                                Welcome {user.account.username}!
                                            </Nav.Item>
                                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                                <NavDropdown.Item>Change Password</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item>
                                                    <span onClick={() => handleLogOut()}>Log out</span>
                                                </NavDropdown.Item>
                                            </NavDropdown>
                                        </>
                                        :
                                        <Link className='nav-link' to='/login'>
                                            Login
                                        </Link>
                                    }
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>
            </>
        )
    } else {
        return <></>
    }
}
export default NavHeader;