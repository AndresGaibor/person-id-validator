/**
 * Valida un Social Security Number (SSN) de Estados Unidos.
 *
 * @param {string} ssn - El SSN a validar.
 * @returns {boolean} `true` si es válido.
 */
export const validarSsn = (ssn: string): boolean => {
  if (!ssn || typeof ssn !== 'string') return false;

  // Formato: 000-00-0000 o 000000000
  // Exclusiones: 000, 666, 900-999 en el primer grupo. 00 en el segundo. 0000 en el tercero.
  const regex = /^(?!000|666|9\d{2})(\d{3})[- ]?(?!00)(\d{2})[- ]?(?!0000)(\d{4})$/;

  return regex.test(ssn);
};

export const ValidarIdentificacionUsa = {
  validarSsn,
};
