# Backend Neitec


## Instalación 🔧


* Clonar proyecto
* Instalar dependencias: he usado [PNPM](https://pnpm.io/es/) pero es compatible con NPM
* Copiar .env.example a .env: he usado [DOTENV-SAFE](https://www.npmjs.com/package/dotenv-safe) para validar que se arranca con todas las propiedades
* Arrancar


```
npm run start
```

_Por defecto el .env tiene configurado un mongo en memoria_

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

_La aplicación crea automaticamente un usuario y un administrador si la base de datos está vacia_

```
{ email: 'user@yo.es', password: '123456', role: UserRole.User }
{ email: 'admin@yo.es', password: '123456', role: UserRole.Admin }
```

## Ejecutando las pruebas ⚙️

_Tests montados con [Jest](https://jestjs.io/) y [Supertest](https://www.npmjs.com/package/supertest) para cubrir todas las capas_

```
npm run test
```

_Generá reporte de cobertura en /coverage_

## Documentación del API ️📖


_Se adjunta en el repositorio la colección postman con los 3 servicios usados. Todos siguen filosofia RESTFul y autenticación Bearer._

* Login: email + password para obtener un token JWT
* Crear transaccion: un usuario autenticado puede crear transacciones dandoles un nombre
* Validar transaccion: un administrador puede validar o rechazar una transaccion
* Aprobar transaccion: un usuario puede aprobar una transaccion

Se añaden las fechas de creación y actualización asi como las referencias de los usuarios que crearon y validaron las transacciones. Quedando el modelo asi:
```
{
    "_id": "01JBKD73N643H3CRR9EBK5X53V",
    "name": "TRX3",
    "status": "done",
    "createdBy": "01JBH0DA88VPGCAC0TQEGRF5P2",
    "createdAt": "2024-11-01T08:24:37.289Z",
    "updatedAt": "2024-11-01T12:45:57.298Z",
    "reviewedBy": "01JBH0DA8PFAGACFJT184G2FM6"
}
```
