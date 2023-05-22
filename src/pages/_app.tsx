import type { AppProps } from "next/app"
import { GlobalStyle } from "theme/styles"
import { ConfigProvider } from "antd"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#466995",
          fontFamily: "IBM Plex Sans",
        },
      }}
    >
      <GlobalStyle />
      <Component {...pageProps} />
    </ConfigProvider>
  )
}

export default MyApp
