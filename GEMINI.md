# GEMINI.md - person-id-validator

## Project Overview

**person-id-validator** is a TypeScript library designed to validate identity document numbers for **Ecuador**. It provides functions to verify the format and check digits of:

*   **Cédula**: Personal Identity Card (10 digits).
*   **RUC** (Registro Único de Contribuyentes): Unique Taxpayer Registry (13 digits).
    *   Persona Natural (Natural Person)
    *   Sociedad Pública (Public Company)
    *   Sociedad Privada (Private Company)

The project currently only supports Ecuadorian documents but has plans to expand to other countries (Colombia, Argentina, Spain).

## Architecture & Logic

The core logic resides in `src/ecuador.ts`. It implements validation algorithms specific to Ecuadorian standards:

*   **Initial Checks:** Length (10 or 13), numeric characters only.
*   **Province Code:** First two digits must be valid (0-24).
*   **Third Digit:** Indicates the type of entity (0-5 for natural person/cédula, 6 for public, 9 for private).
*   **Check Digit:** Validated using **Modulo 10** or **Modulo 11** algorithms depending on the document type.

## Build and Run

This project uses **TSDX**, a zero-config build tool for TypeScript package development.

### Key Commands

*   **Install Dependencies:**
    ```bash
    npm install
    ```

*   **Development Mode (Watch):**
    ```bash
    npm start
    ```
    Runs TSDX in watch mode.

*   **Build:**
    ```bash
    npm run build
    ```
    Bundles the package into `dist/`.

*   **Test:**
    ```bash
    npm test
    ```
    Runs the Jest test suite located in `test/`.

*   **Lint:**
    ```bash
    npm run lint
    ```
    Checks code style and errors.

*   **Size Analysis:**
    ```bash
    npm run size
    ```
    Calculates the real cost of the library using `size-limit`.

## Key Files

*   **`src/index.ts`**: The entry point. Exports the main `validar` function and the `ValidarIdentificacion` object.
*   **`src/ecuador.ts`**: Contains the specific implementation for Ecuadorian ID validation logic (Modulo 10/11, province codes, etc.).
*   **`test/ecuador.test.ts`**: Tests specific to Ecuadorian ID validation logic.
*   **`package.json`**: Project configuration, dependencies, and scripts.

## Development Conventions

*   **TypeScript:** Strictly typed.
*   **Formatting:** Prettier is configured (`.prettierrc` implies standard formatting).
*   **Testing:** Jest is used for unit testing. All logic should be covered by tests in the `test/` directory.
*   **Commits:** `husky` is set up to run linting before commits.

## Usage Example

```typescript
import { validar, ValidarIdentificacion } from 'person-id-validator';

// Generic validation
const result = validar('1712345678'); // Returns { idType: 'cedula', ok: true }

// Specific validation
const isValid = ValidarIdentificacion.validarCedula('1712345678');
```
