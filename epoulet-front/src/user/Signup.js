import React, {useState} from 'react';
import {NavLink} from 'react-router-dom'
import {signup} from '../auth';
import Footer from '../main/Footer';
import Menu from '../main/Menu';

const Signup = () => {
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: '',
        success: false
    });

    const {name, email, password, success, error} = values

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false});
        signup({name, email, password})
        .then(data => {
            if (data.error) {
                setValues({...values, error: data.error, success: false})
            } else {
                setValues({
                    ...values,
                    name: '',
                    email: '',
                    password: '',
                    error: '',
                    success: true
                })
            }
        })
    }

    return (
        <div>
            <Menu/>
            <div className="rounded p-4 mt-5 d-flex signup flex-column container col-md-8 offset-md-2" style={{backgroundColor: 'lightskyblue'}}>
                {(success) ? (
                    <div className="text-info">
                        Nouveau compte créé.
                        <NavLink to="/signin">Connectez-vous</NavLink>
                    </div>
                    ) : (
                    (error) ? (
                        <div className="text-danger">
                            {error}
                        </div>
                    ) : '')
                }
                <form>
                    <div className="form-group">
                        <label className="text-muted">Nom</label>
                        <input onChange={handleChange('name')} type="text" className="form-control" value={name}/>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
                    </div>
                    <button onClick={handleSubmit} className="btn btn-primary">S'inscrire</button>
                </form>
            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    );
}

export default Signup;
