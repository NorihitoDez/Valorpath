import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { Subject } from "rxjs";
import { Forum } from "../models/Forum";
import { HttpClient } from "@angular/common/http";

//acceder al controlador
const base_url = environment.base;

@Injectable({
  providedIn: "root",
})
export class ForumService {
  //riuta thtat comes from the backend
  private url = `${base_url}/foros`;
  private listaCambio = new Subject<Forum[]>();
  constructor(private http: HttpClient) {}
  //metodo listar->get listar
  list() {
    return this.http.get<Forum[]>(this.url);
  }
  //metodo insertar o registrar->post insertar
  insert(f: Forum) {
    return this.http.post(this.url, f);
  }
  //mget y set
  getlist() {
    return this.listaCambio.asObservable();
  }
  setlist(listaNueva: Forum[]) {
    this.listaCambio.next(listaNueva);
  }
  /*delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }*/
  // forum.service.ts
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  

  /*listId(id:number){
    return this.http.get<Forum>(`${this.url}/${id}`);
  }*/
  listId(id: number) {
    return this.http.get<Forum>(`${this.url}/listar/${id}`);
  }

  /*update(f: Forum) {
    return this.http.put(this.url, f);
  }*/
  update(forum: Forum) {
    return this.http.put(`${this.url}/update/${forum.id}`, forum);
  }
}
