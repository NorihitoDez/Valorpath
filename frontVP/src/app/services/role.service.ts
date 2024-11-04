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

  insert(de:Role){
    return this.http.post(this.url,de);
  }

  setlist(listaNueva:Role[]){
    this.listaCambio.next(listaNueva);
}

getlist(){
  return this.listaCambio.asObservable();
}

}
