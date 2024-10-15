import { AppLayout, Layout } from '@/components/layout/Layout'
import { ProductList } from '@/components/product/ProductList'

import { HomePage } from './Home'
import { ProductAdd } from './ProductAdd'
import { ROUTES } from './routes'

const routes = [
  {
    path: ROUTES.HOME,
    title: 'Home',
    element: HomePage,
    layout: Layout,
  },
  {
    path: ROUTES.ADD_PRODUCT,
    title: 'Add Product',
    element: ProductAdd,
    layout: AppLayout,
  },
  {
    path: ROUTES.PRODUCT_LIST,
    title: 'Products',
    element: ProductList,
    layout: AppLayout,
  },
]

export default routes
