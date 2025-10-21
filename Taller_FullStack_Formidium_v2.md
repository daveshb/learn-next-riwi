# Taller Full-Stack: API Formidium → Redis + WebSocket → Front MUI

## 1) Contexto y objetivo
En este taller vas a construir una aplicación **full-stack en tiempo real**, con roles claramente definidos:  
- El **Back-End**, hecho con **Node.js + TypeScript**, consumirá la **API de Formidium**, guardará los resultados en **Redis (clave-valor)** y los emitirá mediante **WebSocket**.  
- El **Front-End**, hecho con **React + Material UI (MUI)**, se conectará al **WebSocket**, enviará peticiones mediante un **botón**, y mostrará los datos que reciba en tiempo real en el DOM.

> Flujo general: **API Formidium → Back (HTTP + WS) → Redis (KV) → WebSocket → Front (React + MUI)**

---

## 2) Roles del equipo

- **Back-End Developer:**  
  Implementa con **Node.js + TypeScript**, maneja las conexiones a la **API Formidium**, **Redis** y **WebSocket**.  

- **Front-End Developer:**  
  Implementa con **React + MUI**, se conecta al **WebSocket**, envía peticiones al backend mediante un botón, muestra los datos en vivo y gestiona estados visuales (conexión, errores, nuevos registros).

---

## 3) API a consumir (Formidium)

- **Base URL:**  
  ```bash
  https://api.formidium.com
  ```

- **Referencia oficial:**  
  [https://app.oneseamless.com/#/api-reference](https://app.oneseamless.com/#/api-reference)

### Credenciales de acceso
```ts
const url = 'https://api.formidium.com'
const passphrase = '%&tMDj64WAjlA#'
const key = 'zQOb9EwDrd1ZNkRJDpwhG2Ndwdeyddq05AFxdbW7'
const secret = '5BEF60C196485F0590F5D636A1931168844DF18F587CEE608A8DE8B70EA1E573'
const DEFAULT_TZ = 'America/New_York'
```

---

## 4) Requerimientos funcionales

###  Back-End (Node.js + TypeScript)
1. **Endpoint de salud**
   - `GET /health` → `{ status: "ok", time: "<ISO>" }`

2. **Canal WebSocket `/ws`**
   - El servidor escuchará mensajes desde el cliente con el siguiente formato:
     ```json
     { "type": "fetch" }
     ```
   - Al recibir este mensaje:
     1. Consultará la API de Formidium usando las credenciales.  
     2. Normalizará la respuesta a un formato estándar (`LiveItem`).  
     3. Guardará el registro en Redis (`SET ws:msg:{uuid}` y `LPUSH ws:msg:index`).  
     4. Emitirá el registro a **todos los clientes conectados**:
        ```json
        { "type": "data", "payload": { /* LiveItem */ } }
        ```
   - Esto significa que **cada vez que el front pulse el botón**, se generará un nuevo registro en Redis y se enviará en tiempo real a todos los clientes.

3. **Histórico**
   - `GET /history?limit=50`  
     Devuelve los últimos N registros almacenados en Redis.

4. **Redis (clave-valor)**
   - Claves:
     - `ws:msg:{uuid}` → JSON del objeto completo.
     - `ws:msg:index` → lista con los últimos UUID (`LPUSH`, `LTRIM`).
     - `ws:last` → último valor emitido.
   - TTL recomendado: 24 horas (`EX 86400`).

---

###  Front-End (React + MUI)
1. Conectarse al WebSocket del backend (`ws://localhost:4000/ws`).
2. Mostrar el estado de conexión (**Conectado**, **Desconectado**, **Reconectando**) usando componentes MUI (`Chip`, `Alert` o `Snackbar`).
3. Cargar los registros iniciales con `GET /history`.
4. Incluir un **botón "Obtener datos"**, que al presionarse envíe por WebSocket:
   ```json
   { "type": "fetch" }
   ```
   Esto disparará la acción en el back descrita anteriormente.
5. Mostrar los registros recibidos en una tabla MUI (`DataGrid`) con columnas:
   - **Title**
   - **Value**
   - **Source**
   - **FetchedAt**
6. Los nuevos mensajes WS deben aparecer sin recargar la página.
7. Agregar una pequeña animación o highlight visual al recibir un nuevo registro.

---

## 5) Contrato de datos

### Objeto normalizado (`LiveItem`)
```ts
type LiveItem = {
  id: string;
  source: string;
  title: string;
  value: number | string;
  extra?: Record<string, any>;
  fetchedAt: string;
};
```

---

## 6) Variables de entorno

### Back-End (.env)
```
PORT=4000
REDIS_URL=redis://localhost:6379
FORMIDIUM_URL=https://api.formidium.com
FORMIDIUM_KEY=zQOb9EwDrd1ZNkRJDpwhG2Ndwdeyddq05AFxdbW7
FORMIDIUM_SECRET=5BEF60C196485F0590F5D636A1931168844DF18F587CEE608A8DE8B70EA1E573
FORMIDIUM_PASSPHRASE=%&tMDj64WAjlA#
FORMIDIUM_TZ=America/New_York
```

### Front-End (.env)
```
VITE_API_BASE=http://localhost:4000
VITE_WS_URL=ws://localhost:4000/ws
```

---

## 7) Criterios de aceptación

### Back-End
- [ ] Conexión a Redis exitosa.  
- [ ] Responde correctamente al mensaje `{ type: "fetch" }` por WebSocket.  
- [ ] Obtiene datos de Formidium, guarda y emite por WS.  
- [ ] `/history` devuelve los últimos N registros.  
- [ ] Formato de emisión WS correcto (`type: "data"`).

### Front-End
- [ ] Conexión WebSocket estable con reconexión automática.  
- [ ] Botón “Obtener datos” envía `{ type: "fetch" }`.  
- [ ] Renderizado correcto con MUI (DataGrid/Table).  
- [ ] Carga inicial desde `/history`.  
- [ ] Actualización en tiempo real y animación visual en nuevos datos.

---

## 8) Entregables finales

- **Persona  (Back-End):**
  - Servidor Node.js + TypeScript con conexión Redis y WS funcional.
  - Procesamiento de eventos “fetch” del cliente.
  - Documentación breve de variables y endpoints.

- **Persona  (Front-End):**
  - Interfaz en React + MUI con conexión WebSocket.
  - Botón “Obtener datos” que dispara la petición WS.
  - Renderización en tiempo real con MUI DataGrid y manejo visual de estados.
