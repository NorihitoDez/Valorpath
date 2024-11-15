import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Forum } from '../models/forum';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base = environment.base;
@Injectable({
  providedIn: 'root',
})
export class ForumService {
  private url = `${base}/foros`;

  private listaCambio = new Subject<Forum[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Forum[]>(this.url);
  }

  insert(f: Forum) {
    return this.http.post(this.url, f);
  }
  setList(listaNueva: Forum[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Forum>(`${this.url}/${id}`);
  }
  update(f: Forum) {
    return this.http.put(this.url, f);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
