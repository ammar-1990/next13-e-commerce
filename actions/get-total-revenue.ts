import db from "@/lib/prismadb"



export const getTotalRevenue = async (storeId:string)=>{

    const totalOrders = await db.order.findMany({
        where:{
            storeId:storeId,
            isPaid:true
        },
        include:{
            orderItems:{
                include:{
                    product:true
                }
            }
        }
    })

    const total = totalOrders.reduce((total, order)=>{
        const orderTotal = order.orderItems.reduce((orderSum,item)=>orderSum + item.product.price.toNumber(),0)
        return total + orderTotal
    },0)


    return total
}