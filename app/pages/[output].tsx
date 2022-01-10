import React, { Suspense, useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useQuery } from "blitz"
import getTenUser from "../users/queries/getUser"
import getCurrentUser from "app/users/queries/getCurrentUser"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import { useTenUser } from "app/core/hooks/useTenUser"
const Output = () => {
  const router = useRouter()
  const { output }: any = router.query
  const [userArray, setUserArray] = useState([])

  const currentUser = useCurrentUser()
  // const tenUser = useTenUser()
  useEffect(() => {
    const str = output?.split("&")
    str?.shift()
    const tempuserArray = str?.map(Number)
    setUserArray(tempuserArray)
    console.log(tempuserArray)
    console.log(currentUser)
    // console.log('ten user:', tenUser)
    // getCurrentUser().then(res => console.log('res', res)).catch(err => console.log('err', err))
  }, [])

  return (
    <div>
      <Suspense fallback="Loading...">hel</Suspense>
    </div>
  )
}

export default Output
