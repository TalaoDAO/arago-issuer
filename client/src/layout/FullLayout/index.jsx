import React from 'react';
import Container from '../../components/Container';
import { Wrapper } from './styles';

const FullLayout = ({ children }) => {
  return (
    <Wrapper>
      <Container>
          <div className="logo-wrapper">
              <img className="logo" src="/assets/img/arago-logo.svg" alt="" />
          </div>
        {children}
      </Container>
    </Wrapper>
  );
};

export default FullLayout;
