import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from 'next/server'




export async function GET(req:Request,{params:{colorId}}:{params:{colorId:string}}){

    try {
   

       
        if(!colorId) return new NextResponse('Size ID is required',{status:400})

       

   

        const color = await db.color.findUnique({
            where:{
                id:colorId
            }
        })

        return NextResponse.json(color)

    } catch (error) {
        console.log("[GET_COLOR_ERROR]",error)

        return new NextResponse('internal error',{status:500})
        
    }

}



export async function PATCH(req:Request,{params:{storeId,colorId}}:{params:{storeId:string,colorId:string}}){

    try {
        const { userId } = auth()
        if(!userId) return new NextResponse('Unauthenticated',{status:401})

        if(!storeId) return new NextResponse('Store ID is required',{status:400})
        if(!colorId) return new NextResponse('Size ID is required',{status:400})

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

        const color = await db.color.updateMany({
            where:{
                id:colorId
            },
            data:{
                name,value
            }
        })

        return NextResponse.json(color)

    } catch (error) {
        console.log("[PATCH_COLOR_ERROR]",error)

        return new NextResponse('internal error',{status:500})
        
    }

}


export async function DELETE(req:Request,{params:{storeId,colorId}}:{params:{storeId:string,colorId:string}}){

    try {
        const { userId } = auth()
        if(!userId) return new NextResponse('Unauthenticated',{status:401})

        if(!storeId) return new NextResponse('Store ID is required',{status:400})
        if(!colorId) return new NextResponse('Size ID is required',{status:400})

       

        const store = await db.store.findFirst({
            where:{
                id:storeId,
                userId
            }
        }) 
    
        if(!store) return new NextResponse('Unauthorized',{status:403})

        const color = await db.color.deleteMany({
            where:{
                id:colorId
            }
        })

        return NextResponse.json(color)

    } catch (error) {
        console.log("[DELETE_COLOR_ERROR]",error)

        return new NextResponse('internal error',{status:500})
        
    }

}