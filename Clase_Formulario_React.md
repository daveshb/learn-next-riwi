#  Clase: Creando un Formulario con React y TypeScript

##  Objetivo de la clase

Aprender a crear un formulario controlado en **React** utilizando
**TypeScript**, manejando estados, validaciones y eventos del
formulario.

------------------------------------------------------------------------

##  Conceptos clave

### 1. ¿Qué es un formulario controlado?

Un formulario controlado es aquel donde los **valores de los inputs** se
manejan desde el **estado del componente** usando `useState`.\
Esto permite que React tenga el control total sobre los datos
introducidos.

### 2. Tipado con TypeScript

Definimos una **interfaz** para describir la estructura del formulario y
así asegurar que los datos cumplan con el tipo esperado.

------------------------------------------------------------------------

##  Paso a paso

### 🔹 Paso 1: Definir la interfaz de datos y los estados

``` tsx
import React, { useState } from 'react';

// Definimos el tipo de datos del formulario
interface FormData {
  nombre: string;
  email: string;
}

const FormularioUsuario: React.FC = () => {
  // Estado del formulario
  const [formData, setFormData] = useState<FormData>({ nombre: '', email: '' });

  // Estado para manejar los errores
  const [errores, setErrores] = useState<string[]>([]);
```

 **Explicación:** - `useState<FormData>` nos permite definir que
`formData` tendrá el tipo `FormData`. - `errores` es un arreglo de
strings que almacenará los mensajes de validación.

------------------------------------------------------------------------

###  Paso 2: Manejar los cambios del formulario

``` tsx
const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};
```

 **Explicación:** - `e.target.name` permite actualizar dinámicamente
el campo (`nombre` o `email`). - El operador `...formData` mantiene los
demás valores del formulario sin perderlos.

------------------------------------------------------------------------

###  Paso 3: Validar los datos del formulario

``` tsx
const validarFormulario = (): string[] => {
  const errores: string[] = [];

  if (!formData.nombre) errores.push('El nombre es requerido');
  if (!formData.email.includes('@')) errores.push('El correo debe ser válido');

  return errores;
};
```

 **Explicación:** - Creamos un arreglo `errores` donde agregamos
mensajes si algún campo no cumple las reglas. - `includes('@')` es una
validación simple para verificar si el email es válido.

------------------------------------------------------------------------

###  Paso 4: Manejar el envío del formulario

``` tsx
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  const erroresFormulario = validarFormulario();

  if (erroresFormulario.length > 0) {
    setErrores(erroresFormulario);
  } else {
    alert('Formulario enviado correctamente');
  }
};
```

 **Explicación:** - `preventDefault()` evita que el formulario se
recargue. - Si hay errores, se guardan en el estado `errores`. - Si no
hay errores, mostramos un mensaje de éxito.

------------------------------------------------------------------------

###  Paso 5: Renderizar el formulario en JSX

``` tsx
return (
  <form onSubmit={handleSubmit}>
    <div>
      <label>Nombre:</label>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
      />
    </div>

    <div>
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
    </div>

    <button type="submit">Enviar</button>

    {errores.length > 0 && (
      <ul>
        {errores.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
    )}
  </form>
);

export default FormularioUsuario;
```

 **Explicación:** - Cada campo se asocia a un valor del estado
(`value`) y una función que lo actualiza (`onChange`). - Los errores se
renderizan como una lista debajo del botón.

------------------------------------------------------------------------

##  Resumen

  -----------------------------------------------------------------------
  Concepto                        Descripción
  ------------------------------- ---------------------------------------
  **useState**                    Hook para manejar el estado del
                                  formulario y los errores

  **FormData**                    Interfaz TypeScript para tipar los
                                  datos

  **handleChange**                Función para actualizar dinámicamente
                                  los valores de los inputs

  **validarFormulario**           Valida los datos antes de enviarlos

  **handleSubmit**                Evita la recarga, valida y envía el
                                  formulario
  -----------------------------------------------------------------------

------------------------------------------------------------------------

##  Actividad práctica

Crea tu propio formulario con al menos **tres campos** (por ejemplo:
`nombre`, `email`, `edad`) y aplica **validaciones personalizadas**: -
El nombre no debe estar vacío.\
- El email debe incluir `@`.\
- La edad debe ser un número mayor a 18.

Muestra los errores debajo del formulario y un mensaje de éxito cuando
los datos sean válidos.

-------------------------------------------------------------------