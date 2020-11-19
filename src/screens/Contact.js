import React from 'react';
import Layout from '../components/Layout';

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
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: 'transparent',
    border: '1px solid #FFF',
    borderRadius: '1rem',
    color: '#FFF',
    padding: '1rem',
    '&:hover':{
      backgroundColor: 'transparent',
      fontWeight: 'bold'
    }
  },
  border: {
    borderColor: '#FFF',
    borderRadius: '5rem'
  }
}));

const Contact = () => {
  const classes = useStyles();

  return ( 
    <Layout>
			<main className="contact">
				<h1 className="contact__titulo">Contacto</h1>
				<p className="contact__subtitulo">Envianos un mensaje</p>
				<div className="contact__container">
            <form className="contact__form"> 
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
                    // value={user.name}
                    // onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="lastName"
                    variant="outlined"
                    required
                    fullWidth
                    id="lastName"
                    label="Apellido"
                    autoFocus
                    // value={user.name}
                    // onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="tel"
                    variant="outlined"
                    required
                    fullWidth
                    id="tel"
                    label="Teléfono"
                    autoFocus
                    // value={user.name}
                    // onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="fname"
                    name="email"
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Correo electrónico"
                    autoFocus
                    // value={user.name}
                    // onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="message"
                    label="Mensaje"
                    multiline
                    rows={6}
                    fullWidth
                    size="medium"
                    variant="outlined"
                    className={classes.border}
                  />
                </Grid>
              </Grid>
              {/* {error && <Error message={error} />} */}
       
              <div className="contact__form-newsletter">
                  <input name="terminos" id="terminos" type="checkbox" />
                  <label htmlFor="terminos">Deseo recibir el newsletter</label>
              </div>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Enviar
              </Button>           
            </form>
        </div>
			</main>    
    </Layout>
  );
}
 
export default Contact;