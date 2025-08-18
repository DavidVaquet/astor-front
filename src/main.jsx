import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ComprobanteProvider } from './context/ComprobanteContext.jsx'


const tema = localStorage.getItem("theme");
if (tema === "dark") {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

const token = localStorage.getItem('token');

if (!token && window.location.pathname !== '/login') {
  window.location.href = '/login';
} else {
  createRoot(document.getElementById('root')).render(
    <ComprobanteProvider>
      <App />
    </ComprobanteProvider>
  );
}
