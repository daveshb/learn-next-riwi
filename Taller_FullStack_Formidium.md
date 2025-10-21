#  Taller Full-Stack: API Formidium → Redis + WebSocket → Front MUI

## 1) Contexto y objetivo
En este taller vas a construir una aplicación **full-stack en tiempo real**, con roles claramente definidos:  
- El **Back-End**, hecho con **Node.js + TypeScript**, consumirá la **API de Formidium**, guardará los resultados en **Redis (clave-valor)** y los emitirá mediante **WebSocket**.  
- El **Front-End**, hecho con **React + Material UI (MUI)**, se conectará al **WebSocket**, recibirá los datos en tiempo real y los mostrará dinámicamente en el DOM.

> Flujo general: **API Formidium → Back (HTTP) → Redis (KV) → WebSocket → Front (React + MUI)**

---

## 2) Roles del equipo

-  **Back-End Developer:**  
  Implementa con **Node.js + TypeScript**, maneja las conexiones a la **API Formidium**, **Redis** y **WebSocket**.  

-  **Front-End Developer:**  
  Implementa con **React + MUI**, conectándose al **WebSocket**, mostrando los datos en vivo y gestionando estados visuales (conexión, errores, nuevos registros).

---

## 3) API a consumir (Formidium)

- **Base URL:**  
  ```bash
  https://api.formidium.com
  ```

- **Referencia oficial:**  
  [https://app.oneseamless.com/#/api-reference](https://app.oneseamless.com/#/api-reference)

###  Credenciales de acceso
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

2. **Endpoint para obtener datos de Formidium**
   - `POST /fetch`
   - El servidor consultará la API de Formidium usando las credenciales.
   - Normalizará los datos en un formato común (`LiveItem`).
   - Guardará el registro en Redis (clave-valor).
   - Emitirá el resultado a todos los clientes conectados por WebSocket.
   - Respuesta:  
     ```json
     { "ok": true, "stored": true, "id": "uuid" }
     ```

3. **Histórico**
   - `GET /history?limit=50`  
     Devuelve los últimos N registros almacenados en Redis.

4. **Canal WebSocket**
   - Ruta: `/ws`
   - Envía un mensaje cada vez que se obtiene nueva información de la API.
   - Formato de mensaje:
     ```json
     {
       "type": "data",
       "payload": {
         "id": "uuid",
         "source": "formidium",
         "title": "fund_name",
         "value": 1.234,
         "extra": { "currency": "USD" },
         "fetchedAt": "2025-10-15T15:30:22.123Z"
       }
     }
     ```

5. **Redis (clave-valor)**
   - Claves:
     - `ws:msg:{uuid}` → JSON del objeto completo.
     - `ws:msg:index` → lista con los últimos UUID (`LPUSH`, `LTRIM`).
     - `ws:last` → último valor emitido.
   - TTL recomendado: 24 horas (`EX 86400`).

---

###  Front-End (React + MUI)
1. Conectarse al WebSocket del backend (`ws://localhost:4000/ws`).
2. Mostrar el estado de conexión (**Conectado**, **Desconectado**, **Reconectando**) usando componentes MUI (`Chip`, `Alert` o `Snackbar`).
3. Al iniciar, cargar datos históricos con `GET /history`.
4. Mostrar la información en tiempo real en una tabla MUI (`DataGrid`) con columnas:
   - **Title**
   - **Value**
   - **Source**
   - **FetchedAt**
5. Nuevos mensajes WS deben aparecer en la tabla sin recargar la página.
6. Animación o resaltado visual al recibir nuevos registros.

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
- [ ] `/fetch` obtiene datos de Formidium, guarda y emite por WS.  
- [ ] Los datos se almacenan correctamente como clave-valor.  
- [ ] `/history` devuelve los últimos N registros.  
- [ ] Emisión WS funcional y formato correcto.

### Front-End
- [ ] Conexión WebSocket estable con reconexión automática.  
- [ ] Renderizado correcto con MUI (DataGrid/Table).  
- [ ] Carga inicial de `/history` y actualización en tiempo real.  
- [ ] Feedback visual al recibir nuevos datos.  
- [ ] Muestra clara del estado WS y errores.

---

## 8) Entregables finales

- **Persona A (Back-End):**
  - Servidor Node.js con endpoints `/health`, `/fetch`, `/history`.
  - Conexión WS funcional y guardado Redis.
  - Documentación breve de variables y endpoints.

- **Persona B (Front-End):**
  - Interfaz en React que se conecta por WS.
  - Renderización de datos con MUI DataGrid.
  - Visualización del estado y errores.
