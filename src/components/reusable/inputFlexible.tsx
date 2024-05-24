import { ChangeEventHandler } from 'react'

type TInputFlexible = {
  value: string
  id: string
  onChange: ChangeEventHandler<HTMLTextAreaElement>
  placeholder?: string
  className?: string
}

export const InputFlexible = ({ onChange, value, id, placeholder, className }: TInputFlexible) => {
  document.getElementById(id)?.addEventListener('input', function () {
    this.style.height = '5px'
    this.style.height = this.scrollHeight + 3 + 'px'
  })

  return (
    <>
      <textarea
        rows={1}
        id={id}
        className={`input text ${className}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      ></textarea>
    </>
  )
}
