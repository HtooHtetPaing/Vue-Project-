import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import { ColumnDef } from '@tanstack/vue-table' 
import { h } from 'vue'
import { Button } from '../../../components/ui/button'
import { SaleReportType } from '@/api/sale/types'
import { queryOptions } from '@tanstack/vue-query'

export const columns: ColumnDef<SaleReportType>[] = [
  {
    accessorKey: 'No',
    header: () => h('div', { class: 'text-center' }, 'No.'),
    cell: ({ row }) => {
      const id =  row.index + 1

      return h('div', { class: 'text-center font-medium' }, id)
    },
  },
  {
      accessorKey: 'orderID',
      header: () => h('div', { class: 'text-center' }, 'Order Code'),
      cell: ({ row }) => {
          const code = (row.getValue('orderID') as string).toUpperCase()
          
          return h('div', { class: 'text-center font-medium' }, code)
        },
    },
    {
      accessorKey: 'productID',
      header: ({ column }) => {
        return h(Button, {
            variant: 'ghost',
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Product ID', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
      cell: ({ row }) => {
        const name = (row.getValue('productID') as string).toUpperCase()
  
        return h('div', { class: 'text-right font-medium' }, name)
      },
    },
    {
      accessorKey: 'quantity',
      header: ({ column }) => {
        return h(Button, {
            variant: 'ghost',
            onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
        }, () => ['Quantity', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
    },
      cell: ({ row }) => {
        const quantity = row.getValue('quantity') as string
  
        return h('div', { class: 'text-right font-medium' }, quantity)
      },
    },
  
]