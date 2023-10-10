"use client"

import Image from "next/image"
 import CellAction from "./cell-action"
import { ColumnDef } from "@tanstack/react-table"
 
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BillboardColumn = {
  id: string,
  label: string,
 createdAt:string,
 imageUrl:string,
 isFeatured:boolean
}
 
export const columns: ColumnDef<BillboardColumn>[] = [
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    
    header: "Image",
    cell: ({row})=><div className="w-10 h-10 rounded-full relative bg-white ring-1 ring-offset-4 ring-neutral-200 overflow-hidden"><Image className="object-contain " src={row.original.imageUrl} alt="billboard-image" fill /></div>
  },
  {
    id:'actions',
    cell: ({row}) => <CellAction data={row.original} />
  }


 
]