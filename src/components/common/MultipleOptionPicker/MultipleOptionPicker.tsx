import { ButtonGroup, Button } from '@nextui-org/react'

import Typography from '../Typography'

export interface MultipleOptionPickerProps {
  value?: string[]
  onChange?: (value: string[]) => void
  options?: { label: string; value: string }[]
  title?: string
  description?: string
}

export const MultipleOptionPicker = (props: MultipleOptionPickerProps) => {
  const { value, onChange, options, title, description } = props
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
      <ButtonGroup>
        {options?.map((option) => (
          <Button
            color={value?.includes(option.value) ? 'primary' : 'default'}
            onClick={() => {
              if (onChange) {
                if (value?.includes(option.value)) {
                  onChange(value.filter((v) => v !== option.value))
                } else {
                  onChange([...(value || []), option.value])
                }
              }
            }}
          >
            {option.label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  )
}
