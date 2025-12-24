import { luhn } from '../utils/algorithms';

/**
 * Brazil: CPF
 * 11 digits. Mod 11.
 */
export const validarBrazilCPF = (id: string): boolean => {
  const clean = id.replace(/[.-]/g, '');
  if (!/^\d{11}$/.test(clean) || /^(\d)\1{10}$/.test(clean)) return false;
  
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(clean.charAt(i)) * (10 - i);
  let rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  if (rest !== parseInt(clean.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) sum += parseInt(clean.charAt(i)) * (11 - i);
  rest = (sum * 10) % 11;
  if (rest === 10 || rest === 11) rest = 0;
  return rest === parseInt(clean.charAt(10));
};

/**
 * Canada: SIN
 * 9 digits. Luhn.
 */
export const validarCanadaSIN = (id: string): boolean => {
  const clean = id.replace(/[\s-]/g, '');
  if (!/^\d{9}$/.test(clean)) return false;
  return luhn(clean);
};

/**
 * Uruguay: CI
 * 7 or 8 digits (dv is last). Mod 10 (Luhn-like but specific weights).
 * Weights: 2987634
 */
export const validarUruguayCI = (id: string): boolean => {
  const clean = id.replace(/[.-]/g, '');
  if (!/^\d{7,8}$/.test(clean)) return false;
  
  const dv = parseInt(clean.slice(-1), 10);
  const body = clean.slice(0, -1).padStart(7, '0'); // Pad to 7 for calc
  const weights = [2, 9, 8, 7, 6, 3, 4];
  
  let sum = 0;
  for (let i = 0; i < 7; i++) sum += parseInt(body[i], 10) * weights[i];
  
  const rest = sum % 10;
  const expected = (10 - rest) % 10;
  
  return dv === expected;
};

/**
 * Dominican Republic: Cedula
 * 11 digits. Luhn.
 */
export const validarDominicanRepublicCedula = (id: string): boolean => {
  const clean = id.replace(/-/g, '');
  if (!/^\d{11}$/.test(clean)) return false;
  return luhn(clean);
};

// Regex Validators
export const validarParaguayCI = (id: string) => /^\d{5,8}$/.test(id); // Usually just numeric
export const validarVenezuelaCI = (id: string) => /^[VE]-?\d{5,9}$/.test(id.toUpperCase()) || /^\d{5,9}$/.test(id);
export const validarCostaRicaCedula = (id: string) => /^\d{9}$/.test(id);
export const validarElSalvadorDUI = (id: string) => /^\d{8}-?\d{1}$/.test(id);
export const validarGuatemalaCUI = (id: string) => /^\d{13}$/.test(id);
export const validarPanamaCedula = (id: string) => /^(?:PE|E|N|[2-9]|[1][0-3]?)-?\d{1,5}-?\d{1,6}$/.test(id); // Basic format
export const validarBoliviaCI = (id: string) => /^\d{5,8}$/.test(id);

export const ValidarIdentificacionAmericasExtended = {
  validarBrazilCPF,
  validarCanadaSIN,
  validarUruguayCI,
  validarDominicanRepublicCedula,
  validarVenezuelaCI,
  validarParaguayCI,
  validarCostaRicaCedula,
  validarElSalvadorDUI,
  validarGuatemalaCUI,
  validarPanamaCedula,
  validarBoliviaCI
};
