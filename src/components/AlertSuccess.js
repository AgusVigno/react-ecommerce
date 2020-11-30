import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const AlertSuccess = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert severity="success">
        <AlertTitle>Correcto</AlertTitle>
        Se realizó de forma <strong>exitosa!</strong>
      </Alert>
    </div>
  );
}
export default AlertSuccess;