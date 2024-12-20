import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Appointment } from '../models/appointment';

const base = environment.base;
@Injectable({
  providedIn: 'root',
})
export class AppointmentService {
  private url = `${base}/citas`;

  private listaCambio = new Subject<Appointment[]>();
  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Appointment[]>(this.url);
  }

  insert(a: Appointment) {
    return this.http.post(this.url, a);
  }
  setList(listaNueva: Appointment[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Appointment>(`${this.url}/${id}`);
  }
  update(a: Appointment) {
    return this.http.put(this.url, a);
  }
  delete(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
