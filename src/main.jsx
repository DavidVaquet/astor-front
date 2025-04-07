import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ComprobanteProvider } from './context/ComprobanteContext.jsx'

createRoot(document.getElementById('root')).render(
  
  <ComprobanteProvider>
        <App />
  </ComprobanteProvider>
 
)
