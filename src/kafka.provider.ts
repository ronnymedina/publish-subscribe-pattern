import { Admin, Consumer, EachMessagePayload, Kafka, Producer } from 'kafkajs'

import { KafkaConnectionOptions, BaseProvider, MessageFromEvent } from './interfaces'

export class KafkaProvider implements BaseProvider {
  providerName = 'kafka'
  topics: string[]

  private provider: Kafka
  private consumer: Consumer
  private producer: Producer
  private admin: Admin

  constructor(opts: KafkaConnectionOptions) {
    this.provider = new Kafka({
      clientId: opts.clientId,
      brokers: opts.brokers,
    })

    this.consumer = this.provider.consumer({ groupId: opts.groupId })
    this.producer = this.provider.producer()
    this.admin = this.provider.admin()
  }

  async subscribe(topics: string[]): Promise<void> {
    await Promise.all(
      topics.map((topic: string) => this.consumer.subscribe({ topic, fromBeginning: true }))
    )
  }

  async readMessagesFromTopics(callback: (data: MessageFromEvent) => void) {
    await this.consumer.run({
      eachMessage: async ({ topic, message }: EachMessagePayload) => {
        const data = JSON.stringify(message.value) as unknown as Record<string, unknown>
        callback({ data, provider: this.providerName, topic })
      },
    })
  }

  async testPublisher(topic: string, message: string): Promise<void> {
    try {
      await this.admin.connect()
      await this.admin.createTopics({ waitForLeaders: true, topics: [{ topic }] })
    } catch (err) {
      console.log(err)
    }

    try {
      await this.producer.connect()
      await this.producer.send({
        topic: topic,
        messages: [{ value: message }]
      })

    } catch (err) {
      console.log(err, 'error')
    }
  }
}
