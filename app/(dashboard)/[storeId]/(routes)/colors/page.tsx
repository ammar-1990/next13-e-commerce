
import db from '@/lib/prismadb'
import React from 'react'
import { format } from 'date-fns'


import { ColorColumn } from '@/components/color-columns'
import ColorClient from '@/components/color-client'

type Props = {
  params:{storeId:string}
}

const page =async ({params:{storeId}}: Props) => {
const colors = await db.color.findMany({
  where:{
storeId
  },
  orderBy:{createdAt:'desc'}
})

const formattedColors:ColorColumn[] = colors.map((item)=>({
id:item.id,
name:item.name,
value:item.value,
createdAt:format(item.createdAt, 'MMMM do, yyyy')
}))

  return (
    <div className='flex-col'>
        <div className='flex-1 gap-y-4 p-6'>
<ColorClient items={formattedColors} />
        </div>
    </div>
  )
}

export default page