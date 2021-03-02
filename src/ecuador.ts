let error: string | null = null;

export const validarCedula = async (numero: string) => {
  const CANTIDAD_CARACTERES_REQUERIDOS = 10;

  // validaciones
  await validarInicial(numero, CANTIDAD_CARACTERES_REQUERIDOS);
  validarCodigoProvincia(numero.substring(0, 2));
  validarTercerDigito(numero[2], 'cedula');
  algoritmoModulo10(numero.substring(0, 9), numero[9]);

  return true;
};

/**
 * Validar RUC persona natural
 *
 * @param  string  numero  Número de RUC persona natural
 *
 * @return Boolean
 */

function validarRucPersonaNatural(numero: string) {
  // borro por si acaso errores de llamadas anteriores.
  error = null;

  // validaciones
  try {
    validarInicial(numero, 13);
    validarCodigoProvincia(numero.substring(0, 2));
    validarTercerDigito(numero[2], 'ruc_natural');
    validarCodigoEstablecimiento(numero.substring(10, 13));
    algoritmoModulo10(numero.substring(0, 9), numero[9]);
  } catch (e) {
    error = e.message;
    return false;
  }

  return true;
}

/**
 * Validar RUC sociedad privada
 *
 * @param  string  numero  Número de RUC sociedad privada
 *
 * @return Boolean
 */
function validarRucSociedadPrivada(numero: string) {
  // borro por si acaso errores de llamadas anteriores.
  error = null;

  // validaciones
  try {
    validarInicial(numero, 13);
    validarCodigoProvincia(numero.substring(0, 2));
    validarTercerDigito(numero[2], 'ruc_privada');
    validarCodigoEstablecimiento(numero.substring(10, 13));
    algoritmoModulo11(numero.substring(0, 9), numero[9], 'ruc_privada');
  } catch (e) {
    error = e.message;
    return false;
  }

  return true;
}

/**
 * Validar RUC sociedad publica
 *
 * @param  string  numero  Número de RUC sociedad publica
 *
 * @return Boolean
 */
function validarRucSociedadPublica(numero: string) {
  // borro por si acaso errores de llamadas anteriores.
  error = null;

  // validaciones
  try {
    validarInicial(numero, 13);
    validarCodigoProvincia(numero.substring(0, 2));
    validarTercerDigito(numero[2], 'ruc_publica');
    validarCodigoEstablecimiento(numero.substring(9, 13));
    algoritmoModulo11(numero.substring(0, 8), numero[8], 'ruc_publica');
  } catch (e) {
    error = e.message;
    return false;
  }

  return true;
}

export const validar = async (numero: string) => {
  let idType: string | null = null;

  // validaciones
  // Si es mayor a 0 y menor a 10, es un numero de cedula
  if (numero.length > 0 && numero.length <= 10) {
    await validarCedula(numero);
    // throw new Error('Cedula incorrecta');
    // return { ok: cedulaCorrecta, error };
  }

  validarInicial(numero, 13);
  validarCodigoProvincia(numero.substring(0, 2));

  // Ruc persona natural
  const digito3 = Number(numero[2]);

  if (digito3 >= 0 && digito3 < 6) {
    validarCodigoEstablecimiento(numero.substring(10, 13));
    algoritmoModulo10(numero.substring(0, 9), numero[9]);
    idType = 'persona_natural';
    // Ruc sociedad privada
  } else if (digito3 === 9) {
    validarCodigoEstablecimiento(numero.substring(10, 13));
    algoritmoModulo11(numero.substring(0, 9), numero[9], 'ruc_privada');
    idType = 'ruc_privada';

    // Ruc sociedad publica
  } else if (digito3 === 6) {
    validarCodigoEstablecimiento(numero.substring(9, 13));
    algoritmoModulo11(numero.substring(0, 8), numero[8], 'ruc_publica');
    idType = 'ruc_publica';
  } else {
    throw new Error('Tercer digito incorrecto');
  }

  return { idType };
};

/**
 * Validaciones iniciales para CI y RUC
 *
 * @param  string  numero      CI o RUC
 * @param  integer caracteres  Cantidad de caracteres requeridos
 *
 * @return Boolean
 *
 * @throws exception Cuando valor esta vacio, cuando no es dígito y
 * cuando no tiene cantidad requerida de caracteres
 */
async function validarInicial(numero: string, caracteres: number) {
  if (numero.length === 0) {
    throw new Error('Valor no puede estar vacio');
  }

  if (!/^\d+$/.test(numero)) {
    throw new Error('Valor ingresado solo puede tener digitos');
  }

  if (numero.length !== caracteres) {
    throw new Error('Valor ingresado debe tener ' + caracteres + ' caracteres');
  }

  return true;
}

/**
 * Validación de código de provincia (dos primeros dígitos de CI/RUC)
 *
 * @param  string  numero  Dos primeros dígitos de CI/RUC
 *
 * @return boolean
 *
 * @throws exception Cuando el código de provincia no esta entre 00 y 24
 */
const validarCodigoProvincia = (numero: string) => {
  if (Number(numero) < 0 || Number(numero) > 24) {
    throw new Error(
      'Codigo de Provincia (dos primeros dígitos) no deben ser mayor a 24 ni menores a 0'
    );
  }

  return true;
};

/**
 * Validación de tercer dígito
 *
 * Permite validad el tercer dígito del documento. Dependiendo
 * del campo tipo (tipo de identificación) se realizan las validaciones.
 * Los posibles valores del campo tipo son: cedula, ruc_natural, ruc_privada
 *
 * Para Cédulas y RUC de personas naturales el terder dígito debe
 * estar entre 0 y 5 (0,1,2,3,4,5)
 *
 * Para RUC de sociedades privadas el terder dígito debe ser
 * igual a 9.
 *
 * Para RUC de sociedades públicas el terder dígito debe ser
 * igual a 6.
 *
 * @param  string numero  tercer dígito de CI/RUC
 * @param  string tipo  tipo de identificador
 *
 * @return boolean
 *
 * @throws exception Cuando numero no puede ser interpretado como un int,
 * cuando el tercer digito no es válido o cuando el tipo de identificiación
 * no existe. El mensaje de error depende del tipo de Idenficiación.
 */
function validarTercerDigito(numero: string, tipo: string) {
  let numeroInt = undefined;

  try {
    numeroInt = parseInt(numero);
  } catch (e) {
    throw new Error('El tercer dígito no es un número');
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
 * Validación de código de establecimiento
 *
 * @param  string numero  tercer dígito de CI/RUC
 *
 * @return boolean
 *
 * @throws exception Cuando el establecimiento es menor a 1
 */
function validarCodigoEstablecimiento(numero: string) {
  if (Number(numero) < 1) {
    throw new Error('Código de establecimiento no puede ser 0');
  }

  return true;
}

/**
 * Algoritmo Modulo10 para validar si CI y RUC de persona natural son válidos.
 *
 * Los coeficientes usados para verificar el décimo dígito de la cédula,
 * mediante el algoritmo “Módulo 10” son:  2. 1. 2. 1. 2. 1. 2. 1. 2
 *
 * Paso 1: Multiplicar cada dígito de los digitosIniciales por su respectivo
 * coeficiente.
 *
 *  Ejemplo
 *  digitosIniciales posicion 1  x 2
 *  digitosIniciales posicion 2  x 1
 *  digitosIniciales posicion 3  x 2
 *  digitosIniciales posicion 4  x 1
 *  digitosIniciales posicion 5  x 2
 *  digitosIniciales posicion 6  x 1
 *  digitosIniciales posicion 7  x 2
 *  digitosIniciales posicion 8  x 1
 *  digitosIniciales posicion 9  x 2
 *
 * Paso 2: Sí alguno de los resultados de cada multiplicación es mayor a o igual a 10,
 * se suma entre ambos dígitos de dicho resultado. Ex. 12->1+2->3
 *
 * Paso 3: Se suman los resultados y se obtiene total
 *
 * Paso 4: Divido total para 10, se guarda residuo. Se resta 10 menos el residuo.
 * El valor obtenido debe concordar con el digitoVerificador
 *
 * Nota: Cuando el residuo es cero(0) el dígito verificador debe ser 0.
 *
 * @param  string digitosIniciales   Nueve primeros dígitos de CI/RUC
 * @param  string digitoVerificador  Décimo dígito de CI/RUC
 *
 * @return boolean
 *
 * @throws exception Cuando el digitoVerificador no se puede interpretar como
 * un número y cuando los digitosIniciales no concuerdan contra
 * el código verificador.
 */
function algoritmoModulo10(
  digitosIniciales: string,
  digitoVerificador: number | string
) {
  var arrayCoeficientes = [2, 1, 2, 1, 2, 1, 2, 1, 2],
    total = 0,
    residuo: number,
    resultado: number;

  if (typeof digitoVerificador === 'string') {
    try {
      digitoVerificador = parseInt(digitoVerificador);
    } catch (e) {
      throw new Error('El dígito verificador no es un número.');
    }
  }

  for (var i = 0; i < digitosIniciales.length; i++) {
    var valorPosicion = Number(digitosIniciales[i]) * arrayCoeficientes[i];

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
 * Algoritmo Modulo11 para validar RUC de sociedades privadas y públicas
 *
 * El código verificador es el decimo digito para RUC de empresas privadas
 * y el noveno dígito para RUC de empresas públicas
 *
 * Paso 1: Multiplicar cada dígito de los digitosIniciales por su respectivo
 * coeficiente.
 *
 * Para RUC privadas el coeficiente esta definido y se multiplica con las siguientes
 * posiciones del RUC:
 *
 *  Ejemplo
 *  digitosIniciales posicion 1  x 4
 *  digitosIniciales posicion 2  x 3
 *  digitosIniciales posicion 3  x 2
 *  digitosIniciales posicion 4  x 7
 *  digitosIniciales posicion 5  x 6
 *  digitosIniciales posicion 6  x 5
 *  digitosIniciales posicion 7  x 4
 *  digitosIniciales posicion 8  x 3
 *  digitosIniciales posicion 9  x 2
 *
 * Para RUC privadas el coeficiente esta definido y se multiplica con las siguientes
 * posiciones del RUC:
 *
 *  digitosIniciales posicion 1  x 3
 *  digitosIniciales posicion 2  x 2
 *  digitosIniciales posicion 3  x 7
 *  digitosIniciales posicion 4  x 6
 *  digitosIniciales posicion 5  x 5
 *  digitosIniciales posicion 6  x 4
 *  digitosIniciales posicion 7  x 3
 *  digitosIniciales posicion 8  x 2
 *
 * Paso 2: Se suman los resultados y se obtiene total
 *
 * Paso 3: Divido total para 11, se guarda residuo. Se resta 11 menos el residuo.
 * El valor obtenido debe concordar con el digitoVerificador
 *
 * Nota: Cuando el residuo es cero(0) el dígito verificador debe ser 0.
 *
 * @param  string digitosIniciales   Nueve primeros dígitos de RUC
 * @param  string digitoVerificador  Décimo dígito de RUC
 * @param  string tipo Tipo de identificador
 *
 * @return boolean
 *
 * @throws exception cuando el tipo de ruc no existe, cuando el dígitoVerificador no es un número o cuando los
 * digitosIniciales no concuerdan contra el código verificador.
 */
function algoritmoModulo11(
  digitosIniciales: string,
  digitoVerificador: string | number,
  tipo: string
) {
  let arrayCoeficientes: number[],
    total = 0,
    residuo: number,
    resultado: number,
    valorPosicion: number;

  switch (tipo) {
    case 'ruc_privada':
      arrayCoeficientes = [4, 3, 2, 7, 6, 5, 4, 3, 2];
      break;
    case 'ruc_publica':
      arrayCoeficientes = [3, 2, 7, 6, 5, 4, 3, 2];
      break;
    default:
      throw new Error('Tipo de Identificación no existe.');
      break;
  }

  if (typeof digitoVerificador === 'string') {
    try {
      digitoVerificador = parseInt(digitoVerificador);
    } catch (e) {
      throw new Error('El dígito verificador no es un número');
    }
  }

  for (let i = 0; i < digitosIniciales.length; i++) {
    valorPosicion = Number(digitosIniciales[i]) * arrayCoeficientes[i];

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
 * Get error
 *
 * @return string Mensaje de error
 */
function getError() {
  return error;
}

export default validar;

export const ValidarIdentificacion = {
  validarCedula,
  validarRucPersonaNatural,
  validarRucSociedadPrivada,
  validarRucSociedadPublica,
  validar,
  getError,
};
