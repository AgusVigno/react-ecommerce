import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const AddressForm = ({visitor, handleBlur, handleChange}) => {
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Dirección de envío
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Nombre"
            fullWidth
            autoComplete="given-name"
            value={visitor.name}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Apellido"
            fullWidth
            autoComplete="family-name"
            value={visitor.lastName}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Dirección"
            fullWidth
            autoComplete="shipping address-line1"
            value={visitor.address}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="country"
            label="País"
            fullWidth
            autoComplete="shipping address-level2"
            value={visitor.country}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            id="tel" 
            name="tel" 
            label="Teléfono" 
            fullWidth 
            value={visitor.tel}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="email"
            name="email"
            label="Correo electrónico"
            fullWidth
            autoComplete="shipping postal-code"
            value={visitor.email}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="emailRepeat"
            name="emailRepeat"
            label="Repetir Correo"
            fullWidth
            autoComplete="shipping country"
            value={visitor.emailRepeat}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Usar estar dirección para detalles del pago."
          />
        </Grid>
      </Grid>
    </>
  );
}

export default AddressForm;