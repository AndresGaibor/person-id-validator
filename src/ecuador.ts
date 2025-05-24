/**
 * Valida un número de cédula ecuatoriano (10 dígitos).
 *
 * Realiza las siguientes validaciones en orden:
 * 1.  Validación inicial (longitud 10, solo dígitos) usando `validarInicial`.
 * 2.  Validación de código de provincia (dos primeros dígitos de Ecuador) usando `validarCodigoProvincia`.
 * 3.  Validación del tercer dígito (según reglas ecuatorianas, debe estar entre 0 y 5) usando `validarTercerDigito`.
 * 4.  Validación del dígito verificador (décimo dígito) usando `algoritmoModulo10` específico para Ecuador.
 *
 * @param {string} numeroCedula - El número de cédula ecuatoriana a validar. Debe ser una cadena de 10 dígitos.
 * @returns {boolean} `true` si la cédula ecuatoriana es válida y cumple todos los criterios.
 * @throws {Error} Si la cédula ecuatoriana no cumple con alguno de los criterios de validación.
 *         El mensaje de error indicará la naturaleza del fallo (ej. longitud incorrecta,
 *         código de provincia inválido, tercer dígito incorrecto, o dígito verificador no coincide).
 */
export const validarCedula = (numeroCedula: string) => {
  const CANTIDAD_CARACTERES_REQUERIDOS = 10;

  // validaciones
  validarInicial(numeroCedula, CANTIDAD_CARACTERES_REQUERIDOS);
  validarCodigoProvincia(numeroCedula.substring(0, 2));
  validarTercerDigito(numeroCedula[2], 'cedula');
  algoritmoModulo10(numeroCedula.substring(0, 9), numeroCedula[9]);

  return true;
};

/**
 * Valida un número de RUC de persona natural ecuatoriano.
 *
 * Realiza las siguientes validaciones:
 * 1.  Validación inicial (longitud 13, solo dígitos).
 * 2.  Código de provincia válido.
 * 3.  Tercer dígito válido para persona natural (0-5).
 * 4.  Código de establecimiento válido (no puede ser '000').
 * 5.  Dígito verificador mediante el algoritmo Módulo 10 (aplicable a RUC de persona natural en Ecuador).
 *
 * @param {string} numero - El número de RUC de persona natural ecuatoriano a validar (13 dígitos).
 * @returns {boolean} `true` si el RUC ecuatoriano es válido.
 * @throws {Error} Si el RUC ecuatoriano no cumple con alguno de los criterios de validación.
 */
function validarRucPersonaNatural(numero: string) {
  // validaciones
  validarInicial(numero, 13);
  validarCodigoProvincia(numero.substring(0, 2));
  validarTercerDigito(numero[2], 'ruc_natural');
  validarCodigoEstablecimiento(numero.substring(10, 13));
  algoritmoModulo10(numero.substring(0, 9), numero[9]);

  return true;
}

/**
 * Valida un número de RUC de sociedad privada ecuatoriano.
 *
 * Realiza las siguientes validaciones:
 * 1.  Validación inicial (longitud 13, solo dígitos).
 * 2.  Código de provincia válido.
 * 3.  Tercer dígito válido para sociedad privada (9).
 * 4.  Código de establecimiento válido (no puede ser '000').
 * 5.  Dígito verificador mediante el algoritmo Módulo 11 (específico para RUC de sociedad privada en Ecuador).
 *
 * @param {string} numero - El número de RUC de sociedad privada ecuatoriano a validar (13 dígitos).
 * @returns {boolean} `true` si el RUC ecuatoriano es válido.
 * @throws {Error} Si el RUC ecuatoriano no cumple con alguno de los criterios de validación.
 */
function validarRucSociedadPrivada(numero: string) {
  // validaciones
  validarInicial(numero, 13);
  validarCodigoProvincia(numero.substring(0, 2));
  validarTercerDigito(numero[2], 'ruc_privada');
  validarCodigoEstablecimiento(numero.substring(10, 13));
  algoritmoModulo11(numero.substring(0, 9), numero[9], 'ruc_privada');

  return true;
}

/**
 * Valida un número de RUC de sociedad pública ecuatoriano.
 *
 * Realiza las siguientes validaciones:
 * 1.  Validación inicial (longitud 13, solo dígitos).
 * 2.  Código de provincia válido.
 * 3.  Tercer dígito válido para sociedad pública (6).
 * 4.  Código de establecimiento válido (no puede ser '0000', ya que para públicas son 4 dígitos de establecimiento).
 * 5.  Dígito verificador mediante el algoritmo Módulo 11 (específico para RUC de sociedad pública en Ecuador).
 *
 * @param {string} numero - El número de RUC de sociedad pública ecuatoriano a validar (13 dígitos).
 * @returns {boolean} `true` si el RUC ecuatoriano es válido.
 * @throws {Error} Si el RUC ecuatoriano no cumple con alguno de los criterios de validación.
 */
function validarRucSociedadPublica(numero: string) {
  // validaciones
  validarInicial(numero, 13);
  validarCodigoProvincia(numero.substring(0, 2));
  validarTercerDigito(numero[2], 'ruc_publica');
  validarCodigoEstablecimiento(numero.substring(9, 13));
  algoritmoModulo11(numero.substring(0, 8), numero[8], 'ruc_publica');

  return true;
}

/**
 * Valida un número de identificación ecuatoriano (cédula o RUC).
 *
 * Determina el tipo de identificación ecuatoriano basado en la longitud del número:
 * - 10 dígitos: Se asume Cédula ecuatoriana.
 * - 13 dígitos: Se asume RUC ecuatoriano.
 *
 * Luego, aplica las validaciones específicas para el tipo de identificación ecuatoriano detectado.
 * Para RUC ecuatoriano, el tercer dígito determina si es persona natural (0-5), sociedad pública (6), o sociedad privada (9).
 *
 * @param {string} numero - El número de identificación ecuatoriano a validar. Debe ser una cadena de 10 o 13 dígitos.
 * @returns {{idType: string, ok: boolean}} Un objeto que contiene:
 *    - `idType`: El tipo de identificación ecuatoriano determinado ('cedula', 'ruc_persona_natural', 'ruc_sociedad_privada', 'ruc_sociedad_publica').
 *    - `ok`: Siempre `true` si la validación es exitosa (la función arroja un error en caso contrario).
 * @throws {Error} Si el número de identificación ecuatoriano no cumple con los criterios de validación generales (longitud, solo dígitos)
 * o específicos del tipo de identificación ecuatoriano (código de provincia, tercer dígito, dígito verificador, etc.).
 */
export const validar = (numero: string) => {
  if (typeof numero !== 'string') {
    throw new Error('El valor proporcionado debe ser una cadena de texto.');
  }

  // Validación de longitud y caracteres básicos
  if (!/^\d+$/.test(numero)) {
    throw new Error('Valor ingresado solo puede tener dígitos.');
  }

  let idType: string;

  if (numero.length === 10) {
    validarCedula(numero);
    idType = 'cedula';
  } else if (numero.length === 13) {
    // Validaciones comunes para todos los RUC
    validarInicial(numero, 13); // Longitud y solo dígitos ya cubierto, pero puede tener otras validaciones.
    validarCodigoProvincia(numero.substring(0, 2));

    const tercerDigito = parseInt(numero[2], 10);

    if (tercerDigito >= 0 && tercerDigito < 6) {
      // RUC Persona Natural
      validarTercerDigito(numero[2], 'ruc_natural');
      validarCodigoEstablecimiento(numero.substring(10, 13));
      algoritmoModulo10(numero.substring(0, 9), numero[9]);
      idType = 'ruc_persona_natural';
    } else if (tercerDigito === 9) {
      // RUC Sociedad Privada
      validarTercerDigito(numero[2], 'ruc_privada');
      validarCodigoEstablecimiento(numero.substring(10, 13));
      algoritmoModulo11(numero.substring(0, 9), numero[9], 'ruc_privada');
      idType = 'ruc_sociedad_privada';
    } else if (tercerDigito === 6) {
      // RUC Sociedad Pública
      validarTercerDigito(numero[2], 'ruc_publica');
      // Para RUC de sociedades públicas, el código de establecimiento es de 4 dígitos (posiciones 9 a 12)
      // y el dígito verificador es el noveno.
      validarCodigoEstablecimiento(numero.substring(9, 13)); // Correcto: usa los 4 dígitos
      algoritmoModulo11(numero.substring(0, 8), numero[8], 'ruc_publica'); // Correcto: usa los 8 primeros y el 9no como verificador
      idType = 'ruc_sociedad_publica';
    } else {
      throw new Error(
        'Tercer dígito inválido para RUC. Debe ser 0-5 para persona natural, 6 para pública, o 9 para privada.'
      );
    }
  } else {
    throw new Error(
      'Longitud incorrecta. El número debe tener 10 dígitos para cédula o 13 para RUC.'
    );
  }

  return { idType, ok: true };
};

/**
/**
/**
 * Realiza validaciones iniciales comunes para Cédula o RUC ecuatoriano.
 *
 * Verifica que:
 * 1. El número no esté vacío.
 * 2. El número contenga solo dígitos.
 * 3. El número tenga la cantidad de caracteres especificada (10 para Cédula, 13 para RUC).
 *
 * @param {string} numero - El número de Cédula o RUC ecuatoriano a validar.
 * @param {number} caracteres - La cantidad de caracteres que debe tener el número (10 o 13).
 * @returns {boolean} `true` si las validaciones son exitosas.
 * @throws {Error} Si alguna de las validaciones falla (ej. "Valor no puede estar vacío", "Valor ingresado solo puede tener dígitos", etc.).
 */
function validarInicial(numero: string, caracteres: number) {
  if (numero === null || numero === undefined || numero.length === 0) {
    throw new Error('Valor no puede estar vacío.');
  }

  if (!/^\d+$/.test(numero)) {
    throw new Error('Valor ingresado solo puede tener dígitos.');
  }

  if (numero.length !== caracteres) {
    throw new Error(
      `Valor ingresado debe tener ${caracteres} caracteres, pero tiene ${numero.length}.`
    );
  }

  return true;
}

/**
/**
 * Valida el código de provincia (dos primeros dígitos) de una Cédula o RUC ecuatoriano.
 *
 * El código de provincia debe ser un número entre 0 y 24.
 * Aunque tradicionalmente es de 1 a 24 (para las provincias de Ecuador), se incluye 0 por si existen casos especiales o futuros.
 * La provincia 22 (Galápagos) es válida.
 *
 * @param {string} numeroProvincia - Los dos primeros dígitos del número de Cédula o RUC ecuatoriano, que representan el código de provincia.
 * @returns {boolean} `true` si el código de provincia ecuatoriano es válido.
 * @throws {Error} Si el código de provincia no es un número o está fuera del rango permitido (0-24 para Ecuador).
 */
const validarCodigoProvincia = (numeroProvincia: string) => {
  if (numeroProvincia.length !== 2) {
    throw new Error(
      'Código de Provincia debe tener 2 dígitos.'
    );
  }
  const codigoProvincia = parseInt(numeroProvincia, 10);
  if (isNaN(codigoProvincia) || codigoProvincia < 0 || codigoProvincia > 24) {
    // Nota: Pichincha es 17, Galápagos es 22. El rango hasta 24 cubre las provincias existentes.
    throw new Error(
      'Código de Provincia (dos primeros dígitos) inválido. Debe ser un número entre 0 y 24.'
    );
  }

  return true;
};

/**
/**
/**
 * Valida el tercer dígito de una Cédula o RUC ecuatoriano.
 *
 * El significado y validez del tercer dígito dependen del tipo de identificación ecuatoriano:
 * - **Cédula (`cedula`)**: Debe ser un número entre 0 y 5 (regla ecuatoriana).
 * - **RUC Persona Natural (`ruc_natural`)**: Debe ser un número entre 0 y 5 (regla ecuatoriana).
 * - **RUC Sociedad Privada (`ruc_privada`)**: Debe ser igual a 9 (regla ecuatoriana).
 * - **RUC Sociedad Pública (`ruc_publica`)**: Debe ser igual a 6 (regla ecuatoriana).
 *
 * @param {string} digito - El tercer dígito del número de Cédula o RUC ecuatoriano.
 * @param {'cedula' | 'ruc_natural' | 'ruc_privada' | 'ruc_publica'} tipo - El tipo de identificación ecuatoriano para el cual se valida el tercer dígito.
 * @returns {boolean} `true` si el tercer dígito es válido para el tipo de identificación ecuatoriano especificado.
 * @throws {Error} Si el tercer dígito no es un número, no es válido para el tipo especificado, o si el tipo de identificación es desconocido.
 */
function validarTercerDigito(
  digito: string,
  tipo: 'cedula' | 'ruc_natural' | 'ruc_privada' | 'ruc_publica'
) {
  if (digito.length !== 1) {
    throw new Error('El tercer dígito debe ser un solo carácter numérico.');
  }
  const numeroInt = parseInt(digito, 10);

  if (isNaN(numeroInt)) {
    throw new Error('El tercer dígito proporcionado no es un número válido.');
  }

  switch (tipo) {
    case 'cedula':
    case 'ruc_natural':
      if (numeroInt < 0 || numeroInt > 5) {
        throw new Error(
          'Tercer dígito debe ser mayor o igual a 0 y menor a 6 para cédulas y RUC de persona natural'
        );
      }
      break;
    case 'ruc_privada':
      if (numeroInt !== 9) {
        throw new Error(
          'Tercer dígito debe ser igual a 9 para sociedades privadas'
        );
      }
      break;

    case 'ruc_publica':
      if (numeroInt !== 6) {
        throw new Error(
          'Tercer dígito debe ser igual a 6 para sociedades públicas'
        );
      }
      break;
    default:
      throw new Error('Tipo de Identificación no existe.');
  }

  return true;
}

/**
/**
/**
 * Valida el código de establecimiento de un RUC ecuatoriano.
 *
 * El código de establecimiento corresponde a los últimos dígitos del RUC ecuatoriano antes del identificador de serie (ej. '001').
 * No puede ser '000' (o '0000' para RUC de sociedades públicas ecuatorianas).
 * - Para RUC de persona natural y sociedad privada en Ecuador: son los dígitos 10, 11 y 12 (longitud 3).
 * - Para RUC de sociedad pública en Ecuador: son los dígitos 9, 10, 11 y 12 (longitud 4).
 *
 * @param {string} codigo - El código de establecimiento del RUC ecuatoriano a validar.
 * @returns {boolean} `true` si el código de establecimiento ecuatoriano es válido.
 * @throws {Error} Si el código de establecimiento no es numérico, o si es '0', '00', '000', etc. (indicando que es menor a 1).
 */
function validarCodigoEstablecimiento(codigo: string) {
  if (!/^\d+$/.test(codigo)) {
    throw new Error('Código de establecimiento debe contener solo dígitos.');
  }
  const numeroEstablecimiento = parseInt(codigo, 10);
  if (isNaN(numeroEstablecimiento) || numeroEstablecimiento < 1) {
    throw new Error(
      `Código de establecimiento inválido ('${codigo}'). No puede ser cero y debe ser numérico.`
    );
  }
  // Adicionalmente, se podría verificar que no sea '000' o '0000' explícitamente si es un requisito,
  // pero numeroEstablecimiento < 1 ya cubre el caso de que todos sean ceros.
  return true;
}

/**
/**
/**
 * Aplica el algoritmo "Módulo 10" para validar el dígito verificador de Cédulas y RUC de personas naturales ecuatorianas.
 * Este algoritmo es específico para la validación de estos documentos en Ecuador.
 *
 * **Coeficientes (Ecuador):** Los primeros nueve dígitos del número de identificación se multiplican respectivamente por los coeficientes: `[2, 1, 2, 1, 2, 1, 2, 1, 2]`.
 *
 *
 * **Cálculo:**
 * 1.  Multiplicar cada uno de los 9 primeros dígitos del documento por su respectivo coeficiente.
 *     Ej: `d1*2, d2*1, d3*2, ... , d9*2`.
 * 2.  Si alguno de los resultados de la multiplicación es mayor o igual a 10, se resta 9 a ese resultado.
 *     (Esto es equivalente a sumar los dos dígitos del resultado, ej. 12 => 1+2=3, o 12-9=3; 18 => 1+8=9, o 18-9=9).
 * 3.  Sumar todos los valores obtenidos.
 * 4.  Calcular el residuo de la suma total dividido para 10 (total % 10).
 * 5.  Si el residuo es 0, el dígito verificador esperado es 0.
 * 6.  Si el residuo no es 0, el dígito verificador esperado es 10 menos el residuo (según Módulo 10).
 * 7.  Comparar el dígito verificador calculado con el décimo dígito del documento ecuatoriano. Deben ser iguales.
 *
 * @param {string} digitosIniciales - Los nueve primeros dígitos de la Cédula o RUC de persona natural ecuatoriano.
 * @param {number | string} digitoVerificadorParam - El décimo dígito (dígito verificador) de la Cédula o RUC ecuatoriano.
 * @returns {boolean} `true` si el dígito verificador es correcto según el algoritmo para documentos ecuatorianos.
 * @throws {Error} Si el `digitoVerificadorParam` no es un número válido o si los `digitosIniciales` no validan contra el `digitoVerificadorParam` para el documento ecuatoriano.
 */
function algoritmoModulo10(
  digitosIniciales: string,
  digitoVerificadorParam: number | string
) {
  // Coeficientes para el algoritmo Módulo 10: [2, 1, 2, 1, 2, 1, 2, 1, 2]
  const arrayCoeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2];
  let total = 0;
  let digitoVerificador: number;

  if (digitosIniciales.length !== 9) {
    throw new Error("Los dígitos iniciales para Módulo 10 deben ser 9.");
  }

  if (typeof digitoVerificadorParam === 'string') {
    if (digitoVerificadorParam.length !== 1) {
      throw new Error("El dígito verificador debe ser un solo carácter numérico.");
    }
    digitoVerificador = parseInt(digitoVerificadorParam, 10);
    if (isNaN(digitoVerificador)) {
      throw new Error(
        'El dígito verificador proporcionado no es un número válido.'
      );
    }
  } else {
    digitoVerificador = digitoVerificadorParam;
  }

  for (let i = 0; i < digitosIniciales.length; i++) {
    const digitoActual = parseInt(digitosIniciales[i], 10);
    if (isNaN(digitoActual)) {
      throw new Error(`El dígito en la posición ${i+1} de los dígitos iniciales no es un número.`);
    }
    let valorPosicion = digitoActual * arrayCoeficientes[i];

    if (valorPosicion >= 10) {
      //El valor máximo que se puede obtener es 18, por lo cual solo hace falta
      //obtener el residuo de 10 y sumarle 1.
      valorPosicion = (valorPosicion % 10) + 1;
    }
    total = total + valorPosicion;
  }

  residuo = total % 10;

  if (residuo === 0) {
    resultado = 0;
  } else {
    resultado = 10 - residuo;
  }

  if (resultado !== digitoVerificador) {
    throw new Error('Dígitos iniciales no validan contra Dígito Idenficador');
  }

  return true;
}

/**
/**
/**
 * Aplica el algoritmo "Módulo 11" para validar el dígito verificador de RUC de sociedades (privadas o públicas) ecuatorianas.
 * Este algoritmo es específico para la validación de estos tipos de RUC en Ecuador.
 *
 * **Coeficientes (Ecuador):**
 * -   **RUC Sociedades Privadas (`ruc_privada`):** Los primeros nueve dígitos del RUC ecuatoriano se multiplican respectivamente por `[4, 3, 2, 7, 6, 5, 4, 3, 2]`. El dígito verificador es el décimo.
 * -   **RUC Sociedades Públicas (`ruc_publica`):** Los primeros ocho dígitos del RUC ecuatoriano se multiplican respectivamente por `[3, 2, 7, 6, 5, 4, 3, 2]`. El dígito verificador es el noveno.
 *
 * **Cálculo:**
 * 1.  Multiplicar los dígitos correspondientes del RUC por sus respectivos coeficientes según el tipo de sociedad.
 * 2.  Sumar todos los valores obtenidos.
 * 3.  Calcular el residuo de la suma total dividido para 11 (total % 11).
 * 4.  Si el residuo es 0, el dígito verificador esperado es 0.
 * 5.  Si el residuo no es 0, el dígito verificador esperado es 11 menos el residuo (según Módulo 11).
 * 6.  Comparar el dígito verificador calculado con el dígito verificador correspondiente del RUC ecuatoriano. Deben ser iguales.
 *
 * @param {string} digitosIniciales - Los dígitos del RUC ecuatoriano que preceden al dígito verificador.
 *    - Para `ruc_privada` ecuatoriano: los 9 primeros dígitos.
 *    - Para `ruc_publica` ecuatoriano: los 8 primeros dígitos.
 * @param {string | number} digitoVerificadorParam - El dígito verificador del RUC ecuatoriano.
 *    - Para `ruc_privada` ecuatoriano: el décimo dígito.
 *    - Para `ruc_publica` ecuatoriano: el noveno dígito.
 * @param {'ruc_privada' | 'ruc_publica'} tipo - El tipo de RUC de sociedad ecuatoriana.
 * @returns {boolean} `true` si el dígito verificador es correcto según el algoritmo para RUCs ecuatorianos.
 * @throws {Error} Si el tipo de RUC es inválido para el contexto ecuatoriano, si el `digitoVerificadorParam` no es un número válido,
 * o si los `digitosIniciales` no validan contra el `digitoVerificadorParam` para el RUC ecuatoriano.
 */
function algoritmoModulo11(
  digitosIniciales: string,
  digitoVerificadorParam: string | number,
  tipo: 'ruc_privada' | 'ruc_publica'
) {
  let arrayCoeficientes: number[];
  let total = 0;
  let digitoVerificador: number;

  switch (tipo) {
    case 'ruc_privada':
      // Para RUC de sociedades privadas, se usan los 9 primeros dígitos y los coeficientes: [4, 3, 2, 7, 6, 5, 4, 3, 2]
      if (digitosIniciales.length !== 9) {
        throw new Error("Los dígitos iniciales para RUC privado (Módulo 11) deben ser 9.");
      }
      arrayCoeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];
      break;
    case 'ruc_publica':
      // Para RUC de sociedades públicas, se usan los 8 primeros dígitos y los coeficientes: [3, 2, 7, 6, 5, 4, 3, 2]
      if (digitosIniciales.length !== 8) {
        throw new Error("Los dígitos iniciales para RUC público (Módulo 11) deben ser 8.");
      }
      arrayCoeficientes = [3, 2, 7, 6, 5, 4, 3, 2];
      break;
    default:
      // Esto no debería ocurrir si el tipado se usa correctamente, pero es una salvaguarda.
      // @ts-expect-error exhaustive check
      throw new Error(`Tipo de Identificación "${tipo}" no es válido para el algoritmo Módulo 11.`);
  }

  if (typeof digitoVerificadorParam === 'string') {
     if (digitoVerificadorParam.length !== 1) {
      throw new Error("El dígito verificador debe ser un solo carácter numérico.");
    }
    digitoVerificador = parseInt(digitoVerificadorParam, 10);
    if (isNaN(digitoVerificador)) {
      throw new Error(
        'El dígito verificador proporcionado no es un número válido.'
      );
    }
  } else {
    digitoVerificador = digitoVerificadorParam;
  }

  for (let i = 0; i < digitosIniciales.length; i++) {
    const digitoActual = parseInt(digitosIniciales[i], 10);
     if (isNaN(digitoActual)) {
      throw new Error(`El dígito en la posición ${i+1} de los dígitos iniciales no es un número.`);
    }
    const valorPosicion = digitoActual * arrayCoeficientes[i];
    total = total + valorPosicion;
  }

  residuo = total % 11;

  resultado = residuo === 0 ? 0 : 11 - residuo;

  if (resultado !== digitoVerificador) {
    throw new Error('Dígitos iniciales no validan contra Dígito Idenficador');
  }

  return true;
}

/**
export default validar;

/**
 * Objeto que agrupa funciones de validación para diferentes tipos de identificación **ecuatoriana**.
 * Todas las funciones dentro de este objeto están diseñadas específicamente para las reglas de validación de Ecuador.
 */
export const ValidarIdentificacion = {
  /**
   * Valida un número de cédula **ecuatoriano** (10 dígitos).
   *
   * Realiza las siguientes validaciones en orden:
   * 1.  Validación inicial (longitud 10, solo dígitos) usando `validarInicial`.
   * 2.  Validación de código de provincia (dos primeros dígitos de Ecuador) usando `validarCodigoProvincia`.
   * 3.  Validación del tercer dígito (según reglas ecuatorianas, debe estar entre 0 y 5) usando `validarTercerDigito`.
   * 4.  Validación del dígito verificador (décimo dígito) usando `algoritmoModulo10` específico para Ecuador.
   *
   * @param {string} numeroCedula - El número de cédula **ecuatoriana** a validar. Debe ser una cadena de 10 dígitos.
   * @returns {boolean} `true` si la cédula **ecuatoriana** es válida y cumple todos los criterios.
   * @throws {Error} Si la cédula **ecuatoriana** no cumple con alguno de los criterios de validación.
   */
  validarCedula,
  /**
   * Valida un número de RUC de persona natural **ecuatoriano** (13 dígitos).
   * Llama internamente a `validarRucPersonaNatural` que contiene la lógica detallada para RUCs ecuatorianos.
   * @param {string} numeroRucNatural - El número de RUC de persona natural **ecuatoriano** a validar.
   * @returns {boolean} `true` si el RUC **ecuatoriano** es válido.
   * @throws {Error} Si el RUC **ecuatoriano** no cumple con los criterios de validación.
   */
  validarRucPersonaNatural,
  /**
   * Valida un número de RUC de sociedad privada **ecuatoriano** (13 dígitos).
   * Llama internamente a `validarRucSociedadPrivada` que contiene la lógica detallada para RUCs ecuatorianos.
   * @param {string} numeroRucPrivada - El número de RUC de sociedad privada **ecuatoriano** a validar.
   * @returns {boolean} `true` si el RUC **ecuatoriano** es válido.
   * @throws {Error} Si el RUC **ecuatoriano** no cumple con los criterios de validación.
   */
  validarRucSociedadPrivada,
  /**
   * Valida un número de RUC de sociedad pública **ecuatoriano** (13 dígitos).
   * Llama internamente a `validarRucSociedadPublica` que contiene la lógica detallada para RUCs ecuatorianos.
   * @param {string} numeroRucPublica - El número de RUC de sociedad pública **ecuatoriano** a validar.
   * @returns {boolean} `true` si el RUC **ecuatoriano** es válido.
   * @throws {Error} Si el RUC **ecuatoriano** no cumple con los criterios de validación.
   */
  validarRucSociedadPublica,
  /**
   * Valida un número de identificación **ecuatoriano** (cédula o RUC).
   * Determina automáticamente el tipo de identificación **ecuatoriano** (cédula de 10 dígitos, RUC de 13 dígitos)
   * y aplica las validaciones correspondientes de Ecuador.
   * Llama internamente a `validar` (la función exportada globalmente) que contiene la lógica principal para IDs ecuatorianos.
   *
   * @param {string} numeroIdentificacion - El número de identificación **ecuatoriano** (cédula o RUC) a validar.
   * @returns {{idType: string, ok: boolean}} Un objeto que contiene:
   *    - `idType`: El tipo de identificación **ecuatoriano** determinado ('cedula', 'ruc_persona_natural', 'ruc_sociedad_privada', 'ruc_sociedad_publica').
   *    - `ok`: Siempre `true` si la validación es exitosa (la función arroja un error en caso contrario).
   * @throws {Error} Si el número de identificación **ecuatoriano** no cumple con los criterios de validación.
   */
  validar,
};
