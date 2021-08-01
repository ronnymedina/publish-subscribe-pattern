import * as zmq from 'zeromq'

import { ZeromqConnectionOptions, BaseProvider, MessageFromEvent } from '../interfaces'

export class ZeromqProvider implements BaseProvider {
  readonly providerName = 'zeromq'
  topics: string[]

  private provider: zmq.Socket
  private urlConnection: string

  constructor(opts: ZeromqConnectionOptions) {
    this.urlConnection = `${opts.host}:${opts.port}`
    this.provider = zmq.socket('sub')
    this.provider.connect(this.urlConnection)
  }

  async subscribe(topics: string[]): Promise<void> {
    this.provider.subscribe(topics.join(' '))
  }

  async readMessagesFromTopics(callback: (data: MessageFromEvent) => void) {
    this.provider.on('message', async (topic: Buffer, message: Buffer) => {
      const data = JSON.parse(message.toString()) as unknown as Record<string, unknown>
      callback({
        data,
        provider: this.providerName,
        topic: topic.toString(),
      })
    })
  }
}
