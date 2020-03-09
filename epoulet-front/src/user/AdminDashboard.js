import React, { PureComponent } from 'react';
import {isAuthenticated} from '../auth';
import AdminLinks from './AdminLinks';
import Menu from '../main/Menu';

const AdminDashboard = () => {
    const {user: {_id, name, email, role}} = isAuthenticated()

    return (
        <div>
            <Menu/>
            <div className="row mt-5">
                <div className="col-3">
                    <AdminLinks />
                </div>
                <div className="col-9">
                    <div className="col-md-7 offset-md-2">
                        <div>
                            <h5>Votre compte</h5>
                            <ul className="list-unstyled mt-4 mb-5">
                                <li className=""><span className="font-weight-bold">Nom d'utilisateur:</span>  {name}</li>
                                <li className=""><span className="font-weight-bold">Email:</span>  {email}</li>
                                <li className=""><span className="font-weight-bold">Role:</span>  Administrateur</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
}

export default AdminDashboard;
