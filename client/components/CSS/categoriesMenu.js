import { MenuButton as BaseMenuButton } from '@mui/base/MenuButton';
import { MenuItem as BaseMenuItem, menuItemClasses} from '@mui/base/MenuItem';
import { styled } from '@mui/system'


export const blue = {
    50: '#F0F7FF',
    100: '#C2E0FF',
    200: '#99CCF3',
    300: '#66B2FF',
    400: '#3399FF',
    500: '#007FFF',
    600: '#0072E6',
    700: '#0059B3',
    800: '#004C99',
    900: '#003A75',
  };
  
 export const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
  };
  
  export const Listbox = styled('ul')(
    ({ theme }) => `
    font-family: Arial;
    font-size: 0.875rem;
    box-sizing: border-box;
    padding: 6px;
    margin: 12px 0;
    min-width: 200px;
    border-radius: 12px;
    overflow: auto;
    outline: 0px;
    background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
    box-shadow: 0px 4px 6px ${
      theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.50)' : 'rgba(0,0,0, 0.05)'
    };
    z-index: 1;
    `,
  );
  
  export const MenuItem = styled(BaseMenuItem)(
    () => `
      list-style: none;
      padding: 8px;
      border-radius: 8px;
      cursor: default;
      user-select: none;
  
      &:last-of-type {
        border-bottom: none;
      }
  
      &:focus-visible {
        outline: 3px solid #F94892;
        background-color: #F94892;
        color: #FFFFFF;
      }
  
      &:hover:not(.${menuItemClasses.disabled}) {
        background-color: #F94892;
        color: #FFFFFF;
      }
  
      &.${menuItemClasses.disabled} {
        color: #888888; /* Adjust disabled text color as needed */
      }
    `,
  );
  
  
  export const MenuButton = styled(BaseMenuButton)(
    ({ theme }) => `
      font-family: Arial;
      font-weight: 500;
      font-size: 0.875rem;
      line-height: 1.5;
      padding: 6px 6px;
      border-radius: 8px;
      transition: all 150ms ease;
      cursor: pointer;
      background: transparent; 
      border: none; 
      box-shadow: none; 
    
      &:hover {
        background: transparent; 
        border-color: transparent; 
      }
    
      &:active {
        background: transparent; 
      }
    
      &:focus-visible {
        box-shadow: none; 
        outline: none; 
      }
    `,
  );