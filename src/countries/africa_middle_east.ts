import { luhn } from '../utils/algorithms';

/**
 * South Africa: ID Number
 * 13 digits. Luhn.
 */
export const validarSouthAfricaID = (id: string): boolean => {
  if (!/^\d{13}$/.test(id)) return false;
  return luhn(id);
};

/**
 * Israel: ID Number
 * 9 digits. Luhn.
 */
export const validarIsraelID = (id: string): boolean => {
  if (!/^\d{1,9}$/.test(id)) return false;
  const padded = id.padStart(9, '0');
  return luhn(padded);
};

/**
 * Turkey: TC Kimlik No
 * 11 digits. Mod 10 specific algorithm.
 */
export const validarTurkeyTC = (id: string): boolean => {
  if (!/^[1-9]\d{10}$/.test(id)) return false;
  const d = id.split('').map(Number);
  
  const sumOdd = d[0] + d[2] + d[4] + d[6] + d[8];
  const sumEven = d[1] + d[3] + d[5] + d[7];
  
  const digit10 = (sumOdd * 7 - sumEven) % 10;
  const digit11 = (sumOdd + sumEven + d[9]) % 10;
  
  return digit10 === d[9] && digit11 === d[10];
};

// Regex Validators
export const validarEgyptNationalID = (id: string) => /^\d{14}$/.test(id);
export const validarNigeriaNIN = (id: string) => /^\d{11}$/.test(id);
export const validarKenyaID = (id: string) => /^\d{7,8}$/.test(id);
export const validarGhanaCard = (id: string) => /^GHA-\d{9}-\d{1}$/.test(id);
export const validarMoroccoCNIE = (id: string) => /^[A-Z]{1,2}\d{1,6}$/.test(id);
export const validarSaudiArabiaID = (id: string) => /^[12]\d{9}$/.test(id); // Usually starts with 1 or 2
export const validarIranID = (id: string) => /^\d{10}$/.test(id); // Handled in Asia mostly but placed here geographically sometimes
export const validarAlgeriaNIN = (id: string) => /^\d{18}$/.test(id);
export const validarTunisiaNIN = (id: string) => /^\d{8}$/.test(id);

export const ValidarIdentificacionAfricaMiddleEast = {
  validarSouthAfricaID,
  validarIsraelID,
  validarTurkeyTC,
  validarEgyptNationalID,
  validarNigeriaNIN,
  validarKenyaID,
  validarSaudiArabiaID
};
