  
import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/login/login';
import ListaUsuarios from './pages/listaUsuarios/listaUsuarios';
import ListaPessoas from './pages/listaPessoas/listaPessoa';
// import ListaPessoas from './pages/listaPessoas/listaPessoa';
import CadastroUsuario from './pages/cadastroUsuario/cadastroUsuario';
import CadastroPessoa from './pages/cadastroPessoa/cadastroPessoa';
// import PersistentDrawerLeft from '../src/components/sidebar/Drawer';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
               <Route path='/lista-usuarios' exact={true} component={ListaUsuarios} />
               <Route path='/lista-pessoas' exact={true} component={ListaPessoas} />
               <Route path='/cadastro-usuario' exact={true} component={CadastroUsuario} />
               <Route path='/cadastro-pessoa' exact={true} component={CadastroPessoa} />
               {/* <Route path='/navbar' exact={true} component={PersistentDrawerLeft} /> */}
               <Route path='/login' exact={true} component={Login} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;