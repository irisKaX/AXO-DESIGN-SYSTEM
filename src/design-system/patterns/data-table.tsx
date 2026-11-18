import { useTable } from '@tanstack/react-table'
import type { ColumnDef, RowData } from '@tanstack/react-table'
import { dataTableFeatures } from './data-table-features'
import type { DataTableFeatures } from './data-table-features'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '../components/table'
import { Button } from '../components/button'
import { Input } from '../components/input'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from '../components/dropdown-menu'

export interface DataTableProps<T extends RowData> {
  columns: ColumnDef<DataTableFeatures, T>[]
  data: T[]
  filterColumn?: string
  caption: string
  pageSize?: number
  emptyMessage?: string
  getRowId?: (row: T, index: number) => string
}

/** Generic composition following the official shadcn TanStack Table v9 guide. */
export function DataTable<T extends RowData>({ columns, data, filterColumn, caption, pageSize = 5, emptyMessage = 'Žádné výsledky.', getRowId }: DataTableProps<T>) {
  const table = useTable({ features: dataTableFeatures, data, columns, getRowId, initialState: { pagination: { pageIndex: 0, pageSize } } })
  const filter = filterColumn ? table.getColumn(filterColumn) : undefined
  return <div className="min-w-0 space-y-4">
    <div className="flex flex-wrap items-center gap-3">
      {filter && <Input aria-label={`Filtrovat: ${caption}`} placeholder="Hledat…" className="max-w-sm" value={String(filter.getFilterValue() ?? '')} onChange={event => filter.setFilterValue(event.target.value)} />}
      <DropdownMenu><DropdownMenuTrigger asChild><Button type="button" variant="outline">Sloupce</Button></DropdownMenuTrigger>
        <DropdownMenuContent>{table.getAllLeafColumns().filter(column => column.getCanHide()).map(column => <DropdownMenuCheckboxItem key={column.id} checked={column.getIsVisible()} onCheckedChange={value => column.toggleVisibility(value)}>{column.id}</DropdownMenuCheckboxItem>)}</DropdownMenuContent>
      </DropdownMenu>
    </div>
    <div className="overflow-hidden rounded-lg border"><Table>
      <TableCaption>{caption}</TableCaption>
      <TableHeader>{table.getHeaderGroups().map(group => <TableRow key={group.id}>{group.headers.map(header => <TableHead key={header.id} aria-sort={header.column.getIsSorted() === 'asc' ? 'ascending' : header.column.getIsSorted() === 'desc' ? 'descending' : undefined}>
        {header.isPlaceholder ? null : header.column.getCanSort() ? <Button type="button" variant="ghost" size="sm" onClick={header.column.getToggleSortingHandler()}><table.FlexRender header={header} />{header.column.getIsSorted() === 'asc' ? ' ↑' : header.column.getIsSorted() === 'desc' ? ' ↓' : ' ↕'}</Button> : <table.FlexRender header={header} />}
      </TableHead>)}</TableRow>)}</TableHeader>
      <TableBody>{table.getRowModel().rows.length ? table.getRowModel().rows.map(row => <TableRow key={row.id} data-state={row.getIsSelected() ? 'selected' : undefined}>{row.getVisibleCells().map(cell => <TableCell key={cell.id}><table.FlexRender cell={cell} /></TableCell>)}</TableRow>) : <TableRow><TableCell colSpan={table.getVisibleLeafColumns().length} className="h-24 text-center">{emptyMessage}</TableCell></TableRow>}</TableBody>
    </Table></div>
    <div className="flex flex-wrap items-center justify-between gap-3">
      <p className="text-sm text-muted-foreground" role="status">Strana {table.state.pagination.pageIndex + 1} z {Math.max(1, table.getPageCount())} · Vybráno {table.getSelectedRowModel().rows.length}</p>
      <div className="flex gap-2"><Button type="button" variant="outline" size="sm" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>Předchozí</Button><Button type="button" variant="outline" size="sm" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>Další</Button></div>
    </div>
  </div>
}
