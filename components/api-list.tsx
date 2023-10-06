'use client'

import React from 'react'
import ApiAlert from './api-alert'
import { useOrigin } from '@/hooks/use-origin'
import { useParams } from 'next/navigation'

type Props = {
  entityName:string,
  entityIdName:string
}

const ApiList = ({entityIdName, entityName}: Props) => {

  const origin = useOrigin()
  const params = useParams()
  return (
<>
<ApiAlert title='GET' variant='public' description={origin ? `${origin}/api/${params.storeId}/${entityName}` : '...'} />
<ApiAlert title='GET' variant='public' description={origin ? `${origin}/api/${params.storeId}/${entityName}/{${entityIdName}}` : '...'} />
<ApiAlert title='POST' variant='admin' description={origin ? `${origin}/api/${params.storeId}/${entityName}` : '...'} />
<ApiAlert title='PATCH' variant='admin' description={origin ? `${origin}/api/${params.storeId}/${entityName}/{${entityIdName}}` : '...'} />
<ApiAlert title='DELETE' variant='admin' description={origin ? `${origin}/api/${params.storeId}/${entityName}/{${entityIdName}}` : '...'} />
</>
  )
}

export default ApiList