export interface Message {
  id: string
  text: string
  sender: 'me' | 'them'
  timestamp: number
}

export interface Credentials {
  idInstance: string
  apiToken: string
}
