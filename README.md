# person-id-validator

[![npm version](https://badge.fury.io/js/person-id-validator.svg)](https://badge.fury.io/js/person-id-validator)

## Description

This package provides utility functions to validate identity document numbers for Ecuador. It can validate:

*   Cédula (Personal Identity Card)
*   RUC (Registro Único de Contribuyentes - Unique Taxpayer Registry)
    *   Persona Natural (Natural Person)
    *   Sociedad Pública (Public Company)
    *   Sociedad Privada (Private Company)

## Installation

```bash
npm install person-id-validator
```

## Usage

**Important Note:** The current version of this package and all functions described below are exclusively for validating **Ecuadorian** identity documents (Cédula and RUC).

Here's how you can import and use the validation functions for Ecuadorian IDs:

```typescript
import { validarCedula, validar, ValidarIdentificacion } from 'person-id-validator';

// Example: Validate an Ecuadorian Cédula
try {
  const numeroCedula = '1712345678'; // Replace with an actual Ecuadorian Cédula number
  if (validarCedula(numeroCedula)) {
    console.log(`Ecuadorian Cédula ${numeroCedula} is valid.`);
  }
} catch (error) {
  console.error(error.message);
}

// Example: Use the generic validator for an Ecuadorian Cédula or RUC
try {
  const numeroIdentificacion = '1791234567001'; // Replace with an Ecuadorian RUC or Cédula
  const resultado = validar(numeroIdentificacion);
  if (resultado.ok) {
    console.log(`Ecuadorian Identification ${numeroIdentificacion} is valid. Type: ${resultado.idType}`);
  }
} catch (error) {
  console.error(error.message);
}

// You can also use the ValidarIdentificacion object which groups all validation functions for Ecuadorian IDs:
try {
  const rucPrivada = '1791234567001'; // Example Ecuadorian RUC for a private company
  if (ValidarIdentificacion.validarRucSociedadPrivada(rucPrivada)) {
    console.log(`Ecuadorian RUC Sociedad Privada ${rucPrivada} is valid.`);
  }
} catch (error) {
  console.error(error.message);
}
```

## Supported Countries

*   **Ecuador**

## Future Enhancements

We plan to add support for identity document validation in other countries, including:

*   Colombia
*   Argentina
*   Spain

## API Documentation

Detailed JSDoc comments are available within the source code for more information on each function's parameters and behavior.

## Testing

To run the test suite:

```bash
npm test
```

## Configuration Notes (For Developers)

Code quality tools like `prettier`, `husky`, and `lint-staged` are set up. Configuration can be found in `package.json`.

### TypeScript

The `tsconfig.json` is configured for `dom` and `esnext` types. Adjust as needed for development.

## Continuous Integration (For Developers)

GitHub Actions are set up for:

*   **CI Main**: Installs dependencies, lints, tests, and builds on pushes.
*   **Size**: Comments on pull requests with library size comparisons.

## License

This project is licensed under the MIT License.
