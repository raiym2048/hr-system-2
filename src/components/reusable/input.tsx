// import { useState, SetStateAction } from 'react'

export const Input = ({ subtitle, obligatory,  options }: 
  {subtitle: string, obligatory: boolean, options: string[]}) => {
  // const [choice, setChoice] = useState('')
  // const [menuVisibility, setMenuVisibility] = useState(false)
  // const ref = useRef()

  // const handleMenuVisibility = () => {
  //   setMenuVisibility(!menuVisibility)
    
  //   // To close the floating window by clicking anyware on the page
  //   document.addEventListener('click', handler, { capture: true })
  //   function handler(event: { target: any }) {
  //     if (!ref.current?.contains(event.target)) {
  //       setMenuVisibility(false)
  //       document.removeEventListener('click', handler, { capture: true })
  //     }
  //   }
  // }

  // const handleChoice = (event: { target: { value: SetStateAction<string> } }) => {
  //   setChoice(event.target.value)    
  // }  

  return(
    <>
      <p className='subtitle'>{ subtitle }<span style={{ visibility: obligatory ? 'visible' : 'hidden' }} className='asterisk'>*</span></p>
      <div 
        // ref={ ref }
        className="input"
        // onClick={ handleMenuVisibility }
      >
        {/* <p className={ choice !== '' ? '' : 'input__placeholder'}>{ choice || placeholder }</p>          */}
        <p className="input__arrow">&#9699;</p> 

        <div 
          className="input__menuBox" 
          // style={{ visibility: menuVisibility ? "visible" : "hidden" }}
        >
          { options.map((option: string, index: number) => {  
            return(
              <button  
                className="input__menuItem"
                key={ index }
                type='button' 
                value={ option }
                // onClick={ handleChoice }
              >
                { option }
              </button>
            )
          })}
        </div>

      </div>
    </>
  )
}
