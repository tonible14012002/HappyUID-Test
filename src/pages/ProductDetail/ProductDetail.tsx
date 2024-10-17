import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/react'
import { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { RiArrowLeftSLine, RiCheckLine } from 'react-icons/ri'
import { Link, useParams } from 'react-router-dom'

import { Meta } from '@/components/common/Meta'
import Typography from '@/components/common/Typography'
import { ProductFormView } from '@/components/product/ProductFormView'
import {
  defaultValues,
  GenderEnum,
  schema,
} from '@/components/product/ProductFormView/constant'
import type {
  MediaMeta,
  ProductFormValues,
} from '@/components/product/ProductFormView/constant'
import { useToast } from '@/hooks/useToast'
import { ROUTES, type ProductParams } from '@/pages/routes'
import {
  useGetProductDetailQuery,
  useUpdateProductMutation,
} from '@/stores/product'
import type { Product } from '@/types/schema'

export const ADD_PRODUCT_KEY = 'ADD_PRODUCT_KEY'

const resetProductToForm = (data: Product) => {
  return {
    name: data.name,
    description: data.description,
    categories: data.categories,
    gender: GenderEnum[data.gender as keyof typeof GenderEnum],
    media: data.media.reduce(
      (acc, curr) => {
        acc[curr.id] = curr
        return acc
      },
      {} as Record<string, MediaMeta>,
    ),
    price: data.price.toString(),
    sizes: data.sizes,
  } as ProductFormValues
}

export const ProductDetailPage = () => {
  const { id } = useParams<ProductParams>()
  const [updateProduct] = useUpdateProductMutation()
  const { data, isLoading } = useGetProductDetailQuery(id ?? '', {
    skip: !id,
  })

  const { toast } = useToast()

  const formInstance = useForm<ProductFormValues>({
    resolver: zodResolver(schema),
    defaultValues: data ? resetProductToForm(data) : defaultValues,
  })

  const { reset } = formInstance

  useEffect(() => {
    if (!isLoading && data) {
      console.log('data', data)
      reset(resetProductToForm(data))
    }
  }, [isLoading, data, reset])

  const handleSave = formInstance.handleSubmit(async (values) => {
    if (!data) return
    try {
      const { data: product } = await updateProduct({
        name: values.name,
        description: values.description,
        id: data.id,
        categories: values.categories ?? [],
        gender: values.gender,
        media: Object.values(values.media),
        price: Number(values.price),
        sizes: values.sizes,
      })
      toast({
        variant: 'success',
        title: 'Product update success',
      })
      if (!product) {
        throw new Error('Product not found')
      }
      reset(resetProductToForm(product), {
        keepDirty: false,
        keepErrors: false,
        keepDirtyValues: false,
        keepTouched: false,
        keepIsValid: false,
      })
    } catch (e) {
      toast({
        variant: 'danger',
        title: 'Product update failed',
      })
    }
  })

  return (
    <>
      <FormProvider {...formInstance}>
        <Meta title={data?.name ?? 'Loading...'} />
        <form
          className="flex flex-col gap-8 mt-4 mb-[100px]"
          onSubmit={handleSave}
        >
          <div className="flex justify-between md:items-center flex-col md:flex-row gap-8">
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
                  Editing product
                </Typography>
              </div>
            </div>
            <div className="flex gap-4">
              <Button
                radius="full"
                isDisabled={formInstance.formState.isSubmitting}
                color="primary"
                startContent={<RiCheckLine size={16} />}
                type="submit"
              >
                Save Changes
              </Button>
            </div>
          </div>
          <div>
            <ProductFormView
              loading={formInstance.formState.isSubmitting}
              disabled={formInstance.formState.isSubmitting}
            />
          </div>
        </form>
      </FormProvider>
    </>
  )
}
