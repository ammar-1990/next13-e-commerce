
import db from '@/lib/prismadb'
import React from 'react'
import { format } from 'date-fns'
import { SizeColumn } from '@/components/size-columns'
import SizeClient from '@/components/size-client'

type Props = {
  params:{storeId:string}
}

const page =async ({params:{storeId}}: Props) => {
const sizes = await db.size.findMany({
  where:{
storeId
  },
  orderBy:{createdAt:'desc'}
})

const formattedNillboards:SizeColumn[] = sizes.map((item)=>({
id:item.id,
name:item.name,
value:item.value,
createdAt:format(item.createdAt, 'MMMM do, yyyy')
}))

  return (
    <div className='flex-col'>
        <div className='flex-1 gap-y-4 p-6'>
<SizeClient items={formattedNillboards} />
        </div>
    </div>
  )
}

export default page