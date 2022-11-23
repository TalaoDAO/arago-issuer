import { styled } from '@mui/material';

export const Wrapper = styled('div')`
  margin-top: 80px;

  ${props => props.theme.breakpoints.down('sm')} {
    margin-top: 40px;
  }
  
  .arago-card {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .arago-content {
    display: flex;
    margin-top: 70px;
    align-items: center;
    justify-content: center;
  }
`;
