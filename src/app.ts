import { KafkaProvider } from './kafka.provider'
import { ZeromqProvider } from './zeromq.provider'
import { RedisProvider } from './redis.provider'

import { REDIS_OPTS, KAFKA_OPTS, ZEROMQ_OPTS } from './config'


const kafka = new KafkaProvider(KAFKA_OPTS)
const topics = ['test']

const main = async () => {
    // await zeromq.subscribe(topics)
    // await zeromq.readMessagesFromTopics((data: any) => { console.log(data) })

    await kafka.subscribe(topics)
    await kafka.readMessagesFromTopics((data: any) => { console.log(data) })
}

main()
