import { User } from "./user";

export class Post {
  id: number = 0;
  title: string = "";
  comment: string = "";
  date: Date = new Date(Date.now());
  veteran: User = new User();
  
}

/**
 *     private int ;
    private String ;
    private String ;
    private LocalDate ;
    private Users ;
    private Forum forum;
 * 
 */
