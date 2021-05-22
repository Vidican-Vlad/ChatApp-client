import Ws from '@adonisjs/websocket-client'

export default ({ app }, inject) => {
  const ws = Ws('ws://localhost:3333')
  ws.connect()
  inject('ws', ws)
}
