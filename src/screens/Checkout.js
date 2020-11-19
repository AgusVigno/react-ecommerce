import React, {useState, useEffect} from 'react';
// import { FirebaseContext } from '../firebase';
import AddressForm from '../components/checkout/AddressForm';
import PaymentForm from '../components/checkout/PaymentForm';
import Review from '../components/checkout/Review';
import Layout from '../components/Layout';
import Copyright from '../components/Copyright';
// import Error from '../components/Error';
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
}));

const Checkout = () => {
  const classes = useStyles();
  // const {user} = useContext(FirebaseContext);
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
  // const [error, setError] = useState(false);
  const steps = ['Dirección de envío', 'Detalles del pago', 'Revisa tu orden'];

  useEffect(() => {
    // cartContext.cartSize === 0 &&
    //   history.push('/');
  }, []);

  const handleBlur = event => {
    event.preventDefault();
    const validate = validateCompleteForm();
    setCompleteForm(validate);
    console.log(validate);
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
    activeStep === 2 && buy();
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const buy = () => {
    console.log("Firebase generar compra");
    setVisitor(STATE_INITIAL);
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
        throw new Error('Unknown step');
    }
  }

  return (
    <Layout>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Muchas Gracias por tu compra.
                </Typography>
                <Typography variant="subtitle1">
                  Su número de orden de compra es: 2001539. Hemos enviado la confirmación de su pedido por correo electrónico y
                  le enviaremos una actualización cuando se haya enviado su pedido.
                </Typography>
              </>
            ) : (
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
            )}
          </>
        </Paper>
        <Copyright />
      </main>
    </Layout>
  );
}

export default Checkout;