import db from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import {redirect} from 'next/navigation'



type Props = {children:React.ReactNode}

const layout =async ({children}: Props) => {

    const {userId} = auth()

    if(!userId) redirect('/sign-up')

const store = await db.store.findFirst({
    where:{
        userId:userId
    }
})

if(!store){
return <>{children}</>
}

return redirect(`/${store.id}`)


}

export default layout