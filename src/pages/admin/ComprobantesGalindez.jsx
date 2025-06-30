import React, { useContext } from 'react'
import { ListarComprobantes } from '../../components/ListarComprobantes'
import { ComprobanteContext } from '../../context/ComprobanteContext'

export const ComprobantesGalindez = () => {
  const comprobanteContext = useContext(ComprobanteContext);
  return (
    <ListarComprobantes
    localProp="astorGalindez"
    setCambio={comprobanteContext.setCambioGalindez}/>
  )
}
