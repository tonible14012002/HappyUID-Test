import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Listbox,
  ListboxItem,
  ListboxSection,
  Tooltip,
} from '@nextui-org/react'
import { useMemo } from 'react'
import { RiCheckLine, RiFilterLine } from 'react-icons/ri'

import type { Product } from '@/types/schema'

export interface ProductCategoryFilterProps {
  categories: Product['categories']
  categoryFilter: Set<string>
  onCategoryFilterChange: (categoryFilter: Set<string>) => void
}

export const ProductCategoryFilter = (props: ProductCategoryFilterProps) => {
  const { categories, categoryFilter, onCategoryFilterChange } = props
  const isAll = categoryFilter.size === categories.length

  const toShowCategories = useMemo(
    () => categories.filter((category) => categoryFilter.has(category.value)),
    [categories, categoryFilter],
  )

  return (
    <div className="flex gap-2">
      <Dropdown>
        <DropdownTrigger>
          <Button
            startContent={<RiFilterLine size={14} />}
            variant="flat"
            endContent={
              categoryFilter.size !== 0 ? (
                <Tooltip
                  placement="bottom-start"
                  content={
                    <Listbox
                      variant="light"
                      color="primary"
                      className="min-w-[200px]"
                    >
                      <ListboxSection title="Applied categories">
                        {toShowCategories.map((category) => (
                          <ListboxItem
                            key={category.value}
                            endContent={<RiCheckLine size={14} />}
                          >
                            {category.label}
                          </ListboxItem>
                        ))}
                      </ListboxSection>
                    </Listbox>
                  }
                >
                  <Chip className="mr-2" size="sm" color="primary">
                    {categoryFilter.size}
                  </Chip>
                </Tooltip>
              ) : null
            }
          >
            Categories
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          selectedKeys={isAll ? 'all' : categoryFilter}
          closeOnSelect={false}
          onSelectionChange={(keys) => {
            if (keys === 'all') {
              onCategoryFilterChange(
                new Set(categories.map((category) => category.value)),
              )
              return
            }
            onCategoryFilterChange(keys as Set<string>)
          }}
          selectionMode="multiple"
        >
          <DropdownSection title="Categories">
            {categories.map((category) => (
              <DropdownItem key={category.value} value={category.value}>
                {category.label}
              </DropdownItem>
            ))}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
    </div>
  )
}
