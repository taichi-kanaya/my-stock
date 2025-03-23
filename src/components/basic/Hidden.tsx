import React, { InputHTMLAttributes } from 'react'

type HiddenProps = {
  id: string
  value: string
} & InputHTMLAttributes<HTMLInputElement>

const Hidden: React.FC<HiddenProps> = React.forwardRef<HTMLInputElement, HiddenProps>(
  ({ id, value, ...props }, ref) => {
    return <input ref={ref} type="hidden" id={id} value={value} {...props} />
  },
)

Hidden.displayName = 'Hidden'
export default Hidden
