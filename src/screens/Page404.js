import React from 'react';
import styled from 'styled-components';
import Layout from '../components/Layout';
import ReportProblemOutlinedIcon from '@material-ui/icons/ReportProblemOutlined';

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


const Page404 = () => {
  return (
    <Layout>
      <Error>
        <ReportProblemOutlinedIcon />
        <p>Error 404 - No se encontró la página.</p>
      </Error>
    </Layout> 
   );
}
 
export default Page404;