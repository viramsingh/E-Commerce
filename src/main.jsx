import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import App from './App.jsx'
import { store } from './redux/store'
import './index.css'
import 'react-toastify/dist/ReactToastify.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer
        autoClose={2200}
        closeOnClick
        newestOnTop
        pauseOnFocusLoss={false}
        position="top-right"
        theme="colored"
      />
    </Provider>
  </StrictMode>,
)
