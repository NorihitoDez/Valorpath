import { recursos } from "./recursos";
import { User } from "./user";

export class usorecurso{
    iduso: number=0;
    fecha: Date=new Date(Date.now());
    usuario: User=new User();
    recurso: recursos= new recursos();
}