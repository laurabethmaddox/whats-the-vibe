import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/sadSongs">Sad n' Slow</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/happySongs">Happy</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/favorites">Favorites</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="#"
                    onClick={
                        () => {
                            localStorage.removeItem("vibes_user")
                        }
                    }>
                    Logout
                </Link>
            </li>
        </ul>
    )
}