import { User } from './user';

export class Forum {
  id: number = 0;
  title: string = '';
  date: Date = new Date(Date.now());
  description: string = '';
  psychologist: User = new User();
}
