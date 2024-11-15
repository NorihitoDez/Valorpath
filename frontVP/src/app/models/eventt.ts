import { EventType } from "./event-type"
import { User } from "./user"

export class Eventt{
    idEvent: number=0
    name: string =""
    description: string = ""
    startDate: Date= new Date(Date.now())
    endDate: Date= new Date(Date.now())
    registrationDate: Date= new Date(Date.now()) 
    veterano: User = new User()
    psicologo: User = new User()
    eventType: EventType = new EventType()
}