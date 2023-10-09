import db from "@/lib/prismadb"



export const getStockCount = async (storeId:string)=>{

    const stockCount = await db.product.count({
        where:{
            storeId:storeId,
            isArchived:false
        },
       
    })

  return stockCount
}