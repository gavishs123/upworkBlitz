import React, { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { getQueryKey, queryClient, useQuery, useRouter } from "blitz"
import getUser from "../users/queries/getUser"
import QRCODE from "../../test_data/test-qr-code-1.png"
import QRCODE2 from "../../test_data/test-qr-code-2.png"
import QRCODE3 from "../../test_data/test-qr-code-3.png"
import QRCODE4 from "../../test_data/test-qr-code-4.png"
import QRCODE5 from "../../test_data/test-qr-code-5.png"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"

const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false })
const DashBoard = () => {
  const router = useRouter()
  const [result, setResult] = useState("output")
  const handleScan = (data) => {
    if (data) {
      setResult(data)
    }
  }
  const handleError = (err) => {
    console.error(err)
  }

  const dummYFunc = () => {
    const myLink = "/output"
    const myArray = ["2", "3", "4"]
    let apiUrl = `/`
    myArray.forEach((x, i) => {
      if (i === 0) {
        apiUrl += `&${x}`
      } else {
        apiUrl += `&${x}`
      }
    })
    console.log("apiUrl", apiUrl)
    router.push(apiUrl)
  }
  const userId = 2
  const [data] = useQuery(getUser, { where: { id: userId } })
  console.log(data)
  return (
    <>
      <div style={{ width: "400px", height: "400px" }}>
        <QrReader delay={300} onError={handleError} onScan={handleScan} style={{ width: "100%" }} />
        <p>{result}</p>
        <p>{typeof result}</p>
        <p>{result.length}</p>
      </div>
      <button onClick={dummYFunc}>click me</button>
      <div>
        <Image src={QRCODE} alt="QR-Code" />
        <hr />
        <hr />
        <Image src={QRCODE2} alt="QR-Code" />
        <hr />
        <hr />
        <Image src={QRCODE3} alt="QR-Code" />
        <hr />
        <hr />
        <Image src={QRCODE4} alt="QR-Code" />
        <hr />
        <hr />
        <Image src={QRCODE5} alt="QR-Code" />
        <hr />
        <hr />
      </div>
    </>
  )
}

export default DashBoard
