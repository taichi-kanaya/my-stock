import React, { InputHTMLAttributes } from 'react'

type TextInputProps = {
  id: string
  maxLength: number
  className?: string | undefined
} & InputHTMLAttributes<HTMLInputElement>

const TextInput: React.FC<TextInputProps> = React.forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      id,
      maxLength,
      className = 'focus:shadow-outline border border-gray-300 bg-white p-2 leading-tight text-gray-700 focus:outline-none',
      ...props
    },
    ref,
  ) => {
    return (
      <input ref={ref} type="text" id={id} className={className} maxLength={maxLength} {...props} />
    )
  },
)

TextInput.displayName = 'TextInput'
export default TextInput
