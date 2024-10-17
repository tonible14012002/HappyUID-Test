import type { MediaMeta } from '@/components/product/ProductFormView/constant'
import type { ProductMediaPickerProps } from '@/components/product/ProductFormView/ProductMediaPicker'
import { ProductMediaPicker } from '@/components/product/ProductFormView/ProductMediaPicker'

import { withForm } from './withForm'

export const FormMediaPicker = withForm<
  Record<string, MediaMeta>,
  ProductMediaPickerProps
>(ProductMediaPicker, {
  getErrMsg(errorMessage) {
    return { errorMessage }
  },
  getIsInvalid(isError) {
    return { isError }
  },
  getOnValueChange(onChange) {
    return {
      onChange,
    }
  },
})
