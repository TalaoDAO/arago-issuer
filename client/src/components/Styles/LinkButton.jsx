import { styled } from '@mui/material';

export const LinkButton = styled('div')`
  background: #75FD92;
  outline: none;
  border: none;
  border-radius: 4px;
  padding: 15px;
  width: 100%;
  text-align: center;
  margin: 40px auto;

  &:hover {
    opacity: 0.8;
    text-decoration: underline;
    cursor: pointer;
  }

  ${props => props.theme.breakpoints.up('sm')} {
    width: 365px;
  }
`;
