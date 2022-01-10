import { useQuery } from "blitz"
import getUser from "app/users/queries/getUser"

export const useTenUser = (number) => {
  const [users] = useQuery(getUser, number)
  return users
}
