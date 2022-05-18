import './Nav.scss'
import { NavLink, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Nav = () => {
    const { user } = useContext(UserContext)
    const location = useLocation()
    if (user && user.isAuthenticated || location.pathname === '/') {
        return (
            <>
                <div>
                    <div className="topnav">
                        <NavLink to="/" exact>Home</NavLink>
                        <NavLink to="/users">Users</NavLink>
                        <NavLink to="/projects">Projects</NavLink>
                        <NavLink to="/about">About</NavLink>
                    </div>
                </div>
            </>
        )
    } else {
        return <></>
    }
}
export default Nav;