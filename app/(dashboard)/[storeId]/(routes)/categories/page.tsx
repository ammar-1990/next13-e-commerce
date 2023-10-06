import BillboardClient from '@/components/billboard-client'
import { BillboardColumn } from '@/components/columns'
import db from '@/lib/prismadb'
import React from 'react'
import { format } from 'date-fns'
import CategoryClient from '@/components/category-client'
import { CategoryColumn } from '@/components/category-columns'

type Props = {
  params:{storeId:string}
}

const page =async ({params:{storeId}}: Props) => {
const categories = await db.category.findMany({
  where:{
storeId
  },
  include:{
    billboard:true
  },
  orderBy:{createdAt:'desc'}
})

const formattedNillboards:CategoryColumn[] = categories.map((item)=>({
id:item.id,
name:item.name,
billboardLabel:item.billboard.label,
createdAt:format(item.createdAt, 'MMMM do, yyyy')
}))

  return (
    <div className='flex-col'>
        <div className='flex-1 gap-y-4 p-6'>
<CategoryClient items={formattedNillboards} />
        </div>
    </div>
  )
}

export default page