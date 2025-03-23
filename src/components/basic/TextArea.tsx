import React, { TextareaHTMLAttributes } from 'react'

type TextAreaProps = {
  id: string
  rows: number
  maxLength: number
  className?: string | undefined
} & TextareaHTMLAttributes<HTMLTextAreaElement>

const TextArea: React.FC<TextAreaProps> = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      id,
      rows,
      maxLength,
      className = 'focus:shadow-outline border border-gray-300 bg-white p-2 leading-tight text-gray-700 focus:outline-none',
      ...props
    },
    ref,
  ) => {
    return (
      <textarea
        ref={ref}
        id={id}
        rows={rows}
        className={className}
        maxLength={maxLength}
        {...props}
      />
    )
  },
)

TextArea.displayName = 'TextArea'
export default TextArea
