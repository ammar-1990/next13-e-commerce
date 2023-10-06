'use client'

import React from 'react'
import Heading from './heading'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { Separator } from './ui/separator'
import { useParams, useRouter } from 'next/navigation'
import { Billboard } from '@prisma/client'

import { DataTable } from './data-table'
import ApiList from './api-list'
import { CategoryColumn , columns} from './category-columns'

type Props = {
  items:CategoryColumn[] | []
}

const CategoryClient = ({items}: Props) => {

const router = useRouter()
const params = useParams()

  return (
    <>
    <div className='flex items-center justify-between'>
        <Heading 
        title={`Categories(${items?.length})`}
        description='Manage categories for your store'
        />
        <Button
        onClick={()=>router.push(`/${params.storeId}/categories/new`)}
        >
            <Plus className='mr-3 h-4 w-4' />
            Add New
        </Button>
    </div>
    <Separator orientation="horizontal" className='my-5' />
    <DataTable searchKey='name' columns={columns} data={items}  />
    <Heading title='API' description='API calls for categories' />
    <Separator className='my-3' />
    <ApiList entityName='categories' entityIdName='categoryId'/>
    </>
  )
}

export default CategoryClient