import BillboardClient from '@/components/billboard-client'
import { BillboardColumn } from '@/components/columns'
import db from '@/lib/prismadb'
import React from 'react'
import { format } from 'date-fns'

type Props = {
  params:{storeId:string}
}

const page =async ({params:{storeId}}: Props) => {
const billboards = await db.billboard.findMany({
  where:{
storeId
  },
  orderBy:{createdAt:'desc'}
})

const formattedNillboards:BillboardColumn[] = billboards.map((item)=>({
id:item.id,
label:item.label,
imageUrl:item.imageUrl,
createdAt:format(item.createdAt, 'MMMM do, yyyy')
}))

  return (
    <div className='flex-col'>
        <div className='flex-1 gap-y-4 p-6'>
<BillboardClient items={formattedNillboards} />
        </div>
    </div>
  )
}

export default page