import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { type Column } from '@tanstack/react-table'
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiEyeCloseLine,
  RiFilterLine,
} from 'react-icons/ri'

import { cn } from '@/utils/common'

interface ProductHeaderColumnProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function ProductHeaderColumn<TData, TValue>({
  column,
  title,
  className,
}: ProductHeaderColumnProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <DropdownMenu>
        <DropdownTrigger>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === 'desc' ? (
              <RiArrowDownSLine className="ml-2" size={16} />
            ) : column.getIsSorted() === 'asc' ? (
              <RiArrowUpSLine className="ml-2" size={16} />
            ) : (
              <RiFilterLine className="ml-2" size={16} />
            )}
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownItem onClick={() => column.toggleSorting(false)}>
            <RiArrowUpSLine className="mr-2" size={14} />
            Asc
          </DropdownItem>
          <DropdownItem onClick={() => column.toggleSorting(true)} showDivider>
            <RiArrowDownSLine className="mr-2" size={14} />
            Desc
          </DropdownItem>
          <DropdownItem onClick={() => column.toggleVisibility(false)}>
            <RiEyeCloseLine className="mr-2" size={14} />
            Hide
          </DropdownItem>
        </DropdownMenu>
      </DropdownMenu>
    </div>
  )
}
