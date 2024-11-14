export class User {
  id: number = 0;
  dni: string = '';
  username: string = '';
  lastname: string = '';
  email: string = '';
  password: string = '';
  birthdate: Date = new Date(Date.now());
  address: string = '';
  enabled: boolean = true;
}
