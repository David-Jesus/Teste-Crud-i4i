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

export default function CadastroPessoa() {

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [idade, setIdade] = useState('');
  const [cargo, setCargo] = useState('');
  
  const token = window.sessionStorage.getItem('token');
  const config = {
    headers: {
      'x-access-token': token
    }
  }

  async function handleCadastro(e) {
    e.preventDefault();

    const dados = {
      nome,
      telefone,
      idade,
      cargo
    };

    try {
      if (dados.nome !== "" && dados.telefone !== "" && dados.idade !== ""  && dados.cargo !== "") {
        const save = api.post('/pessoa', dados, config);

        if ((await save).status == 200) {
          alert('Salvo com sucesso');
          setNome('');
          setTelefone('');
          setIdade('');
          setCargo('');
        }

        if ((await save).status == 422) {
          alert('Usuário já possui cadastro');
        }
        
        if ((await save).status == 401) {
          alert('Teste');
        }

        if ((await save).status == 404) {
          alert('Não foi possivel cadastrar, pessoa '+ nome + 'não possui cadastro!');
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

        <h1>Cadastro de Pessoa</h1>

        <form className={classes.root} noValidate autoComplete="off" onSubmit={handleCadastro}>

          <div >
            <TextField
              id="nome"
              label="Nome"
              defaultValue="Nome"
              variant="outlined"
              value={nome}
              onChange={e => setNome(e.target.value)}
            />

            <TextField
              id="telefone "
              label="Telefone"
              defaultValue="Telefone"
              variant="outlined"
              value={telefone}
              onChange={e => setTelefone(e.target.value)}
            />

            <TextField
              id="idade"
              label="Idade"
              value={idade}
              onChange={e => setIdade(e.target.value)}
              variant="outlined"
            />

            <TextField
              id="cargo"
              label="Cargo"
              value={cargo}
              onChange={e => setCargo(e.target.value)}
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