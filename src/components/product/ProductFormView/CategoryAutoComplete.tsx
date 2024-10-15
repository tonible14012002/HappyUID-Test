import type { InputProps } from '@nextui-org/react'
import {
  useDisclosure,
  Listbox,
  ListboxItem,
  Input,
  Chip,
  Button,
} from '@nextui-org/react'
import { useState } from 'react'
import { RiCloseLine } from 'react-icons/ri'

import { PopperCard } from '@/components/common/PopperCard'
import Typography from '@/components/common/Typography'

export type IItem = {
  label: string
  value: string
}

export interface CategoryAutoCompleteProps
  extends Omit<InputProps, 'value' | 'onChange' | 'isInvalid' | 'errMsg'> {
  value?: IItem[]
  onChange?: (value: IItem[]) => void
  isError?: boolean
  errorMessage?: string
}

export const BASE_CATEGORY = [
  {
    label: 'clothes',
    value: 'clothes',
  },
  {
    label: 'shoes',
    value: 'shoes',
  },
  {
    label: 'bags',
    value: 'bags',
  },
  {
    label: 'accessories',
    value: 'accessories',
  },
]

export const CategoryAutoComplete = (props: CategoryAutoCompleteProps) => {
  const [search, setSearch] = useState('')
  const { value: externalVal, onChange } = props
  const { onOpen, isOpen, onClose } = useDisclosure()

  const value = externalVal || []

  const filteredCategory = BASE_CATEGORY.filter(
    (category) =>
      category.label.toLowerCase().includes(search.toLowerCase()) &&
      !value.some((v) => v.value === category.value),
  )

  return (
    <div className="space-y-3">
      <Typography level="p5" color="textSecondary">
        Product Category
      </Typography>
      <PopperCard
        placement="bottom-start"
        isOpen={isOpen}
        onClose={onClose}
        renderContent={(setRef) => (
          <div
            ref={setRef}
            className="bg-content2 z-50 w-[300px] rounded-large"
          >
            <Listbox
              emptyContent={
                value.some((v) => v.label.toLocaleLowerCase() === search) ? (
                  <Typography level="p6" color="textTertiary">
                    No items.
                  </Typography>
                ) : (
                  <Typography level="p6" color="textTertiary">
                    {search ? "Add '" + search + "'" : 'No items.'}
                  </Typography>
                )
              }
            >
              {filteredCategory.map((category) => (
                <ListboxItem
                  key={category.value}
                  onClick={() => {
                    onChange?.([...value, category])
                  }}
                >
                  {category.label}
                </ListboxItem>
              ))}
            </Listbox>
          </div>
        )}
      >
        <Input
          errorMessage={props.isError ? props.errorMessage : ''}
          isInvalid={props.isError}
          size="lg"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              if (!search) return
              if (filteredCategory.length > 0) {
                onChange?.([...value, filteredCategory[0]])
                setSearch('')
                return
              }
              onChange?.([...value, { label: search, value: search }])
              setSearch('')
            }
          }}
          onClick={onOpen}
          value={search}
          onValueChange={setSearch}
          onFocus={() => {
            onOpen()
          }}
        />
      </PopperCard>
      <div className="flex flex-wrap gap-2">
        {value.map((category) => (
          <Chip
            endContent={
              <Button
                isIconOnly
                className="w-fit h-fit p-0 min-w-0"
                variant="light"
                color="primary"
              >
                <RiCloseLine
                  onClick={() => {
                    onChange?.(value.filter((v) => v.value !== category.value))
                  }}
                  size={14}
                />
              </Button>
            }
            color="primary"
            variant="flat"
            key={category.value}
          >
            {category.label}
          </Chip>
        ))}
      </div>
    </div>
  )
}
