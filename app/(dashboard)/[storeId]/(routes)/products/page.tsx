import BillboardClient from '@/components/billboard-client'
import { BillboardColumn } from '@/components/columns'
import db from '@/lib/prismadb'
import React from 'react'
import { format } from 'date-fns'
import { formatter } from '@/lib/utils'
import { ProductColumn } from '@/components/product-columns'
import ProductClient from '@/components/product-client'

type Props = {
  params:{storeId:string}
}

const page =async ({params:{storeId}}: Props) => {
const products = await db.product.findMany({
  where:{
storeId
  },
  include:{
    size:true,
    category:true,
    color:true,
    images:true
  },
  orderBy:{createdAt:'desc'}
})

const formattedProducts:ProductColumn[] = products.map((item)=>({
id:item.id,
name:item.name,
price:formatter.format(item.price.toNumber()),
describtion:item.describtion,
isArchived:item.isArchived,
isFeatured:item.isFeatured,
size:item.size.name,
color:item.color.value,
category:item.category.name,
createdAt:format(item.createdAt, 'MMMM do, yyyy'),
image:item.images[0].url
}))

  return (
    <div className='flex-col'>
        <div className='flex-1 gap-y-4 p-6'>
<ProductClient items={formattedProducts} />
        </div>
    </div>
  )
}

export default page