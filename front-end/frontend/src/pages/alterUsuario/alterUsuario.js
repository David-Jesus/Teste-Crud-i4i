import  {React, props, UseState, UseEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import api from "../service/api";
import { useParams } from "react-router";
import Button from "@material-ui/core/Button";
import {
  Redirect,
} from "react-router-dom";
import { AxiosResponse, AxiosError } from "axios";

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const UseStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');
console.log(id);

export default function alteraUsuario() {


  const classes = UseStyles();
  const [usuario, setUsuario] = UseState({});
  const [status_valid, setStatus] = UseState(0);
  const [redirect, setState] = UseState(false);
  const token = window.sessionStorage.getItem("token");
  const config = {
    headers: {
      "x-access-token": token,
    },
  };

  // async function handleDeleteUsuarios(idusuario) {
  async function handleDeleteUsuario(id) {
    try {
      const del = await api.delete(`usuario/${id}`, config);

      if ((await del).status === 200) {
        alert("Cadastro excluído com sucesso!");
        setUsuario(usuario.filter((usuario) => usuario.id !== id));
      }
      if ((await del).status === 401) {
        alert("Necessário realizar o login novamente!");
        setState({ redirect: true });
      }
    } catch (AxiosError) {
      if (AxiosError.response.status === 401) {
        alert("sua sessão expirou, necessário realizar o login novamente!");
        setState({ redirect: true });
      }
    }
  }

  UseEffect(() => {
    api.get(`usuario/${id}`, config).then((response) => {
      setUsuario(response.data);
    });
  }, []);

  if (redirect) {
    return <Redirect to="login" />;
  }
  return (
    <div id="lista_cliente">
      <div id="lista-cliente-header">
        <Button
          variant="contained"
          color="secondary"
          type="button"
          onClick={() => handleDeleteUsuario()}
        >
          Deletar
        </Button>
      </div>

      <TableContainer component={Paper} id="tabela">
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Código Usuário</StyledTableCell>
              <StyledTableCell align="center">Códido da Pessoa</StyledTableCell>
              <StyledTableCell align="center">EMAIL</StyledTableCell>
              <StyledTableCell align="center">Data de Criação</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usuario.map((usuario) => (
              <StyledTableRow key={usuario.id} align="center">
                <StyledTableCell component="th" scope="row" align="center">
                  {usuario.id}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {usuario.id_pessoa}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {usuario.email}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {usuario.data_criacao}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    type="button"
                    onClick={() => handleDeleteUsuario(usuario.id)}
                  >
                    Alter
                  </Button>
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Button
                    variant="contained"
                    color="secondary"
                    type="button"
                    onClick={() => handleDeleteUsuario(usuario.id)}
                  >
                    Deletar
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
