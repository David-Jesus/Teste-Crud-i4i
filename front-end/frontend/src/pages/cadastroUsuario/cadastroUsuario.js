import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import api from '../service/api';
import Button from '@material-ui/core/Button';
import '../cadastroUsuario/index.css';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    button: {
      margin: theme.spacing(1),
    },
  },
}));

export default function CadastroUsuario() {

  const [id_pessoa, setId] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  // const [data_criacao, setData] = useState(new Date().toISOString());
  const token = window.sessionStorage.getItem('token');
  const config = {
    headers: {
      'x-access-token': token
    }
  }

  async function handleCadastro(e) {
    e.preventDefault();

    const dados = {
      id_pessoa,
      email,
      senha
    };

    try {
      if (dados.idpessoa !== "" && dados.email !== "" && dados.senha !== "") {
        const save = api.post('/usuario', dados, config);

        if ((await save).status == 200) {
          alert('Salvo com sucesso');
          setId('');
          setEmail('');
          setSenha('');
        }

        if ((await save).status == 422) {
          alert('Usuário já possui cadastro');
        }
        
        if ((await save).status == 401) {
          alert('Teste');
        }

        if ((await save).status == 404) {
          alert('Não foi possivel cadastrar, pessoa '+ id_pessoa + 'não possui cadastro!');
        }
      }
      else {
        alert('É necessário preencher todos os campos!')
      }

    } catch (error) {
      alert("Erro ao cadastrar usuário, usuário já existe!");
    }
  }
  const classes = useStyles();

  return (
    <div id="usuario_container">

      <div id="container_usuario">

        <h1>Cadastro de Usuário</h1>

        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleCadastro}>

          <div >
            <TextField
              id="id"
              label="Pessoa"
              defaultValue="Pessoa"
              variant="outlined"
              value={id_pessoa}
              onChange={e => setId(e.target.value)}
            />

            <TextField
              id="email"
              label="E-mail"
              defaultValue="Código"
              variant="outlined"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />

            <TextField
              id="senha"
              label="Senha"
              value={senha}
              onChange={e => setSenha(e.target.value)}
              variant="outlined"
            />
          </div>
          <Button variant="contained" color="primary" type="submit" id="salvar">
            Salvar
          </Button>
        </form>
      </div>
    </div>
  );
}