import React, {useState} from 'react';
import {NavLink, Redirect} from 'react-router-dom'
import {signin, authenticate, isAuthenticated} from '../auth';
import Footer from '../main/Footer';
import Menu from '../main/Menu';

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        error: '',
        redirection: false
    });

    const {email, password, error, redirection} = values
    const {user} = isAuthenticated()

    const handleChange = name => event => {
        setValues({...values, error: false, [name]: event.target.value})
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setValues({...values, error: false});
        signin({email, password})
        .then(data => {
            if (data.error) {
                setValues({...values, error: data.error})
            } else {
                authenticate(data, () => {
                    setValues({
                        ...values,
                        redirection: true
                    })
                })
            }
        })
    }

    const redirectUser = () => {
        if (redirection) {
            if ( user && user.role === 1) {
                return <Redirect to="/admin/dashboard"/>
            } else {
                return <Redirect to="/user/dashboard"/>
            }
        }
    }

    return (
        <div>
            <Menu/>
            <div className="rounded p-4 mt-5 d-flex signup flex-column justify-content-between col-md-8 offset-md-2" style={{backgroundColor: 'lightskyblue'}}>
                {(error) ? (<div className="text-danger">{error}</div>) : ''}
                <form>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input onChange={handleChange('email')} type="email" className="form-control" value={email}/>
                    </div>

                    <div className="form-group">
                        <label className="text-muted">Mot de passe</label>
                        <input onChange={handleChange('password')} type="password" className="form-control" value={password}/>
                    </div>
                    <button onClick={handleSubmit} className="btn btn-primary">Se connecter</button>
                </form>
                {redirectUser()}
            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    );
}

export default Signin;
