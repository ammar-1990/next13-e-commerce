import db from "@/lib/prismadb"



export const getSalesCount = async (storeId:string)=>{

    const salesCount = await db.order.count({
        where:{
            storeId:storeId,
            isPaid:true
        },
       
    })

  return salesCount
}