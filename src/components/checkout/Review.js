import React, {useEffect, useContext} from 'react';
import { CartContext } from '../../context/cartContext';
import { FirebaseContext } from '../../firebase';


import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
}));

const Review = ({visitor, cash, payment}) => {
  const classes = useStyles();
  const cartContext = useContext(CartContext);

  useEffect(() => {
    console.log(cartContext.cart);

  }, []);
  
  // const payments = [
  //   { name: 'Card type', detail: 'Visa' },
  //   { name: 'Card holder', detail: 'Mr John Smith' },
  //   { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  //   { name: 'Expiry date', detail: '04/2024' },
  // ];

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Resumen de la Orden
      </Typography>
      <List disablePadding>
        {cartContext.cart.map((product) => (
          <ListItem className={classes.listItem} key={product.id}>
            <ListItemText 
              primary={product.name} 
              secondary={`${product.count} x $${product.price}`} 
            />
            <Typography variant="body2">${product.price * product.count}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${cartContext.total}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Envío
          </Typography>
          <Typography gutterBottom>{`${visitor.name} ${visitor.lastName}`}</Typography>
          <Typography gutterBottom>{visitor.address}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Forma de Pago
          </Typography>
          <Grid container>
            {
              cash &&
                <> 
                  <Grid item xs={4}>
                    <Typography gutterBottom>Efectivo</Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography gutterBottom>Contra re-embolso al recibir la orden</Typography>
                  </Grid>
                </>
            }
            {
              payment && <>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{payment.name}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography gutterBottom>{payment.detail}</Typography>
                    </Grid>
                  </>
              }
            {/* {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))} */}

          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Review;