import { RadioGroup, Radio } from '@nextui-org/react'

import Typography from '../Typography'

export interface RadioGroupSelectorProps {
  value?: string
  onValueChange?: (value: string) => void
  options?: { label: string; value: string }[]
  title?: string
  description?: string
}

export const RadioGroupSelector = (props: RadioGroupSelectorProps) => {
  const { value, onValueChange, options, title, description } = props
  return (
    <div className="space-y-3 w-full">
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
        classNames={{
          wrapper: 'gap-6',
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
