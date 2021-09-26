import React, { useState, useEffect } from 'react';
import api from '../service/api';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Route, useHistory, Switch, Redirect } from "react-router-dom";
import Home from '../home/home'
// import CadastroCliente from '../CadastrarLivro/cadastrar';
// import '../login/login.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function SignIn() {


  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [token, setToken] = useState('');
  const [redirect, setState] = useState(false);


  async function HandleLogin(e) {
    e.preventDefault();

    const dados = {
      email,
      senha
    };

    try {
      if (email !== "" && senha !== "") {

        const login = api.post('login', dados);
        const login_token = (await login).data.token;
        alert(login_token);
        setToken(login_token);
        alert(token);

        // const tok = JSON.stringify(login_token);
          sessionStorage.setItem('token', login_token);
         
          // const c = JSON.parse(sessionStorage.getItem('token'));
          // alert(c)
          // console.info(c);

        if ((await login).status == 200) {
          setState({ redirect: true });
        }
        if ((await login).status == 401) {
          alert('Usuário não cadastrado');
        }
      }
      else {
        alert('Preencha todos os campos!')
      }
    } catch (error) {
      alert("Usuário não cadastrado!");
    }
  }
  const classes = useStyles();

  if (redirect) {
    return <Redirect to='lista-usuarios' />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Entrar
        </Typography>
        {/* <form className={classes.form} noValidate onSubmit={HandleLogin}> */}
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={HandleLogin}
          >
            Entrar
          </Button>
          <Grid container>
            <Grid item>
              <Link href="home" variant="body2">
                {"Não tem uma conta? cadastre-se!"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Route path='/cadastrar-usuario' exact={true} component={Home} />
    </Container>
  );
}