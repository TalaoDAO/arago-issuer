import { styled } from '@mui/material';

export const LinkButton = styled('div')`
  background: #fbd400;
  outline: none;
  border: none;
  border-radius: 10px;
  padding: 15px;
  width: 100%;
  text-align: center;
  margin: 20px auto;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
    cursor: pointer;
  }

  ${props => props.theme.breakpoints.up('sm')} {
    width: 365px;
  }
`;