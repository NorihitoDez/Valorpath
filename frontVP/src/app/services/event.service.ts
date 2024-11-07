import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const base_url = environment.base

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private url = `${base_url}/eventos`;

  private listaCambio = new Subject<Event[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Event[]>(this.url)
  }

  insert(e:Event){
    return this.http.post(this.url,e);
  }

  setlist(listaNueva:Event[]){
      this.listaCambio.next(listaNueva);
  }

  getlist(){
    return this.listaCambio.asObservable();
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  listid(id:number){
    return this.http.get<Event>(`${this.url}/${id}`);
  }

  update(e:Event){
    return this.http.put(this.url,e);
  }

}
