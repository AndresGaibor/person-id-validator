/**
 * Valida una Cédula de Ciudadanía colombiana (formato).
 *
 * @param {string} cedula - La cédula a validar.
 * @returns {boolean} `true` si tiene formato válido.
 */
export const validarCedula = (cedula: string): boolean => {
  if (!cedula || typeof cedula !== 'string') return false;
  // Hasta 10 dígitos usualmente.
  return /^\d{3,10}$/.test(cedula);
};

/**
 * Valida un NIT colombiano.
 *
 * Algoritmo: Módulo 11 con primos.
 *
 * @param {string} nit - El NIT a validar (incluyendo dígito de verificación si se pasa separado o junto).
 * @returns {boolean} `true` si es válido.
 */
export const validarNit = (nit: string): boolean => {
  if (!nit || typeof nit !== 'string') return false;
  const valor = nit.replace(/[\s.-]/g, ''); // Limpiar

  // El NIT suele tener entre 9 y 10 dígitos (cuerpo + DV) o más hasta 15.
  // Asumiremos el último dígito es el DV.
  if (valor.length < 2) return false;

  const cuerpo = valor.slice(0, -1);
  const dv = valor.slice(-1);

  const primos = [3, 7, 13, 17, 19, 23, 29, 37, 41, 43, 47, 53, 59, 67, 71];
  let suma = 0;

  // Recorrer de derecha a izquierda
  for (let i = 0; i < cuerpo.length; i++) {
    const digito = parseInt(cuerpo.charAt(cuerpo.length - 1 - i), 10);
    suma += digito * primos[i];
  }

  const resto = suma % 11;
  let dvCalculado = 0;
  if (resto > 1) {
    dvCalculado = 11 - resto;
  }

  return parseInt(dv, 10) === dvCalculado;
};

export const ValidarIdentificacionColombia = {
  validarCedula,
  validarNit,
};
