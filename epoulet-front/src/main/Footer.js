import React from 'react';
import {FaFacebook} from 'react-icons/fa'
import { NavLink } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-dark mt-5 text-white">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h6 className="mt-2">Liens Utiles</h6>
                        <ul className="list-unstyled d-flex">
                            <li className="mr-3">
                                <NavLink to="/contact">
                                    Contactez-nous
                                </NavLink>
                            </li>
                            <li className="mr-3">
                                <NavLink to="/mentionlegales">
                                    Mentions légales
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
                <hr/>
            </div>
            <div className="container">
                <div className="row">
                <div className="col-md-8 col-sm-6 col-xs-12">
                    <p className="copyright-text">Copyright &copy; FROMAGERIE MOREL 2020 - Tous droits réservés.
                    </p>
                </div>

                <div className="col-md-4 col-sm-6 col-xs-12">
                    <ul className="list-unstyled">
                    <li>
                        <a href="https://fr-fr.facebook.com/pages/category/Company/Fromagerie-Morel-131767606851420/">
                            <FaFacebook/>
                        </a>
                    </li>
                    </ul>
                </div>
                </div>
            </div>

        </footer>
    )
}

export default Footer;
