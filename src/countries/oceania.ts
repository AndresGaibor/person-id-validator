/**
 * Australia: Tax File Number (TFN)
 * 8 or 9 digits. Mod 11 weighted.
 */
export const validarAustraliaTFN = (id: string): boolean => {
  const clean = id.replace(/\s/g, '');
  if (!/^\d{8,9}$/.test(clean)) return false;
  
  let weights: number[] = [];
  if (clean.length === 8) {
    weights = [10, 7, 8, 4, 6, 3, 5, 1];
  } else {
    weights = [1, 4, 3, 7, 5, 8, 6, 9, 10];
  }
  
  let sum = 0;
  for (let i = 0; i < clean.length; i++) {
    sum += parseInt(clean[i], 10) * weights[i];
  }
  
  return sum % 11 === 0;
};

/**
 * New Zealand: IRD Number
 * 8 or 9 digits. Mod 11.
 */
export const validarNewZealandIRD = (id: string): boolean => {
  const clean = id.replace(/\D/g, '');
  if (!/^\d{8,9}$/.test(clean)) return false;
  
  const padded = clean.padStart(9, '0');
  // Primary weights
  const weights1 = [3, 2, 7, 6, 5, 4, 3, 2];
  let sum = 0;
  for(let i=0; i<8; i++) sum += parseInt(padded[i], 10) * weights1[i];
  
  let rem = sum % 11;
  let check = rem === 0 ? 0 : 11 - rem;
  
  if (check === 10) {
    // Secondary weights if check is 10
    const weights2 = [7, 4, 3, 2, 5, 2, 7, 6];
    sum = 0;
    for(let i=0; i<8; i++) sum += parseInt(padded[i], 10) * weights2[i];
    rem = sum % 11;
    check = rem === 0 ? 0 : 11 - rem;
  }
  
  return check === parseInt(padded[8], 10);
};

export const ValidarIdentificacionOceania = {
  validarAustraliaTFN,
  validarNewZealandIRD
};
