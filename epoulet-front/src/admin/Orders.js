import React, { useState, useEffect } from 'react';
import AdminLinks from '../user/AdminLinks';
import Menu from '../main/Menu';

const Orders = () => {
    return (
        <div>
            <Menu/>
            <div className="row mt-5">
                <div className="col-3">
                    <AdminLinks/>
                </div>
                <div className="col-9">
                    <h2 className="text-danger text-center">Pas de commande</h2>
                </div>
            </div>
        </div>
      );
}

export default Orders
