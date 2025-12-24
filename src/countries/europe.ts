// import { mod11 } from '../utils/algorithms';

/**
 * UK: National Insurance Number (NINO)
 */
export const validarUKNINO = (id: string): boolean => {
  // Regex: 2 letters, 6 digits, 1 letter (A, B, C, D)
  return /^(?!BG|GB|NK|KN|TN|NT|ZZ)[A-CEGHJ-PR-TW-Z]{1}[A-CEGHJ-NPR-TW-Z]{1}[0-9]{6}[A-D]{1}$/.test(id.replace(/\s/g, ''));
};

/**
 * France: NIR (Sécu)
 * 13 digits + 2 key. Mod 97.
 */
export const validarFranceNIR = (id: string): boolean => {
  const clean = id.replace(/\s/g, '');
  if (!/^\d{15}$/.test(clean)) return false;
  const number = BigInt(clean.substring(0, 13));
  const key = parseInt(clean.substring(13, 15), 10);
  // @ts-ignore
  return (BigInt(97) - (number % BigInt(97))) === BigInt(key);
};

/**
 * Italy: Codice Fiscale
 * 16 chars alphanumeric.
 */
export const validarItalyCodiceFiscale = (id: string): boolean => {
  return /^[A-Z]{6}\d{2}[A-Z]\d{2}[A-Z]\d{3}[A-Z]$/.test(id.toUpperCase());
};

/**
 * Germany: Personalausweis / Steuer-ID
 * Testing Steuer-ID (11 digits, Mod 10, complex)
 * Using simple format check for now.
 */
export const validarGermanySteuerID = (id: string): boolean => {
  return /^\d{11}$/.test(id);
};

/**
 * Netherlands: BSN
 * 9 digits. Weighted sum % 11 == 0. Last weight is -1.
 */
export const validarNetherlandsBSN = (id: string): boolean => {
  if (!/^\d{9}$/.test(id)) return false;
  let sum = 0;
  for (let i = 0; i < 8; i++) {
    sum += parseInt(id[i], 10) * (9 - i);
  }
  sum += parseInt(id[8], 10) * -1;
  return sum % 11 === 0;
};

/**
 * Poland: PESEL
 * 11 digits. Mod 10 weighted.
 */
export const validarPolandPESEL = (id: string): boolean => {
  if (!/^\d{11}$/.test(id)) return false;
  const weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(id[i], 10) * weights[i];
  const lastDigit = sum % 10;
  const check = (10 - lastDigit) % 10;
  return check === parseInt(id[10], 10);
};

/**
 * Romania: CNP
 * 13 digits. Mod 11.
 */
export const validarRomaniaCNP = (id: string): boolean => {
  if (!/^\d{13}$/.test(id)) return false;
  const constant = '279146358279';
  let sum = 0;
  for (let i = 0; i < 12; i++) {
    sum += parseInt(id[i], 10) * parseInt(constant[i], 10);
  }
  const remainder = sum % 11;
  const check = remainder === 10 ? 1 : remainder;
  return check === parseInt(id[12], 10);
};

// Regex/Simple validators
export const validarRussiaPassport = (id: string) => /^\d{4}\s?\d{6}$/.test(id);
export const validarUkrainePassport = (id: string) => /^[A-Z]{2}\d{6}$|^\d{9}$/.test(id);
export const validarSwedenPersonnummer = (id: string) => /^\d{6,8}[-+]?\d{4}$/.test(id); // Luhn check usually
export const validarNorwayFodselsnummer = (id: string) => /^\d{11}$/.test(id);
export const validarDenmarkCPR = (id: string) => /^\d{6}-?\d{4}$/.test(id);
export const validarFinlandHETU = (id: string) => /^\d{6}[-+A]\d{3}[0-9A-Z]$/.test(id);
export const validarBelgiumNN = (id: string) => /^\d{11}$/.test(id);
export const validarAustriaSV = (id: string) => /^\d{10}$/.test(id);
export const validarSwitzerlandAHV = (id: string) => /^756\.\d{4}\.\d{4}\.\d{2}$/.test(id);
export const validarPortugalNIF = (id: string) => {
  if (!/^\d{9}$/.test(id)) return false;
  // Let's implement manually for NIF: sum(d*weight) % 11. if rem < 2, dv=0, else 11-rem.
  let sum = 0;
  for(let i=0; i<8; i++) sum += parseInt(id[i], 10) * (9-i);
  let rem = sum % 11;
  let dv = (rem < 2) ? 0 : 11 - rem;
  return dv === parseInt(id[8], 10);
};
export const validarGreeceAMKA = (id: string) => /^\d{11}$/.test(id);
export const validarCzechRC = (id: string) => /^\d{9,10}$/.test(id);
export const validarHungaryTAJ = (id: string) => /^\d{9}$/.test(id);
export const validarIrelandPPS = (id: string) => /^\d{7}[A-Z]{1,2}$/.test(id);

export const ValidarIdentificacionEurope = {
  validarUKNINO,
  validarFranceNIR,
  validarItalyCodiceFiscale,
  validarGermanySteuerID,
  validarNetherlandsBSN,
  validarPolandPESEL,
  validarRomaniaCNP,
  validarRussiaPassport,
  validarUkrainePassport,
  validarPortugalNIF,
  validarSwedenPersonnummer,
  validarNorwayFodselsnummer,
  validarDenmarkCPR,
  validarFinlandHETU,
  validarBelgiumNN,
  validarAustriaSV,
  validarSwitzerlandAHV,
  validarGreeceAMKA,
  validarCzechRC,
  validarHungaryTAJ,
  validarIrelandPPS
};