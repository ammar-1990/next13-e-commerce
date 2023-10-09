import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";










export async function GET(req: Request,{params:{storeId}}:{params:{storeId:string}}) {
    try {
     
      if(!storeId) return new NextResponse('Store ID is required',{status:400})

      const {searchParams} = new URL(req.url)

      const featured = searchParams.get('featured')

      if(featured){
const billboard = await db.billboard.findFirst({
  where:{
    storeId,
    isFeatured:true
  }
})

return NextResponse.json(billboard)
      }
    
      
     
      const billboards =await db.billboard.findMany({
          where:{
             storeId,
        
          }
      })
  
      return NextResponse.json(billboards)
  
    } catch (error) {
      console.log("[BILLBOARDS_GET]", error);
      return new NextResponse("internal error", { status: 500 });
    }
  }
  

export async function POST(req: Request,{params:{storeId}}:{params:{storeId:string}}) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthenticated", { status: 401 });

    const { label, imageUrl ,isFeatured } = await req.json();

    if(!label) return new NextResponse('Billboard label is required',{status:400})

    if(!imageUrl) return new NextResponse('Billboard image is required',{status:400})
    if(!storeId) return new NextResponse('Store ID is required',{status:400})
    
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

    const billboard =await  db.billboard.create({
        data:{
            label,
            imageUrl,
            isFeatured,
            storeId
        }
    })

    return NextResponse.json(billboard)

  } catch (error) {
    console.log("[BILLBOARDS_POST]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}


