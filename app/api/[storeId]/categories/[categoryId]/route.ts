import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from 'next/server'




export async function GET(req:Request,{params:{categoryId}}:{params:{categoryId:string}}){

    try {
   

       
        if(!categoryId) return new NextResponse('Category ID is required',{status:400})

       

   

        const billboard = await db.billboard.findUnique({
            where:{
                id:categoryId
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log("[GET_CATEGORY_ERROR]",error)

        return new NextResponse('internal error',{status:500})
        
    }

}



export async function PATCH(req:Request,{params:{storeId,categoryId}}:{params:{storeId:string,categoryId:string}}){

    try {
        const { userId } = auth()
        if(!userId) return new NextResponse('Unauthenticated',{status:401})

        if(!storeId) return new NextResponse('Store ID is required',{status:400})
        if(!categoryId) return new NextResponse('Category ID is required',{status:400})

        const { name, billboardId } =await req.json()
        if(!name)  return new NextResponse('Name is required',{status:400})
        if(!billboardId)  return new NextResponse('Billboard ID is required',{status:400})

        const store = await db.store.findFirst({
            where:{
                id:storeId,
                userId
            }
        }) 
    
        if(!store) return new NextResponse('Unauthorized',{status:403})

        const category = await db.category.updateMany({
            where:{
                id:categoryId
            },
            data:{
                name,billboardId
            }
        })

        return NextResponse.json(category)

    } catch (error) {
        console.log("[PATCH_CATEGORY_ERROR]",error)

        return new NextResponse('internal error',{status:500})
        
    }

}


export async function DELETE(req:Request,{params:{storeId,categoryId}}:{params:{storeId:string,categoryId:string}}){

    try {
        const { userId } = auth()
        if(!userId) return new NextResponse('Unauthenticated',{status:401})

        if(!storeId) return new NextResponse('Store ID is required',{status:400})
        if(!categoryId) return new NextResponse('Billboard ID is required',{status:400})

       

        const store = await db.store.findFirst({
            where:{
                id:storeId,
                userId
            }
        }) 
    
        if(!store) return new NextResponse('Unauthorized',{status:403})

        const category = await db.category.deleteMany({
            where:{
                id:categoryId
            }
        })

        return NextResponse.json(category)

    } catch (error) {
        console.log("[DELETE_CATEGORY_ERROR]",error)

        return new NextResponse('internal error',{status:500})
        
    }

}