import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from 'next/server'




export async function GET(req:Request,{params:{billboardId}}:{params:{billboardId:string}}){

    try {
   

       
        if(!billboardId) return new NextResponse('Billboard ID is required',{status:400})

       

   

        const billboard = await db.billboard.findUnique({
            where:{
                id:billboardId
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log("[GET_BILLBOARD_ERROR]",error)

        return new NextResponse('internal error',{status:500})
        
    }

}



export async function PATCH(req:Request,{params:{storeId,billboardId}}:{params:{storeId:string,billboardId:string}}){

    try {
        const { userId } = auth()
        if(!userId) return new NextResponse('Unauthenticated',{status:401})

        if(!storeId) return new NextResponse('Store ID is required',{status:400})
        if(!billboardId) return new NextResponse('Billboard ID is required',{status:400})

        const { label, imageUrl ,isFeatured} =await req.json()
        if(!label)  return new NextResponse('Label is required',{status:400})
        if(!imageUrl)  return new NextResponse('Image is required',{status:400})

        const store = await db.store.findFirst({
            where:{
                id:storeId,
                userId
            }
        }) 
    
        if(!store) return new NextResponse('Unauthorized',{status:403})
        if(isFeatured) {

            await db.billboard.updateMany({
              where:{
                storeId
              },
              data:{
                isFeatured:false
              }
            })
          }

        const billboard = await db.billboard.updateMany({
            where:{
                id:billboardId
            },
            data:{
                label,imageUrl,isFeatured
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log("[PATCH_BILLBOARD_ERROR]",error)

        return new NextResponse('internal error',{status:500})
        
    }

}


export async function DELETE(req:Request,{params:{storeId,billboardId}}:{params:{storeId:string,billboardId:string}}){

    try {
        const { userId } = auth()
        if(!userId) return new NextResponse('Unauthenticated',{status:401})

        if(!storeId) return new NextResponse('Store ID is required',{status:400})
        if(!billboardId) return new NextResponse('Billboard ID is required',{status:400})

       

        const store = await db.store.findFirst({
            where:{
                id:storeId,
                userId
            }
        }) 
    
        if(!store) return new NextResponse('Unauthorized',{status:403})

        const billboard = await db.billboard.deleteMany({
            where:{
                id:billboardId
            }
        })

        return NextResponse.json(billboard)

    } catch (error) {
        console.log("[DELETE_BILLBOARD_ERROR]",error)

        return new NextResponse('internal error',{status:500})
        
    }

}