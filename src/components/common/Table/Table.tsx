import {
  TableRow,
  TableCell,
  Skeleton,
  Table,
  TableHeader,
  TableBody,
} from '@nextui-org/react'
import {
  useReactTable,
  flexRender,
  // eslint-disable-next-line import/named
  getCoreRowModel,
  // eslint-disable-next-line import/named
  getFilteredRowModel,
  // eslint-disable-next-line import/named
  getPaginationRowModel,
  // eslint-disable-next-line import/named
  getSortedRowModel,
  // eslint-disable-next-line import/named
  getFacetedRowModel,
  // eslint-disable-next-line import/named
  getFacetedUniqueValues,
} from '@tanstack/react-table'
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from '@tanstack/react-table'
import type { ReactNode } from 'react'
import { useState } from 'react'

import Typography from '../Typography'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading?: boolean
  setPageSize?: (pageSize: number) => void
  setPageIndex?: (pageIndex: number) => void
  toolbar?: ReactNode
}

export function TableGrid<TData, TValue>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({})
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const renderRows = isLoading ? (
    Array(5)
      .fill(undefined)
      .map((_, index) => (
        <TableRow key={index}>
          {columns.map((_, index) => (
            <TableCell className="text-center" key={index} colSpan={1}>
              <Skeleton className="h-5 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))
  ) : (
    <>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))
      ) : (
        <TableRow>
          <TableCell colSpan={columns.length} className="text-center">
            <Typography level="p5" color="textTertiary">
              No results.
            </Typography>
          </TableCell>
        </TableRow>
      )}
    </>
  )

  return (
    <div className="space-y-4">
      {/* <ClientTableToolbar table={table} /> */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHeader key={header.id} colSpan={header.colSpan}>
                    {/* @ts-expect-error -- Ignore */}
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHeader>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>{renderRows}</TableBody>
      </Table>
      {/* <ClientTablePagination
        table={table}
        onPageSizeChange={setPageSize}
        onPageIndexChange={setPageIndex}
      /> */}
    </div>
  )
}
