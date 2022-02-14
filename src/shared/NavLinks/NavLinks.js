import { useContext } from "react";
import { NavLink } from "react-router-dom";
import './NavLinks.css';
import { AuthContext } from "../context/auth-context";
import { Button } from "react-bootstrap";

const NavLinks = props => {

    const auth = useContext(AuthContext);

    let nav;
    if (auth.isLoggedIn) {
        nav = (
            <ul style={{marginBottom:"0.5rem"}}>
                <li>
                    <NavLink to='/' onClick={props.onClick} className={isActive => isActive.isActive ? "active" : ""} >Foods</NavLink>
                </li>
               

                <li>
                   <Button variant="light" style={props.style} onClick={()=>{auth.logout();props.onClick()}}>Logout</Button>
                </li>
            </ul>
        );
    }
    else {
        nav = (
            <ul style={{marginBottom:"0.5rem"}}>
                <li>
                    <NavLink to='/login' onClick={props.onClick} className={isActive => isActive.isActive ? "active" : ""} >Login</NavLink>
                </li>
                <li>
                    <NavLink to='/signup' onClick={props.onClick} className={isActive => isActive.isActive ? "active" : ""} >Signup</NavLink>
                </li>
            </ul>
        )
    }

    return (
        <nav className={props.navClass}>
            {nav}
        </nav>
    );
}

export default NavLinks;