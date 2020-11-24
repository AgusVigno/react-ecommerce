import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import firebase from '../firebase';
import Layout from '../components/Layout';
import Error from '../components/Error';

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
import Copyright from "../components/Copyright";


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
    zIndex: 1
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
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
}));

const Register = ({history}) => {
  const classes = useStyles();
  
  const STATE_INITIAL = {
    name: '',
    lastName: '',
    password: '',
    email: '',
  };
  const [user, setUser] = useState(STATE_INITIAL);
  const [error, setError] = useState(false);

  async function registerUser(){
    try {
      console.log("Crear en Firebase");
      setUser(STATE_INITIAL);
      await firebase.register(user);
      history.push('/');
    } catch (error) {
      setError(error.message);
      setTimeout(() => {
        setError(false)
       }, 2000);
    }
  }

  const handleChange = event => {
    event.preventDefault();
    setUser({
      ...user, [event.target.name]: event.target.value
    });
  }

  const handleSubmit = event => {
    event.preventDefault();
    if(validateSubmit()){
      registerUser();
    }else{
      setError("Todos los campos son obligatorios");
      setTimeout(() => {
        setError(false)
       }, 2000);
    }
  }

  const validateSubmit = () => {
    return (user.name !== '' && user.lastName !== '' && user.password !== '' && user.email !== '');
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
            Crear Cuenta
          </Typography>
          <form 
            className={classes.form} 
            noValidate
            onSubmit={handleSubmit}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Nombre"
                  autoFocus
                  value={user.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Apellido"
                  name="lastName"
                  autoComplete="lname"
                  value={user.lastName}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Correo electrónico"
                  name="email"
                  autoComplete="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
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
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="Quiero recibir novedades por correo electrónico."
                />
              </Grid>
            </Grid>
            {error && <Error message={error} />}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Registrarse
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/login" style={{color: 'black'}}>
                  ¿Ya tenés cuenta? Iniciar Sesión
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    </Layout>
  );
}

export default Register;