'use client'

import React from 'react'
import Heading from './heading'

import { Separator } from './ui/separator'
import { useParams, useRouter } from 'next/navigation'

import { DataTable } from './data-table'

import { OrderColumn,columns } from './color-columns'

type Props = {
  items:OrderColumn[] | []
}

const OrderClient = ({items}: Props) => {

const router = useRouter()
const params = useParams()

  return (
    <>

        <Heading 
        title={`Orders(${items?.length})`}
        description='Manage orders for your store'
        />
       
 
    <Separator orientation="horizontal" className='my-5' />
    <DataTable searchKey='products' columns={columns} data={items}  />
  
    </>
  )
}

export default OrderClient