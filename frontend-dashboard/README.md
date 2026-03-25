# 🚀 DevLog Admin Dashboard

Bienvenido al repositorio del **Dashboard de Administración de DevLog**. Una aplicación web moderna, bonita y escalable construida para gestionar de manera profesional toda la operativa interna, publicaciones, usuarios y métricas del sistema.

Este proyecto ha sido diseñado siguiendo principios estrictos de **Clean Architecture (Arquitectura Hexagonal)** y **Feature-Sliced Design**.

---

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org) (App Router SSR/SSG).
- **Librería UI:** [React 19](https://react.dev).
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com/) – Sistema de diseño global avanzado gestionado mediante CSS Variables y el bloque `@layer components`.
- **Data Fetching y Caché:** [TanStack Query v5](https://tanstack.com/query/latest) integrado con mutaciones hiperoptimizadas.
- **Formularios robustos:** [React Hook Form](https://react-hook-form.com/) + validación por esquemas con [Zod](https://zod.dev/).
- **Generador de SDK / API:** `@hey-api/openapi-ts` para mantener 100% de fiabilidad de tipos (`types.gen.ts`) sincronizados directamente con el Backend (Swagger/OpenAPI).

---

## 📁 Arquitectura del Proyecto (Hexagonal)

El frontend escapa del clásico patrón antiprototípico de "un directorio por tecnología" (todos los hooks juntos, etc) y utiliza una **Arquitectura por Funcionalidad (Features)**, donde cada característica se rige por capas hexagonales.

```text
src/
├── app/                  # Sistema de enrutamiento (Next.js App Router) y layout maestro.
├── features/             # Módulos segmentados por Dominio de negocio (ej. Auth, Posts)
│   └── auth/
│       ├── application/  # Casos de uso puros sin dependencias (Lógica de negocio).
│       ├── components/   # UI Fragments hiper-específicos (ej. LoginForm).
│       ├── domain/       # Interfaces técnicas e Entidades de este dominio.
│       ├── hooks/        # Hooks puente entre el Use Case y el ciclo de vida React.
│       └── infrastructure/# Implementaciones reales (Llamadas API, Inyección de Dependencias).
├── services/             # Servicios núcleo globales (Configuración Axios, Endpoints generados).
├── shared/               # Piezas UI de diseño atómico y utilidades agnósticas (Loaders, Inputs).
└── store/                # Árbol de Providers y React Context Globales.
```

### ¿Por qué esta estructura?
1. **Desacoplamiento Absoluto:** La lógica pura (`application`) no tiene la menor idea de que está dentro de React ni cómo es la red de Fetch/Axios.
2. **Testabilidad Inmaculada:** Podemos falsear (*mockear*) la infraestructura instantáneamente e inyectarla en los UseCases.
3. **Mantenibilidad:** Escalar un proyecto no significa bucear en 50 archivos. Todo vive aislado en su propio feature.

---

## 🚀 Getting Started

Todo lo que necesitas hacer para levantar el entorno de desarrollo localmente:

### 1. Requisitos Previos
- Instalar Node.js `v20.x` o superior.
- Tener instalado tu gestor de paquetes favorito (`pnpm`, `npm` o `yarn`).

### 2. Instalación
Carga las dependencias ejecutando en la raíz de este directorio:
```bash
pnpm install
```

### 3. Entorno de Variables
El proyecto requiere configuraciones básicas para interactuar con la API. Copia el template `env` local:
```bash
cp .env.example .env.local
```
> Asegúrate de que tu `NEXT_PUBLIC_API_URL` apunte al puerto correcto donde está desplegado tu backend de DevLog en local (usualmente `http://localhost:8080/api`).

### 4. Generación Automática del Cliente API
Si el backend actualiza su contrato OpenAPI, actualiza de golpe toda la aplicación corriendo:
```bash
pnpm run generate
```

### 5. Levantar el Entorno Dev
Una vez listo, inicia la magia:
```bash
pnpm run dev
```
Visita [http://localhost:3000](http://localhost:3000) ¡y disfruta interactuando con el Dashboard!

---

## 🎨 Sistema de Diseño Global y Componentes Nativos

En lugar de abusar del HTML repitiendo 25 clases idénticas de Tailwind, el equipo Senior abstrajo el diseño del branding core a `/src/app/globals.css`.

A la hora de maquetar nuevos apartados front-end, utiliza estas potentes clases atómicas construidas por encima de Tailwind para ahorrar verbosidad:

- **Estructura Form:** Utiliza `<label className="form-label">` y `<input className="form-input">`.
- **Clases Base para Botones:** `btn` (Aplica transiciones, micro-animaciones en hover).
- **Variantes de Botones:** Combínalos usando `btn-primary`, `btn-outline` o el espectacular `btn-gradient`.
- **Tarjetas y Cajas:** Limita tu layout envolviéndolo en `className="card"` o, si quieres utilizar el modo translúcido avanzado moderno (Mica effect), utiliza `className="card-glass"`.

_Cualquier nuevo elemento recurrente debe declararse explícitamente en el `@layer components` de tu `globals.css`_.

---

## 📜 Tabla de Scripts

Listado de comandos registrados en el `package.json`:

| Script           | Comando                 | Descripción                                                                          |
|------------------|-------------------------|--------------------------------------------------------------------------------------|
| `dev`            | `next dev`              | Inicia Next.js en entorno local en caliente (Hot Reloading).                         |
| `build`          | `next build`            | Compila exhaustivamente y pre-renderiza la app Next para Despliegue en Producción.   |
| `start`          | `next start`            | Sirve tu aplicación desde `.next/` una vez compilada (Ideal para staging/render).    |
| `lint`           | `eslint`                | Corre los analizadores semánticos omitiendo las firmas auto-generadas de `openapi`. |
| `generate`       | `openapi-ts`            | Actualiza todos los endponts y tipos TS contra tu Swagger API original.              |

---

## 👨‍💻 Filosofía y Convenciones para Contribuidores

- 🚫 **Nunca Uses `any`:** Mantén el 100% de la cobertura estática de TypeScript. Utiliza las interfaces inferidas provenientes de `types.gen.ts`.
- 💉 **Pure DI (Dependency Injection):** Instancia siempre los Casos de Uso pasándole una inyección real del Repositorio a través de los archivos de `dependencies.ts`. Esto previene el acoplamiento cruzado de framework.
- 💅 **UI Elegante de Alto Impacto:** Nos importan tanto los micro-píxeles como las macros-animaciones. Haz que la web brille con colores limpios. Evita los estilos toscos.
