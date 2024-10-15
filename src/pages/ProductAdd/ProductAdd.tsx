import { Button } from '@nextui-org/react'
import { RiArrowLeftSLine, RiCheckLine, RiSave2Line } from 'react-icons/ri'
import { Link } from 'react-router-dom'

import Typography from '@/components/common/Typography'
import { ProductFormView } from '@/components/product/ProductFormView'

import { ROUTES } from '../routes'

export const ProductAdd = () => {
  return (
    <div className="flex flex-col gap-8 mt-4">
      <div className="flex justify-between md:items-center flex-col md:flex-row gap-4">
        <div className="w-full flex gap-4 items-center">
          <Button
            isIconOnly
            variant="flat"
            size="md"
            as={Link}
            to={ROUTES.PRODUCT_LIST}
          >
            <RiArrowLeftSLine size={16} />
          </Button>
          <div>
            <Typography level="p6" color="textTertiary">
              Back to product list
            </Typography>
            <Typography level="h4" className="text-lg lg:text-2xl">
              Add New Product
            </Typography>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            radius="full"
            startContent={<RiSave2Line size={16} />}
            variant="flat"
          >
            Save Draf
          </Button>
          <Button
            radius="full"
            color="primary"
            startContent={<RiCheckLine size={16} />}
          >
            Add Product
          </Button>
        </div>
      </div>
      <div>
        <ProductFormView />
      </div>
    </div>
  )
}
