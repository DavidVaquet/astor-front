export const comision = (montoAlquiler, porcentaje) => {
    const monto = parseFloat(montoAlquiler);
    const porc = parseFloat(porcentaje);

    if (isNaN(monto) || isNaN(porc)) return 0;

    return (monto * porc / 100);
}