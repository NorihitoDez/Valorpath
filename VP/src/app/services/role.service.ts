import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import {Role } from '../models/role';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const base = environment.base;
@Injectable({
  providedIn: 'root',
})
export class RolService {
  private url = `${base}/roles`;

  private listaCambio = new Subject<Role[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Role[]>(this.url);
  }

  insert(r: Role) {
    return this.http.post(this.url, r);
  }
  setList(listaNueva: Role[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Role>(`${this.url}/${id}`);
  }
  update(r: Role) {
    return this.http.put(this.url, r);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
