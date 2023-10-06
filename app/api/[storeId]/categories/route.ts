import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";










export async function GET(req: Request,{params:{storeId}}:{params:{storeId:string}}) {
    try {
     
      if(!storeId) return new NextResponse('Store ID is required',{status:400})
      
     
      const categories =await db.category.findMany({
          where:{
             storeId
          }
      })
  
      return NextResponse.json(categories)
  
    } catch (error) {
      console.log("[CATEGORIES_GET]", error);
      return new NextResponse("internal error", { status: 500 });
    }
  }
  

export async function POST(req: Request,{params:{storeId}}:{params:{storeId:string}}) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const { name, billboardId } = await req.json();

    if(!name) return new NextResponse(' Name is required',{status:400})

    if(!billboardId) return new NextResponse('Billboard ID is required',{status:400})
    if(!storeId) return new NextResponse('Store ID is required',{status:400})
    
    const store = await db.store.findFirst({
        where:{
            id:storeId,
            userId
        }
    }) 

    if(!store) return new NextResponse('Unauthorized',{status:403})

    const category =await  db.category.create({
        data:{
            name,
            billboardId,
            storeId
        }
    })

    return NextResponse.json(category)

  } catch (error) {
    console.log("[CATEGORIES_POST]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}


