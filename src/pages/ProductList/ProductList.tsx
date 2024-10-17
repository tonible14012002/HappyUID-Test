import { Meta } from '@/components/common/Meta'
import { Typography } from '@/components/common/Typography'
import { ProductListTable } from '@/components/product/ProductListTable/ProductListTable'
import { useGetProductsQuery } from '@/stores/product'

export const ProductListPage = () => {
  const { data, isLoading, refetch } = useGetProductsQuery()
  return (
    <>
      <Meta title="products" />
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
          <ProductListTable
            isLoading={isLoading}
            products={data ?? []}
            mutate={refetch}
          />
        </div>
      </div>
    </>
  )
}
