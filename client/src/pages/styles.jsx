import { styled } from '@mui/material';

export const Wrapper = styled('div')`
  .title-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;

    .unit-img {

      ${props => props.theme.breakpoints.up('xs')} {
        display: block;
        width: 140px;
        height: 140px;
      }

      ${props => props.theme.breakpoints.up('md')} {
        width: 200px;
      }

      ${props => props.theme.breakpoints.up('lg')} {
        width: 250px;
      }
    }
    
    .castel-img {
      display: none;
      
      ${props => props.theme.breakpoints.up('xs')} {
        display: block;
        width: 94px;
        height: 94px;
      }
    }

    .title {
      font-size: 42px;
      font-weight: bold;
      text-align: center;
      line-height: 1.125;
      text-shadow: 0 0 30px #7452ad;

      ${props => props.theme.breakpoints.up('xs')} {
        font-size: 24px;
        text-align: left;
      }

      ${props => props.theme.breakpoints.up('md')} {
        font-size: 54px;
      }

      ${props => props.theme.breakpoints.up('lg')} {
        font-size: 64px;
      }
    }
  }
  
  .title-container.title-container-mobile {
    display: block;
  }

  .download-section {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .download-img {
      max-width: calc(50% - 10px);
      height: auto;
      
      &:first-child {
        margin-right: 10px;
      }
      
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }

    ${props => props.theme.breakpoints.up('xs')} {
      justify-content: center;
      
      .download-img {
        &:first-child {
          margin-right: 20px;
        }
      }
    }
    
    ${props => props.theme.breakpoints.up('sm')} {
      display: none;
    }
  }
  
  .loyalty-card {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
`;
