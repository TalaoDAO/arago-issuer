import { styled } from '@mui/material';

export const Wrapper = styled('div')`
  display: flex;
  flex-direction: column;

  ${props => props.theme.breakpoints.up('md')} {
    flex-direction: row;
  }
  
  .step-line {
    background: #66318b;
    height: 50px;
    width: 2px;
    align-self: center;

    ${props => props.theme.breakpoints.up('md')} {
      height: 2px;
      width: 50px;
    }
    
    &.active {
      background: #fbd400;
    }
  }
  
  .process-step-card {
    border: 2px solid #66318b;
    border-radius: 10px;
    flex: 1;
    position: relative;
    display: flex;
    align-items: center;
    padding: 20px 30px;

    &.active {
      border-color: #fbd400;
      
      .card-content {
        color: #fbd400;
      }
      
      .card-number {
        background: #fbd400;
      }
    }

    ${props => props.theme.breakpoints.up('md')} {
      display: block;
      padding: 40px 20px 30px;
    }
    
    .card-img {
      width: 40px;
      height: auto;
      margin-right: 15px;

      ${props => props.theme.breakpoints.up('md')} {
        width: 120px;
        display: block;
        margin: 0 auto 20px;
      }
    }
    
    .card-number {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #66318b;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      color: #ffffff;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateX(-50%) translateY(-50%);
      

      ${props => props.theme.breakpoints.up('md')} {
        top: 0;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
      }
    }
    
    .card-content {
      color: #ffffff;
      margin: 0;

      ${props => props.theme.breakpoints.up('md')} {
        text-align: center;
      }
    }
  }
  
`;
