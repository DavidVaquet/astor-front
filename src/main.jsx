import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ComprobanteProvider } from './context/ComprobanteContext.jsx'


const tema = localStorage.getItem("theme");
document.documentElement.classList.toggle("dark", tema === "dark");

const token = localStorage.getItem('token');
const path = window.location.pathname;

// Rutas públicas
const PUBLIC_PATHS = ['/login', '/recuperar-contraseña'];
const isPublic = PUBLIC_PATHS.includes(path) 
  || path.startsWith('/restablecer-password/');

if (!token && !isPublic) {
  window.location.replace('/login');
} 

createRoot(document.getElementById('root')).render(
  <ComprobanteProvider>
    <App />
  </ComprobanteProvider>
);
