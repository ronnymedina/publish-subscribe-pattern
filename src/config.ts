export const KAFKA_OPTS = {
    clientId: 'exmaple-app',
    brokers: ['broker:29092'],
    groupId: 'consumer-app',
  }
  
  export const REDIS_OPTS = {
    host: 'string',
    port: 6379,
    db: 0,
  }
  
  export const ZEROMQ_OPTS = {
    host: 'tcp://zeromq-server',
    port: 3000,
  }
