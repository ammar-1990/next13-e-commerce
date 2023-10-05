import BillboardForm from '@/components/billboard-form'
import db from '@/lib/prismadb'
import React from 'react'

type Props = {
  params:{billboardId:string}
}

const page = async({params}: Props) => {
const billboard = await db.billboard.findFirst({
  where:{
    id:params.billboardId
  }
})

  return (
    <div className='flex-col'>
      <div className='flex-1 p-6 gap-y-4'>
            <BillboardForm 
            initialData={billboard}
            />
      </div>
    </div>
  )
}

export default page