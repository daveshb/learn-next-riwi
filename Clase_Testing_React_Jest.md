# Clase: Testing en React con **Jest** (+ React Testing Library)



---

##  Objetivo de la clase

- Entender **qué es testing** y por qué es clave en proyectos React.
- Configurar **Jest** y **React Testing Library (RTL)**.
- Escribir **tests unitarios** (funciones puras) y **tests de integración/UI** (DOM + eventos).
- Practicar con **enunciados** claros para que tus estudiantes creen sus propios tests.

---



¿Qué es el Testing?

Testing (o pruebas de software) es el proceso de verificar que el código funciona correctamente y cumple los requisitos esperados.
El objetivo es detectar errores antes de que lleguen al usuario final y asegurar que los cambios no rompan funcionalidades existentes.


| **Tipo de Prueba** | **Descripción** | **Ejemplo** |
|--------------------|-----------------|--------------|
| **Unit Testing** | Prueba funciones o componentes individuales. | Verificar que una función `sum(a,b)` devuelve el resultado correcto. |
| **Integration Testing** | Comprueba cómo interactúan varios módulos entre sí. | Probar que una API devuelve los datos y el componente los muestra. |
| **End-to-End (E2E)** | Simula la experiencia del usuario completa. | Abrir la app, hacer clic en un botón y verificar el resultado. |
| **UI Testing** | Comprueba elementos visuales y texto en pantalla. | Verificar que un botón con texto “Enviar” se renderiza. |


##  Configuración mínima

### 1) Instalar dependencias

```bash
# Si tu proyecto es Vite/Next/React con TS
npm i -D jest @types/jest ts-jest @testing-library/react @testing-library/jest-dom @testing-library/user-event npm i jest-environment-jsdom
```

> Si tu proyecto usa **JS** puro (sin TS), omite `ts-jest` y `@types/jest`.

### 2) Scripts en `package.json`

```json
{
  "scripts": {
    "test": "jest --watch",
    "test:ci": "jest --coverage"
  }
}
```

### 3) `jest.config.js` (TypeScript + DOM)

```js
/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  transform: { '^.+\\.(t|j)sx?$': 'ts-jest' },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts']
};
```

### 4) `jest.setup.ts`

```ts
import '@testing-library/jest-dom';
```

---



---

##  Tests unitarios (funciones puras)

### 1) `src/utils/math.ts`

```ts
export const sum = (a: number, b: number) => a + b;

export const isEven = (n: number) => n % 2 === 0;

export const formatCurrency = (value: number, locale = 'es-CO', currency = 'COP') =>
  new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
```

### 2) `src/utils/math.test.ts`

```ts
import { sum, isEven, formatCurrency } from './math';

describe('utils/math', () => {
  test('sum adds numbers', () => {
    expect(sum(2, 3)).toBe(5);
  });

  test('isEven returns true for even numbers', () => {
    expect(isEven(4)).toBe(true);
    expect(isEven(5)).toBe(false);
  });

  test('formatCurrency formats COP', () => {
    const formatted = formatCurrency(1234);
    expect(formatted).toMatch(/1.*234/);
    expect(formatted).toMatch(/COP|$/);
  });
});
```

---

##  Tests de UI con React Testing Library

### 1) Componente simple: `Button.tsx`

```tsx
import React from 'react';

type Props = { label: string; onClick?: () => void; disabled?: boolean };

export const Button: React.FC<Props> = ({ label, onClick, disabled }) => (
  <button disabled={disabled} onClick={onClick} aria-label="main-button">
    {label}
  </button>
);
```

### 2) Test de render + texto: `Button.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

test('renderiza label en el DOM', () => {
  render(<Button label="Guardar" />);
  expect(screen.getByText('Guardar')).toBeInTheDocument();
  expect(screen.getByLabelText('main-button')).toBeInTheDocument();
});
```

### 3) Interacción: contador

`Counter.tsx`

```tsx
import React, { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>Count: {count}</h1>
      <button onClick={() => setCount(c => c + 1)}>Incrementar</button>
    </>
  );
};
```

`Counter.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './Counter';

test('incrementa al hacer click', async () => {
  render(<Counter />);
  await userEvent.click(screen.getByText('Incrementar'));
  expect(screen.getByText('Count: 1')).toBeInTheDocument();
});
```

### 4) Formulario + entrada de texto

`Login.tsx`

```tsx
import React, { useState } from 'react';

export const Login = () => {
  const [email, setEmail] = useState('');
  return (
    <form>
      <label htmlFor="email">Email</label>
      <input id="email" placeholder="example@mail.com" value={email} onChange={e => setEmail(e.target.value)} />
      {email.includes('@') ? <p role="status">Email válido</p> : <p role="status">Email inválido</p>}
    </form>
  );
};
```

`Login.test.tsx`

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Login } from './Login';

test('muestra mensaje según el email', async () => {
  render(<Login />);
  expect(screen.getByRole('status')).toHaveTextContent('Email inválido');
  await userEvent.type(screen.getByPlaceholderText('example@mail.com'), 'user@mail.com');
  expect(screen.getByRole('status')).toHaveTextContent('Email válido');
});
```

---

##  Práctica guiada (enunciados)

### A) Funciones puras (unit tests)

1. `maxNumber(numbers: number[])`
2. `capitalize(text: string)`
3. `unique(array: number[])`
4. `isPalindrome(text: string)`
5. `average(numbers: number[])`

### B) DOM / React (UI tests)

1. `Hello.tsx` → muestra “Hola, {name}”  
2. `SubmitButton.tsx` → botón deshabilitado/no clickeable  
3. `EmptyStateList.tsx` → muestra “Sin resultados” si no hay items  
4. `Search.tsx` → input + texto “Resultados para: {query}”  
5. `Toggle.tsx` → muestra/oculta párrafo tras click

---

## ▶ Cómo ejecutar

```bash
npm test
npm run test:ci
```

---


