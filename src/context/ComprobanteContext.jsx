import { createContext, useState } from "react";

export const ComprobanteContext = createContext();

export const ComprobanteProvider = ({children}) => {

const [recargarComprobantes, setRecargarComprobantes] = useState(false);

const toggleRecargar = () => {
    setRecargarComprobantes((prev) => !prev)
};

return (
    <ComprobanteContext.Provider value={{recargarComprobantes, toggleRecargar}} >
        {children}
    </ComprobanteContext.Provider>
)};