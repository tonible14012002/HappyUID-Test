import { FormInputWithLabel } from '@/components/common/Form/FormInputWithLabel'
import { FormMultipleOptionPicker } from '@/components/common/Form/FormMultipleOptionPicker'
import { FormRadioGroupSelector } from '@/components/common/Form/FormRadioGroupSelector'
import { FormRichTextEditor } from '@/components/common/Form/FormRichTextEditor'
import { withForm } from '@/components/common/Form/withForm'
import Typography from '@/components/common/Typography'

import { CategoryAutoComplete } from './CategoryAutoComplete'
import type { IItem, CategoryAutoCompleteProps } from './CategoryAutoComplete'
import type { MediaMeta } from './constant'
import { GenderEnum } from './constant'
import { ProductFormSection } from './ProductFormSection'
import type { ProductMediaPickerProps } from './ProductMediaPicker'
import { ProductMediaPicker } from './ProductMediaPicker'

export const ADD_PRODUCT_KEY = 'ADD_PRODUCT_KEY'

const FormMediaPicker = withForm<
  Record<string, MediaMeta>,
  ProductMediaPickerProps
>(ProductMediaPicker, {
  getOnValueChange(onChange) {
    return {
      onChange,
    }
  },
})

const FormCategoryAutoComplete = withForm<IItem[], CategoryAutoCompleteProps>(
  CategoryAutoComplete,
  {
    getOnValueChange(onChange) {
      return {
        onChange,
      }
    },
    getErrMsg(errorMessage) {
      return { errorMessage }
    },
    getIsInvalid(isError) {
      return { isError }
    },
  },
)

interface ProductFormViewProps {
  loading?: boolean
  disabled?: boolean
}

export const ProductFormView = ({
  loading,
  disabled,
}: ProductFormViewProps) => {
  return (
    <div className="md:grid lg:grid-cols-[2fr_400px] flex flex-col gap-8 max-w-full">
      <div className="flex flex-col overflow-x-hidden gap-8">
        <ProductFormSection title="Description" className="max-w-full">
          <FormInputWithLabel
            isDisabled={loading || disabled}
            name="name"
            label="Product Name"
            size="lg"
            isRequired
          />
          <FormRichTextEditor
            isReadOnly={loading || disabled}
            name="description"
            label="Product Description"
            isRequired
          />
          <div className="lg:flex-col flex xl:flex-row gap-6 md:flex-row flex-col">
            <FormMultipleOptionPicker
              disabled={loading || disabled}
              title="Sizes"
              description="Pick available sizes"
              name="sizes"
              options={[
                { label: 'S', value: 'S' },
                { label: 'M', value: 'M' },
                { label: 'L', value: 'L' },
                { label: 'XL', value: 'XL' },
              ]}
            />
            <FormRadioGroupSelector
              disabled={loading || disabled}
              title="Gender"
              description="Pick available gender"
              name="gender"
              classNames={{
                radioGroup: 'xl:mt-2 lg:mt-0 md:mt-2 mt-0',
              }}
              options={[
                {
                  label: 'Male',
                  value: GenderEnum.Male,
                },
                {
                  label: 'Female',
                  value: GenderEnum.Female,
                },
                {
                  label: 'Unisex',
                  value: GenderEnum.Unisex,
                },
              ]}
            />
          </div>
        </ProductFormSection>
        <ProductFormSection title="Price" className="max-w-full">
          <FormInputWithLabel
            name="price"
            label="Select price"
            size="lg"
            isDisabled={loading || disabled}
            isRequired
          />
          <Typography color="textTertiary" level="p5">
            Price unit: $
          </Typography>
        </ProductFormSection>
      </div>
      <div className="flex flex-col gap-8">
        <ProductFormSection className="h-fit" title="Upload Image">
          <FormMediaPicker name="media" />
        </ProductFormSection>
        <ProductFormSection className="h-fit" title="Category">
          <FormCategoryAutoComplete
            name="categories"
            disabled={loading || disabled}
          />
        </ProductFormSection>
      </div>
    </div>
  )
}
