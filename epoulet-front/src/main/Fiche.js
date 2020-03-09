import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import {API} from '../config';
import { FaPlus } from 'react-icons/fa'
import {FiShoppingCart} from 'react-icons/fi'
import { AiOutlineStop } from 'react-icons/ai'

const Fiche = ({product, showViewProductButton = true, showAddToPanierButton = true, panierUpdate = false, showRemoveProductButton = false, setRun = f => f, run = undefined}) => {
    const [count, setCount] = useState(product.count);


    const addToPanier = () => {
        let panier = []
        if (localStorage.getItem('panier')) {
            panier = JSON.parse(localStorage.getItem('panier'))
        }
        panier.push({
            ...product,
            count: 1
        })

        panier = Array.from(new Set(panier.map((p) => (p._id)))).map(id => {
            return panier.find(p => p._id === id)
        });

        localStorage.setItem('panier', JSON.stringify(panier))

        setRun(true)
    }
    // const addToPanier = () => {
    //     addItem(product)
    // }

    const showAddToPanier = (showAddToPanierButton) => {
        if (product.quantity <= 0) {
          return (
            <div data-toggle="tooltip" data-placement="top" title="Plus disponible">
              <AiOutlineStop size={28} className="disabled text-secondary"/>
            </div>
          )
        }
        return (
            showAddToPanierButton && (
              <div className="text-white panier" data-toggle="tooltip" data-placement="top" title="Ajouter au panier" onClick={addToPanier} >
                <FiShoppingCart size={28}/>
              </div>
            )
        )
    }

    const removeItem = (productId) => {
      let panier = []
      if (localStorage.getItem('panier')) {
          panier = JSON.parse(localStorage.getItem('panier'))
      }
      panier.map((product, i) => {
        console.log('product', product)
          if (product._id === productId) {
              panier.splice(i, 1)
          }
      })

      localStorage.setItem('panier', JSON.stringify(panier))
      return panier
    }

    const showRemoveButton = showRemoveProductButton => {
        return (
          showRemoveProductButton && (
            <span
              onClick={() => {
                removeItem(product._id);
                setRun(!run); // run useEffect in parent Panier
              }}
              className="text text-danger removeProduct mt-2 mb-2"
            >
              Retirer produit
            </span>
          )
        );
      };

    const updateItem = (productId, count) => {
      let panier = []
          if (localStorage.getItem('panier')) {
              panier = JSON.parse(localStorage.getItem('panier'))
          }
          panier.map((product, i) => {
              if (product._id === productId) {
                  panier[i].count = count
              }
          })

          localStorage.setItem('panier', JSON.stringify(panier))
    }

    const handleChange = productId => event => {
        setRun(!run); // run useEffect in parent Panier
        setCount(event.target.value < 1 ? 1 : event.target.value);
        if (event.target.value >= 1) {
          updateItem(productId, event.target.value);
        }
      };

    const showPanierUpdate = panierUpdate => {
        return (
          panierUpdate && (
            <div>
              <div className="mb-3">
                <label for="quantity" className="-text">Quantité</label>
                <input type="number" id="quantity" className="col-4 ml-2" value={count} onChange={handleChange(product._id)} />
              </div>
            </div>
          )
        );
      };

    return (
            <div className="">
              <div className=" d-flex flex-column">
                <div>
                  <div style={{height: '27vh', overflow: 'hidden', position: 'relative'}}>
                    <div className="mr-1" style={{position: 'absolute', top: '0.5rem', right: '0.5rem'}}>
                      {showAddToPanier(showAddToPanierButton)}
                    </div>
                    <img src={`${API}/product/image/${product._id}`} alt={product.name} style={{width: '100%'}}/>
                  </div>
                  <div className="mt-2 font-weight-bold">{product.name}</div>
                  <div >{product.price}€</div>
                  <div className="text-muted">Catégorie: {product.category && product.category.name}</div>
                </div>
                <br/>
                {showRemoveButton(showRemoveProductButton)}
                {showPanierUpdate(panierUpdate)}
              </div>
            </div>
    )
}

export default Fiche


