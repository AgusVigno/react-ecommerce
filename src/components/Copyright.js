import React from 'react';
import {Link} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

const Copyrigth = ({classes}) => {
  return ( 
    <Typography 
      variant="body2" 
      color="textSecondary" 
      align="center" 
      style={{marginBottom: '14rem'}}
      className={classes}
    >
      {'Todos los derechos reservados. Copyright ' } &copy;
      <Link style={{color: 'black'}} to="/">
        TuLugar
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
   );
}
 
export default Copyrigth;