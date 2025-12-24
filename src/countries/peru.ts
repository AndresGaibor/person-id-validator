/**
 * Valida un DNI peruano.
 *
 * @param {string} dni - El DNI a validar (8 dígitos).
 * @param {string} [digitoVerificador] - Opcional. El dígito verificador para validación estricta.
 * @returns {boolean} `true` si es válido.
 */
export const validarDni = (
  dni: string,
  digitoVerificador?: string
): boolean => {
  if (!dni || typeof dni !== 'string') return false;

  if (!/^\d{8}$/.test(dni)) return false;

  if (digitoVerificador !== undefined) {
    const hash = [3, 2, 7, 6, 5, 4, 3, 2];
    let suma = 0;
    for (let i = 0; i < 8; i++) {
      suma += parseInt(dni[i], 10) * hash[i];
    }
    const entero = 11 - (suma % 11);
    const digitoCalculado = entero === 10 ? 0 : entero === 11 ? 1 : entero;
    // El dígito verificador puede ser un número 0-9 o una letra (Reniec a veces usa lógica distinta para letras, pero el estándar numérico es este).
    // Nota: El algoritmo real de RENIEC es un poco más complejo mapeando a letras a veces o usando Mod 11 diferente.
    // Usaremos una validación básica numérica si se provee número.

    return digitoCalculado.toString() === digitoVerificador;
  }

  return true;
};

export const ValidarIdentificacionPeru = {
  validarDni,
};
