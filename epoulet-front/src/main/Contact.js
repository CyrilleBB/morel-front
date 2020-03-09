import React, {useState} from 'react'
import { API } from '../config';
import Menu from './Menu';

const Contact = () => {

    const [mail, setMail] = useState({success: false, error: false})

    const {success, error} = mail;

    const sendMail = (data) => {
        console.log('data', data, 'api', `${API}`)
        return fetch(`${API}/mail`, {
            method: 'POST',
            headers: {
                Accept: 'Application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err)
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //TODO quand marche le refaire comme dans Signup
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const tel = document.getElementById('tel').value;
        const obj = document.getElementById('obj').value;
        const message = document.getElementById('message').value;
        const data = {name, email, tel, obj, message}
        sendMail(data)
        .then(data => {
            if (data.error) {
                //TODO changer l'alert par une ligne de texte sur le site
                alert('Echec de l\'envoie du message');
                setMail({error: true})
            } else {
                alert('Message envoyé.')
                setMail({success: true})
                document.getElementById('contact-form').reset();
            }
        })

    }
    return (
        <div>
            <Menu/>
            <div className="d-flex flex-column mt-5 mb-3">
                <h5 className="text-center mb-5">Contactez-nous</h5>
                <div className="rounded p-4 container col-md-8 offset-md-2" style={{backgroundColor: 'lightskyblue'}}>
                    <form id="contact-form" onSubmit={handleSubmit} method="POST">
                        <div className="form-group">
                            <label htmlFor="name">Nom</label>
                            <input className="form-control" type="text" id="name" required/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="mail">
                                    Email
                            </label>
                            <input className="form-control" type="email" name="" id="email" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">
                                    Téléphone
                            </label>
                            <input className="form-control" type="number" name="" id="tel" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">
                                    Objet
                            </label>
                            <input className="form-control" type="text" name="" id="obj" required/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="">
                                    Message
                            </label>
                            <textarea className="form-control" name="" id="message" cols="30" rows="10" required></textarea>
                        </div>
                        <div className="d-flex">

                            <button className="mt-3 btn btn-primary" type="submit">Envoyer</button>
                            {(success) ?
                                (
                                <div className="mt-4 ml-3 text-success">
                                    Message envoyé avec succès!
                                </div>
                                ) : (
                                (error) ? (
                                    <div className="mt-4 ml-3 text-danger">
                                        Le message n'a pas pu être envoyé. Réesayez s'il vous plaît.
                                    </div>
                                ) : '')
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}


export default Contact
