import { EventType } from "./event-type"
import { User } from "./user"

export class Event{
    idEvent: number=0
    name: string =""
    description: string = ""
    startDate: Date= new Date()
    endDate: Date= new Date()
    registrationDate: Date= new Date(Date.now()) 
    verterano: User = new User()
    psicologo: User = new User()
    eventType: EventType = new EventType()
}
