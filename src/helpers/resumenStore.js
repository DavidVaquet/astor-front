let actualizarResumenFray = null;
let actualizarResumenGalindez = null;
let actualizarResumenInmobiliaria = null;
let actualizarResumenGeneral = null;

// Setters
export const setActualizarResumenFray = (fn) => { actualizarResumenFray = fn };
export const setActualizarResumenGalindez = (fn) => { actualizarResumenGalindez = fn };
export const setActualizarResumenInmobiliaria = (fn) => { actualizarResumenInmobiliaria = fn };
export const setActualizarResumenGeneral = (fn) => { actualizarResumenGeneral = fn };

// Getters
export const getActualizarResumenFray = () => actualizarResumenFray;
export const getActualizarResumenGalindez = () => actualizarResumenGalindez;
export const getActualizarResumenInmobiliaria = () => actualizarResumenInmobiliaria;
export const getActualizarResumenGeneral = () => actualizarResumenGeneral;