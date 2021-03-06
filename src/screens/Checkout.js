import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import firebase from '../firebase';
import { FirebaseContext } from '../firebase';
import { CartContext } from '../context/cartContext';
import AddressForm from '../components/checkout/AddressForm';
import PaymentForm from '../components/checkout/PaymentForm';
import Review from '../components/checkout/Review';
import Layout from '../components/Layout';
import Copyright from '../components/Copyright';
import AlertSuccess from '../components/AlertSuccess';
import AlertError from '../components/AlertError';
import Spinner from '../components/Spinner';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
  account: {
    fontSize: '1.2rem',
    marginTop: '1rem',
    marginBottom: '1rem'
  }
}));

const Cuenta = styled.span`
  font-weight: 700;
  margin-left: 2rem;
  font-size: 1.6rem;
`;

const ContenedorAlerta = styled.div`
  width: 35rem;
  position: absolute;
  top: 10rem;
  right: 20rem;
  .MuiAlertTitle-root{
    font-size: 1.6rem;
  }
  .MuiAlert-message{
    font-size: 1.4rem;
  }
`;

const Checkout = () => {
  const classes = useStyles();
  const {user} = useContext(FirebaseContext);
  const cartContext = useContext(CartContext);

  const STATE_INITIAL = {
    name: '',
    lastName: '',
    address: '',
    email: '',
    emailRepeat: '',
    tel: '',
    country: '',
  };

  const [activeStep, setActiveStep] = useState(0);
  const [completeForm, setCompleteForm] = useState(false);
  const [visitor, setVisitor] = useState(STATE_INITIAL);
  const steps = ['Dirección de envío', 'Detalles del pago', 'Revisa tu orden'];
  const [orderId, setOrderId] = useState(null);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBlur = event => {
    event.preventDefault();
    const validate = validateCompleteForm();
    setCompleteForm(validate);
    setVisitor({
      ...visitor, [event.nativeEvent.target.name]: event.nativeEvent.target.defaultValue 
    });
  }

  const handleChange = event => {
    event.preventDefault();
    setVisitor({
      ...visitor, [event.target.name]: event.target.value 
    });
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    activeStep === 2 && createOrder();
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const createOrder = async () => {
    let items = [];
    cartContext.cart.forEach(item => {
      const newItem = {
        id: item.id,
        count: item.count
      }
      items.push(newItem);
    });
    const order = {
      client: visitor,
      userId: user ? user.uid : '',
      products: items,
      countProducts: cartContext.cartSize,
      total: cartContext.total,
      date: new Date(),
    }
    try {
      console.log("Control de consulta API - Crear Orden");
      const response = (await firebase.db.collection('orders').add(order)).id;
      const validateStock = updateStock(order.products);
      if(validateStock){
        setVisitor(STATE_INITIAL);
        setOrderId(response);
        cartContext.reset();
        setActiveStep(3);
        setMessage(true);
        setTimeout(() => {
          setMessage(false);
        }, 2000);
      }else{
        setTimeout(() => {
          setError(false);
        }, 2000);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  const validateCompleteForm = () => {
    return (visitor.name !== '' && visitor.lastName !== '' && visitor.email !== '' && visitor.tel !== '' && visitor.address !== '' && visitor.emailRepeat === visitor.email);
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm 
                  visitor={visitor}
                  handleBlur={handleBlur} 
                  handleChange={handleChange} 
                />;
      case 1:
        return <PaymentForm />;
      case 2:
        return <Review 
                  visitor={visitor}
                  cash={true}
                />;
      default:
        throw new Error('Etapa desconocida');
    }
  }

  const updateStock = (products) => {
    setLoading(true);
    products.forEach(product => {
      const item = firebase.db.collection('products').doc(product.id);

      item.get().then(doc => {
        if(!doc.exists){
          setError("No existe el producto.");
          return false;
        }
        const stock = doc.data().stock;
        if(product.count > stock){
          setError("Stock insuficiente.");
          return false;
        }
        item.update({stock: stock - product.count});
      }).catch((error) => {
        console.log("Error: ", error);
        return false;
      }).finally(() => {
        setLoading(false);
      })
    });
    return true;
  }

  return (
    <Layout>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          {
            user 
              ? (
                <Typography component="p" align="center" className={classes.account}>
                  Comprar con la cuenta: <Cuenta>{user.email}</Cuenta>
                </Typography>
              )
              : (
                <Stepper activeStep={activeStep} className={classes.stepper}>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              )
          }
          <>
            {activeStep === steps.length ? (
              <>
                { 
                  message && 
                    <ContenedorAlerta>
                      <AlertSuccess />
                    </ContenedorAlerta> 
                }
                { 
                  error && 
                    <ContenedorAlerta>
                      <AlertError />
                    </ContenedorAlerta> 
                }
                {
                  loading 
                  ? <Spinner /> 
                  : <>
                      <Typography variant="h5" gutterBottom>
                        Muchas Gracias por tu compra.
                      </Typography>
                      <Typography variant="subtitle1" className="cart__order">
                        Su número de orden de compra es: <span>{orderId}</span>. Hemos enviado la confirmación de su pedido por correo electrónico y
                        le enviaremos una actualización cuando se haya enviado su pedido.
                      </Typography>
                    </>
                }
              </>
            ) : (
              user 
                ? (
                  <>
                    {getStepContent(2)}
                    <div className={classes.buttons}>  
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={createOrder}
                        className={classes.button}
                      >
                        Realizar pedido
                      </Button>
                    </div>
                  </>
                )
                : (
                  <>
                    {getStepContent(activeStep)}
                    <div className={classes.buttons}>
                      {activeStep !== 0 && (
                        <Button onClick={handleBack} className={classes.button}>
                          Anterior
                        </Button>
                      )}
                      {/* {error && <Error message={error} />} */}
                      <Button
                        disabled={!completeForm}
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                        className={classes.button}
                      >
                        {activeStep === steps.length - 1 ? 'Realizar pedido' : 'Siguiente'}
                      </Button>
                    </div>
                  </>
                )
            )}
          </>
        </Paper>
        <Copyright />
      </main>
    </Layout>
  );
}

export default Checkout;