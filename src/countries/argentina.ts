/**
 * Valida un DNI argentino (formato simple).
 *
 * @param {string} dni - El DNI a validar.
 * @returns {boolean} `true` si tiene formato válido.
 */
export const validarDni = (dni: string): boolean => {
  if (!dni || typeof dni !== 'string') return false;
  // Entre 7 y 8 dígitos (millones a decenas de millones)
  return /^\d{7,8}$/.test(dni.replace(/\./g, ''));
};

/**
 * Valida un CUIL o CUIT argentino.
 *
 * Algoritmo: Módulo 11.
 *
 * @param {string} cuit - El CUIT/CUIL a validar.
 * @returns {boolean} `true` si es válido.
 */
export const validarCuit = (cuit: string): boolean => {
  if (!cuit || typeof cuit !== 'string') return false;
  const valor = cuit.replace(/[-.]/g, '');

  if (valor.length !== 11) return false;

  const base = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
  let suma = 0;

  for (let i = 0; i < 10; i++) {
    suma += parseInt(valor.charAt(i), 10) * base[i];
  }

  const resto = suma % 11;
  const dvCalculado = 11 - resto;

  let dvEsperado = dvCalculado;
  if (dvCalculado === 11) dvEsperado = 0;
  if (dvCalculado === 10) dvEsperado = 9; // Nota: CUITs reales raramente terminan en 9 si da 10, suelen cambiar el prefijo. Pero algorítmicamente es esto.

  return parseInt(valor.charAt(10), 10) === dvEsperado;
};

export const ValidarIdentificacionArgentina = {
  validarDni,
  validarCuit,
};
