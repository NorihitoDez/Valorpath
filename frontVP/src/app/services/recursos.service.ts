import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { recursos } from '../models/recursos';
import { HttpClient } from '@angular/common/http';
const base = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  private url = `${base}/recursos`;
  private listaCambio = new Subject<recursos[]>();
  constructor(private http:HttpClient) { }
  //listar recursos
  list()
  {
    return this.http.get<recursos[]>(this.url)
  }
  insert(r: recursos) {
    return this.http.post(this.url, r);
  }

  setList(listaNueva: recursos[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable(); 
  }
  listId(id: number) {
    return this.http.get<recursos>(`${this.url}/${id}`);  
  }
  update(r:recursos) {
    return this.http.put(this.url, r); 
  }
  delete(id: number)  {
    return this.http.delete(`${this.url}/${id}`)
  }
}
