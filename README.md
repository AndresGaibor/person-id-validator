# person-id-validator

[![npm version](https://badge.fury.io/js/person-id-validator.svg)](https://badge.fury.io/js/person-id-validator)

## Descripción

Esta librería proporciona funciones de utilidad para validar documentos de identidad de varios países. Actualmente soporta:

* **Ecuador**: Cédula y RUC (Persona Natural, Sociedad Pública, Sociedad Privada).
* **Chile**: RUT (RUN).
* **España**: DNI y NIE.
* **México**: CURP y RFC.
* **Argentina**: DNI y CUIT/CUIL.
* **Colombia**: Cédula y NIT.
* **Perú**: DNI.
* **Estados Unidos**: SSN.

## Instalación

Puedes instalar la librería usando tu gestor de paquetes preferido:

### npm

```bash

npm install person-id-validator

```

### yarn

```bash

yarn add person-id-validator

```

### pnpm

```bash

pnpm add person-id-validator

```

### bun

```bash

bun add person-id-validator

```

## Uso

Puedes usar la función genérica `validar(id, pais)` o importar las funciones específicas para cada país.

### Validación Genérica

```typescript

import { validar } from 'person-id-validator';



// Ecuador

const resultadoEcuador = validar('1712345678', 'ecuador');

if (typeof resultadoEcuador === 'object' && resultadoEcuador.ok) {

  console.log('Documento ecuatoriano válido:', resultadoEcuador.idType);

}



// Chile

const esValidoChile = validar('12.345.678-5', 'chile'); // true



// España

const esValidoEspana = validar('12345678Z', 'spain'); // true



// México

const esValidoMexico = validar('HEGT760825HDFLRR03', 'mexico'); // true

```

### Uso Específico por País

Puedes importar objetos con funciones específicas para tener más control.

```typescript

import { 

  Ecuador, 

  Chile, 

  Spain, 

  Mexico, 

  Argentina, 

  Colombia, 

  Peru, 

  USA 

} from 'person-id-validator';



// Ecuador

if (Ecuador.validarCedula('1712345678')) {

  console.log('Cédula Ecuatoriana válida');

}



// Chile (RUT)

if (Chile.validarRut('12.345.678-5')) {

  console.log('RUT Chileno válido');

}



// España (DNI/NIE)

if (Spain.validarDniNie('X1234567L')) {

  console.log('NIE Español válido');

}



// Argentina (CUIT)

if (Argentina.validarCuit('20123456786')) {

  console.log('CUIT Argentino válido');

}

```

## Países Soportados

| País | Código en `validar()` | Documentos | Algoritmo |
| :--- | :--- | :--- | :--- |
| **Ecuador** | `'ecuador'`, `'ecuatoriano'` | Cédula, RUC | Modulo 10, Modulo 11 |
| **Chile** | `'chile'`, `'chileno'` | RUT/RUN | Modulo 11 |
| **España** | `'spain'`, `'españa'` | DNI, NIE | Modulo 23 |
| **México** | `'mexico'`, `'mexicano'` | CURP, RFC | Algoritmo RENAPO (CURP), Regex (RFC) |
| **Argentina** | `'argentina'`, `'argentino'` | DNI, CUIT, CUIL | Modulo 11 (CUIT), Regex (DNI) |
| **Colombia** | `'colombia'`, `'colombiano'` | Cédula, NIT | Modulo 11 (NIT), Regex (Cédula) |
| **Perú** | `'peru'`, `'peruano'` | DNI | Regex (8 dígitos) + DV Opcional |
| **EE.UU.** | `'usa'`, `'estados unidos'` | SSN | Regex |

## Desarrollo

### Scripts

Puedes ejecutar los comandos de desarrollo con tu herramienta preferida:

| Tarea | npm | yarn | pnpm | bun |
| :--- | :--- | :--- | :--- | :--- |
| **Tests** | `npm test` | `yarn test` | `pnpm test` | `bun test` |
| **Lint** | `npm run lint` | `yarn lint` | `pnpm lint` | `bun run lint` |
| **Build** | `npm run build` | `yarn build` | `pnpm build` | `bun run build` |

## Licencia

MIT.
