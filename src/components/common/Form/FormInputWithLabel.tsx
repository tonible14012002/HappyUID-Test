import type { InputProps } from '@nextui-org/react'

import { InputWithLabel } from '../InputWithLabel'

import { withForm } from './withForm'

export const FormInputWithLabel = withForm<string, InputProps>(InputWithLabel)
