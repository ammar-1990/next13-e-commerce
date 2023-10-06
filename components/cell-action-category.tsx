'use client'

import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react"
import { BillboardColumn } from "./columns"
import { Button } from "./ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import toast from "react-hot-toast"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import axios from "axios"
import AlertModal from "./modals/alert-modal"
import { CategoryColumn } from "./category-columns"

type Props = {
    data:BillboardColumn | CategoryColumn
}




const CellActionCategory = ({data}: Props) => {



  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const onDelete = async()=>{
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeId}/categories/${data?.id}`)
      toast.success('Deleted successfully')
      router.refresh()
     
    } catch (error) {
      console.log(error)
      toast.error("Make sure to delete all category's  products")
      
    }finally{
  setLoading(false)
  setOpen(false)
    }
  }

  const onCopy = ()=>{
    navigator.clipboard.writeText(data.id)
    toast.success('Category ID copied')
  }

  const router = useRouter()
  const params = useParams()


  return (
    <>
     <AlertModal
    isOpen={open}
    onClose={()=>setOpen(false)}
    onConfirm={onDelete}
    loading={loading}
    />
    <DropdownMenu>
    <DropdownMenuTrigger asChild >
      <Button variant="ghost" className="h-8 w-8 p-0 focus-visible:ring-0 focus-visible:ring-offset-0">
        <span className="sr-only">Open menu</span>
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Actions</DropdownMenuLabel>
      <DropdownMenuItem className="cursor-pointer"
      onClick={onCopy}
      >
        <Copy className="w-4 h-4 mr-2" />
        Copy ID
        </DropdownMenuItem>
      <DropdownMenuItem className="cursor-pointer"
      onClick={()=>router.push(`/${params.storeId}/categories/${data.id}`)}
      >
        <Edit className="w-4 h-4 mr-2" />
        Update
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer"
        onClick={()=>setOpen(true)}
        >
        <Trash className="w-4 h-4 mr-2" />
        Delete
        </DropdownMenuItem>
   

    </DropdownMenuContent>
  </DropdownMenu>
  </>
  )
}

export default CellActionCategory