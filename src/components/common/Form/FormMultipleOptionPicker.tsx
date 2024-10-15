import type { MultipleOptionPickerProps } from '../MultipleOptionPicker'
import { MultipleOptionPicker } from '../MultipleOptionPicker'

import { withForm } from './withForm'

export const FormMultipleOptionPicker = withForm<
  string[],
  MultipleOptionPickerProps
>(MultipleOptionPicker, {
  getOnValueChange(onChange) {
    return {
      onChange,
    }
  },
})
