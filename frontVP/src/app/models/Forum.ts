import { User } from "./user";

export class Forum {
  id: number = 0;
  title: string = "";
  description: string = "";
  date: Date = new Date(Date.now());
  // Relación con la taba Users [psiciologo
  psychologist: User = new User();
}
