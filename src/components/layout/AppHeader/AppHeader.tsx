import {
  Link as NextUILink,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/react'
import { Link, useLocation } from 'react-router-dom'

import { ThemeButton } from '@/components/common/ThemeButton'
import { ROUTES } from '@/pages/routes'

import { Logo } from './Logo'

const HEAD_ROUTES = [
  {
    title: 'Home',
    to: ROUTES.HOME,
  },
  {
    title: 'Add Products',
    to: ROUTES.ADD_PRODUCT,
  },
  {
    title: 'Products',
    to: ROUTES.PRODUCT_LIST,
  },
]

export const AppHeader = () => {
  const { pathname } = useLocation()
  return (
    <header className="container">
      <Navbar maxWidth="full">
        <NavbarBrand as={Link} to={ROUTES.HOME}>
          <Logo />
        </NavbarBrand>
        <NavbarContent className="sm:flex gap-8" justify="center">
          {HEAD_ROUTES.map(({ title, to }) => (
            <NavbarItem>
              <NextUILink
                as={Link}
                color={to === pathname ? 'primary' : 'foreground'}
                to={to}
              >
                {title}
              </NextUILink>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <ThemeButton />
        </NavbarContent>
      </Navbar>
    </header>
  )
}
