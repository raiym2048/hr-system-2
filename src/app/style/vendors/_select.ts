import { StylesConfig } from 'react-select';

const defaultBorder = '0.15rem solid #DDDDDD'

const extendedStyles = () => ({
  padding: '1.5rem 0.5rem',
  minHeight: '6rem',
  display: 'flex', 
  alignItems: 'center',
  boxShadow: 'none',   
  borderRadius: '0.6rem',
})

export const inputStyles: StylesConfig = {
  control: (styles) => ({ 
      ...styles,
      ...extendedStyles(),
      border: defaultBorder,
      cursor: 'pointer',
      fontFamily: 'var(--font-family-main)',

      ':hover': {
        border: defaultBorder,
      }
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