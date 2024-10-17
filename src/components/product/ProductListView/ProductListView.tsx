import { data } from './data'
import { ProductListTable } from './ProductListTable'

export const ProductListView = () => {
  return <ProductListTable products={data} />
}
