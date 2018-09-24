import { ConsultaListaExamen } from './../_model/consultaListaExamen';
import { Examen } from './../_model/examen';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HOST, TOKEN_NAME, MICRO_CRUD } from './../_shared/var.constant';
import { Injectable } from '@angular/core';
import { Subject } from '../../../node_modules/rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {

  examenCambio = new Subject<Examen[]>();
  mensaje = new Subject<string>();
  url: string = `${HOST}/examenes`;
  //url: string = `${HOST}/${MICRO_CRUD}/examenes`;

  constructor(private http: HttpClient) { }

  listarExamenes(){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Examen[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarExamenPorId(id: number){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<Examen>(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  registrar(examen: Examen){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.post(this.url, examen, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  modificar(examen: Examen){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.put(this.url, examen, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  eliminar(id: number){
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }

  listarExamenPorConsulta(idConsulta: number) {
    let access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    return this.http.get<ConsultaListaExamen[]>(`${HOST}/consultaexamenes/${idConsulta}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
