import { validarCedula } from '../src/ecuador';

describe('Validacion Cedula', () => {
  xit('works', async () => {
    // const
    expect(await validarCedula('1250583836')).toEqual(true);
  });

  xit('No puede estar vacio', async () => {
    await expect(validarCedula('')).rejects.toThrowError();
  });

  xit('Valores ingresados deben ser digitos', async () => {
    await expect(validarCedula('125X583836')).rejects.toThrowError();
  });

  it('El codigo de provincia debe ser de 00-24', async () => {
    await expect(validarCedula('2550583836')).rejects.toThrowError();
  });
});
