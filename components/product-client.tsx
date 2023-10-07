'use client'

import React from 'react'
import Heading from './heading'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { Separator } from './ui/separator'
import { useParams, useRouter } from 'next/navigation'


import { DataTable } from './data-table'
import ApiList from './api-list'
import { ProductColumn ,columns} from './product-columns'

type Props = {
  items:ProductColumn[] | []
}

const ProductClient = ({items}: Props) => {

const router = useRouter()
const params = useParams()

  return (
    <>
    <div className='flex items-center justify-between'>
        <Heading 
        title={`Products(${items?.length})`}
        description='Manage products for your store'
        />
        <Button
        onClick={()=>router.push(`/${params.storeId}/products/new`)}
        >
            <Plus className='mr-3 h-4 w-4' />
            Add New
        </Button>
    </div>
    <Separator orientation="horizontal" className='my-5' />
    <DataTable searchKey='category' columns={columns} data={items}  />
    <Heading title='API' description='API calls for products' />
    <Separator className='my-3' />
    <ApiList entityName='products' entityIdName='productId'/>
    </>
  )
}

export default ProductClient