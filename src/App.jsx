import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RutaProtegida } from './components/RutaProtegida';
// Pages Layout
import { LayoutAdmin } from './layout/LayoutAdmin';
// import { LayoutAuth } from './layout/LayoutAuth';
// Pages Auth
import { Login } from '/src/pages/auth/Login.jsx';
import { RecoveryPassword } from './pages/auth/RecoveryPassword';
// Pages admin
import { Home } from './pages/admin/Home';
import { AstorFray } from './pages/admin/AstorFray';
import { AstorGalindez} from './pages/admin/AstorGalindez';
import { Inmobiliaria } from './pages/admin/Inmobiliaria';
import { HomeFray } from './pages/admin/HomeFray';
import { HomeGalindez } from './pages/admin/HomeGalindez';
import { HomeInmobiliaria } from './pages/admin/HomeInmobiliaria';
import { Error404 } from './pages/Error404';
import NuevoUsuario from './pages/admin/NuevoUsuario';
import { GestionUsuarios } from './pages/admin/GestionUsuarios';
// Seccion de Comprobantes
import { ComprobantesFray} from './pages/admin/ComprobantesAstorFray';
import { ComprobantesGalindez } from './pages/admin/ComprobantesGalindez';
import { ComprobantesInmobiliaria } from './pages/admin/ComprobantesInmobiliaria';
// React Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  

  return (

    <BrowserRouter>
    <Routes>

      {/* Ruta privada   */}
      <Route path="/" element={<Navigate to="/login" />}/>
      {/* Ruta publica */}
      <Route path='/login' element={<Login/>} />
      <Route path='/recuperar-contraseña' element={<RecoveryPassword/>} />
      

    <Route path='/home' element={<LayoutAdmin/>}>
      <Route index element={<Home/>} />

      {/* Rutas protegidas Astor Fray  */}
      <Route element={<RutaProtegida rolesPermitidos={['ENCARGADOFRAY_ROLE', 'ADMIN_ROLE']}/>} >
      <Route path='AstorFray' element={<HomeFray/>} />
      <Route path='Comprobantes-Fray' element={<AstorFray/>} />
      <Route path='Listado-Fray' element={<ComprobantesFray/>} />
      </Route>

      {/* Rutas protegidas Astor Galindez */}
      <Route element={<RutaProtegida rolesPermitidos={['ENCARGADOGALINDEZ_ROLE', 'ADMIN_ROLE']}/>}>
      <Route path='AstorGalindez' element={<HomeGalindez/>} />
      <Route path='Comprobantes-Galindez' element={<AstorGalindez/>} />
      <Route path='Listado-Galindez' element={<ComprobantesGalindez/>} />
      </Route>

      {/* Rutas protegidas Inmobiliaria Catamarca Inversiones */}
      <Route element={<RutaProtegida rolesPermitidos={['ENCARGADOINMOBILIARIA_ROLE', 'ADMIN_ROLE']}/>}>
      <Route path='Inmobiliaria' element={<HomeInmobiliaria/>} />
      <Route path='Comprobantes-Inmobiliaria' element={<Inmobiliaria/>} />
      <Route path='Listado-Inmobiliaria' element={<ComprobantesInmobiliaria/>} />
      </Route>
      
      {/* Rutas protegidas creacion de usuario */}
      <Route element={<RutaProtegida rolesPermitidos={['ADMIN_ROLE']}/>}>
      <Route path='Crear-usuario' element={<NuevoUsuario/>} />
      <Route path='Usuarios' element={<GestionUsuarios/>} />
      </Route>

    </Route>

    <Route path='*' element={<Error404/>} />
    </Routes>

    <ToastContainer position="top-center" autoClose={3000} />
    </BrowserRouter>
  )
}

export default App
