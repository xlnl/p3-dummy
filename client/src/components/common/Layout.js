import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import { getCurrentUser, logout } from '../../services/auth.service'
import '../../css/Navbar.css'

const Layout = (props) => {
    const [showAdminBoard, setShowAdminBoard] = useState(false)
    const [currentUser, setCurrentUser] = useState(undefined)

    useEffect(() => {
        //grab getCurrentUser from the auth service
        const user = getCurrentUser()

        if (user) {
            //set current user to the currentuser state
            setCurrentUser(user)
            //check if the user.roles has 'ROLE_ADMIN' return either true or false
            setShowAdminBoard(user.roles.includes('ROLE_ADMIN'))
        }
    }, [])

    const logOut = () => {
        logout()
    }
    return (
        <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
                <Link to="/" className="navbar-brand">
                    <strong>Petflix</strong>
                </Link>
                <div className="navbar-nav mr-auto">
                    <li className="nav-item">
                        <Link to="/about" className="navbar-brand">
                            About
                        </Link>
                    </li>
                    {showAdminBoard && (
                        <li className="nav-item">
                            <Link to={"/admin"} className="nav-link">
                                Admin Board
                            </Link>
                        </li>
                    )}
                    {currentUser && (
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Home
                            </Link>
                        </li>
                    )}
        </div>
                {currentUser ? (
                    <div className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to={"/profile"} className="nav-link">
                                {currentUser.username}
                            </Link>
                        </li>
                        <li className="nav-item">
                            <a href="/login" className="nav-link" onClick={logOut}>
                                Log Out
                </a>
                        </li>
                    </div>
                ) : (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <Link to={"/login"} className="nav-link">
                                    Login
                                </Link>
                            </li>
                        </div>
                    )}
            </nav>
            <div className="container mt-3">{props.children}</div>
        </div>
    );
};
export default Layout;