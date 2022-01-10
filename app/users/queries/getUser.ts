import { Ctx } from "blitz"
import db from "db"

// export default async function getTenUser() {
//   // console.log("a", number)
//   const userData = await db.user.findMany({
//     // where: { id: userId },
//     select: { id: true, name: true, email: true, role: true },
//   })

//   return userData
// }
export default async function getUser(input, { session }: Ctx) {
  // Validate the input
  const data = input
  console.log("input", input)
  console.log("input data", data)
  const users = await db.user.findFirst(input)

  // Can do any processing, fetching from other APIs, etc

  return users
}
