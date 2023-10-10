"use client"


import { ColumnDef } from "@tanstack/react-table"
import CellActionProduct from "./cell-action-product"
import Image from "next/image"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductColumn = {
  id: string,
  name: string,
  price:string,
  describtion:string,
 createdAt:string,
isArchived:boolean,
isFeatured:boolean,
size:string,
color:string,
category:string
image:string
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
    accessorKey: "describtion",
    header: "Describtion",
    cell: ({row})=><p  className="text-xs line-clamp-2  ">{row.original.describtion}</p>
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({row})=><div className="w-10 h-10 rounded-full relative bg-white ring-1 ring-offset-4 ring-neutral-200 overflow-hidden"><Image className="object-contain" fill src={row.original.image} alt="product-image" /></div>
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
    cell: ({row})=><div className="flex items-center justify-between w-full md:w-[80%]">{row.original.color}<div className="p-2 rounded-full border h-3 w-3" style={{backgroundColor:row.original.color}}/></div>
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