import React, { useState, useEffect } from 'react';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import {getProducts, deleteProduct} from './apiAdmin'
import AdminLinks from '../user/AdminLinks';
import {FaPlusCircle} from 'react-icons/fa'
import {FaTrash} from 'react-icons/fa'
import {MdSettings} from 'react-icons/md'
import Menu from '../main/Menu';

const ManageProducts = () => {
    const [products, setProducts] = useState([])

    const {user, token} = isAuthenticated()

    const loadProducts = () => {
        getProducts().then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                setProducts(data)
            }
        })
    }

    const destroy = productId => {
        deleteProduct(productId, user._id, token).then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                loadProducts()
            }
        })
    }

    useEffect(() => {
        loadProducts()
    }, [])

    return (
        <div>
            <Menu/>
            <div className="row mt-5">
                    <div className="col-3">
                        <AdminLinks />
                    </div>
                    <div className="col-8 mr-1">
                        <h4 className="text-center">
                            {products.length} produits
                        </h4>
                        <Link to={`/create/product`}>
                            <FaPlusCircle />
                            <span className="ml-2">Créer un produit</span>
                        </Link>
                        <table className="mt-3 table table-striped">
                            <tbody>
                                {products.map((p, i) => (
                                    <tr key={i} className="d-flex justify-content-between p-2">
                                        <div className="d-flex align-items-center">
                                            <span className="mr-auto">
                                                {p.name}
                                            </span>
                                        </div>
                                        <div className="d-flex p-2">
                                            <div className={`mr-2 p-2 badge badge-pill ${p.quantity ? "badge-primary" : "badge-danger"}`} style={{alignSelf: 'flex-start'}}>{p.quantity} en stock</div>
                                            <Link className="mr-3" to={`/admin/product/update/${p._id}`}>
                                                <div style={{color: 'LightSkyBlue'}} data-toggle="tooltip" data-placement="top" title="Mettre à jour">
                                                    <MdSettings/>
                                                </div>
                                            </Link>
                                            <Link onClick={() => destroy(p._id)}>
                                                <div style={{color: 'LightCoral'}} data-toggle="tooltip" data-placement="top" title="Supprimer">
                                                    <FaTrash/>
                                                </div>
                                            </Link>
                                        </div>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
            </div>
        </div>
    );
}

export default ManageProducts;
