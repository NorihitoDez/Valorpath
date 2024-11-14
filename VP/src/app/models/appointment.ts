import { User } from './user';

export class Appointment {
  id: number = 0;
  name: string = '';
  date: Date = new Date(Date.now());
  status: string = '';
  psychologist: User = new User();
  veteran: User = new User();
}
