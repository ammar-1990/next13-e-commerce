import db from '@/lib/prismadb'
import React from 'react'

type Props = {params:{storeId:string}}

const page =async ({params}: Props) => {

  const store = await db.store.findFirst({
    where:{
      id:params.storeId
    }
  })
  return (
    <div>Active store {store?.name}</div>
  )
}

export default page