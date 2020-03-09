import React, {useState, useEffect} from 'react';
import Fiche from './Fiche';
import {getFilteredProducts, getProducts} from './api';
import Footer from './Footer';
import Menu from './Menu';

const Shop = () => {
    const [productsParVentes, setProductsParVentes] = useState([])
    const [error, setError] = useState(false);

    const loadProductsParVentes = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error)
            } else {
                setProductsParVentes(data)
            }
        })
    }

    useEffect(() => {
        loadProductsParVentes()
    }, [])

    return (
        <div>
            <Menu/>
            <div className="image-shop d-flex align-items-center" style={{height: "25vh"}}>
                <h2 className="text-white ml-5 mt-1 font-weight-bold">La boutique</h2>
            </div>
            <div className="row col-12 mt-5  justify-content-center">
                <div className="ml-4 col-10">
                    <h2 className="mb-4">Nos fromages</h2>
                    <hr/>
                    <div className="row">
                        {productsParVentes.map((product, index) => (
                                <div key={index} className="col-md-4 col-sm-12 mb-3">
                                    <Fiche product={product}/>
                                </div>
                        ))}
                    </div>
                    <hr/>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default Shop;
