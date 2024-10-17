export interface ProductParams extends Record<string, any> {
  id: string
}

export const ROUTES = {
  HOME: '/',
  PRODUCT_LIST: '/products',
  ADD_PRODUCT: '/products-add',
  PRODUCT_DETAIL: ({ id }: ProductParams = { id: ':id' }) => '/products/' + id,
}
