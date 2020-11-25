import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import Item from './Item';
import Spinner from './Spinner';
import Alerta from './Alerta';

import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Error = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg{
    font-size: 5rem;
  }
  p{
    font-size: 2rem;
  }
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

const ItemList = ({products}) => {
  const classes = useStyles();
  const [page, setPage] = useState(1);
  const [message, setMessage] = useState(false);
  
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {

  }, []);

  return ( 
    <div>
    {
      !products
        ? <Spinner />
        : <>
            { 
              message && 
                <ContenedorAlerta>
                  <Alerta 
                    type="success"
                    title="Correcto"
                    message="Se agregó al carrito de forma"
                    bold="exitosa!"
                  />
                </ContenedorAlerta> 
            }
            <ul className="products__containter">
              {
                products.length > 0 
                ? (
                    products.map((product, index) => (
                      index >= (page - 1) * 9 && index < page * 9 &&
                      <Item
                        key={product.id}
                        product={product}
                        setMessage={setMessage}
                      />
                    ))
                  )
                : (  
                    <Error>
                      <ReportProblemOutlinedIcon />
                      <p>No se encontraron productos</p>
                    </Error>
                ) 
              }
            </ul>
            {
              products.length > 0 && 
                <div className={`${classes.root} pagination`}>
                  <Pagination 
                    count={Math.ceil(products.length/9)} 
                    page={page} 
                    onChange={handleChange} 
                  />
                </div>
            }
          </>
    }
    </div>
  );
}
 
export default ItemList;