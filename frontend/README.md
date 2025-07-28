# Gestor de Tareas - Proyecto Final Backend Developer

Este proyecto consiste en una aplicación **fullstack** que permite gestionar tareas a través de una API REST construida con Node.js y Express, y un frontend en React (JSX) responsive.

## 📦 Tecnologías Utilizadas

### 🔧 Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- dotenv
- CORS
- Swagger UI (documentación pública)

### 🎨 Frontend
- React (JSX)
- Axios
- React Router
- React Toastify
- Hooks personalizados (`useAxios`, etc.)
- Estilos CSS
- Modo claro / oscuro

## ⚙️ Funcionalidades

### 🔹 Backend (API REST)
- Operaciones CRUD sobre tareas:
  - `GET /api/tasks` → Obtener todas las tareas
  - `GET /api/tasks/:id` → Obtener una tarea por ID
  - `POST /api/tasks` → Crear nueva tarea
  - `PUT /api/tasks/:id` → Reemplazar tarea completa
  - `PATCH /api/tasks/:id` → Actualización parcial
  - `DELETE /api/tasks/:id` → Eliminar tarea
- Middleware configurado: `cors`, `express.json()`
- Validaciones básicas y manejo de errores

### 🔹 Frontend (React)
- Listado de tareas con estilos por estado (pendiente, en curso, hecho)
- Crear, editar y eliminar tareas
- Filtrar/buscar tareas por estado
- Interfaz responsive (desktop y mobile)
- Modo claro / oscuro
- Feedback visual con `react-toastify`
- Componentes reutilizables y código modular
- Hooks personalizados para manejar peticiones

# Archivo .env
Para que el servidor backend funcione correctamente, es necesario crear un archivo llamado .env en la raíz del proyecto backend con las siguientes variables:

MONGO_URI=tu_contraseña_mongodb
PORT=5000


# Instalar dependencias backend
cd backend
npm install
npm run dev

# Instalar dependencias frontend
cd frontend
npm install
npm start