import { validar } from '../src/index';

describe('Validar Function (src/index.ts)', () => {
  it('should validate a valid Ecuadorian ID (RUC persona natural)', async () => {
    await expect(validar('1710034065001', 'ecuatoriano')).resolves.toEqual({ idType: 'persona_natural' });
  });

  it('should reject an invalid Ecuadorian ID', async () => {
    await expect(validar('0000000000000', 'ecuatoriano')).rejects.toThrowError();
  });

  it('should reject a 10-digit Cédula for Ecuadorian nationality with specific error', async () => {
    await expect(validar('1250583836', 'ecuatoriano')).rejects.toThrowError('Valor ingresado debe tener 13 caracteres');
  });

  it('should return false for non-Ecuadorian nationality', () => {
    expect(validar('anyID123', 'extranjero')).toBe(false);
  });
});
