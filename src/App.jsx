import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { RutaProtegida } from './components/RutaProtegida';
// Pages Layout
import { LayoutAdmin } from './layout/LayoutAdmin';
// import { LayoutAuth } from './layout/LayoutAuth';
// Pages Auth
import { Login } from '/src/pages/auth/Login.jsx';
import { RecoveryPassword } from './pages/auth/RecoveryPassword';
import { RestablecerPassword } from './pages/auth/RestablecerPassword';
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
import { ComprobantesAstorFray} from './pages/admin/ComprobantesAstorFray';
import { ComprobantesGalindez } from './pages/admin/ComprobantesGalindez';
import { ComprobantesInmobiliaria } from './pages/admin/ComprobantesInmobiliaria';
// Historiales Financieros 
import { HistorialFinancieroFray } from './pages/admin/HistorialFinancieroFray';
import { HistorialFinancieroGalindez } from './pages/admin/HistorialFinancieroGalindez';
import { HistorialFinancieroInmobiliaria } from './pages/admin/HistorialFinancieroInmobiliaria';
import { HistorialGeneral} from './pages/admin/HistorialGeneral';
// React Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GastosCompartidos } from './pages/admin/GastosCompartidos';
import { SubirGastos } from './pages/admin/SubirGastos';
import { ListarTransferencias } from './pages/admin/ListarTransferencias';
import { VistaInmobiliaria } from './pages/admin/VistaInmobiliaria';
import { SemanalGalindez } from './pages/admin/SemanalGalindez';
import { SemanalFray } from './pages/admin/SemanalFray';
import { SemanalGeneral } from './pages/admin/SemanalGeneral';

function App() {
  

  return (

    <BrowserRouter>
    <Routes>

      {/* Ruta privada   */}
      <Route path="/" element={<Navigate to="/login" />}/>
      {/* Ruta publica */}
      <Route path='/login' element={<Login/>} />
      <Route path='/recuperar-contraseña' element={<RecoveryPassword/>} />
      <Route path="/restablecer-password/:token" element={<RestablecerPassword />} />

    <Route path='/home' element={<LayoutAdmin/>}>
      <Route index element={<Home/>} />
      <Route path='historial-general' element={<HistorialGeneral/>} />
      <Route path='gastos-compartidos' element={<GastosCompartidos/>} />
      <Route path='nuevo-gasto' element={<SubirGastos/>} />
      <Route path='listado-gastos' element={<ListarTransferencias/>} />
      <Route path='semanal-general' element={<SemanalGeneral/>} />
      {/* Rutas protegidas Astor Fray  */}
      <Route element={<RutaProtegida rolesPermitidos={['ENCARGADOFRAY_ROLE', 'ADMIN_ROLE']}/>} >
      <Route path='astor-fray' element={<HomeFray/>} />
      <Route path='comprobantes-fray' element={<AstorFray/>} />
      <Route path='listado-fray' element={<ComprobantesAstorFray/>} />
      <Route path='historial-fray' element={<HistorialFinancieroFray/>} />
      <Route path='semanal-fray' element={<SemanalFray/>} />
      </Route>

      {/* Rutas protegidas Astor Galindez */}
      <Route element={<RutaProtegida rolesPermitidos={['ENCARGADOGALINDEZ_ROLE', 'ADMIN_ROLE']}/>}>
      <Route path='astor-galindez' element={<HomeGalindez/>} />
      <Route path='comprobantes-galindez' element={<AstorGalindez/>} />
      <Route path='listado-galindez' element={<ComprobantesGalindez/>} />
      <Route path='historial-galindez' element={<HistorialFinancieroGalindez/>} />
      <Route path='semanal-galindez' element={<SemanalGalindez/>} />
      </Route>

      {/* Rutas protegidas Inmobiliaria Catamarca Inversiones */}
      <Route element={<RutaProtegida rolesPermitidos={['ENCARGADOINMOBILIARIA_ROLE', 'ADMIN_ROLE']}/>}>
      <Route path='inmobiliaria' element={<HomeInmobiliaria/>} />
      <Route path='comprobantes-inmobiliaria' element={<Inmobiliaria/>} />
      <Route path='listado-inmobiliaria' element={<ComprobantesInmobiliaria/>} />
      <Route path='historial-inmobiliaria' element={<HistorialFinancieroInmobiliaria/>} />
      <Route path='semanal-inmobiliaria' element={<VistaInmobiliaria/>} />
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
