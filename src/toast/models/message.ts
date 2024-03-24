export enum MessageType {
  Success,
  Error
}

export default class Message {
  public id: string
  public type: MessageType
  public message: string

  constructor(message: string, type: MessageType = MessageType.Success) {
    this.id = crypto.randomUUID();
    this.type = type;
    this.message = message;
  }
}