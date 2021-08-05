# Requeriments

Requiere de una collección de MongoDB llamada blogs o la creará.
Revisar archivo ".env.example"

# EXPRESS

- https://github.com/davidbanham/express-async-errors

Correctly export each module created: module.exports = {}

- https://stackoverflow.com/questions/33865068/typeerror-is-not-a-function-in-node-js
- https://stackoverflow.com/questions/27465850/typeerror-router-use-requires-middleware-function-but-got-a-object

Validate jwt token

- https://www.npmjs.com/package/express-jwt
  Password validate pre save
- https://www.codegrepper.com/code-examples/javascript/mongoose+minlength

# Sentry: Application monitoring platform helps every developer diagnose, fix, and optimize the performance of their code.

- https://sentry.io/welcome/

# Tests in backend

## JEST

Jest is a JavaScript testing framework designed to ensure correctness of any JavaScript codebase.

- https://jestjs.io/docs/api
- https://stackoverflow.com/questions/50818367/how-to-fix-err-jest-has-detected-the-following-3-open-handles-potentially-keepin

## Jest with eslint

- https://stackoverflow.com/questions/31629389/how-to-use-eslint-with-jest
  https://stackoverflow.com/questions/46094324/javascript-standard-style-does-not-recognize-jest/46094403

Ejecutar test que coincida en parte con el nombre 'blogs'

    npm test -- -t 'blogs'

Ejecutando test solo de cierto archivo, que coincida en parte con el nombre 'blogs'

    npm test -- tests/blogs_api.test.js -t 'blogs'
    npm test -- tests/users_api.test.js -t 'creation fails with invalid user'

# Supertest

- https://github.com/visionmedia/supertest#readme
- https://stackoverflow.com/questions/49603939/message-async-callback-was-not-invoked-within-the-5000-ms-timeout-specified-by

Cuando se ejecuta una sola prueba, la conexión de mongoose puede permanecer abierta si no se ejecuta ninguna prueba con la conexión. El problema puede deberse al hecho de que supertest prepara la conexión, pero jest no ejecuta la parte afterAll del código.
Una solucion es ejecutar siempre test que usen supertest en un archivo y no mesclarlos con otros tipos de tests.

- https://github.com/visionmedia/supertest/issues/398

# MongoDB

## Robo 3T

(formerly Robomongo) is the free, lightweight, open-source MongoDB GUI with an embedded mongo shell, real auto-completion, and support for MongoDB 4.0.

- https://robomongo.org/

# JSON Web Token

https://jwt.io/

# REST

- https://www.bbvanexttechnologies.com/blogs/como-utilizar-los-metodos-put-y-patch-en-el-diseno-de-tus-apis-restful/
- https://en.wikipedia.org/wiki/URL
- https://en.wikipedia.org/wiki/Uniform_Resource_Identifier}
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication

## TODO:

- Improve separation of model, service and controllers (generating necessary files)

# Fuente

- https://fullstackopen.com/
- https://www.youtube.com/playlist?list=PLV8x_i1fqBw0Kn_fBIZTa3wS_VZAqddX7
