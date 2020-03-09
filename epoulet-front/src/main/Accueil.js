import React, {useState, useEffect} from 'react';
import {getProducts} from './api';
import Fiche from './Fiche';
import Footer from './Footer';
import fromagerie from '../assets/ferme-sav.jpg'
import { NavLink } from 'react-router-dom';
import Menu from './Menu';

const Accueil = () => {
    const [productParVentes, setproductParVentes] = useState([])
    const [productsParDate, setProductsParDate] = useState([])
    const [error, setError] = useState(false)

    const loadProductsParVentes = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setproductParVentes(data)
            }
        })
    }

    const loadProductsParDate = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsParDate(data)
            }
        })
    }

    useEffect(() => {
        loadProductsParDate()
        loadProductsParVentes()
    }, [])

    return (
        <div>
            <Menu/>
            <div className="image-accueil d-flex align-items-center" style={{height: "60vh", overflow: "hidden"}}>
                <div className="w-100 d-flex flex-column">
                    <div>
                        <h1 className="text-white text-center font-weight-bold">Découvrez la Tomme de notre ferme</h1>
                        <h6 className="text-white text-center">(Approuvée par Xavier Dolan)</h6>
                    </div>
                    <div className="d-flex justify-content-center">
                        <NavLink className="nav-link" to={'/shop'}>
                                <button className="mt-4 btn btn-primary font-weight-bold">
                                        La boutique
                                </button>
                        </NavLink>
                    </div>
                </div>
            </div>
            <h2 className="mt-5 mb-4 text-center">Nouveaux produits</h2>
            <div className="row col-12 justify-content-center">
                <div className="row col-10">
                    {productsParDate.filter((i, index) => index < 3).map((product, index) => (
                        <div key={index} className="col-md-4 col-sm-10 mb-3">
                            <Fiche product={product}/>
                        </div>
                    ))}
                </div>
            </div>

            <h2 className="mb-4 text-center">Meilleures ventes</h2>
            <div className="mb-4 row col-12 justify-content-center">
                <div className="row col-10">
                    {productParVentes.filter((i, index) => index < 3).map((product, index) => (
                    <div key={index} className="col-md-4 col-sm-12 mb-3">
                            <Fiche product={product}/>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-light p-2 m-3">
                <div className="m-1 row mt-3 mb-2 pb-2 justify-content-center">
                    <h3 className="text-success col-10 text-center mb-4">La Ferme Morel</h3>
                    <div className="col-sm-12 col-md-5">
                        <div>
                            <h5 className="">Nous vous accueillons dans notre ferme</h5>
                            <div>
                                <div>Lundi au Vendredi de 09h00 à 19h00</div>
                                <div>Samedi de 10h00 à 17h00</div>
                            </div>
                            <div>
                                <div>48 Route de Grande-Rive</div>
                                <div>74500 Neuvecelle</div>
                                <div>Téléphone: 04 50 23 56 89</div>
                                <div>Mail: monsieurmorel@gmail.com</div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h5>Retrouvez-nous sur les marchés de la région</h5>
                                <ul className="list-unstyled">
                                    <li>_ Neuvecelle le lundi matin</li>
                                    <li>_ Thonon le mercredi matin et samedi matin</li>
                                    <li>_ Evian le jeudi matin</li>
                                </ul>
                        </div>
                    </div>
                    <img className="col-md-5 col-sm-11" src={fromagerie} style={{overflow: 'hidden'}} alt="Fromagerie Morel"/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Accueil;
