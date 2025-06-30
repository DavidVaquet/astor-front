import { useContext } from 'react'
import { ListarComprobantes } from '../../components/ListarComprobantes'
import { ComprobanteContext } from '../../context/ComprobanteContext';

export const ComprobantesAstorFray = () => {
  const comprobanteContext = useContext(ComprobanteContext);
  return (
    <ListarComprobantes
    localProp="astorFray"
    setCambio={comprobanteContext.SetCambioFray}/>
  )
}
