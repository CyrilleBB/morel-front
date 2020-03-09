import React, { PureComponent } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Signup from './user/Signup';
import Signin from './user/Signin';
import Accueil from './main/Accueil';
import Dashboard from './user/UserDashboard';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './main/Shop'
import Panier from './main/Panier'
import Orders from './admin/Orders';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Contact from './main/Contact';
import SearchResults from './main/SearchResults';
import Law from './main/Law';

const Routes = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={Accueil}/>
                    <Route path="/shop" exact component={Shop}/>
                    <Route path="/search" exact component={SearchResults}/>
                    <Route path="/signin" exact component={Signin}/>
                    <Route path="/signup" exact component={Signup}/>
                    <Route path="/contact" exact component={Contact}/>
                    <Route path="/mentionlegales" exact component={Law}/>
                    <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
                    <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
                    <AdminRoute path="/create/category" exact component={AddCategory}/>
                    <AdminRoute path="/create/product" exact component={AddProduct}/>
                    <Route path="/panier" exact component={Panier}/>
                    <AdminRoute path="/admin/orders" exact component={Orders}/>
                    <AdminRoute path="/admin/products" exact component={ManageProducts}/>
                    <AdminRoute path="/admin/product/update/:productId" exact component={UpdateProduct}/>
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default Routes;
