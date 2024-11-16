import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Eventt } from '../models/Eventt';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QuantityEventbyPsichologistDTO } from '../models/QuantityEventbyPsichologistDTO';
import { QuantityVeteraninEventDTO } from '../models/QuantityVeteraninEventDTO';
const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class EventService {
  private url = `${base_url}/eventos`;
  private urls = `${base_url}/eventos/quantityEventbyPsico`;

  private urlss = `${base_url}/eventos/quantityinEvent`;

  private listaCambio = new Subject<Eventt[]>();
  constructor(private http:HttpClient) { }
  list() {
    return this.http.get<Eventt[]>(this.url)
  }

  insert(e:Eventt){
    return this.http.post(this.url,e);
  }

  setlist(listaNueva:Eventt[]){
      this.listaCambio.next(listaNueva);
  }

  getlist(){
    return this.listaCambio.asObservable();
  }

  delete(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  listid(id:number){
    return this.http.get<Eventt>(`${this.url}/${id}`);
  }

  update(e:Eventt){
    return this.http.put(this.url,e);
  }
  
  getQuantityEventbyPsichologist(): Observable<QuantityEventbyPsichologistDTO[]> {
    return this.http.get<QuantityEventbyPsichologistDTO[]>(this.urls);
  }
  getQuantityVeteraninEvent(): Observable<QuantityVeteraninEventDTO[]> {
    return this.http.get<QuantityVeteraninEventDTO[]>(this.urlss);
  }

}
