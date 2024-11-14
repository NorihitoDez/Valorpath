import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Post } from '../models/post';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QuantityPostsByVeteranDTO } from '../models/quantityPostsByVeteranDTO';

const base = environment.base;
@Injectable({
  providedIn: 'root',
})
export class PostService {
  private url = `${base}/publicaciones`;

  private listaCambio = new Subject<Post[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Post[]>(this.url);
  }

  insert(p: Post) {
    return this.http.post(this.url, p);
  }
  setList(listaNueva: Post[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Post>(`${this.url}/${id}`);
  }
  update(p: Post) {
    return this.http.put(this.url, p);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getQuantityPost(): Observable<QuantityPostsByVeteranDTO[]> {
    return this.http.get<QuantityPostsByVeteranDTO[]>(
      `${this.url}/quantity`
    );
  }
}
