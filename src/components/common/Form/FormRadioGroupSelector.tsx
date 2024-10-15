import type { RadioGroupSelectorProps } from '../RadioGroupSelector'
import { RadioGroupSelector } from '../RadioGroupSelector'

import { withForm } from './withForm'

export const FormRadioGroupSelector = withForm<string, RadioGroupSelectorProps>(
  RadioGroupSelector,
)
