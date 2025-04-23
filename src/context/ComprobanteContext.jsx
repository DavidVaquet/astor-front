import { createContext, useState } from "react";

export const ComprobanteContext = createContext();

export const ComprobanteProvider = ({ children }) => {

  const [recargarComprobantes, setRecargarComprobantes] = useState(0);
  const [cambioFray, setCambioFray] = useState(0);
  const [cambioGalindez, setCambioGalindez] = useState(0);
  const [cambioInmobiliaria, setCambioInmobiliaria] = useState(0);
  const [cambioGeneral, setCambioGeneral] = useState(0);

  const toggleRecargar = () => {
    setRecargarComprobantes(prev => prev + 1);
  };

  

  return (
    <ComprobanteContext.Provider
      value={{
        recargarComprobantes,
        toggleRecargar,
        cambioFray,
        setCambioFray,
        cambioGalindez,
        setCambioGalindez,
        cambioInmobiliaria,
        setCambioInmobiliaria,
        cambioGeneral,
        setCambioGeneral      
      }}
    >
      {children}
    </ComprobanteContext.Provider>
  );
};
