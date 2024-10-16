import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { FormProvider, useForm, useFormContext } from 'react-hook-form'
import { RiArrowLeftSLine, RiCheckLine, RiSave2Line } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import type { DebouncedState } from 'use-debounce'

import { Meta } from '@/components/common/Meta'
import Typography from '@/components/common/Typography'
import { ProductFormView } from '@/components/product/ProductFormView'
import {
  defaultValues,
  schema,
  type ProductFormValues,
} from '@/components/product/ProductFormView/constant'
import { usePersistForm } from '@/hooks/usePersistForm'
import { useTimeOut } from '@/hooks/useTimeOut'
import { useToast } from '@/hooks/useToast'
import { generateUUID } from '@/libs/uuid'
import { useCreateProductMutation } from '@/stores/product'

import { ROUTES } from '../routes'

export const ADD_PRODUCT_KEY = 'ADD_PRODUCT_KEY'

export const ProductAdd = () => {
  const [createProduct] = useCreateProductMutation()
  const navigate = useNavigate()

  const { toast } = useToast()
  const { persistDataLocalStore, loadInitData, clearData } =
    usePersistForm<ProductFormValues>({
      key: ADD_PRODUCT_KEY,
    })

  const [savedDraft, setSavedDraft] = useState(false)
  useTimeOut(savedDraft, setSavedDraft, false, 4000)

  const handlePersistDataLocalStore = () => {
    setSavedDraft(true)
    persistDataLocalStore(formInstance.getValues())
  }

  const formInstance = useForm<ProductFormValues>({
    resolver: zodResolver(schema),
    defaultValues: loadInitData(defaultValues),
  })

  const handleSave = formInstance.handleSubmit(async (values) => {
    console.log(values.categories)
    try {
      await createProduct({
        name: values.name,
        description: values.description,
        id: generateUUID(),
        categories: values.categories ?? [],
        gender: values.gender,
        media: Object.values(values.media),
        price: Number(values.price),
        sizes: values.sizes,
      })
      navigate(ROUTES.PRODUCT_LIST)
      clearData()
      toast({
        variant: 'success',
        title: 'Product added',
      })
    } catch (e) {
      toast({
        variant: 'danger',
        title: 'Product added failed',
      })
    }
  })

  console.log(formInstance.formState.errors)

  return (
    <FormProvider {...formInstance}>
      <Meta title="Add product" />
      <ProductAutoSaveDraft debounceSaveDraft={persistDataLocalStore} />
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
                Add New Product
              </Typography>
            </div>
          </div>
          <div className="flex gap-4">
            <Button
              radius="full"
              isDisabled={formInstance.formState.isSubmitting}
              startContent={
                savedDraft ? (
                  <RiCheckLine size={16} />
                ) : (
                  <RiSave2Line size={16} />
                )
              }
              variant="flat"
              onClick={handlePersistDataLocalStore}
            >
              Save Draf
            </Button>
            <Button
              radius="full"
              isDisabled={formInstance.formState.isSubmitting}
              color="primary"
              startContent={<RiCheckLine size={16} />}
              type="submit"
            >
              Add Product
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
  )
}

const ProductAutoSaveDraft = ({
  debounceSaveDraft,
}: {
  debounceSaveDraft: DebouncedState<(value: ProductFormValues) => void>
}) => {
  const formInstance = useFormContext<ProductFormValues>()
  const values = formInstance.watch()

  useEffect(() => {
    debounceSaveDraft(values)
  }, [values])

  return null
}
