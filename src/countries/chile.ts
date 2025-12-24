/**
 * Valida un RUT/RUN chileno.
 *
 * Formato aceptado: 12.345.678-k, 12345678-k, 12345678k.
 * Algoritmo: Módulo 11.
 *
 * @param {string} rut - El RUT a validar.
 * @returns {boolean} `true` si es válido.
 */
export const validarRut = (rut: string): boolean => {
  if (!rut || typeof rut !== 'string') return false;

  // Limpiar el RUT: quitar puntos y guiones, convertir a mayúsculas
  const valor = rut.replace(/[.-]/g, '').toUpperCase();

  // Validar formato mínimo (al menos 2 caracteres: cuerpo + digito verificador)
  if (valor.length < 2) return false;

  // Separar cuerpo y dígito verificador
  const cuerpo = valor.slice(0, -1);
  const dv = valor.slice(-1);

  // Validar que el cuerpo sea numérico
  if (!/^\d+$/.test(cuerpo)) return false;

  // Calcular dígito verificador esperado
  let suma = 0;
  let multiplicador = 2;

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo[i], 10) * multiplicador;
    multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
  }

  const resto = suma % 11;
  const dvCalculado = 11 - resto;

  let dvEsperado = '';
  if (dvCalculado === 11) {
    dvEsperado = '0';
  } else if (dvCalculado === 10) {
    dvEsperado = 'K';
  } else {
    dvEsperado = dvCalculado.toString();
  }

  return dv === dvEsperado;
};

export const ValidarIdentificacionChile = {
  validarRut,
};
