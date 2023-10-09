import BillboardClient from '@/components/billboard-client'
import { BillboardColumn } from '@/components/columns'
import db from '@/lib/prismadb'
import React from 'react'
import { format } from 'date-fns'
import { OrderColumn } from '@/components/order-columns'
import OrderClient from '@/components/order-client'
import { formatter } from '@/lib/utils'

type Props = {
  params:{storeId:string}
}

const page =async ({params:{storeId}}: Props) => {
const orders = await db.order.findMany({
  where:{
storeId
  },
  include:{
    orderItems:{
      include:{
        product:true
      }
    }
  },
  orderBy:{createdAt:'desc'}
})

const formattedOrders:OrderColumn[] = orders.map((item)=>({
id:item.id,
phone:item.phone,
address:item.address,
isPaid:item.isPaid,
products:item.orderItems.map((item)=>item.product.name).join(', '),
totalPrice:formatter.format(item.orderItems.reduce((total,item)=>{return total + Number(item.product.price)},0)) ,
createdAt:format(item.createdAt, 'MMMM do, yyyy')
}))

  return (
    <div className='flex-col'>
        <div className='flex-1 gap-y-4 p-6'>
<OrderClient items={formattedOrders} />
        </div>
    </div>
  )
}

export default page