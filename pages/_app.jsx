import '../styles/globals.css'
import '../styles/hamburger_menu.css'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "regenerator-runtime/runtime";
import { store, persistor } from '../app/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

function MyApp({ Component, pageProps }) {

  return (
      <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
          </PersistGate>
      </Provider>
  )
}

export default MyApp
