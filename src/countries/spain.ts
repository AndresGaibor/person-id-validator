/**
 * Valida un DNI o NIE español.
 *
 * Algoritmo: Módulo 23.
 * Letras: TRWAGMYFPDXBNJZSQVHLCKE
 *
 * @param {string} documento - El documento a validar.
 * @returns {boolean} `true` si es válido.
 */
export const validarDniNie = (documento: string): boolean => {
  if (!documento || typeof documento !== 'string') return false;

  // Normalizar: mayúsculas, quitar guiones/espacios
  let valor = documento.replace(/[\s-]/g, '').toUpperCase();

  // Regex para DNI (8 dígitos + letra) o NIE (X/Y/Z + 7 dígitos + letra)
  const regex = /^([0-9]{8}|[XYZ][0-9]{7})[A-Z]$/;

  if (!regex.test(valor)) return false;

  // Si es NIE, reemplazar letra inicial
  const niePrefix = valor.charAt(0);
  if (niePrefix === 'X') valor = '0' + valor.slice(1);
  else if (niePrefix === 'Y') valor = '1' + valor.slice(1);
  else if (niePrefix === 'Z') valor = '2' + valor.slice(1);

  const numero = parseInt(valor.slice(0, -1), 10);
  const letra = valor.slice(-1);
  const letrasValidas = 'TRWAGMYFPDXBNJZSQVHLCKE';
  const letraEsperada = letrasValidas.charAt(numero % 23);

  return letra === letraEsperada;
};

export const ValidarIdentificacionSpain = {
  validarDniNie,
};
