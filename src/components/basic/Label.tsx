import { LabelHTMLAttributes } from 'react'

type LabelProps = {
  isRequire: boolean
  className?: string | undefined
  children: React.ReactNode
} & LabelHTMLAttributes<HTMLLabelElement>

const Label: React.FC<LabelProps> = ({
  isRequire,
  className = 'mb-2 text-sm font-medium text-gray-700',
  children,
  ...props
}) => {
  return (
    <label className={className} {...props}>
      {children} {isRequire && <span className="text-red-500">*</span>}
    </label>
  )
}

export default Label
