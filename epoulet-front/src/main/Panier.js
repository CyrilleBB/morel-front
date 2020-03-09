import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Fiche from './Fiche';
import Footer from './Footer';
import Menu from './Menu';

const Panier = () => {
  const [items, setItems] = useState([]);
  // const [panierSize, setCartSize] = useState([]);
  const [run, setRun] = useState(false);

  const getPanier = () => {
      if (localStorage.getItem('panier')) {
          console.log('localstorage', localStorage)
          return JSON.parse(localStorage.getItem('panier'))
      }
      return [];
  }

  useEffect(() => {
    setItems(getPanier());
  }, [run]);

  const totalPrice = items => {
    return items.reduce((accumulator, item) => { return accumulator + item.count * item.price}, 0)
  }

  const showItems = items => {
    return (
      <div className="ml-5">
        <h2>Votre panier</h2>
        <hr />
          <div className="row">
              {items.map((product, i) => (
                <div className="col-md-4 col-xs-12">
                  <Fiche
                  key={i}
                  product={product}
                  showAddToPanierButton={false}
                  panierUpdate={true}
                  showRemoveProductButton={true}
                  setRun={setRun}
                  run={run}
                  // changeCartSize={changeCartSize}
                />
                </div>
              ))}
          </div>
      </div>
    );
  };

  const noItems = () => (
    <div className="text-center">
      <h5 >
        Votre panier ne contient aucun article :(
      </h5>
      <Link className="mt-2" to="/shop"> Retourner sur la boutique </Link>
    </div>
  );

  return (
    <div className="d-flex flex-column" style={{height: "100vh"}}>
      <Menu/>
      <div className="row mt-5 justify-content-around">
        <div className="col-8">{items.length > 0 ? showItems(items) : noItems()}</div>

        {items.length > 0 &&
          <div className="col-md-3 col-xs-12  d-flex flex-column">
            <div className="border p-4">
              <div className="font-weight-bold">Sous-total ({`${items.length}`}): <span className="text-danger ml-2">{totalPrice(items)} €</span></div>
              <button className="mt-3 btn btn-primary">Passer la commande</button>
            </div>
          </div>
        }
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default Panier;
