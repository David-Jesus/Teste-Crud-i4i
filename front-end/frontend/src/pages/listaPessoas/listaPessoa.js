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

export default function ListaPessoas() {
  const classes = useStyles();
  const [pessoas, setPessoas] = useState([]);
  const [redirect, setState] = useState(false);
  const token = window.sessionStorage.getItem('token');
  const config = {
    headers: {
      'x-access-token': token
    }
  }


  async function handleDeletePessoa(idpessoa) {
     alert(idpessoa)
    try {
      const del = await api.delete(`pessoa/${idpessoa}`, config);

      if((await del).status === 200){
        alert("Cadastro excluído com sucesso!")
         setPessoas(pessoas.filter(pessoa => pessoa.id !== idpessoa));
      }
      if((await del).status === 401){
        alert("Necessário realizar o login novamente!")
        setState({ redirect: true });
      }
      else {
        alert("Erro ao excluir cadastro!");
      }
     
    } catch (AxiosError) {
      if(AxiosError.response.status === 401){
        alert("sua sessão expirou, necessário realizar o login novamente!")
        setState({ redirect: true });
      }
    }
  }

  useEffect(() => {
    api.get('pessoas', config).then(response => {
      setPessoas(response.data);
    });
  }, []);
  if (redirect) {
    return <Redirect to='login' />;
  }

  return (
    <div id="lista_pessoa">
      <TableContainer component={Paper} id="tabela">
        <Table className={classes.table} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Código Pessoa</StyledTableCell >
              <StyledTableCell align="center">Nome</StyledTableCell >
              <StyledTableCell align="center">CPF</StyledTableCell >
              <StyledTableCell align="center">Telefone</StyledTableCell >
              <StyledTableCell align="center">Cargo</StyledTableCell >
              <StyledTableCell align="center">Idade</StyledTableCell >
              <StyledTableCell align="center"></StyledTableCell >
            </TableRow>
          </TableHead>
          <TableBody>
            {pessoas.map(pessoa => (
              <StyledTableRow key={pessoa.id}>
                <StyledTableCell component="th" scope="row" align="center">
                  {pessoa.id}
                </StyledTableCell>
                <StyledTableCell align="center">{pessoa.nome}</StyledTableCell >
                <StyledTableCell align="center">{pessoa.cpf}</StyledTableCell >
                <StyledTableCell align="center">{pessoa.telefone}</StyledTableCell >
                <StyledTableCell align="center">{pessoa.cargo}</StyledTableCell >
                <StyledTableCell align="center">{pessoa.idade}</StyledTableCell >
                <StyledTableCell align="center">
                  <Button variant="contained" color="secondary" type="button" onClick={() => handleDeletePessoa(pessoa.id)}>Deletar</Button></StyledTableCell >
              </StyledTableRow >
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}