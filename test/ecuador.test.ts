import validarIdEcuador, { validarCedula, validarRucPersonaNatural, validarRucSociedadPrivada, validarRucSociedadPublica } from '../src/ecuador';

describe('Validacion Cedula', () => {
  it('works', async () => {
    // const
    expect(await validarCedula('1250583836')).toEqual(true);
  });

  it('No puede estar vacio', async () => {
    await expect(validarCedula('')).rejects.toThrowError();
  });

  it('Valores ingresados deben ser digitos', async () => {
    await expect(validarCedula('125X583836')).rejects.toThrowError();
  });

  it('El codigo de provincia debe ser de 00-24', async () => {
    await expect(validarCedula('2550583836')).rejects.toThrowError();
  });
});

describe('Validacion RUC Persona Natural', () => {
  it('RUC valido', () => {
    expect(validarRucPersonaNatural('1710034065001')).toEqual(true);
  });

  it('RUC con longitud incorrecta', () => {
    expect(() => validarRucPersonaNatural('171003406500')).toThrowError();
  });

  it('RUC con caracteres no numericos', () => {
    expect(() => validarRucPersonaNatural('171003406500X')).toThrowError();
  });

  it('RUC con digito verificador incorrecto', () => {
    expect(() => validarRucPersonaNatural('1710034065002')).toThrowError();
  });

  it('RUC con codigo de provincia invalido', () => {
    expect(() => validarRucPersonaNatural('2510034065001')).toThrowError();
  });

  it('RUC con tercer digito invalido', () => {
    expect(() => validarRucPersonaNatural('1780034065001')).toThrowError();
  });
});

describe('Validacion RUC Sociedad Privada', () => {
  it('RUC valido', () => {
    expect(validarRucSociedadPrivada('1790011674001')).toEqual(true);
  });

  it('RUC con longitud incorrecta', () => {
    expect(() => validarRucSociedadPrivada('179001167400')).toThrowError();
  });

  it('RUC con tercer digito invalido (no es 9)', () => {
    expect(() => validarRucSociedadPrivada('1750011674001')).toThrowError();
  });

  it('RUC con digito verificador incorrecto', () => {
    expect(() => validarRucSociedadPrivada('1790011674002')).toThrowError();
  });

  it('RUC con codigo de provincia invalido', () => {
    expect(() => validarRucSociedadPrivada('2590011674001')).toThrowError();
  });
});

describe('Validacion RUC Sociedad Publica', () => {
  it('RUC valido', () => {
    expect(validarRucSociedadPublica('1760000011001')).toEqual(true);
  });

  it('RUC con longitud incorrecta', () => {
    expect(() => validarRucSociedadPublica('176000001100')).toThrowError();
  });

  it('RUC con tercer digito invalido (no es 6)', () => {
    expect(() => validarRucSociedadPublica('1750000011001')).toThrowError();
  });

  it('RUC con digito verificador incorrecto', () => {
    expect(() => validarRucSociedadPublica('1760000012001')).toThrowError();
  });

  it('RUC con codigo de provincia invalido', () => {
    expect(() => validarRucSociedadPublica('2560000011001')).toThrowError();
  });
});

describe('Validacion General ID Ecuador (default export)', () => {
  it('Valid RUC persona natural', async () => {
    await expect(validarIdEcuador('1710034065001')).resolves.toEqual({ idType: 'persona_natural' });
  });

  it('Valid RUC sociedad privada', async () => {
    await expect(validarIdEcuador('1790011674001')).resolves.toEqual({ idType: 'ruc_privada' });
  });

  it('Valid RUC sociedad publica', async () => {
    await expect(validarIdEcuador('1760000011001')).resolves.toEqual({ idType: 'ruc_publica' });
  });

  it('Invalid RUC (too short/bad check digit)', async () => {
    await expect(validarIdEcuador('0000000000000')).rejects.toThrowError();
  });

  it('Valid 10-digit Cedula (should fail due to length check after cedula validation)', async () => {
    await expect(validarIdEcuador('1250583836')).rejects.toThrowError('Valor ingresado debe tener 13 caracteres');
  });

  it('Invalid 10-digit Cedula (fails cedula validation first)', async () => {
    await expect(validarIdEcuador('1234567890')).rejects.toThrowError(); // Error from validarCedula
  });
});
