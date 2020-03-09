import React, { useState } from 'react';
import {isAuthenticated} from '../auth';
import {createCategory} from './apiAdmin';
import AdminLinks from '../user/AdminLinks';
import Menu from '../main/Menu';

const AddCategory = () => {
    const [name, setName] = useState('')
    const [error, setError] = useState(false)
    const [success, setSuccess] = useState(false)

    const {user, token} = isAuthenticated();

    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);
        createCategory(user._id, token, {name})
        .then(data => {
            if (data.error) {
                setError(true)
            } else {
                setError('')
                setSuccess(true);
            }
        })
    }

    const newCategoryForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>
                    Nom
                </label>
                <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required/>
            </div>
            <button className="btn btn-outline-primary">
                Créer catégorie
            </button>
        </form>
    )

    const showSuccess = () => {
        if (success) {
            return (
                <h3 className="text-success">
                    {name} a été créé
                </h3>
            )
        }
    }

    const showError = () => {
        if (error) {
            return (
                <h3 className="text-danger">
                    La catégorie {name} existe déjà
                </h3>
            )
        }
    }

    return (
        <div>
            <Menu/>
            <div className="row mt-5">
                <div className="col-3">
                        <AdminLinks />
                </div>
                <div className="col-9">
                    <h4 className="text-center">Ajouter une nouvelle catégorie</h4>
                    <div className="row">
                        <div className="col-md-8 offset-md-2">
                            {showSuccess()}
                            {showError()}
                            {newCategoryForm()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default AddCategory;
