'use client'

import React from 'react'
import Heading from './heading'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { Separator } from './ui/separator'
import { useParams, useRouter } from 'next/navigation'

import { DataTable } from './data-table'
import ApiList from './api-list'
import { SizeColumn ,columns} from './size-columns'

type Props = {
  items:SizeColumn[] | []
}

const SizeClient = ({items}: Props) => {

const router = useRouter()
const params = useParams()

  return (
    <>
    <div className='flex items-center justify-between'>
        <Heading 
        title={`Sizes(${items?.length})`}
        description='Manage sizes for your store'
        />
        <Button
        onClick={()=>router.push(`/${params.storeId}/sizes/new`)}
        >
            <Plus className='mr-3 h-4 w-4' />
            Add New
        </Button>
    </div>
    <Separator orientation="horizontal" className='my-5' />
    <DataTable searchKey='name' columns={columns} data={items}  />
    <Heading title='API' description='API calls for sizes' />
    <Separator className='my-3' />
    <ApiList entityName='sizes' entityIdName='sizeId'/>
    </>
  )
}

export default SizeClient