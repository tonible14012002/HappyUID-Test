import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

import { FormInputWithLabel } from '@/components/common/Form/FormInputWithLabel'
import { FormMultipleOptionPicker } from '@/components/common/Form/FormMultipleOptionPicker'
import { FormRadioGroupSelector } from '@/components/common/Form/FormRadioGroupSelector'
import { RichTextWithLabel } from '@/components/common/Form/FormRichTextEditor'

import { GenderEnum, type ProductFormValues } from './constant'
import { ProductFormSection } from './ProductFormSection'
import { ProductMediaPicker } from './ProductMediaPicker'

export const ProductFormView = () => {
  const formInstance = useForm<ProductFormValues>({
    defaultValues: {
      name: '',
      sizes: [],
      gender: GenderEnum.Female,
    },
  })
  const [text, setText] = useState('')
  console.log('text', formInstance.watch())
  return (
    <FormProvider {...formInstance}>
      <div className="md:grid lg:grid-cols-[3fr_2fr] flex flex-col gap-8">
        <ProductFormSection title="Description">
          <FormInputWithLabel name="name" label="Product Name" size="lg" />
          <RichTextWithLabel
            label="Product Description"
            value={text}
            onChange={setText}
          />
          <FormMultipleOptionPicker
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
            title="Gender"
            description="Pick available gender"
            name="gender"
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
        </ProductFormSection>
        <ProductFormSection className="h-fit" title="Upload Image">
          <ProductMediaPicker />
        </ProductFormSection>
      </div>
    </FormProvider>
  )
}
