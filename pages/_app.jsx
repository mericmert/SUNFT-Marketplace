import '../styles/globals.css'
import '../styles/hamburger_menu.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { AuthProvider } from '../context/authContext'
import { AppProps } from 'next/app'
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import "regenerator-runtime/runtime";

function MyApp({ Component, pageProps }) {
  const supportedChainIds = [1, 4];
  const connectors = {
    injected: {},
  }; 
  return (
    <ThirdwebWeb3Provider
      supportedChainIds={supportedChainIds}
      connectors={connectors}
    >
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThirdwebWeb3Provider>
  )
}

export default MyApp
