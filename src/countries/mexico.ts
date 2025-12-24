/**
 * Valida una CURP mexicana.
 *
 * @param {string} curp - La CURP a validar.
 * @returns {boolean} `true` si es válida.
 */
export const validarCurp = (curp: string): boolean => {
  if (!curp || typeof curp !== 'string') return false;
  const valor = curp.toUpperCase().trim();

  // Regex estricto
  const regex = /^[A-Z]{4}\d{6}[HM][A-Z]{2}[B-DF-HJ-NP-TV-Z]{3}[A-Z0-9]\d$/;
  if (!regex.test(valor)) return false;

  // Validación Dígito Verificador
  const diccionario = '0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
  let suma = 0;
  for (let i = 0; i < 17; i++) {
    const char = valor.charAt(i);
    const pos = diccionario.indexOf(char);
    suma += pos * (18 - i);
  }

  let digitoEsperado = 10 - (suma % 10);
  if (digitoEsperado === 10) digitoEsperado = 0;

  return parseInt(valor.charAt(17), 10) === digitoEsperado;
};

/**
 * Valida un RFC mexicano (Persona Física o Moral).
 *
 * @param {string} rfc - El RFC a validar.
 * @returns {boolean} `true` si es válido (formato).
 */
export const validarRfc = (rfc: string): boolean => {
  if (!rfc || typeof rfc !== 'string') return false;
  const valor = rfc.toUpperCase().trim();

  // Persona Física: 4 letras, 6 números, 3 homoclave
  // Persona Moral: 3 letras, 6 números, 3 homoclave
  const regex = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;

  return regex.test(valor);
};

export const ValidarIdentificacionMexico = {
  validarCurp,
  validarRfc,
};
