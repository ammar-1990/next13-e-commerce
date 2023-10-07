import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from 'next/server'




export async function GET(req:Request,{params:{productId}}:{params:{productId:string}}){

    try {
   

       
        if(!productId) return new NextResponse('Product ID is required',{status:400})

       

   

        const product = await db.product.findUnique({
            where:{
                id:productId
            },
            include:{
                images:true,
                size:true,
                category:true,
                color:true
            }
        })

        return NextResponse.json(product)

    } catch (error) {
        console.log("[GET_PRODUCT_ERROR]",error)

        return new NextResponse('internal error',{status:500})
        
    }

}



export async function PATCH(req:Request,{params:{storeId,productId}}:{params:{storeId:string,productId:string}}){

    try {
        const { userId } = auth()
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 });
        const { name, price, isFeatured, isArchived, sizeId,colorId,categoryId,images } = await req.json();

    if(!name) return new NextResponse('Name is required',{status:400})

    if(!price) return new NextResponse('Price  is required',{status:400})
    if(!images || !images.length)  return new NextResponse('Images  is required',{status:400})

    if(!colorId) return new NextResponse('Color ID  is required',{status:400})
    if(!categoryId) return new NextResponse('Category ID  is required',{status:400})
    if(!sizeId) return new NextResponse('Size ID  is required',{status:400})

    if(!storeId) return new NextResponse('Store ID is required',{status:400})

    if(!productId) return new NextResponse('Product ID is required',{status:400})
    
    const store = await db.store.findFirst({
        where:{
            id:storeId,
            userId
        }
    }) 

    if(!store) return new NextResponse('Unauthorized',{status:403})

       await db.product.update({
            where:{
                id:productId
            },
            data:{
                name,
                price,
                storeId,
                categoryId,
                isFeatured,
                isArchived,
                colorId,
                sizeId,
                images:{
                deleteMany:{}
                }
            }
        })

        const product = await db.product.update({
            where:{
                id:productId
            },
            data:{
                images:{
                    createMany:{
                        data:[...images.map((img:{url:string})=>img)]
                    }
                }
            }
        })

        return NextResponse.json(product)

    } catch (error) {
        console.log("[PATCH_PRODUCT_ERROR]",error)

        return new NextResponse('internal error',{status:500})
        
    }

}


export async function DELETE(req:Request,{params:{storeId,productId}}:{params:{storeId:string,productId:string}}){

    try {
        const { userId } = auth()
        if(!userId) return new NextResponse('Unauthenticated',{status:401})

        if(!storeId) return new NextResponse('Store ID is required',{status:400})
        if(!productId) return new NextResponse('Product ID is required',{status:400})

       

        const store = await db.store.findFirst({
            where:{
                id:storeId,
                userId
            }
        }) 
    
        if(!store) return new NextResponse('Unauthorized',{status:403})

        const product = await db.product.deleteMany({
            where:{
                id:productId
            }
        })

        return NextResponse.json(product)

    } catch (error) {
        console.log("[DELETE_PRODUCT_ERROR]",error)

        return new NextResponse('internal error',{status:500})
        
    }

}