import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const CustomPagination = () => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  
  const handleChange = (event, value) => {
    setPage(value);
  };
  return ( 
    <div className={`${classes.root} pagination`}>
      <Pagination 
        count={10} 
        page={page} 
        onChange={handleChange} 
      />
    </div>
   );
}
 
export default CustomPagination;