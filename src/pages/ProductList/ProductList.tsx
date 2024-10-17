import { Typography } from '@/components/common/Typography'
import { ProductListView } from '@/components/product/ProductListView'

export const ProductListPage = () => {
  return (
    <>
      <div className="flex flex-col gap-8 mt-4 mb-[100px]">
        <div className="flex justify-between md:items-center flex-col md:flex-row gap-8">
          <div>
            <Typography level="p6" color="textTertiary">
              Welcome to the product list
            </Typography>
            <Typography level="h4" className="text-lg lg:text-2xl">
              Product List
            </Typography>
          </div>
        </div>
        <div>
          <ProductListView />
        </div>
      </div>
    </>
  )
}
