import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";










export async function GET(req: Request,{params:{storeId}}:{params:{storeId:string}}) {
    try {
     
      if(!storeId) return new NextResponse('Store ID is required',{status:400})

      const { searchParams} = new URL(req.url)

      const sizeId = searchParams.get('sizeId') || undefined
      const colorId = searchParams.get('colorId') || undefined
      const categoryId = searchParams.get('categoryId') || undefined
      const isFeatured = searchParams.get('isFeatured') 
      
     
      const products =await db.product.findMany({
          where:{
             storeId,
             sizeId,
             categoryId,
             colorId,
             isFeatured : isFeatured ? true : undefined,
             isArchived:false
             
          },
          include:{
            images:true,
            size:true,
            category:true,
            color:true
          },
          orderBy:{
            createdAt:'desc'
          }
      })
  
      return NextResponse.json(products)
  
    } catch (error) {
      console.log("[PRODUCTS_GET]", error);
      return new NextResponse("internal error", { status: 500 });
    }
  }
  

export async function POST(req: Request,{params:{storeId}}:{params:{storeId:string}}) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const { name, price, isFeatured,describtion, isArchived, sizeId,colorId,categoryId,images } = await req.json();

    if(!name) return new NextResponse('Name is required',{status:400})

    if(!price) return new NextResponse('Price  is required',{status:400})
    if(!describtion) return new NextResponse('describtion  is required',{status:400})
    if(!images || !images.length)  return new NextResponse('Images  is required',{status:400})

    if(!colorId) return new NextResponse('Color ID  is required',{status:400})
    if(!categoryId) return new NextResponse('Category ID  is required',{status:400})
    if(!sizeId) return new NextResponse('Size ID  is required',{status:400})

    if(!storeId) return new NextResponse('Store ID is required',{status:400})
    
    const store = await db.store.findFirst({
        where:{
            id:storeId,
            userId
        }
    }) 

    if(!store) return new NextResponse('Unauthorized',{status:403})

    const product =await  db.product.create({
        data:{
            name,
            price,
            describtion,
            storeId,
            categoryId,
            isFeatured,
            isArchived,
            colorId,
            sizeId,
            images:{
              createMany:{
             data:[...images.map((img:{url:string})=>img)]
              }
            }
        }
    })

    return NextResponse.json(product)

  } catch (error) {
    console.log("[PRODUCT_POST]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}


