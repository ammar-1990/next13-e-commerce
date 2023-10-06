"use client"


import { ColumnDef } from "@tanstack/react-table"

import CellActionColor from "./cell-action-color"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ColorColumn = {
  id: string,
  name: string,
  value:string,
 createdAt:string,
 
}
 
export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({row})=><div className="flex items-center justify-between w-full md:w-[40%]">{row.original.name} <div className="p-4 rounded-full border " style={{backgroundColor:`${row.original.value}`}} /></div>
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
 
  {
    id:'actions',
    cell: ({row}) => <CellActionColor data={row.original} />
  }


 
]