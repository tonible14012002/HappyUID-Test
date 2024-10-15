import type { InputProps } from '@nextui-org/react'
import { Input } from '@nextui-org/react'

import { cn } from '@/utils/common'

import Typography from '../Typography'

export const InputWithLabel = (
  props: InputProps & { wrapperClassName?: string },
) => {
  const { label, isRequired, wrapperClassName, ...rest } = props
  return (
    <label className={cn('space-y-3 block', wrapperClassName)}>
      <Typography level="p5" color="textSecondary">
        {label} {isRequired ? '*' : ''}
      </Typography>
      <Input {...rest} isRequired={isRequired} />
    </label>
  )
}
