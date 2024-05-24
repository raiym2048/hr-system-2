import { StylesConfig } from 'react-select';

const defaultBorder = '0.15rem solid #DDDDDD'

const extendedStyles = () => ({
  fontSize: '18px',
  height: '1rem',
  display: 'flex', 
  alignItems: 'center',
  boxShadow: 'none',   
})

export const selectStyles: StylesConfig = {
  control: (styles) => ({ 
      ...styles,
      ...extendedStyles(),
      border: defaultBorder,
      cursor: 'pointer',

      ':hover': {
        border: defaultBorder,
      },
      
  }),
  menu: (styles) => ({
    ...styles,
    
    height:'50px',
   }),  
   menuList: (styles) => ({
    ...styles,
    display:'flex',
    flexDirection:'column',
    gap:"10px",
    cursor:'pointer',
    

    
   }),

    

 
  option: (styles, { isDisabled, isFocused }) => {
    return {
      ...styles,
      ...extendedStyles(),
      paddingLeft: '2rem',
      backgroundColor: isDisabled
        ? undefined
        : isFocused
        ? '#EEEEEE'
        : undefined,

      color: isDisabled
        ? '#ccc'
        : 'black',
        
      cursor: isDisabled ? 'not-allowed' : 'default',

    };
  },

  input: (styles) => ({ ...styles }),
  
  placeholder: (styles) => ({ ...styles, }),
  singleValue: (styles) => ({ ...styles,  }),
};