import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import firebase from '../firebase';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Layout from '../components/Layout';
import Error from '../components/Error';
import Copyright from '../components/Copyright';
import iconGoogle from '../images/iconGoogle.png';
import iconFacebook from '../images/iconFacebook.jpg';
import iconGithub from '../images/iconGithub.jpg';

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
    width: '100%', 
    marginTop: theme.spacing(1),
    fontSize: '1rem',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: '#2c3e50',
    color: '#FFF',
    padding: '1rem',
    '&:hover':{
      backgroundColor: '#1D3B58',
      fontWeight: 'bold'
    }
  },
  loginGoogle: {
    marginTop: '2rem',
    marginLeft: '35%',
  }
}));

const Login = ({history}) => {
  const classes = useStyles();
  
  const STATE_INITIAL = {
    password: '',
    email: ''
  }
  const [user, setUser] = useState(STATE_INITIAL);
  const [error, setError] = useState(false);

  async function login(){
    try {
      await firebase.login(user.email, user.password);
      setUser(STATE_INITIAL);
      history.push('/');
    } catch (error) {
      setError("Usuario y/o contraseña incorrectos.");
      setTimeout(() => {
        setError(false)
       }, 2000);
    }
  }

  const handleChange = (event) => {
    event.preventDefault();
    setUser({
      ...user, [event.target.name]: event.target.value
    });
  }

  const validateInputs = () => {
    return (user.email !== '' && user.password !== '');
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(validateInputs()){
      login();
    } else{
      setError("Los campos son obligatorios");
      setTimeout(() => {
        setError(false)
       }, 2000);
    }
  }

  const onClickLoginWithGoogle = async () => {
    try {
      await firebase.loginWithGoogle();
      setUser(STATE_INITIAL);
      history.push('/');
    } catch (error) {
      console.log("Error:", error)
      setError("Ocurrió un error");
      setTimeout(() => {
        setError(false)
        }, 2000);
    }
  }

  const onClickLoginWithFacebook = async () => {
    try {
      await firebase.loginWithFacebook();
      setUser(STATE_INITIAL);
      history.push('/');
    } catch (error) {
      console.log("Error:", error)
      setError("Ocurrió un error");
      setTimeout(() => {
        setError(false)
        }, 2000);
    }
  }

  const onClickLoginWithGithub = async () => {
    try {
      await firebase.loginWithGithub();
      setUser(STATE_INITIAL);
      history.push('/');
    } catch (error) {
      console.log("Error:", error)
      setError("Ocurrió un error");
      setTimeout(() => {
        setError(false)
        }, 2000);
    }
  }

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Iniciar Sesión
          </Typography>
          <form 
            className={classes.form} 
            noValidate
            onSubmit={handleSubmit}  
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo electrónico"
              name="email"
              autoComplete="email"
              autoFocus
              value={user.email}
              onChange={handleChange}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={user.password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recordarme"
            />
            {error && <Error message={error} />}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="default"
              className={classes.submit}
            >
              Iniciar Sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/" style={{color: 'black'}}>
                  ¿Olvidaste la contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/register" style={{color: 'black'}}>
                  {"¿No tenes cuenta? Regístrate"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <div className="login__redes-btn google">
          <button onClick={onClickLoginWithGoogle}>
            Login con Google
          </button>
          <img src={iconGoogle} alt="imagen google"/>
        </div>
        <div className="login__redes-btn facebook">
          <button onClick={onClickLoginWithFacebook}>
            Login con Facebook
          </button>
          <img src={iconFacebook} alt="imagen facebook"/>
        </div>
        <div className="login__redes-btn github">
          <button onClick={onClickLoginWithGithub}>
            Login con Github
          </button>
          <img src={iconGithub} alt="imagen github"/>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </Layout>
  );
}

export default Login;