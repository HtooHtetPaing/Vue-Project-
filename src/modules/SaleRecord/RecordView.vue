 <script setup>
import { fetchSaleReport } from '@/api/sale/queires';
// import { Table, TableBody, TableCell, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import  DataTable  from '@/components/datatable/DataTable.vue'
const { data:records } = fetchSaleReport.useQuery()
import {columns} from './Chunks/Column'
</script>


<template>
    <div class="container mx-auto px-4 py-8">
      <main class="w-full">
        <div class="bg-white rounded-lg shadow-lg overflow-hidden">
          <!-- <Table class="min-w-full table-auto">
            <TableCaption class="text-xl font-semibold text-gray-700 mb-4">Your Recent Invoices</TableCaption>
            <TableHeader>
              <TableRow class="bg-gray-200 text-sm text-left text-gray-600">
                <TableHead class="px-4 py-2 font-semibold">No.</TableHead>
                <TableHead class="px-4 py-2 font-semibold">Product Code</TableHead>
                <TableHead class="px-4 py-2 font-semibold">Product Name</TableHead>
                <TableHead class="px-4 py-2 font-semibold">Quantity</TableHead>
                
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="(record, index) in records" :key="record.orderID" class="border-t border-gray-200 hover:bg-gray-50">
                <TableCell class="px-4 py-2">{{ index + 1 }}</TableCell>
                <TableCell class="px-4 py-2">{{ record.orderID }}</TableCell>
                <TableCell class="px-4 py-2">{{ record.productID }}</TableCell>
                <TableCell class="px-4 py-2">{{ record.quantity }}</TableCell>
               
              </TableRow>
            </TableBody>
          </Table> -->
          <DataTable :columns="columns" :data="records || []" />
        </div>
      </main>
    </div>
  </template>
  

