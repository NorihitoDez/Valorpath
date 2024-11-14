import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { usorecurso } from '../models/usorecurso';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
const base = environment.base
@Injectable({
  providedIn: 'root'
})
export class UsorecursoService {
  private url = `${base}/usorecurso`;
  private listaCambio = new Subject<usorecurso[]>();
  constructor(private http:HttpClient) { }
  list()
  {
    return this.http.get<usorecurso[]>(this.url)
  }
  insert(ur: usorecurso) {
    return this.http.post(this.url, ur);
  }

  setList(listaNueva: usorecurso[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable(); 
  }
}
