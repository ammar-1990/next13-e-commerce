import Navbar from "@/components/navbar"
import db from "@/lib/prismadb"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"


type Props = {

    children:React.ReactNode,
    params:{storeId:string}
}

const layout = async({children,params}: Props) => {
const {userId} =auth()
const {storeId} = params


if(!userId) return redirect('/sign-up')

const store = await db.store.findFirst({
    where:{
        id:storeId,
        userId
    }
})

if(!store) redirect('/')

return (
    <>
<Navbar />
{children}
    </>
)


  
}

export default layout