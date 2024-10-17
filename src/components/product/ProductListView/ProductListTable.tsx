import type { Selection, SortDescriptor } from '@nextui-org/react'
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
  Image,
  Tooltip,
  useDisclosure,
  Skeleton,
} from '@nextui-org/react'
import type { ChangeEvent } from 'react'
import { Fragment, useCallback, useMemo, useState } from 'react'
import {
  RiAddLine,
  RiArrowDownSLine,
  RiDeleteBinLine,
  RiEyeLine,
  RiMoreLine,
  RiSearchLine,
} from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'

import Typography from '@/components/common/Typography'
import { ROUTES } from '@/pages/routes'
import type { Product } from '@/types/schema'
import { cn } from '@/utils/common'

import { DeleteProductModal } from '../DeleteProductModal'

import { ProductCategoryFilter } from './ProductCategoryFilter'

const INITIAL_VISIBLE_COLUMNS = [
  'media',
  'name',
  'price',
  'categories',
  'actions',
]

const columns = [
  { name: 'IMAGE', uid: 'media', sortable: false },
  { name: 'NAME', uid: 'name', sortable: true },
  { name: 'PRICE', uid: 'price', sortable: false },
  { name: 'CATEGORY', uid: 'categories', sortable: false },
  { name: 'ACTIONS', uid: 'actions' },
]

interface ProductTableProps {
  products: Product[]
  mutate?: () => void
  isLoading?: boolean
}

export const ProductListTable = (props: ProductTableProps) => {
  const { products, mutate, isLoading } = props
  const navigate = useNavigate()

  const {
    isOpen: isOpenDeleteProduct,
    onOpen: onOpenDeleteProduct,
    onClose: onCloseDeleteProducts,
  } = useDisclosure()

  const [toDeleteProducts, setToDeleteProducts] = useState<Product[]>([])

  const handleOpenDeteleProduct = useCallback((products: Product[]) => {
    onOpenDeleteProduct()
    setToDeleteProducts(products)
  }, [])

  const [filterValue, setFilterValue] = useState('')
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]))
  const [visibleColumns, setVisibleColumns] = useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  )
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: 'name',
    direction: 'ascending',
  })

  const [filterCategories, setFilterCategories] = useState<Set<string>>(
    new Set(),
  )

  const onFilterCategoryChange = useCallback((_: Set<string>) => {
    setPage(1)
    setFilterCategories(_)
  }, [])

  const [page, setPage] = useState(1)

  const hasSearchFilter = Boolean(filterValue)

  const headerColumns = useMemo(() => {
    if (visibleColumns === 'all') return columns
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    )
  }, [visibleColumns])

  const filteredItems = useMemo(() => {
    let filteredProducts = [...products]

    if (hasSearchFilter) {
      filteredProducts = filteredProducts.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      )
    }
    if (filterCategories.size > 0) {
      return filteredProducts.filter((product) => {
        return product.categories.some((category) =>
          filterCategories.has(category.value),
        )
      })
    }
    return filteredProducts
  }, [products, filterValue, filterCategories])

  const allCategories = useMemo(() => {
    return Object.values(
      products.reduce(
        (acc, product) => {
          product.categories.forEach((category) => {
            if (acc[category.value]) {
              return
            }
            acc[category.value] = category
          })
          return acc
        },
        {} as Record<string, Product['categories'][number]>,
      ),
    )
  }, [products])

  const pages = Math.ceil(filteredItems.length / rowsPerPage)

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage
    const end = start + rowsPerPage

    return filteredItems.slice(start, end)
  }, [page, filteredItems, rowsPerPage])

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Product, b: Product) => {
      const first = a[sortDescriptor.column as keyof Product] as number
      const second = b[sortDescriptor.column as keyof Product] as number
      const cmp = first < second ? -1 : first > second ? 1 : 0

      return sortDescriptor.direction === 'descending' ? -cmp : cmp
    })
  }, [sortDescriptor, items])

  const renderCell = useCallback(
    (product: Product, columnKey: keyof Product) => {
      switch (columnKey) {
        case 'name':
          return (
            <Typography
              className="!text-inherit line-clamp-2 break-words"
              color="primary"
            >
              {product.name}
            </Typography>
          )
        case 'media':
          const media = product.media[0]
          const isMore = product.media.length > 1
          if (!media)
            return (
              <div className="w-[50px] h-[50px] bg-content2 rounded-large" />
            )
          const Wrapper = isMore ? Tooltip : Fragment
          return (
            <Wrapper
              placement="right-start"
              closeDelay={100}
              showArrow
              content={
                <div className="flex gap-2 p-4 rounded-large max-w-[440px] overflow-x-auto">
                  {product.media.map((media) => (
                    <div
                      className="w-[140px] h-[140px] relative shrink-0"
                      key={media.url}
                    >
                      <Image
                        radius="sm"
                        loading="lazy"
                        src={media.url ?? ''}
                        alt="cover image"
                        classNames={{
                          wrapper: 'h-full w-full !max-w-full',
                          img: '!my-0',
                        }}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              }
            >
              <div className="w-[50px] h-[50px] relative">
                <Image
                  radius="sm"
                  loading="lazy"
                  src={media.url ?? ''}
                  alt="cover image"
                  classNames={{
                    wrapper: 'h-full w-full !max-w-full',
                    img: '!my-0',
                  }}
                  className="h-full w-full object-cover"
                />
              </div>
            </Wrapper>
          )
        case 'categories':
          const categories =
            product.categories.length > 4
              ? product.categories.slice(0, 4)
              : product.categories
          const remainingCategories = Math.max(product.categories.length - 4, 0)
          return (
            <div className="max-w-[300px] flex gap-3">
              {categories.map((category) => (
                <Chip
                  key={category.value}
                  className="capitalize"
                  color="primary"
                  size="sm"
                  variant="flat"
                >
                  {category.label}
                </Chip>
              ))}
              {remainingCategories > 0 && (
                <Tooltip
                  content={
                    <div className="flex gap-2">
                      {product.categories
                        .slice(-remainingCategories)
                        .map((c) => (
                          <Chip
                            key={c.value}
                            className="capitalize"
                            color="primary"
                            size="sm"
                            variant="flat"
                          >
                            {c.label}
                          </Chip>
                        ))}
                    </div>
                  }
                >
                  <Chip className="capitalize" size="sm" variant="flat">
                    +{remainingCategories}
                  </Chip>
                </Tooltip>
              )}
            </div>
          )
        case 'price':
          return (
            <Chip className="capitalize" size="sm" variant="flat">
              $ {product.price}
            </Chip>
          )
        default:
          return (
            <div className="relative flex justify-end items-center gap-2">
              <Dropdown>
                <DropdownTrigger>
                  <Button isIconOnly size="sm" variant="light">
                    <RiMoreLine size={16} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  onAction={(e) => {
                    if (e === 'delete') {
                      handleOpenDeteleProduct([product])
                    }
                    if (e === 'view') {
                      navigate(ROUTES.PRODUCT_DETAIL({ id: product.id }))
                    }
                  }}
                >
                  <DropdownItem endContent={<RiEyeLine size={16} />} key="view">
                    View
                  </DropdownItem>
                  <DropdownItem
                    endContent={<RiDeleteBinLine size={16} />}
                    color="danger"
                    key="delete"
                  >
                    Delete
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          )
      }
    },
    [],
  )

  const onNextPage = useCallback(() => {
    if (page < pages) {
      setPage(page + 1)
    }
  }, [page, pages])

  const onPreviousPage = useCallback(() => {
    if (page > 1) {
      setPage(page - 1)
    }
  }, [page])

  const onRowsPerPageChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value))
      setPage(1)
    },
    [],
  )

  const onSearchChange = useCallback((value?: string) => {
    if (value) {
      setFilterValue(value)
      setPage(1)
    } else {
      setFilterValue('')
    }
  }, [])

  const onClear = useCallback(() => {
    setFilterValue('')
    setPage(1)
  }, [])

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-start md:items-end md:flex-row flex-col-reverse">
          <div className="flex gap-3 items-center">
            <Input
              isClearable
              className="w-full sm:max-w-[300px]"
              placeholder="Search by name..."
              startContent={<RiSearchLine size={16} />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <ProductCategoryFilter
              categoryFilter={filterCategories}
              categories={allCategories}
              onCategoryFilterChange={onFilterCategoryChange}
            />
            {(selectedKeys === 'all' || selectedKeys.size > 0) && (
              <Button
                isIconOnly
                color="danger"
                variant="solid"
                onClick={() => {
                  if (selectedKeys === 'all') {
                    handleOpenDeteleProduct(filteredItems)
                    return
                  }
                  handleOpenDeteleProduct(
                    filteredItems.filter((item) => selectedKeys.has(item.id)),
                  )
                }}
              >
                <RiDeleteBinLine size={16} />
              </Button>
            )}
          </div>
          <div className="flex gap-3">
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<RiArrowDownSLine size={12} />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem
                    key={column.uid}
                    className="capitalize"
                    classNames={{
                      title: 'capitalize',
                    }}
                  >
                    {column.name.toLocaleLowerCase()}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              endContent={<RiAddLine size={16} />}
              as={Link}
              to={ROUTES.ADD_PRODUCT}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {items.length} products
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    )
  }, [
    filterValue,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    items.length,
    hasSearchFilter,
    filterCategories,
    selectedKeys,
  ])

  const bottomContent = useMemo(() => {
    if (filteredItems.length === 0) return <div className="h-[52px]" />
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === 'all'
            ? 'All items selected'
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    )
  }, [selectedKeys, items.length, page, pages, hasSearchFilter])

  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: 'min-h-[406px]',
        }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
        onRowAction={(item) => {
          navigate(ROUTES.PRODUCT_DETAIL({ id: item as string }))
        }}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === 'actions' ? 'center' : 'start'}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={
            isLoading ? (
              <div className="w-full flex-col gap-8 flex mt-4">
                <Skeleton className="h-[30px] w-full rounded-large" />
                <Skeleton className="h-[30px] w-full rounded-large" />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Typography className="!text-inherit">
                  No products found
                </Typography>
                <Button
                  color="primary"
                  endContent={<RiAddLine size={16} />}
                  as={Link}
                  to={ROUTES.ADD_PRODUCT}
                >
                  Add New
                </Button>
              </div>
            )
          }
          items={sortedItems}
        >
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell
                  className={cn({
                    'max-w-[240px]': (columnKey as keyof Product) === 'name',
                  })}
                >
                  {/* @ts-ignore -- TODO: Fix this */}
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DeleteProductModal
        onDeleteDone={mutate}
        toDeleteProducts={toDeleteProducts}
        onClose={onCloseDeleteProducts}
        isOpen={isOpenDeleteProduct}
      />
    </>
  )
}
