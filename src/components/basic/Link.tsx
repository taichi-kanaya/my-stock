import { ComponentProps } from 'react'

import NextLink from 'next/link'

type LinkProps = {
  href: string
  className?: string
  children: React.ReactNode
} & ComponentProps<typeof NextLink>

const Link: React.FC<LinkProps> = ({
  href,
  className = 'my-10 rounded bg-gray-800 px-4 py-2 font-bold text-white hover:bg-gray-600',
  children,
  ...props
}) => {
  return (
    <NextLink className={className} href={href} {...props}>
      {children}
    </NextLink>
  )
}

export default Link
