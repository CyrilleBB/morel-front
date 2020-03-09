import React from 'react'
import { Link } from 'react-router-dom'

const AdminLinks = () => {
    return (
        <ul className="ml-4 sidebar-nav list-unstyled d-flex flex-column align-items-center">
            <li className="nav-item">
                <Link className="nav-link" to="/create/category">
                    Créér catégories
                </Link>
            </li>
            <hr className="bg-primary w-75"/>
            <li className="nav-item">
                <Link className="nav-link" to="/create/product">
                    Créer un produit
                </Link>
            </li>
            <hr className="bg-primary w-75"/>

            <li className="nav-item">
                <Link className="nav-link" to="/admin/orders">
                    Commandes
                </Link>
            </li>
            <hr className="bg-primary w-75"/>
            <li className="nav-item">
                <Link className="nav-link" to="/admin/products">
                    Mes produits
                </Link>
            </li>
        </ul>
    )
}

export default AdminLinks
