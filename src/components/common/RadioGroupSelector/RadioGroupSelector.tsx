import { RadioGroup, Radio } from '@nextui-org/react'

import { cn } from '@/utils/common'

import Typography from '../Typography'

export interface RadioGroupSelectorProps {
  value?: string
  onValueChange?: (value: string) => void
  options?: { label: string; value: string }[]
  title?: string
  description?: string
  disabled?: boolean
  classNames?: {
    base?: string
    radioGroup?: string
  }
}

export const RadioGroupSelector = (props: RadioGroupSelectorProps) => {
  const {
    value,
    onValueChange,
    options,
    title,
    description,
    disabled,
    classNames,
  } = props
  const { base, radioGroup } = classNames ?? {}
  return (
    <div className={cn('space-y-3 w-full', base)}>
      <div className="space-y-1">
        <Typography level="p5" color="textSecondary">
          {title}
        </Typography>
        {description && (
          <Typography level="p6" color="textTertiary">
            {description}
          </Typography>
        )}
      </div>
      <RadioGroup
        onValueChange={onValueChange}
        value={value}
        orientation="horizontal"
        isDisabled={disabled}
        classNames={{
          wrapper: cn('gap-6', radioGroup),
        }}
      >
        {options?.map((option) => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </RadioGroup>
    </div>
  )
}
