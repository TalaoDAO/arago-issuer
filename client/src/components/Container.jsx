import React from 'react';
import { Container as MuiContainer } from '@mui/material';

const Container = ({ children }) => {
  return (
    <MuiContainer
      sx={{
        maxWidth: { lg: '1200px' }
      }}
    >
      {children}
    </MuiContainer>
  )
};

export default Container;
