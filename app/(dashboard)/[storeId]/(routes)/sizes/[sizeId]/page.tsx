import BillboardForm from '@/components/billboard-form'
import SizeForm from '@/components/size-form'
import db from '@/lib/prismadb'
import React from 'react'

type Props = {
  params:{sizeId:string}
}

const page = async({params}: Props) => {
const size = await db.size.findFirst({
  where:{
    id:params.sizeId
  }
})

  return (
    <div className='flex-col'>
      <div className='flex-1 p-6 gap-y-4'>
            <SizeForm 
            initialData={size}
            />
      </div>
    </div>
  )
}

export default page