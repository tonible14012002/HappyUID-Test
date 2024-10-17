import {
  Link as NextUILink,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Chip,
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
    title: 'Products',
    to: ROUTES.PRODUCT_LIST,
  },
  {
    title: 'Add Products',
    to: ROUTES.ADD_PRODUCT,
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
        <NavbarContent className="sm:flex gap-4" justify="center">
          {HEAD_ROUTES.map(({ title, to }) => (
            <Chip
              variant="solid"
              key={to}
              color={to === pathname ? 'primary' : 'default'}
            >
              <NavbarItem className="!text-inherit">
                <NextUILink as={Link} to={to} className="text-inherit">
                  {title}
                </NextUILink>
              </NavbarItem>
            </Chip>
          ))}
        </NavbarContent>
        <NavbarContent className="hidden sm:flex gap-4" justify="end">
          <ThemeButton />
        </NavbarContent>
      </Navbar>
    </header>
  )
}
