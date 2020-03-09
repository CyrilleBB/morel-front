import React, {Fragment, useEffect} from 'react';
import {NavLink, Link} from 'react-router-dom';
import {signout, isAuthenticated} from '../auth';
import Search from './Search'
import logo from '../assets/logoMorel4.png'
import {FiShoppingCart} from 'react-icons/fi'

const itemTotal = () => {
    if (localStorage.getItem('panier')) {
        return JSON.parse(localStorage.getItem('panier')).length
    }
    return 0;
}

const Menu = () => {
    // useEffect(() => {
    //     if (localStorage.getItem('panier')) {
    //         return JSON.parse(localStorage.getItem('panier')).length
    //     }
    // }, 0)
    return (
        <div >
            <div className="d-flex row justify-content-between">
                <div className="col-xs-12 col-md-3">
                    <img className="image-width" src={logo}/>
                </div>
                <div className="search-flex-order col-xs-12 col-md-5">
                    <Search />
                </div>
                <ul className="nav d-flex flex-nowrap align-items-center col-xs-12  col-md-4">

                    {!isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signin">
                                    Se connecter
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signup">
                                    S'inscrire
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/panier">
                                    <FiShoppingCart /> <sup><small>{itemTotal()}</small></sup> Panier
                                </NavLink>
                            </li>
                        </Fragment>
                    )}

                    {isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item">
                                    <span onClick={() => signout(() => {
                                        localStorage.clear()
                                    })}>
                                        <NavLink className="nav-link" to="/">
                                            Se déconnecter
                                        </NavLink>
                                    </span>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/panier">
                                    <FiShoppingCart /> <sup><small>{itemTotal()}</small></sup> Panier
                                </NavLink>
                            </li>
                        </Fragment>
                    )}
                </ul>
            </div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-center">
                <div className="">
                    <ul className="nav">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">
                                Accueil
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/shop">
                                Boutique
                            </NavLink>
                        </li>

                        {isAuthenticated() && isAuthenticated().user.role === 0 && (
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/user/dashboard">
                                Compte
                            </NavLink>
                            </li>
                        )}

                        {isAuthenticated() && isAuthenticated().user.role === 1 && (
                            <li className="nav-item">
                            <NavLink className="nav-link" to="/admin/dashboard">
                                Compte
                            </NavLink>
                            </li>
                        )}
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/contact">
                                Contact
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

    )
}
export default Menu;
