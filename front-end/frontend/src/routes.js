  
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import cadastroPessoa from './page/upload/upload';
import ListaProdutos from './page/listaProdutos/index'
import App  from './App';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
               {/* <Route path='/upload' exact={true} component={Uploads} /> */}
               <Route path='/upload' exact={true} component={App} />
               <Route path='/lista-produtos' exact={true} component={ListaProdutos} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;