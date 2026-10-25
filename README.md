# 🎵 Gestor de Eventos Musicales (Frontend MERN)

Aplicación web desarrollada en React y TypeScript que funciona como interfaz de usuario (frontend) para un sistema de gestión de eventos musicales, conectándose a una API REST desarrollada en Node.js, Express y MongoDB.

## 🚀 Características principales
* **Arquitectura Limpia:** Separación por capas con servicios centralizados (`services/`) utilizando `axios` y tipado estricto (`types/`)[cite: 8].
* **Navegación Fluida:** Implementación de `react-router-dom` para una experiencia de páginas múltiples sin recargas[cite: 8, 9].
* **ABM Completo (CRUD):** 
  * **Alta:** Formulario de creación de eventos validado con Formik y Yup[cite: 9].
  * **Lectura:** Visualización en tiempo real del listado de eventos con barra de búsqueda y gestión de estados (carga, datos y error)[cite: 9].
  * **Modificación:** Edición interactiva de los datos del evento[cite: 9].
  * **Baja:** Eliminación de registros protegida mediante un modal de confirmación[cite: 9].
* **Endpoints de Negocio:** Integración de acciones avanzadas de la API, como el registro de participantes y control de entradas disponibles[cite: 9].

## 🛠️ Cómo correr el proyecto en local

1. Clonar el repositorio.
2. Instalar las dependencias ejecutando en la terminal:
   ```bash
   npm install
