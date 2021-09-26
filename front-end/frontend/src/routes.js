  
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
// import cadastroPessoa from './page/upload/upload';
// import ListaProdutos from './page/listaProdutos/index';
import Login from './pages/login/login'
import ListaUsuarios from './pages/listaUsuarios/listaUsuarios'
import App  from './App';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
               {/* <Route path='/upload' exact={true} component={Uploads} /> */}
               <Route path='/lista-usuarios' exact={true} component={ListaUsuarios} />
               <Route path='/login' exact={true} component={Login} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;