import {
  Button,
  getKeyValue,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react'
import { RiAddLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import Typography from '@/components/common/Typography'
import { ROUTES } from '@/pages/routes'
import { useGetProductsQuery } from '@/stores/product'

export const ProductList = () => {
  const { data, isFetching, isLoading, isSuccess } = useGetProductsQuery(null)

  return (
    <>
      <div className="flex flex-col gap-8 mt-4 mb-[200px]">
        <div className="flex justify-between md:items-center flex-col md:flex-row gap-8">
          <div>
            <Typography level="p6" color="textTertiary">
              Welcome to the product list
            </Typography>
            <Typography level="h4" className="text-lg lg:text-2xl">
              Product List
            </Typography>
          </div>
          <div>
            <Button
              color="primary"
              variant="flat"
              endContent={<RiAddLine size={16} />}
              as={Link}
              to={ROUTES.ADD_PRODUCT}
            >
              Add Product
            </Button>
          </div>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableColumn key="media">Image</TableColumn>
              <TableColumn key="name">Name</TableColumn>
              <TableColumn key="description">Description</TableColumn>
              <TableColumn key="price">price</TableColumn>
              <TableColumn key="categories">Category</TableColumn>
            </TableHeader>
            <TableBody items={data ?? []} loadingContent={<Spinner />}>
              {(item) => (
                <TableRow key={item?.name}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}
