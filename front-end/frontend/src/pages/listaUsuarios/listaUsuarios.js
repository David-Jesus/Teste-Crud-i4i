import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import api from '../service/api';
import Button from '@material-ui/core/Button';
import { Route, useHistory, Switch, Redirect } from "react-router-dom";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ListaUsuarios() {
  const classes = useStyles();
  const [usuarios, setUsuarios] = useState([]);
  const [status_valid, setStatus] = useState(0);
  const [redirect, setState] = useState(false);
  const token = window.sessionStorage.getItem('token');
  const config = {
    headers: {
      'x-access-token': token
    }
  }

  async function handleDeleteUsuarios(idusuario) {
    try {
      await api.delete(`usuario/${idusuario}`, {});
      setUsuarios(usuarios.filter(usuario => usuario.idusuario !== idusuario));
    } catch (error) {
      alert('Erro ao deletar cliente');
    }
  }

  useEffect(() => {
 
    api.get('usuarios', config).then(response => {
      setUsuarios(response.data);       
    });
  }, []);

  if (redirect) {
    return <Redirect to='login' />;
  }
  return ( 
    <div id="lista_cliente">
      <Button variant="contained" color="secondary" type="button" onClick={() => handleDeleteUsuarios()}>Deletar</Button>                                  

      <TableContainer component={Paper} id="tabela">
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center" >Código Usuário</StyledTableCell >
              <StyledTableCell align="center">Códido do Pessoa</StyledTableCell >
              <StyledTableCell align="center">EMAIL</StyledTableCell >
              <StyledTableCell align="center">Data de Criação</StyledTableCell >
              <StyledTableCell align="center"></StyledTableCell >
              <StyledTableCell align="center"></StyledTableCell >
            </TableRow>
          </TableHead>
          <TableBody>
            {usuarios.map(usuario => (
              <StyledTableRow key={usuario.id} align="center">
                <StyledTableCell component="th" scope="row" align="center">
                  {usuario.id}
                </StyledTableCell>
                <StyledTableCell align="center">{usuario.id_pessoa}</StyledTableCell >
                <StyledTableCell align="center">{usuario.email}</StyledTableCell >
                <StyledTableCell align="center">{usuario.data_criacao}</StyledTableCell >
                <StyledTableCell align="center">
                  <Button variant="contained" color="secondary" type="button" onClick={() => handleDeleteUsuarios(usuario.idusuario)}>Alter</Button>                  
                  </StyledTableCell >   
                  <StyledTableCell align="center">
                  <Button variant="contained" color="secondary" type="button" onClick={() => handleDeleteUsuarios(usuario.idusuario)}>Deletar</Button>                  
                  </StyledTableCell >
              </StyledTableRow >
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}