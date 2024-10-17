import type { Selection } from '@nextui-org/react'
import { useCallback, useState } from 'react'

interface UseProductTableParams<Key extends string, Data> {
  defaultRowsPerPage?: number
  defaultVisibleColumns?: Key[]
  items: Data[]
}

export const useProductTableState = <Key extends string, Data>(
  args: UseProductTableParams<Key, Data>,
) => {
  const { defaultRowsPerPage, items } = args

  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<Selection>(new Set<Key>([]))
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set<Key>([]),
  )
  const [rowsPerPage, setRowPerPage] = useState(defaultRowsPerPage ?? 5)
  const [page, setPage] = useState(1)

  const totalPages = Math.ceil(items.length / rowsPerPage)

  const onNextPage = useCallback(() => {
    if (page < totalPages) {
      setPage(page + 1)
    }
  }, [])

  const onPrevPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [])

  const onRowsPerPageChange = useCallback((rows: number) => {
    setRowPerPage(rows)
    setPage(1)
  }, [])

  const onSearchChange = useCallback((search: string) => {
    setSearch(search)
    setPage(1)
  }, [])

  return {
    search,
    onNextPage,
    onPrevPage,
    onSearchChange,
    selected,
    onSelectedChange: setSelected,
    visibleColumns,
    onVisibleColumnsChange: setVisibleColumns,
    rowsPerPage,
    onRowsPerPageChange,
    page,
    setPage,
  }
}
