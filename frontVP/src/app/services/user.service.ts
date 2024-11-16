import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Subject } from 'rxjs';

const base = environment.base;

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${base}/usuarios`;
  private listaCambio = new Subject<User[]>();
  constructor(private http: HttpClient) {}
  //listar usuarios
  list() {
    return this.http.get<User[]>(this.url);
  }
  //insertar o registrar
  insert(u: User) {
    return this.http.post(this.url, u); //registrar
  }

  //metodos de acceso
  //get (lee datos o trae datos)
  //set (modifica datos)
  //asObservable ayuda que se actualice la data
  setList(listaNueva: User[]) {
    this.listaCambio.next(listaNueva); //registrar
  }
  getList() {
    return this.listaCambio.asObservable(); //registrar
  }
  listId(id: number) {
    return this.http.get<User>(`${this.url}/${id}`);  //busca
  }
  update(u:User) {
    return this.http.put(this.url, u); //guarda
  }
  delete(id: number)  {
    return this.http.delete(`${this.url}/${id}`)
  }
  listarPorRol(rol:string){
    return this.http.get<User[]>(`${this.url}/listarrol/${rol}`)
  }
}
