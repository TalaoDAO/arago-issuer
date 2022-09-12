import React from 'react';
import Container from '../../components/Container';
import { Wrapper } from './styles';

const FullLayout = ({ children }) => {
  return (
    <Wrapper>
      <Container>
        {children}
      </Container>
    </Wrapper>
  );
};

export default FullLayout;
