/**
 * Algoritmo de Luhn (Mod 10).
 * Usado en: Tarjetas de crédito, IMEI, SSN (Canadá), Israel, Sudáfrica, Suecia, etc.
 */
export const luhn = (value: string): boolean => {
  if (/[^0-9]/.test(value)) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = value.length - 1; i >= 0; i--) {
    let digit = parseInt(value.charAt(i), 10);
    if (shouldDouble) {
      if ((digit *= 2) > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

/**
 * Algoritmo Modulo 11 Genérico.
 * Usado en: Chile, Brasil, otros.
 * @param value String numérico
 * @param weights Array de pesos (ej: [2,3,4,5,6,7])
 * @param direction 'right' (default) o 'left'
 */
export const mod11 = (
  value: string,
  weights: number[] = [2, 3, 4, 5, 6, 7],
  _threshold: number = 11 // Para reiniciar pesos
): number => {
  let sum = 0;
  let weightIndex = 0;
  
  // Iterar de derecha a izquierda
  for (let i = value.length - 1; i >= 0; i--) {
    const digit = parseInt(value.charAt(i), 10);
    sum += digit * weights[weightIndex];
    weightIndex = (weightIndex + 1) % weights.length;
  }
  
  const rest = sum % 11;
  return rest === 0 ? 0 : 11 - rest; // Retorna el dígito calculado (10 o 11 pueden requerir manejo especial por quien llama)
};

/**
 * ISO 7064 Mod 11-2.
 * Usado en: China ID.
 */
export const iso7064mod11_2 = (value: string): string => {
  const weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
  let sum = 0;
  for (let i = 0; i < 17; i++) {
    sum += parseInt(value.charAt(i), 10) * weights[i];
  }
  const mod = sum % 11;
  const map = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2'];
  return map[mod];
};

/**
 * Algoritmo Verhoeff.
 * Usado en: Aadhaar (India).
 */
export const verhoeff = (value: string): boolean => {
  const d = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
    [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
    [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
    [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
    [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
    [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
    [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
    [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
    [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
  ];
  const p = [
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
    [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
    [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
    [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
    [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
    [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
    [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
    [7, 0, 4, 6, 9, 1, 3, 2, 5, 8]
  ];

  let c = 0;
  const invertedArray = value.split('').map(Number).reverse();

  for (let i = 0; i < invertedArray.length; i++) {
    c = d[c][p[i % 8][invertedArray[i]]];
  }

  return c === 0;
};
