import { ButtonHTMLAttributes } from 'react'

import clsx from 'clsx'
import Link from 'next/link'

type ButtonProps = {
  isPrimary: boolean
  type?: 'submit' | 'button'
  href?: string
  className?: string
  children: React.ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({
  isPrimary,
  type = 'button',
  href = '#',
  className = 'focus:shadow-outline rounded px-4 py-2 font-bold text-white focus:outline-none',
  children,
  ...props
}) => {
  const primaryClasses = 'bg-blue-500 hover:bg-blue-700'
  const secondaryClasses = 'bg-red-500 hover:bg-red-700'
  const buttonClass = clsx(className, className, isPrimary ? primaryClasses : secondaryClasses)

  if (type === 'submit') {
    return (
      <button type={type} className={buttonClass} {...props}>
        {children}
      </button>
    )
  }

  return (
    <Link href={href}>
      <button type={type} className={buttonClass} {...props}>
        {children}
      </button>
    </Link>
  )
}

export default Button
