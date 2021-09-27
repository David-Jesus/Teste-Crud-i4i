  
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/login/login';
import ListaUsuarios from './pages/listaUsuarios/listaUsuarios';
import CadastroUsuario from './pages/cadastroUsuario/cadastroUsuario';
import CadastroPessoa from './pages/cadastroPessoa/cadastroPessoa';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
               {/* <Route path='/upload' exact={true} component={Uploads} /> */}
               <Route path='/lista-usuarios' exact={true} component={ListaUsuarios} />
               <Route path='/cadastro-usuario' exact={true} component={CadastroUsuario} />
               <Route path='/cadastro-pessoa' exact={true} component={CadastroPessoa} />
               <Route path='/login' exact={true} component={Login} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;