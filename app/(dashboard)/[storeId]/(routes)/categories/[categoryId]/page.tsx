
import CategoryForm from '@/components/category-form'
import db from '@/lib/prismadb'
import React from 'react'

type Props = {
  params:{categoryId:string}
}

const page = async({params}: Props) => {
const category = await db.category.findFirst({
  where:{
    id:params.categoryId
  }
})

  return (
    <div className='flex-col'>
      <div className='flex-1 p-6 gap-y-4'>
            <CategoryForm 
            initialData={category}
            />
      </div>
    </div>
  )
}

export default page