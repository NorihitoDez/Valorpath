import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
import { EventType } from '../models/event-type';
import { HttpClient } from '@angular/common/http';


const base = environment.base;

@Injectable({
  providedIn: 'root'
})
export class EventTypeService {
  private url = `${base}/tipoevento`;
  private listaCambio = new Subject<EventType[]>();
  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<EventType[]>(this.url);
  }

  insert (et:EventType){
    return this.http.post(this.url, et);
  }


  setlist(listaNueva:EventType[]){
    this.listaCambio.next(listaNueva);
}

  getList() {
    return this.listaCambio.asObservable();
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  listid(id:number){
    return this.http.get<EventType>(`${this.url}/${id}`);
  }

  update(et:EventType){
    return this.http.put(this.url,et);
  }


}
