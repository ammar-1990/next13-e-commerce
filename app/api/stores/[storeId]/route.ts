import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from 'next/server'

export async function PATCH(req:Request,{params:{storeId}}:{params:{storeId:string}}){

    try {
        const { userId } = auth()
        if(!userId) return new NextResponse('Unauthorized',{status:401})

        if(!storeId) return new NextResponse('Store ID is required',{status:400})

        const { name } =await req.json()
        if(!name)  return new NextResponse('Name is required',{status:400})

        const store = await db.store.updateMany({
            where:{
                id:storeId,
                userId
            },
            data:{
                name
            }
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log("[PATCH_STORE_ERROR]",error)

        return new NextResponse('internal error',{status:500})
        
    }

}


export async function DELETE(req:Request,{params:{storeId}}:{params:{storeId:string}}){

    try {
        const { userId } = auth()
        if(!userId) return new NextResponse('Unauthorized',{status:401})

        if(!storeId) return new NextResponse('Store ID is required',{status:400})

       

        const store = await db.store.deleteMany({
            where:{
                id:storeId,
                userId
            }
        })

        return NextResponse.json(store)

    } catch (error) {
        console.log("[DELETE_STORE_ERROR]",error)

        return new NextResponse('internal error',{status:500})
        
    }

}