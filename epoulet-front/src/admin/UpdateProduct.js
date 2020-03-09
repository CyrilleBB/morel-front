import React, { useState, useEffect } from 'react';
import {isAuthenticated} from '../auth';
import {Link, Redirect} from 'react-router-dom';
import {getProduct, getCategories, updateProduct} from './apiAdmin';
import AdminLinks from '../user/AdminLinks';
import Menu from '../main/Menu';

const UpdateProduct = ({match}) => {
    const [values, setValues] = useState({
        name: '',
        price: '',
        categories: [],
        category: '',
        quantity: '',
        image: '',
        error: '',
        createdProduct: '',
        formData: ''
    });

    const {user, token} = isAuthenticated();
    const {
        name,
        price,
        categories,
        category,
        quantity,
        image,
        error,
        createdProduct,
        formData
    } = values;

    const init = (productId) => {
        getProduct(productId).then(data => {
            if (data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    category: data.category._id,
                    quantity: data.quantity,
                    formData: new FormData()
                })
                initCategories()
            }
        })
    }

    const initCategories = () => {
        getCategories().then(data => {
            if (data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({categories: data, formData: new FormData()})
            }
        })
    }

    useEffect(() => {
        init(match.params.productId);
    }, []);

    const handleChange = name => event => {
        const value = name === 'image' ? event.target.files[0] : event.target.value
        formData.set(name, value)
        setValues({...values, [name]: value})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: ''})

        updateProduct(match.params.productId, user._id, token, formData)
        .then(data => {
            if (data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values,
                    name: '',
                    image: '',
                    price: '',
                    quantity: '',
                    createdProduct: data.name
                })
            }
        })
    }

    return (
        <div>
            <Menu/>
            <div className="row mt-5">
                <div className="col-3">
                    <AdminLinks/>
                </div>
                <div className="col-9">
                    <div className="col-md-8 offset-md-2">
                        <form className="mb-3" onSubmit={handleSubmit}>
                            <h4 className="text-center">Mettre à jour le produit</h4>


                            {
                                (createdProduct) ? (
                                <div className="mt-2 text-success">
                                    <h5>Le produit '{`${createdProduct}`}' a été mis à jour.</h5>
                                </div>
                                ) : (
                                (error) ? (
                                    <div className="text-danger">
                                        {error}
                                    </div>
                                ) : '')
                            }

                            <div className="form-group mt-5">
                            <label for="image" className="btn btn-secondary">Sélectionner une image</label>
                                <input style={{display: 'none'}} type="file" name="image" id="image" accept="image/*" onChange={handleChange('image')}/>
                            </div>

                            <div className="form-group">
                                <label className="text-muted">Nom</label>
                                <input type="text" value={name} className="form-control" onChange={handleChange('name')}/>
                            </div>

                            <div className="form-group">
                                <label className="text-muted">Prix</label>
                                <input type="number" value={price} className="form-control" onChange={handleChange('price')}/>
                            </div>

                            <div className="form-group">
                                <label className="text-muted">categorie</label>
                                <select className="form-control" onChange={handleChange('category')}>
                                    <option>Selectionnez svp</option>
                                    {categories && categories.map((category, index) => (
                                        <option key={index} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label className="text-muted">Quantité</label>
                                <input type="number" value={quantity} className="form-control" onChange={handleChange('quantity')}/>
                            </div>

                            <button className="btn btn-outline-primary">Mettre à jour produit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default UpdateProduct
