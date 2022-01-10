import { Suspense, useState } from "react"
import { Image, Link, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import DashBoard from "../core/components/DashBoard"
import dynamic from "next/dynamic"
import { getQueryKey, queryClient, useQuery, useRouter } from "blitz"
import getUser from "../users/queries/getUser"
import QRCODE from "../../test_data/test-qr-code-1.png"
import QRCODE2 from "../../test_data/test-qr-code-2.png"
import QRCODE3 from "../../test_data/test-qr-code-3.png"
import QRCODE4 from "../../test_data/test-qr-code-4.png"
import QRCODE5 from "../../test_data/test-qr-code-5.png"

const QrReader = dynamic(() => import("react-qr-reader"), { ssr: false })

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <div>
        <Suspense fallback="Loading...">
          <DashBoard />
        </Suspense>
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
      </div>
    )
  } else {
    return (
      <>
        <Suspense fallback="Loading...">
          <DashBoard />
        </Suspense>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home: BlitzPage = () => {
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
    // router.push(apiUrl)
  }
  const userId = 2
  const [data] = useQuery(getUser, { where: { id: userId } })
  console.log(data)
  return (
    <div className="container">
      <main>
        <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <>
            <div style={{ width: "400px", height: "400px" }}>
              <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: "100%" }}
              />
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
            <Link href={Routes.SignupPage()}>
              <a className="button small">
                <strong>Sign Up</strong>
              </a>
            </Link>
            <Link href={Routes.LoginPage()}>
              <a className="button small">
                <strong>Login</strong>
              </a>
            </Link>
          </>
        </div>
      </main>

      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@300;700&display=swap");

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: "Libre Franklin", -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
            Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        }

        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          box-sizing: border-box;
        }
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main p {
          font-size: 1.2rem;
        }

        p {
          text-align: center;
        }

        footer {
          width: 100%;
          height: 60px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #45009d;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer a {
          color: #f4f4f4;
          text-decoration: none;
        }

        .logo {
          margin-bottom: 2rem;
        }

        .logo img {
          width: 300px;
        }

        .buttons {
          display: grid;
          grid-auto-flow: column;
          grid-gap: 0.5rem;
        }
        .button {
          font-size: 1rem;
          background-color: #6700eb;
          padding: 1rem 2rem;
          color: #f4f4f4;
          text-align: center;
        }

        .button.small {
          padding: 0.5rem 1rem;
        }

        .button:hover {
          background-color: #45009d;
        }

        .button-outline {
          border: 2px solid #6700eb;
          padding: 1rem 2rem;
          color: #6700eb;
          text-align: center;
        }

        .button-outline:hover {
          border-color: #45009d;
          color: #45009d;
        }

        pre {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          text-align: center;
        }
        code {
          font-size: 0.9rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono,
            Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  )
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
