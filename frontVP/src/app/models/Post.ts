import { Forum } from './Forum';
import { User } from './user';

export class Post {
  id: number = 0;
  title: string = '';
  comment: string = '';
  date: Date = new Date(Date.now());
  veteran: User = new User();
  forum: Forum = new Forum();
}
