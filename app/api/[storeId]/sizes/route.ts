import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";










export async function GET(req: Request,{params:{storeId}}:{params:{storeId:string}}) {
    try {
     
      if(!storeId) return new NextResponse('Store ID is required',{status:400})
      
     
      const sizes =await db.billboard.findMany({
          where:{
             storeId
          }
      })
  
      return NextResponse.json(sizes)
  
    } catch (error) {
      console.log("[SIZES_GET]", error);
      return new NextResponse("internal error", { status: 500 });
    }
  }
  

export async function POST(req: Request,{params:{storeId}}:{params:{storeId:string}}) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const { name, value } = await req.json();

    if(!name) return new NextResponse('Name is required',{status:400})

    if(!value) return new NextResponse('Value is required',{status:400})
    if(!storeId) return new NextResponse('Store ID is required',{status:400})
    
    const store = await db.store.findFirst({
        where:{
            id:storeId,
            userId
        }
    }) 

    if(!store) return new NextResponse('Unauthorized',{status:403})

    const size =await  db.size.create({
        data:{
            name,
            value,
            storeId
        }
    })

    return NextResponse.json(size)

  } catch (error) {
    console.log("[SIZE_POST]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}


