import React, { PureComponent } from 'react';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import Menu from '../main/Menu';

const Dashboard = () => {
    const {user: {_id, name, email, role}} = isAuthenticated()

    return (
        <div>
            <Menu/>
            <div className="row justify-content-center">
                <div className="ml-3 col-9">
                    <div className="mb-5 mt-5">
                        <h5>Votre compte</h5>
                        <ul className="list-unstyled mt-4 mb-5">
                            <li className=""><span className="font-weight-bold">Nom d'utilisateur:</span>  {name}</li>
                            <li className=""><span className="font-weight-bold">Email:</span>  {email}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default Dashboard;
