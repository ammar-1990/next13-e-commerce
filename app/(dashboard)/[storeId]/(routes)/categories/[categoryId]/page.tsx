
import CategoryForm from '@/components/category-form'
import db from '@/lib/prismadb'
import React from 'react'

type Props = {
  params:{categoryId:string,storeId:string}
}

const page = async({params}: Props) => {
const category = await db.category.findFirst({
  where:{
    id:params.categoryId
  }
})
const billboards =await db.billboard.findMany({
  where:{
    storeId:params.storeId
  }
})
  return (
    <div className='flex-col'>
      <div className='flex-1 p-6 gap-y-4'>
            <CategoryForm 
            billboards={billboards}
            initialData={category}
            />
      </div>
    </div>
  )
}

export default page