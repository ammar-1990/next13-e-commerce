import db from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) return new NextResponse("Unauthorized", { status: 401 });

    const { name } = await req.json();

    if(!name) return new NextResponse('store name is required',{status:400})
    
    const store = await db.store.create({
        data:{
            userId,
            name
        }
    }) 

    return NextResponse.json(store)

  } catch (error) {
    console.log("[STORES_POST]", error);
    return new NextResponse("internal error", { status: 500 });
  }
}
