import {
  validar,
  Chile,
  Spain,
  Mexico,
  USA,
  Argentina,
  Colombia,
  Peru,
} from '../src/index';

describe('Validation by Country', () => {
  describe('Chile (RUT)', () => {
    it('should validate valid RUT', () => {
      expect(Chile.validarRut('12.345.678-5')).toBe(true);
      expect(Chile.validarRut('12345678-5')).toBe(true);
      expect(Chile.validarRut('30.686.957-4')).toBe(true);
    });

    it('should fail invalid RUT', () => {
      expect(Chile.validarRut('12.345.678-1')).toBe(false);
    });

    it('should work via generic validar', () => {
      expect(validar('12.345.678-5', 'chile')).toBe(true);
    });
  });

  describe('Spain (DNI/NIE)', () => {
    it('should validate valid DNI', () => {
      expect(Spain.validarDniNie('12345678Z')).toBe(true);
    });

    it('should validate valid NIE', () => {
      expect(Spain.validarDniNie('X1234567L')).toBe(true);
    });

    it('should fail invalid DNI', () => {
      expect(Spain.validarDniNie('12345678A')).toBe(false);
    });
  });

  describe('Mexico (CURP/RFC)', () => {
    it('should validate valid CURP (Format + Check Digit)', () => {
      expect(Mexico.validarCurp('HEGT760825HDFLRR03')).toBe(true);
    });

    it('should validate valid RFC', () => {
      expect(Mexico.validarRfc('XAXX010101000')).toBe(true);
    });
  });

  describe('USA (SSN)', () => {
    it('should validate valid SSN', () => {
      expect(USA.validarSsn('123-45-6789')).toBe(true);
    });
    it('should fail invalid SSN', () => {
      expect(USA.validarSsn('000-12-1234')).toBe(false);
    });
  });

  describe('Argentina (DNI/CUIT)', () => {
    it('should validate valid DNI', () => {
      expect(Argentina.validarDni('12345678')).toBe(true);
    });
    it('should work via generic validar', () => {
      expect(validar('12345678', 'argentina')).toBe(true);
    });
  });

  describe('Colombia (Cedula/NIT)', () => {
    it('should validate valid Cedula', () => {
      expect(Colombia.validarCedula('12345678')).toBe(true);
    });
    it('should work via generic validar', () => {
      expect(validar('12345678', 'colombia')).toBe(true);
    });
  });

  describe('Peru (DNI)', () => {
    it('should validate valid DNI', () => {
      expect(Peru.validarDni('12345678')).toBe(true);
    });
    it('should work via generic validar', () => {
      expect(validar('12345678', 'peru')).toBe(true);
    });
  });
});
