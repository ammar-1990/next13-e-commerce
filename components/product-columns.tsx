"use client"


import { ColumnDef } from "@tanstack/react-table"
import CellActionProduct from "./cell-action-product"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string,
  name: string,
  price:string,
 createdAt:string,
isArchived:boolean,
isFeatured:boolean,
size:string,
color:string,
category:string
}
 
export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "isArchived",
    header: "Archived",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    
    header: "Color",
    cell: ({row})=><div className="p-2 rounded-full border h-3 w-3" style={{backgroundColor:row.original.color}}></div>
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
 
  {
    id:'actions',
    cell: ({row}) => <CellActionProduct data={row.original} />
  }


 
]