# Backend Neitec

_Creado con Express, TS, Mongoose, etc..._


## Instalación 🔧


* Clonar proyecto
* Instalar dependencias: he usado [PNPM](https://pnpm.io/es/) pero es compatible con NPM
* Copiar .env.example a .env: he usado [DOTENV-SAFE](https://www.npmjs.com/package/dotenv-safe) para validar que se arranca con todas las propiedades
* Arrancar


```
npm run start
```

_Por defecto usará un mongo en memoria_

```
DB_URL='~'
```

_Puede editarse por cualquier string de conexión_

```
DB_URL='mongodb://127.0.0.1:27017/neitec'
```

_Puede levantarse en modo desarrollo para que sea lanzado con nodemon_

```
npm run start_dev
```


## Ejecutando las pruebas ⚙️

_Tests montados con [Jest](https://jestjs.io/) y [Supertest](https://www.npmjs.com/package/supertest) para cubrir todas las capas_

```
npm run test
```

_Generá reporte de cobertura en /coverage_
