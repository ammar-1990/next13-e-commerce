"use client"


import { ColumnDef } from "@tanstack/react-table"
import CellActionCategory from "./cell-action-category"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
  id: string,
  name: string,
  billboardLabel:string,
 createdAt:string,
 
}
 
export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "billboardLabel",
    header: "Billboard",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
 
  {
    id:'actions',
    cell: ({row}) => <CellActionCategory data={row.original} />
  }


 
]