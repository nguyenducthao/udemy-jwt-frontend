import './Nav.scss'
import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Nav = () => {
    const [isShow, setIsShow] = useState(true)
    let location = useLocation()
    useEffect(() => {
        if (location.pathname === '/login') {
            setIsShow(false)
        }
    }, [])

    return (
        <>
            {isShow &&
                <div>
                    <div className="topnav">
                        <NavLink to="/" exact>Home</NavLink>
                        <NavLink to="/users">Users</NavLink>
                        <NavLink to="/projects">Projects</NavLink>
                        <NavLink to="/about">About</NavLink>
                    </div>
                </div>
            }
        </>
    )
}
export default Nav;