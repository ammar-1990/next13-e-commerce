import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from 'next/server'




export async function GET(req:Request,{params:{sizeId}}:{params:{sizeId:string}}){

    try {
   

       
        if(!sizeId) return new NextResponse('Size ID is required',{status:400})

       

   

        const size = await db.billboard.findUnique({
            where:{
                id:sizeId
            }
        })

        return NextResponse.json(size)

    } catch (error) {
        console.log("[GET_SIZE_ERROR]",error)

        return new NextResponse('internal error',{status:500})
        
    }

}



export async function PATCH(req:Request,{params:{storeId,sizeId}}:{params:{storeId:string,sizeId:string}}){

    try {
        const { userId } = auth()
        if(!userId) return new NextResponse('Unauthenticated',{status:401})

        if(!storeId) return new NextResponse('Store ID is required',{status:400})
        if(!sizeId) return new NextResponse('Size ID is required',{status:400})

        const { name, value } =await req.json()
        if(!name)  return new NextResponse('Name is required',{status:400})
        if(!value)  return new NextResponse('Value is required',{status:400})

        const store = await db.store.findFirst({
            where:{
                id:storeId,
                userId
            }
        }) 
    
        if(!store) return new NextResponse('Unauthorized',{status:403})

        const size = await db.size.updateMany({
            where:{
                id:sizeId
            },
            data:{
                name,value
            }
        })

        return NextResponse.json(size)

    } catch (error) {
        console.log("[PATCH_SIZE_ERROR]",error)

        return new NextResponse('internal error',{status:500})
        
    }

}


export async function DELETE(req:Request,{params:{storeId,sizeId}}:{params:{storeId:string,sizeId:string}}){

    try {
        const { userId } = auth()
        if(!userId) return new NextResponse('Unauthenticated',{status:401})

        if(!storeId) return new NextResponse('Store ID is required',{status:400})
        if(!sizeId) return new NextResponse('Size ID is required',{status:400})

       

        const store = await db.store.findFirst({
            where:{
                id:storeId,
                userId
            }
        }) 
    
        if(!store) return new NextResponse('Unauthorized',{status:403})

        const size = await db.size.deleteMany({
            where:{
                id:sizeId
            }
        })

        return NextResponse.json(size)

    } catch (error) {
        console.log("[DELETE_SIZE_ERROR]",error)

        return new NextResponse('internal error',{status:500})
        
    }

}