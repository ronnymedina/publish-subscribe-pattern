# publish-subscribe-pattern
Example with (Kafka, Redis, Zeromq)


- `docker-compose up -d zookeeper broker` Verifique que broker este habilitado
- `docker-compose up -d`
- `docker exec -it example-pub-sub bash`
- `node_modules/ts-node/dist/bin.js` Activar la terminal de typescript
- `import {msg} from './src/publisher'` 
- `mgs()` Ejecutar función
- `docker logs -f example-pub-sub`
