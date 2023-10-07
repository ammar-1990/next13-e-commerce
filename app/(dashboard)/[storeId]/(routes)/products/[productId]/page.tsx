import BillboardForm from '@/components/billboard-form'
import ProductForm from '@/components/product-form'
import db from '@/lib/prismadb'
import React from 'react'

type Props = {
  params:{productId:string,storeId:string}
}

const page = async({params}: Props) => {
const product = await db.product.findFirst({
  where:{
    id:params.productId
  },
  include:{
    images:true
  }
})

const sizes = await db.size.findMany({
  where:{
    storeId:params.storeId
  },
  orderBy:{
    createdAt:'desc'
  }
})
const categories = await db.category.findMany({
  where:{
    storeId:params.storeId
  },
  orderBy:{
    createdAt:'desc'
  }
})
const colors = await db.color.findMany({
  where:{
    storeId:params.storeId
  },
  orderBy:{
    createdAt:'desc'
  }
})

  return (
    <div className='flex-col'>
      <div className='flex-1 p-6 gap-y-4'>
            <ProductForm 
            initialData={product}
            sizes={sizes}
            categories={categories}
            colors={colors}
            />
      </div>
    </div>
  )
}

export default page