import React from 'react';
import Container from '../../components/Container';
import { Wrapper } from './styles';

const FullLayout = ({ children }) => {
  return (
    <Wrapper>
      <Container>
        <div className="logo-wrapper">
          <img className="logo" src="/assets/img/logo-tezotopia-desktop.png" alt="" />
        </div>

        {children}
      </Container>
    </Wrapper>
  );
};

export default FullLayout;
