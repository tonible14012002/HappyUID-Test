import type { CheckboxProps } from '@nextui-org/react'
import { Checkbox } from '@nextui-org/react'

import { withForm } from './withForm'

export const FormCheckbox = withForm<boolean, CheckboxProps>(Checkbox)
