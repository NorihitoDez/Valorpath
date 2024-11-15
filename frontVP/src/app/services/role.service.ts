import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Role } from '../models/role';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private url = `${base_url}/roles`;

  private listaCambio = new Subject<Role[]>();

  constructor(private http:HttpClient) { }

  list() {
    return this.http.get<Role[]>(this.url)
  }

  insert(r:Role){
    return this.http.post(this.url,r);
  }

  setlist(listaNueva:Role[]){
    this.listaCambio.next(listaNueva);
  }

  getlist(){
    return this.listaCambio.asObservable();
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  listid(id:number){
    return this.http.get<Role>(`${this.url}/${id}`);
  }

  update(r:Role){
    return this.http.put(this.url,r);
  }

}
  