import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { User } from "../models/user";
import { Subject } from "rxjs";

const base = environment.base;

@Injectable({
  providedIn: "root",
})
export class UserService {
  private url = `${base}/usuarios`;
  private listaCambio = new Subject<User[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<User[]>(this.url);
  }

  insert(u: User) {
    return this.http.post(this.url, u);
  }
  setList(listaNueva: User[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<User>(`${this.url}/${id}`);
  }
  update(u: User) {
    return this.http.put(this.url, u);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
