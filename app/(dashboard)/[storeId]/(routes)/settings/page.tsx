import SettingsForm from '@/components/settings-form'
import db from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import {redirect} from 'next/navigation'

type Props = {
    params:{storeId:string}
}

const page = async({params:{storeId}}: Props) => {

const { userId } = auth()
if(!userId) return redirect('/sign-in')

const store = await db.store.findFirst({
    where:{
        id:storeId,
        userId
    }
})

if(!store) return redirect('/')

  return (
    <div className='flex-col'>
        <div className='flex-1 gap-y-4 p-6'>
<SettingsForm initialData={store} />
        </div>
    </div>
  )
}

export default page