import { iso7064mod11_2, verhoeff } from '../utils/algorithms';

/**
 * China: Resident Identity Card
 * 18 dígitos. ISO 7064 Mod 11-2.
 */
export const validarChinaID = (id: string): boolean => {
  if (!/^\d{17}[\dX]$/.test(id)) return false;
  // TODO: Validar fecha y región si se desea mayor precisión.
  const expected = iso7064mod11_2(id.substring(0, 17));
  return id[17] === expected;
};

/**
 * India: Aadhaar
 * 12 dígitos. Verhoeff algorithm.
 */
export const validarIndiaAadhaar = (id: string): boolean => {
  if (!/^\d{12}$/.test(id)) return false;
  // No puede empezar con 0 o 1
  if (/^[01]/.test(id)) return false;
  return verhoeff(id);
};

/**
 * India: PAN (Permanent Account Number)
 * 10 caracteres. Regex.
 */
export const validarIndiaPAN = (id: string): boolean => {
  return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(id);
};

/**
 * Japan: My Number (Individual Number)
 * 12 dígitos. Mod 11 variant.
 */
export const validarJapanMyNumber = (id: string): boolean => {
  if (!/^\d{12}$/.test(id)) return false;
  const digits = id.split('').map(Number);
  const check = digits.pop()!;
  
  let sum = 0;
  for (let i = 0; i < 11; i++) {
    const p = digits[10 - i]; // Right to left (ignoring check)
    const q = i <= 6 ? i + 2 : i - 4; // Weight pattern
    sum += p * q;
  }
  const remainder = sum % 11;
  const expected = remainder <= 1 ? 0 : 11 - remainder;
  return check === expected;
};

/**
 * South Korea: Resident Registration Number (RRN)
 * 13 dígitos. Mod 11.
 * Formato: YYMMDD-GABCDEF
 */
export const validarSouthKoreaRRN = (id: string): boolean => {
  const clean = id.replace(/-/g, '');
  if (!/^\d{13}$/.test(clean)) return false;
  
  const digits = clean.split('').map(Number);
  const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += digits[i] * weights[i];
  }
  
  const remainder = (11 - (sum % 11)) % 10;
  return remainder === digits[12];
};

/**
 * Singapore: NRIC / FIN
 * 9 chars: @0000000# (@ = S,T,F,G,M)
 */
export const validarSingaporeNRIC = (id: string): boolean => {
  if (!/^[STFGM]\d{7}[A-Z]$/.test(id)) return false;
  const first = id[0];
  const last = id[8];
  const digits = id.slice(1, 8).split('').map(Number);
  const weights = [2, 7, 6, 5, 4, 3, 2];
  
  let sum = 0;
  for (let i = 0; i < 7; i++) sum += digits[i] * weights[i];
  
  if (first === 'T' || first === 'G') sum += 4;
  if (first === 'M') sum += 3;

  const remainder = sum % 11;
  const stMap = ['J', 'Z', 'I', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A'];
  const fgMap = ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'M', 'L', 'K'];
  const mMap =  ['X', 'W', 'U', 'T', 'R', 'Q', 'P', 'N', 'J', 'L', 'K'];

  if (first === 'S' || first === 'T') return last === stMap[remainder];
  if (first === 'F' || first === 'G') return last === fgMap[remainder];
  if (first === 'M') return last === mMap[remainder];
  return false;
};

/**
 * Indonesia: NIK (KTP)
 * 16 dígitos.
 */
export const validarIndonesiaNIK = (id: string): boolean => {
  return /^\d{16}$/.test(id);
};

/**
 * Thailand: ID Card
 * 13 dígitos. Mod 11.
 */
export const validarThailandID = (id: string): boolean => {
  if (!/^\d{13}$/.test(id)) return false;
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(id[i], 10) * (13 - i);
  }
  const check = (11 - (sum % 11)) % 10;
  return check === parseInt(id[12], 10);
};

// Regex validators for others
export const validarPakistanCNIC = (id: string) => /^\d{5}-?\d{7}-?\d{1}$/.test(id);
export const validarVietnamID = (id: string) => /^\d{9}$|^\d{12}$/.test(id);
export const validarPhilippinesID = (id: string) => /^[A-Z]{4}\d{7}[A-Z]{2}\d{1}$/.test(id) || /^\d{4}-\d{7}-\d{1}$/.test(id); // Varios formatos
export const validarBangladeshNID = (id: string) => /^\d{10}$|^\d{13}$|^\d{17}$/.test(id);
export const validarMalaysiaNRIC = (id: string) => /^\d{6}-?\d{2}-?\d{4}$/.test(id);
export const validarTaiwanID = (id: string) => /^[A-Z]\d{9}$/.test(id); // Simplified
export const validarHongKongID = (id: string) => /^[A-Z]{1,2}\d{6}\([\dA]\)$/.test(id); // Simplified
export const validarIranNationalID = (id: string) => /^\d{10}$/.test(id); // Simplified
export const validarMyanmarNRC = (_id: string) => true; // Too complex/varied format
export const validarNepalCitizenship = (_id: string) => true; // Varied formats

export const ValidarIdentificacionAsia = {
  validarChinaID,
  validarIndiaAadhaar,
  validarIndiaPAN,
  validarJapanMyNumber,
  validarSouthKoreaRRN,
  validarSingaporeNRIC,
  validarIndonesiaNIK,
  validarThailandID,
  validarPakistanCNIC,
  validarVietnamID,
  validarPhilippinesID,
  validarBangladeshNID,
  validarMalaysiaNRIC
};
