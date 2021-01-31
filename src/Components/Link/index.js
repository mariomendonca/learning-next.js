import NextLink from 'next/link'
import { Children } from 'react'

export default function Link({ children, href, ...props}) {
  return (
    <NextLink href={href} passHref>
      <a {...props}>
        {children}
      </a>
    </NextLink>
  )
}