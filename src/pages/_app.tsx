import type { AppProps } from "next/app"
import { GlobalStyle } from "theme/styles"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div>
      <GlobalStyle />
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
