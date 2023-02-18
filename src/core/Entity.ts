import { randomUUID } from "crypto"
import { DomainEvent } from "./DomainEvent"
import { DomainEvents } from "./DomainEvents"

export abstract class Entity<T = any>{
  protected readonly _id: string
  protected props: T
  private _doaminEvents: DomainEvent[] = []
  
  protected constructor(props: T, id?: string) {
    this.props = props
    this._id = id ?? randomUUID()
  }

  get domainEvents() {
    return this._doaminEvents
  }

  get id() {
    return this._id
  }

  protected addDoaminEvent(domainEvent: DomainEvent){
    this._doaminEvents.push(domainEvent)
    DomainEvents.markEntityForDispatch(this)
  }

  public clearEvents(){
    this._doaminEvents = []
  }
}