'use client'

import React from 'react'
import Heading from './heading'
import { Button } from './ui/button'
import { Plus } from 'lucide-react'
import { Separator } from './ui/separator'
import { useParams, useRouter } from 'next/navigation'
import { Billboard } from '@prisma/client'
import { BillboardColumn, columns } from './columns'
import { DataTable } from './data-table'

type Props = {
  items:BillboardColumn[] | []
}

const BillboardClient = ({items}: Props) => {

const router = useRouter()
const params = useParams()

  return (
    <>
    <div className='flex items-center justify-between'>
        <Heading 
        title={`Billboards(${items?.length})`}
        description='Manage billboards for your store'
        />
        <Button
        onClick={()=>router.push(`/${params.storeId}/billboards/new`)}
        >
            <Plus className='mr-3 h-4 w-4' />
            Add New
        </Button>
    </div>
    <Separator orientation="horizontal" className='my-5' />
    <DataTable searchKey='label' columns={columns} data={items}  />
    </>
  )
}

export default BillboardClient