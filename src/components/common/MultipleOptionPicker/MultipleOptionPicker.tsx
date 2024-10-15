import { ButtonGroup, Button } from '@nextui-org/react'

import Typography from '../Typography'

export interface MultipleOptionPickerProps {
  value?: string[]
  onChange?: (value: string[]) => void
  options?: { label: string; value: string }[]
  title?: string
  description?: string
  disabled?: boolean
  isError?: boolean
  errorMessage?: string
}

export const MultipleOptionPicker = (props: MultipleOptionPickerProps) => {
  const {
    value,
    onChange,
    options,
    title,
    description,
    disabled,
    isError,
    errorMessage,
  } = props
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
      <ButtonGroup isDisabled={disabled}>
        {options?.map((option) => (
          <Button
            key={option.value}
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
      {isError && (
        <Typography level="p6" color="danger" className="mt-2" component="p">
          {errorMessage}
        </Typography>
      )}
    </div>
  )
}
