import { validar } from '../src/index';

describe('Validar Function (src/index.ts)', () => {
  it('should validate a valid Ecuadorian ID (RUC persona natural)', () => {
    expect(validar('1710034065001', 'ecuatoriano')).toEqual({
      idType: 'ruc_persona_natural',
      ok: true,
    });
  });

  it('should reject an invalid Ecuadorian ID', () => {
    expect(() => validar('0000000000000', 'ecuatoriano')).toThrowError();
  });

  it('should return valid for valid Cedula', () => {
    expect(validar('1250583836', 'ecuatoriano')).toEqual({
      idType: 'cedula',
      ok: true,
    });
  });

  it('should return false for non-Ecuadorian nationality', () => {
    expect(validar('12345', 'other')).toBe(false);
  });
});
